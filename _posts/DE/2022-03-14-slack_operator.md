---
title: "Airflow - Slack 알림 받기"
categories: [DE, Airflow]
tags: [de, airflow]
toc : True
toc_sticky: true
last_modified_at: 2022-03-14
---

Airflow에서 task의 성공 여부에 따라 slack으로 알림을 받는 방법을 알아보겠습니다.

# Operator

## kobis_operator
전체 코드는 아래와 같습니다. 

```py
# plugins/operators/kobis_operator.py
import sys
import warnings
import logging

warnings.filterwarnings("ignore")

import numpy as np
import pandas as pd
import requests
from datetime import datetime, timedelta
import pymysql

from airflow.models import BaseOperator


class KobisOperator(BaseOperator):
    def __init__(self, host, user, password, database, needCommit, *args, **kwargs):
        self.host = host
        self.user = user
        self.password = password
        self.database = database
        self.needCommit = needCommit
        super().__init__(*args, **kwargs)

    def execute(self, context):
        conn = pymysql.connect(
            user=self.user,
            passwd=self.password,
            host=self.host,
            db=self.database,
            charset="utf8",
        )

        # Target 날짜 설정
        date = (context.get("execution_date") - timedelta(days=1)).strftime("%Y%m%d")

        # API 호출
        rdict = {"key": "Your API Key", "targetDt": date}

        url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
        r = requests.get(
            url,
            params=rdict,
        )
        tmp = r.json()

        # MySQL DB 연결
        try:
            conn = pymysql.connect(
                user=self.user,
                passwd=self.password,
                host=self.host,
                db=self.database,
                charset="utf8",
            )
            cursor = conn.cursor(pymysql.cursors.DictCursor)
            print("Successfully connected.")
        except:
            logging.error("Could not connected")
            sys.exit(1)

        # Data 수집
        boxoffice_json = tmp["boxOfficeResult"]["dailyBoxOfficeList"]

        boxoffice_dict = {}
        for i in range(len(boxoffice_json)):

            boxoffice_dict.update(
                {
                    "id": "a" + boxoffice_json[i]["movieCd"] + date[-2:],
                    "_name": boxoffice_json[i]["movieNm"].replace("\t", ""),
                    "target_date": datetime.strptime(date, "%Y%m%d").strftime(
                        "%Y-%m-%d"
                    ),
                    "open_date": np.where(
                        boxoffice_json[i]["openDt"] == " ",  # 개봉일이 " "로 되어있는 경우 존재.
                        "9999-01-01",
                        boxoffice_json[i]["openDt"],
                    ),
                    "_rank": boxoffice_json[i]["rank"],
                    "rank_inten": boxoffice_json[i]["rankInten"],
                    "rank_oldnew": boxoffice_json[i]["rankOldAndNew"],
                    "sales_amt": boxoffice_json[i]["salesAmt"],
                    "sales_inten": boxoffice_json[i]["salesInten"],
                    "sales_change": boxoffice_json[i]["salesChange"],
                    "sales_acc": boxoffice_json[i]["salesAcc"],
                    "audi_cnt": boxoffice_json[i]["audiCnt"],
                    "audi_inten": boxoffice_json[i]["audiInten"],
                    "audi_change": boxoffice_json[i]["audiChange"],
                    "audi_acc": boxoffice_json[i]["audiAcc"],
                    "scrn_cnt": boxoffice_json[i]["scrnCnt"],
                    "show_cnt": boxoffice_json[i]["showCnt"],
                }
            )

            table = "daily_boxoffice"
            data = boxoffice_dict

            placeholders = ", ".join(["%s"] * len(data))
            columns = ", ".join(data.keys())
            key_placeholders = ", ".join(["{0}=%s".format(k) for k in data.keys()])

            query = (
                "INSERT INTO %s ( %s ) VALUES ( %s ) ON DUPLICATE KEY UPDATE %s ;"
                % (
                    table,
                    columns,
                    placeholders,
                    key_placeholders,
                )
            )

            cursor.execute(query, list(data.values()) * 2)

        if self.needCommit:
            conn.commit()
```


### 일별 박스오피스 API 서비스
[Kofic 영화진흥위원회](http://www.kobis.or.kr/kobisopenapi/homepg/main/main.do)의 API 서비스를 이용해 데이터를 수집합니다. 제공하는 서비스로는 '일별 박스오피스', '주간/주말 박스오피스', '영화 상세정보' 등 영화와 관련된 정보들을 제공합니다. 그 중 '일별 박스오피스' 정보를 json으로 받아서 이용하였으며, 조회하고자 하는 날짜는 'yyyymmdd'형식으로 입력해야 합니다. 

```py
# Target 날짜 설정
date = (context.get("execution_date") - timedelta(days=1)).strftime("%Y%m%d")

# API 호출
rdict = {"key": "Your API Key", "targetDt": date}

url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json"
r = requests.get(
    url,
    params=rdict,
)
tmp = r.json()
```

### MySQL DB 연결
`pymysql` 라이브러리를 이용해 미리 만들어 놓은 테이블에 연결합니다. 

```py
try:
    conn = pymysql.connect(
        user=self.user,
        passwd=self.password,
        host=self.host,
        db=self.database,
        charset="utf8",
    )
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    print("Successfully connected.")
except:
    logging.error("Could not connected")
    sys.exit(1)
```

### Data 수집
response에는 해당 일자의 '박스오피스 순위', '매출액', '관객수', '상영관'과 관련된 정보들이 있습니다. 개봉일 중 " "로 되어있는 경우가 존재했는데, 이러한 경우 "9999-01-01"로 치환합니다. 해당 일자의 박스오피스 순위 및 필요한 정보들을 insert 합니다.

```py
boxoffice_json = tmp["boxOfficeResult"]["dailyBoxOfficeList"]

boxoffice_dict = {}
for i in range(len(boxoffice_json)):

    boxoffice_dict.update(
        {
            "id": "a" + boxoffice_json[i]["movieCd"] + date[-2:],
            "_name": boxoffice_json[i]["movieNm"].replace("\t", ""),
            "target_date": datetime.strptime(date, "%Y%m%d").strftime(
                "%Y-%m-%d"
            ),
            "open_date": np.where(
                boxoffice_json[i]["openDt"] == " ",  # 개봉일이 " "로 되어있는 경우 존재.
                "9999-01-01",
                boxoffice_json[i]["openDt"],
            ),
            "_rank": boxoffice_json[i]["rank"],
            "rank_inten": boxoffice_json[i]["rankInten"],
            "rank_oldnew": boxoffice_json[i]["rankOldAndNew"],
            "sales_amt": boxoffice_json[i]["salesAmt"],
            "sales_inten": boxoffice_json[i]["salesInten"],
            "sales_change": boxoffice_json[i]["salesChange"],
            "sales_acc": boxoffice_json[i]["salesAcc"],
            "audi_cnt": boxoffice_json[i]["audiCnt"],
            "audi_inten": boxoffice_json[i]["audiInten"],
            "audi_change": boxoffice_json[i]["audiChange"],
            "audi_acc": boxoffice_json[i]["audiAcc"],
            "scrn_cnt": boxoffice_json[i]["scrnCnt"],
            "show_cnt": boxoffice_json[i]["showCnt"],
        }
    )

    table = "daily_boxoffice"
    data = boxoffice_dict

    placeholders = ", ".join(["%s"] * len(data))
    columns = ", ".join(data.keys())
    key_placeholders = ", ".join(["{0}=%s".format(k) for k in data.keys()])

    query = (
        "INSERT INTO %s ( %s ) VALUES ( %s ) ON DUPLICATE KEY UPDATE %s ;"
        % (
            table,
            columns,
            placeholders,
            key_placeholders,
        )
    )

    cursor.execute(query, list(data.values()) * 2)

if self.needCommit:
    conn.commit()
```

## slack_operator
### slack sdk
'Slack'과 연동하기 위해서 `slack_sdk` 라이브러리를 이용합니다. 해당 라이브러리를 통해 'slack api'와 연결할 수 있습니다. API 이용에 필요한 token 값은 [slack api](https://api.slack.com) 사이트에서 어플리케이션을 만든 후 확인할 수 있습니다.

### slack_bot_operator
`slack_sdk`를 이용해 봇이 메세지를 보내는 operator를 만들 수 있습니다. 메시지를 받길 원하는 채널에 봇을 초대하여, 아래와 같은 operator를 이용해 원하는 메시지를 전송할 수 있습니다.

```py
# plugins/operators/slack_bot_operator.py
from airflow.models import BaseOperator
from slack_sdk import WebClient


class SlackBotOperator(BaseOperator):
    def __init__(self, message, *args, **kwargs):
        self.message = message
        self.token = "your token!"
        self.channel = "your channel"
        super().__init__(*args, **kwargs)

    def execute(self, context):
        client = WebClient(token=self.token)
        response = client.chat_postMessage(channel=self.channel, text=self.message)
```

그리고 다음과 같은 두 함수를 이용하면 Task의 성공/실패에 따라 어떤 메시지를 전송할 것인지를 설정할 수 있습니다.

```py
# plugins/utils/slack.py
from slack_sdk import WebClient
from operators.slack_bot_operator import SlackBotOperator


def slack_success_alert(context):
    alert = SlackBotOperator(
        task_id="slack_success",
        message="""
        :large_green_circle: Task success.
        *Task*: {task}  
        *Dag*: {dag}
        *Execution Time*: {exec_date}  
        *Log Url*: {log_url}
        """.format(
            task=context.get("task_instance").task_id,
            dag=context.get("task_instance").dag_id,
            exec_date=context.get("execution_date"),
            log_url=context.get("task_instance").log_url,
        ),
    )
    return alert.execute(context=context)


def slack_fail_alert(context):
    alert = SlackBotOperator(
        task_id="slack_failed",
        message="""
            :red_circle: Task Failed.
            *Task*: {task}  
            *Dag*: {dag}
            *Execution Time*: {exec_date}  
            *Log Url*: {log_url}
            """.format(
            task=context.get("task_instance").task_id,
            dag=context.get("task_instance").dag_id,
            exec_date=context.get("execution_date"),
            log_url=context.get("task_instance").log_url,
        ),
    )
    return alert.execute(context=context)
```




# DAG
`on_success_callback`과 `on_failure_callback`에 위에서 만든 함수를 각각 지정해주어 task의 성공 여부에 따라 어떤 알림을 받을 것인지 설정할 수 있습니다.

```py
# dags/kobis_dag.py
import pendulum
from datetime import datetime, timedelta

from airflow import DAG
from operators.kobis_operator import KobisOperator

from utils.slack import slack_success_alert
from utils.slack import slack_fail_alert


with DAG(
    dag_id="example_slack_operator",
    schedule_interval="0 20 * * *",
    start_date=pendulum.datetime(2022, 3, 1, tz="Asia/Seoul"),
    catchup=False,
    dagrun_timeout=timedelta(minutes=60),
    tags=["example"],
    default_args={
        "on_success_callback": slack_success_alert,
        "on_failure_callback": slack_fail_alert,
    },
    params={},
) as dag:
    t1 = KobisOperator(
        task_id="insert_data",
        host="your host",
        user="your username",
        password="your password!",
        database="your db",
        needCommit=True,
        dag=dag,
    )

    t1

if __name__ == "__main__":
    dag.cli()
```

* 참고자료

    - [kofic 영화진흥위원회 - 일별 박스오피스 API 서비스](http://www.kobis.or.kr/kobisopenapi/homepg/apiservice/searchServiceInfo.do?serviceId=searchDailyBoxOffice)
    - ['slack_sdk.web.client' 모듈](https://slack.dev/python-slack-sdk/api-docs/slack_sdk/web/client.html)
    - ['chat.postMessage' method](https://api.slack.com/methods/chat.postMessage)
    - [Airflow 공식문서 - callback](https://airflow.apache.org/docs/apache-airflow/stable/logging-monitoring/callbacks.html?highlight=callback)
    - [블로그 - Airflow 에서 Slack 사용하기](https://hyungjung-lee.github.io/python/Python-Airflow-Slack/)
