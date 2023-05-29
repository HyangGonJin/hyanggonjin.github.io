---
title: "Hive & Impala - Intro"
categories: [DE, DB]
tags: [de, db]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-05-29
---

파이썬 환경에서 Hive와 Impala를 사용할 수 있는 방법에 대해 간단하게 알아 보겠습니다.

## 1. Hive
Hive는 하둡에서 동작하는 data warehouse 시스템으로 HiveQL이라는 SQL 쿼리를 통해 대용량의 데이터를 읽고, 쓰고, 관리하는 기능을 지원합니다. 

### 1.1 hive connection
다른 DB와 동일하게 connection과 cursor를 통해 Hive와 통신할 수 있습니다. 먼저, 연결정보를 지정해주고 cursor까지 생성합니다.
```py
from pyhive import hive

# 연결정보 정의
hive_host = '10.000.00.000'
port = 10000
username = 'username'
password = 'password'
auth = 'LDAP'

target_db = 'temp'
tbl_name = 'temp_tbl'

# connection & cursor
conn = hive.Connection(host=hive_host, port=port, database=target_db, username=username, password=passoword, auth=auth)
cursor = conn.cursor()
```

`SELECT`문을 통해 데이터를 불러오는 작업은 아래와 같이 할 수 있으며, `read_sql` 함수를 사용해 동일한 작업을 할 수도 있습니다.
```py
## select ##
query = f"""SELECT * FROM {tbl_name}"""
cursor.execute(query)

result = cursor.fetchall()
temp_df = pd.DataFrame(result)
temp_df.head()
```

'df'라는 pandas 데이터프레임이 있다고 할 때, `INSERT`문은 아래와 같은 방법으로 할 수 있으며, `to_sql` 함수를 사용해 동일한 작업을 할 수도 있습니다.
```py
## insert ##
### df : pandas dataframe
query = f"insert into table temp.tbl1 values ({df['num_col1'][0]}, '{df['string_col1'][0]}')"
cursor.execute(query)

cursor.execute("select * from temp.tbl1")
result = cursor.fetchall()
pd.DataFrame(result)

# close the conn & cursor 
conn.close()
cursor.close()
```

### 1.2 sqlalchemy engine
다음으로 sqlalchemy 엔진을 이용하는 방법입니다. `create_engine`으로 정의하는 부분 이외에는 cursor를 이용한 방법과 유사합니다. 
```py
from sqlalchemy import create_engine

# sqlalchemy engine
uri = f"hive://{username}:{password}@{hive_host}:{port}/{target_db}"
conn_args = {'auth' : auth}
tbl_name = 'temp_tbl'

## select ## 
engine = create_engine(uri, connect_args=conn_args, echo=False)
query = f"SELECT * FROM {target_db}.{tbl_name}"

with engine.connect() as conn:
    result = conn.execute(query)

temp_df = pd.DataFrame(result.fetchall())
temp_df.head()

## insert w/ to_sql() ##
df.to_sql(name='tbl', con=engine.connect(), if_exists='append', index=False, method='multi', chunksize=25000)
```


## 2. Impala
Impala는 하둡에서 동작하는 메모리 기반 대규모 SQL 쿼리 엔진으로, 기존 Hive의 메타스토어를 사용하며 Hive와 비교할 때 더 빠른 데이터 처리 속도를 지원합니다. 

### 2.1 impala connection
```py
impala_host = '10.000.00.000'
impala_port = 21050
target_db = 'temp'
username = 'username'
password = 'password'
auth = 'LDAP'

tbl_name = 'temp_tbl'
query = f"SELECT * FROM {tbl_name}"


from impala.dbapi import connect

conn = connect(host=impala_host, port=impala_port, database=target_db, user=username, password=password, auth_mechanism=auth)
cursor = conn.cursor()

cursor.execute(query)
result = cursor.fetchall()

temp_df = pd.DataFrame(result)
temp_df.head()

```

### 2.2 sqlalchemy engine
```py
from sqlalchemy import create_engine

impala_uri = f"impala://{username}:{password}@{impala_host}:{impala_port}/{target_db}?auth_mechanism={auth}"
engine = create_engine(impala_uri, encoding='utf-8')

with engine.connect() as conn:
    result = conn.execute(query)

temp_df = pd.DataFrame(result.fetchall())
temp_df.head()
```

## 3. 마무리
몇 가지 참고할 내용으로 마무리 하겠습니다. 

1. `pd.DataFame.to_sql`: 속도가 느리며, 데이터의 크기가 큰 경우에 자원에 따라 `chunksize` 옵션을 조정해야 함.



## 참고자료

- [Apache Hive 공식문서](https://hive.apache.org/)
- [databricks - Apache Hive](https://www.databricks.com/kr/glossary/apache-hive)

