---
title: "[Docker] POSTGRES 컨테이너 도커로 띄우기"
categories: [DE]
tags: [de, docker]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-10-19
---



# docker-compose.yml
컨테이너를 띄우기 위한 docker-compose.yml 파일은 아래와 같습니다.

```yaml
# docker-compose-postgres.yml
version: '1'

services:
  db:
    image: postgres:13-alpine # 사용할 PostgreSQL 버전
    restart: always
    container_name: postgres_db
    environment:
      TZ: Asia/Seoul
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_ROOT_PASSWORD} # 필요한 비밀번호로 변경
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "${POSTGRES_PORT}:5432"
    volumes:
      - ./db/postgres/data:/var/lib/postgresql/data
```

이후 컨테이너를 띄우고 실행합니다.
```bash
docker compose -f docker-compose-postgres.yml up         
docker exec -it postgres_db psql -U hygn -d local
```


Datatbase 목록도 확인합니다.
```
postgres=# \l
                             List of databases
   Name    | Owner | Encoding |  Collate   |   Ctype    | Access privileges 
-----------+-------+----------+------------+------------+-------------------
 local     | ----  | UTF8     | en_US.utf8 | en_US.utf8 | 
 postgres  | ----  | UTF8     | en_US.utf8 | en_US.utf8 | 
```


User 권한을 지정합니다.
```sql
GRANT ALL PRIVILEGES ON DATABASE local to ${USER_NAME};
ALTER USER ${USER_NAME} WITH SUPERUSER;

postgres=# \du
                                   List of roles
 Role name |                         Attributes                         | Member of 
-----------+------------------------------------------------------------+-----------
 ----      | Superuser, Create role, Create DB, Replication, Bypass RLS | {}
```

- GRANT 명령을 사용하여 특정 사용자에게 데이터베이스에 대한 권한을 부여할 수 있습니다. 
- ALL PRIVILEGES: 해당 데이터베이스에 대한 모든 권한을 부여합니다. 특정 권한만 부여하려면 SELECT, INSERT, UPDATE, DELETE, CREATE, CONNECT 등으로 대체할 수 있습니다.
