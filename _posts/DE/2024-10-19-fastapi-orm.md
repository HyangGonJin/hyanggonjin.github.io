---
title: "[FastAPI] ORM - Model로 DB 관리하기"
categories: [DE]
tags: [de, fastapi]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-10-19
---

# ORM
ORM(Object-Relational Mapping)은 객체 지향 프로그래밍 언어를 사용하여 데이터베이스의 테이블과 객체를 연결하는 기법입니다. 직접적인 SQL DDL(; Data Definition Language) 쿼리 없이도 데이터베이스를 조작할 수 있게 해줍니다. 단순하게 설명하면 DB 테이블을 파이썬과 같은 프로그래밍 언어의 객체로 정의하고 유지보수하는 방법입니다.

파이썬에서 ORM 관련 주요 라이브러리는 SQLAlchemy, SQLModel이 있습니다. 

## SQLAlchemy
SQLAlchemy는 파이썬에서 가장 널리 사용되는 ORM 라이브러리로, 데이터베이스와의 상호작용을 객체 지향적으로 처리할 수 있도록 도와줍니다. 주요 특징은 다음과 같습니다.

- (다양한 데이터베이스 지원) PostgreSQL, MySQL, SQLite, Oracle 등 다양한 데이터베이스 엔진을 지원합니다. 
- (세부적인 쿼리 제어) ORM과 SQLAlchemy Core라는 두 가지 레벨의 API를 제공합니다. ORM을 통해 객체 지향적인 방식으로 데이터베이스를 다룰 수 있지만, 더 복잡한 쿼리가 필요할 때는 Core를 이용해 직접 SQL을 작성할 수 있습니다.


## SQLModel
SQLModel은 SQLAlchemy를 기반으로 하면서 Pydantic과의 호환성을 높여 파이썬의 타입 힌팅을 적극 활용합니다. SQLAlchemy의 강력한 기능을 유지하면서도 더 직관적이고 사용하기 쉬운 API를 제공합니다. 주요 특징은 다음과 같습니다.

- (Pydantic 통합) 데이터 모델링에 Pydantic을 활용하여 데이터 검증과 serialization/deserialization을 쉽게 처리할 수 있습니다. 이를 통해 FastAPI와의 통합이 매우 원활합니다.
- (타입 안전성) 파이썬의 타입 힌팅을 적극 활용하여 더 명확하고 안전한 코드 작성을 유도합니다.
- (제한된 유연성) SQLAlchemy의 모든 기능을 지원하지 않으므로, 고급 사용자가 SQLAlchemy의 Core 기능을 모두 활용하려면 SQLModel만으로는 한계가 있을 수 있습니다.

# 예제
전체 코드는 ["점프 투 FastAPI / 2장 개발 기초 공사! / 2-02 모델로 데이터베이스 관리하기"](https://wikidocs.net/175967)를 참고했습니다. 아래에는 주요 변경사항 및 트러블 슈팅 과정에 대한 설명입니다.

## SQLALCHEMY_DATABASE_URL 변경
기존 sqlite에서 postgres로 DB를 변경합니다. 또한 `.env` 파일로 환경변수를 관리합니다.

```python
# database.py
...
from dotenv import load_dotenv

load_dotenv()
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_HOST = os.getenv("POSTGRES_HOST")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
POSTGRES_DB = os.getenv("POSTGRES_DB")

SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
)
...
```

## alembic 설정
`SQLALCHEMY_DATABASE_URL`의 변경 내용을 alembic 관련 설정 및 파일에 적용합니다.

### alembic.ini
`sqlalchemy.url` 정보를 그대로 입력해도 됩니다. 하지만 해당 정보를 환경변수로 관리하고 있고 postgres password에 '@'가 포함되어 있어 `env.py`에서 따로 설정해주었습니다. 
```
...
sqlalchemy.url = "" 
...
```

### migrations/env.py
`POSTGRES_PASSWORD`를 quote_plus()를 통해 URL 인코딩합니다. '@'는 '%40'으로 인코딩됩니다. alembic.ini 파일은 Python의 configparser를 사용하여 파싱되는데, configparser는 '%'를 특수 문자로 취급해 `ValueError("invalid interpolation syntax in %r at ...)` 에러가 발생하므로 '%'를 '%%'로 변경합니다.

```python
...
# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config
load_dotenv()

from urllib.parse import quote_plus

def get_url():
    user = os.getenv("POSTGRES_USER", "default_user")
    password = quote_plus(os.getenv("POSTGRES_PASSWORD", None)).replace('%', '%%')
    host = os.getenv("POSTGRES_HOST", "localhost")
    port = os.getenv("POSTGRES_PORT", 5432)
    db = os.getenv("POSTGRES_DB", "local")
    url = f"postgresql://{user}:{password}@{host}:{port}/{db}"
    print(url)
    return url

config.set_main_option("sqlalchemy.url", get_url())
...
```

# 참고자료
- ["점프 투 FastAPI / 2장 개발 기초 공사! / 2-02 모델로 데이터베이스 관리하기"](https://wikidocs.net/175967)