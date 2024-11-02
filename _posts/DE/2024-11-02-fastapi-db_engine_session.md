---
title: "[FastAPI] 비동기 데이터베이스 엔진과 세션 생성"
categories: [DE]
tags: [de, fastapi]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-11-02
---

`create_async_engine`와 `async_sessionmaker`를 사용하여 비동기 데이터베이스 엔진과 세션을 생성하는 방법에 대해서 알아보겠습니다. 


## 코드
```python
engine = create_async_engine(
        sqlalchemy_database_uri,
        future=True,
        echo=True,
    )
    app.state.db_engine = engine
    app.state.sessionmaker = async_sessionmaker(
        engine, autoflush=True, expire_on_commit=True
    )
```

## 설명
### create_async_engine
- `create_async_engine` 함수는 비동기 SQLAlchemy 엔진을 생성합니다.
- `future=True`는 SQLAlchemy 2.x 버전의 호환성을 보장하기 위한 설정이며, `echo=True`는 SQLAlchemy 로그 출력을 활성화합니다.

### app.state.db_engine
- 생성된 엔진을 `app.state.db_engine`에 저장하여 애플리케이션의 여러 부분에서 이 엔진을 사용할 수 있도록 합니다.

### async_sessionmaker
- `async_sessionmaker` 함수는 비동기 세션을 생성하여, 데이터베이스와의 비동기 트랜잭션을 관리하는 역할을 합니다.
- `autoflush=True`는 세션에서 변경된 내용을 자동으로 데이터베이스에 플러시하도록 설정합니다.
- `expire_on_commit=True`는 커밋 후 객체를 만료하도록 합니다. 

### flush
- 플러시는 SQLAlchemy에서 세션에 보관된 변경 사항을 데이터베이스에 즉시 반영하는 작업을 의미합니다. 이를 통해 SQLAlchemy는 변경된 데이터를 데이터베이스와 동기화합니다.
- 필요한 이유
    - (일관성 유지) 복잡한 쿼리를 수행할 때, 세션에 있는 변경 사항이 반영된 상태에서 쿼리를 실행하여 올바른 데이터를 조회할 수 있도록 합니다.
    - (임시 저장) 플러시는 변경 사항을 영구적으로 커밋하는 것이 아니라 임시로 반영하는 것이라 생각할 수 있습니다. 다시 말해, 아직 확정되지 않은 변경 사항을 데이터베이스에 반영하지만 커밋이 이뤄지지 않으면 롤백될 수 있습니다.

### expire_on_commit=True
- (commit 후 만료) commit이 호출되면 세션에 로드된 모든 객체가 만료됩니다.
- (장점) 데이터의 일관성을 보장할 수 있습니다. 커밋 후 다른 세션이나 트랜잭션에서 데이터가 변경되었을 때, 최신 데이터를 조회하게 되어 데이터베이스와의 일관성을 유지할 수 있습니다.
- (단점) 매번 데이터베이스에 쿼리를 날리게 되므로, 성능에 영향을 미칠 수 있습니다.