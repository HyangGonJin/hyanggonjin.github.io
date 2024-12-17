---
title: "[FastAPI] SQLModel 테이블 이름 별도로 지정하기"
categories: [DE]
tags: [de, fastapi]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-11-02
---

SQLModel에서 `table=true`를 통해 ORM 모델 클래스를 DB 테이블로 정의하는 경우, 테이블 이름(; snake case)과 모델 class 이름(; camel case)이 네이밍 컨벤션에 맞지 않을 수 있습니다. 이런 경우, 테이블 이름을 별도로 지정하는 방법에 대해서 알아 보겠습니다.


## 코드
```python
from sqlmodel import SQLModel, Field

class MyClassName(SQLModel, table=True):
    __tablename__ = "my_class_name"

    id: int = Field(default=None, primary_key=True)
    name: str
```

## 설명
SQLModel의 클래스 이름은 camel case를, 데이터베이스 테이블 이름은 snake case를 일반적으로 사용합니다. 테이블 이름을 별도로 지정하려면 `__tablename__`을 사용하여 명시적으로 테이블 이름을 지정할 수 있습니다. SQLModel은 SQLAlchemy를 기반으로 하고 있기 때문에, SQLAlchemy에서도 `__tablename__` 속성을 활용할 수 있습니다.