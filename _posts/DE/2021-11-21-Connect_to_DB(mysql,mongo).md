---
title: "데이터베이스 연결"
categories: [DE, DB]
tags: [de, mysql, mongodb]
toc : True
toc_sticky: true
last_modified_at: 2021-12-05
---
파이썬에서 DB에 직접 연결이 필요한 경우가 있습니다. 이에, 파이썬을 이용해 MySQL과 MongoDB에 접근하는 방법을 알아봅니다. 

## 1. **MySQL**
## 1.1 DB 연결
```py
import os
import sys
import logging
import pymysql

# DB 정보.
host = "your host!"
port = "your port!"
username = "your username!"
database = "your database name!"
password = "your password!!"

# MySQL DB 연결.
conn = pymysql.connect(host=host, user=username, passwd=password, db=database, port=port, use_unicode=True, charset='utf8')

# Cursor 생성.
cursor = conn.cursor()


# 다양한 query들을 실행할 수 있음.
query = """CREATE DATABASE IF NOT EXISTS test DEFAULT CHARSET='utf8'"""
cursor.execute(query)

query = """USE test"""
cursor.execute(query)

query = """SHOW TABLES"""
cursor.execute(query)
print(cursor.fetchall())
```

* **참고**

  * CHARSET='utf8'을 디폴트로 해야 한글로 입력된 파일을 올리는데 문제가 생기지 않음.
  * cursor를 통해 실행한 query의 결과는 `cursor.fetchall()`을 통해서 확인할 수 있음.

---

## 1.2 pandas의 `to_sql()`.
사용된 데이터는 '서울 열린데이터광장'의 [서울시 공공와이파이 위치정보 데이터](http://data.seoul.go.kr/dataList/OA-1218/S/1/datasetView.do;jsessionid=1024575F5105EFBB20B362FF4C6925E7.new_portal-svr-11) 입니다.
```py
import pandas as pd

df = pd.read_csv("wifi/서울시 공공와이파이 위치정보.csv",encoding='euc-kr')
df.head()

from sqlalchemy import create_engine
dialect = "mysql+pymysql://" + username + ":" + password + "@" + host + ":" + str(port) + "/" + database 
engine = create_engine(dialect, encoding='utf-8')

df.to_sql(name='wifi', con=engine, if_exists="replace", index=True)

conn = pymysql.connect(host=host, user=username, passwd=password, db=database, port=port, use_unicode=True, charset='utf8')
cursor = conn.cursor()

cursor.execute("SHOW TABLES")
print(cursor.fetchall())

cursor.execute("select * from wifi limit 1")
print(cursor.fetchall())

```

<p align="center">
<img src = '/assets/img/to_sql_output.png' width="700" height="300">
<!-- </img> -->
</p>

* 참고자료
  
  * [pandas.DataFram.to_sql 문서](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_sql.html)
  * [sqlalchemy 문서](https://docs.sqlalchemy.org/en/13/core/engines.html)
  * [관련 Medium 게시물 - Using AWS RDS and python together](https://towardsdatascience.com/using-aws-rds-and-python-together-5718a6878e4c)


---

## 2. **MongoDB**
## 2.1 DB 연결
```py
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
# client = MongoClient('mongodb://localhost:27017/')

# database 확인.
client.list_database_names()

# database 접근.
db = client.mydb
# db = client['mydb']

# database 내 collection 확인.
db.list_collection_names()

# collection 접근.
collection = db.zips
# collection = db['zips']

# document 확인.
import pprint
pprint.pprint(collection.find_one())
```
<p align="center">
<img src = '/assets/img/pymongo_output.png' width="700" height="300">
<!-- </img> -->
</p>



* 참고자료 
  
  * [pymongo 공식 tutorial](https://pymongo.readthedocs.io/en/stable/tutorial.html)