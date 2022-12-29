---
title: "Airflow - Custom operator"
# categories:
#   - DE
# tags:
#   - data engineering
#   - mongodb
#   - airflow
toc : True
toc_sticky: true
last_modified_at: 2022-03-01
---


Airflow는 다양한 Operator를 지원하지만, 필요한 Operator를 직접 만들 수도 있습니다. `airflow.models.baseoperator.BaseOperator`를 통해 이러한 확장성을 지원합니다.

# Custom Operator 생성
`BaseOperator`에 2가지를 override하는 것으로 Custom Operator를 생성할 수 있습니다.

* Constructor - 생성할 Operator의 parameter를 정의합니다.
* Execute - Operator가 실행할 코드를 작성합니다.  

## Operator 생성
생성할 operator 파일을 만들어 'plugins-operators' 폴더('custom-operator' 등 폴더명을 다르게 하여 operator를 관리할 수 있음)에 생성합니다.
```py
# hello_operator.py
from airflow.models.baseoperator import BaseOperator


class HelloOperator(BaseOperator):
    def __init__(self, name: str, **kwargs) -> None:
        super().__init__(**kwargs)
        self.name = name

    def execute(self, context):
        message = f"Hello {self.name}"
        print(message)
        return message
```

## DAG 생성
다음과 같이 DAG을 만듭니다.
```py
# hello_dag.py
from datetime import datetime, timedelta

from airflow import DAG
from operators.hello_operator import HelloOperator

with DAG(
    dag_id="example_hello",
    schedule_interval=timedelta(minutes=5),
    start_date=datetime(2021, 1, 1),
    catchup=False,
    dagrun_timeout=timedelta(minutes=60),
    tags=["example"],
) as dag:
    hello_task = HelloOperator(task_id="sample-task", name="foo_bar", dag=dag)

    hello_task

if __name__ == "__main__":
    dag.cli()
```


# MongoDB Operator 생성
위와 같은 방법을 이용해 MongoDB에 데이터를 쌓는 DAG를 만들 수 있습니다.

## test collection 생성
`test_coll`이라는 collection에 `Date()`함수를 이용해 현재 날짜와 시간을 저장합니다 

```
db.createCollection("test_coll")

db.test_coll.insertOne({date:Date()})
```

## Operator 생성
우선, `BaseOperator`를 이용해 'mongo_operator' 파일을 'plugins - operators' 폴더에 생성합니다.

```py
from airflow.models import BaseOperator
from pymongo import MongoClient


class MongoCreateDocumentOperator(BaseOperator):
    def __init__(self, host, database, collection, data, *args, **kwargs):
        self.host = host
        self.database = database
        self.collection = collection
        self.data = data
        super().__init__(*args, **kwargs)

    def execute(self, context):
        mongo = MongoClient(host=self.host, port=27017)
        mongo[self.database][self.collection].insert_one(self.data)
```

## DAG 생성
위에서 만든 `MongoCreateDocumentOperator`를 이용하여 쿼리를 실행하는 DAG을 만듭니다.
```py
#test_mongo_dag.py
from datetime import datetime, timedelta

from airflow import DAG
from operators.mongo_operator import MongoCreateDocumentOperator

with DAG(
    dag_id="example_mongo",
    schedule_interval=timedelta(minutes=5),
    start_date=datetime(2022, 2, 27),
    catchup=False,
    tags=["example"],
) as dag:
    mongo_task = MongoCreateDocumentOperator(
        task_id="insert_data",
        host="127.0.0.1",
        database="test",
        collection="test_coll",
        data={"date": datetime.today().strftime("%Y/%m/%d %H:%M:%S")},
        dag=dag,
    )
    mongo_task

if __name__ == "__main__":
    dag.cli()
```

## Hooks
Hook을 통해 외부 resource에 연결할 수 있습니다. 또한, Airflow의 connection 정보를 이용하기 때문에 비밀번호와 같은 인증 정보를 파일에 작성하지 않아도 된다는 장점이 있습니다.

먼저, 터미널 창에서 `mongo-provider`를 설치합니다.
```
pip install apache-airflow-providers-mongo
```
그리고 Airflow 메뉴 중 ‘admin → connections → mongo_default’에서 아래 정보를 입력합니다.

> Connection Type : MongoDB   
Host : your host (e.g. localhost)   
Schema : your schema (e.g. test)   
Port : your port (e.g. 27017)   

마지막으로 아래와 같이 Operator와 DAG을 구성하면 위에서 만든 `MongoCreateDocumentOperator`와 동일하게 현재 날짜와 시간을 document에 저장할 수 있습니다.

```py
### mongodb_operator.py
from datetime import datetime

from airflow.models.baseoperator import BaseOperator
from airflow.providers.mongo.hooks.mongo import MongoHook


class MongoDBOperator(BaseOperator):
    def __init__(self, conn_id: str, **kwargs) -> None:
        super().__init__(**kwargs)
        self.conn_id = conn_id

    def execute(self, context):
        hook = MongoHook(conn_id=self.conn_id)
        query = {"date": datetime.today().strftime("%Y/%m/%d %H:%M:%S")}
        result = hook.insert_one(
            mongo_collection="test_coll", doc=query, mongo_db="test"
        )
        message = f"result: {result}"
        print(message)
        return message
```
```py
### test2_mongo_dag.py
from datetime import datetime, timedelta

from airflow import DAG
from operators.mongodb_operator import MongoDBOperator

with DAG(
    dag_id="example_mongodb",
    schedule_interval=timedelta(minutes=5),
    start_date=datetime(2021, 1, 1),
    catchup=False,
    dagrun_timeout=timedelta(minutes=60),
    tags=["example"],
) as dag:
    mongo_task = MongoDBOperator(
        task_id="sample-task",
        conn_id="mongo_default",
        dag=dag,
    )

    mongo_task

if __name__ == "__main__":
    dag.cli()
```


* 참고자료
  
  * [Airflow 공식문서 - Creating a custom Operator](https://airflow.apache.org/docs/apache-airflow/stable/howto/custom-operator.html#custom-operator)
  * [Airflow 공식문서 - MongoHook](https://airflow.apache.org/docs/apache-airflow-providers-mongo/stable/_api/airflow/providers/mongo/hooks/mongo/index.html#airflow.providers.mongo.hooks.mongo.MongoHook)
  * [블로그 - Airflow에서 MongoDB 사용하기](https://hyungjung-lee.github.io/python/Python-Airflow-MongoDB/)
