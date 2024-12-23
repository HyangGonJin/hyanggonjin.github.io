---
title: "[Alembic] Error - Target database is not up to date"
categories: [DE]
tags: [de]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-12-23
---

Alembic을 통해 마이그레이션 파일을 생성할 때, `Target database is not up to date` 에러가 발생할 수 있습니다. 에러의 원인과 해결 방법에 대해서 알아 보겠습니다.

## 설명
해당 에러 메세지는 alembic 마이그레이션 기록(; revision 파일 기반)과 실제 데이터베이스 상태(; DB의 alembic_versions 테이블)가 일치하지 않는 경우 발생합니다. 

아래와 같은 단계로 문제를 해결할 수 있습니다.

## 해결 방법
### 1. alembic 현재 상태 확인
`alembic current` 명령어를 통해 DB에 기록된 alembic의 현재 상태(; revision)를 확인합니다.

### 2. migration 상태 변경
`alembic heads` 명령어를 통해 로컬 환경의 alembic의 상태를 확인합니다.

`Target database is not up to date` 에러가 발생했다면, 위 명령어의 revision id가 다를 것입니다. migration script를 pull 받을 수 있고, revision 정보를 변경해 alembic 상태를 맞춰줄 수 있습니다.

```bash
alembic stamp head
# 또는 
alembic downgrade <revision>
```


### 2.1 alembic stamp
1.	데이터베이스 스키마를 변경하지 않습니다.   
2.	alembic_version 테이블의 버전 정보만 업데이트합니다.
3.	주로 기존 데이터베이스를 Alembic으로 관리하기 시작할 때 사용됩니다.


### 2.2 alembic downgrade revision
1.	지정된 리비전으로 데이터베이스 스키마를 실제로 변경합니다.
2.	마이그레이션 파일의 downgrade() 메서드를 실행합니다.
3.	alembic_version 테이블의 버전 정보를 업데이트합니다.
4.	이전 버전으로 롤백할 때 사용됩니다.