---
title: "Docker 시작하기"
categories: [DE, Docker]
tags: [de, docker]
toc : True
toc_sticky: true
last_modified_at: 2022-05-23
---

본 문서는 [docker 공식문서 - Get Started](https://docs.docker.com/get-started/)를 바탕으로 작성된 자료입니다.

필요한 자료는 [링크](https://github.com/docker/getting-started/tree/master/app) 에서 다운로드 할 수 있습니다.

## build
* `docker build` 명령어를 통해 작성된 Dockerfile을 바탕으로 도커 이미지(docker image)를 생성할 수 있습니다. 
* 도커 이미지는 `[registry명]/[image명]:[버전]`을 기본으로 하며 각각 생략할 경우 'registry명'은 'dockerhub', '버전'은 'latest'로 인식합니다.

```docker
# Dockerfile
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 3000
```

```docker
# 이미지 생성
docker build -t getting-started .
```
* `-t`: docker image의 이름 지정.
*  `.`: Dockerfile의 경로.

## run
`docker run` 명령어를 통해 'build' 또는 'pull'한 도커 이미지를 컨테이너로 실행합니다.
```docker
# 컨테이너 실행
docker run -d -p 80:80 --name tutorial docker/getting-started
```
* `-d`: detached 모드(백그라운드에서 컨테이너 실행).
* `-p`: [host-port]:[container-port]. 호스트의 포트 80을 컨테이너의 포트 80에 포트포워딩.
* `--name` : 컨테이너 이름 설정.
* `docker/getting-started`: 사용할 도커 이미지.

## rm
`rm`과 `rmi` 명령어를 통해 도커 컨테이너/이미지를 삭제할 수 있습니다.
```docker
# 현재 실행 중인 컨테이너 확인
docker ps
docker container ls (-al)

# 도커 이미지 확인
docker images
docker image ls 

# 실행 중인 컨테이너 중지
docker stop <컨테이너 Id/Names>

# 컨테이너 삭제
docker rm <컨테이너 Id/Names>

# 실행 중인 컨테이너 강제 삭제
docker rm -f <컨테이너 Id/Names>

# 이미지 삭제
docker rmi [image Id/Names]
docker image rm [image Id/Names]
```

## tag & push
* docker hub와 같은 registry를 사용하면 도커 이미지를 공유할 수 있습니다. 
* docker registry는 private과 public 환경으로 모두 생성 가능합니다.
* `docker tag` 명령어를 통해 registry명을 변경해 도커 이미지를 'push'할 수 있습니다.

```docker
# docker 로그인
docker login

# registry명 변경
docker tag getting-started <Your-dockerhub-id>/getting-started

# 이미지 push
docker push <Your-dockerhub-id>/getting-started
```

## Volume
* 실행된 docker 컨테이너에 추가되는 데이터들은 별도의 RW(Read and Write) 레이어에 저장되게 됩니다. 그래서 컨테이너를 삭제하는 경우 데이터도 같이 삭제가 됩니다. 
* DB 관련 컨테이너의 경우 이러한 현상은 데이터가 없어지기 때문에 문제가 되는데, 이러한 문제는 DB 컨테이너가 동일한 host의 디렉토리를 바라보게 설정해서 데이터를 보존할 수 있습니다. 
* `-v` 옵션을 통해 volume을 지정한 container경로에 mount 할 수 있습니다.

```docker
# named volume
# Volume 생성
docker volume create todo-db

# Volume 정보 확인
docker volume inspect todo-db

# DB 연결
docker run -dp 3000:3000 -v todo-db:/etc/todos getting-started
```

## Networking
* 컨테이너 간 통신을 위해서는 network 작업이 필요합니다. 2가지의 방법을 통해 네트워크를 지정할 수 있습니다.
  1. 컨테이너 실행시 네트워크를 지정하는 방법.
  2. 만들어진 컨테이너에 네트워크를 연결하는 방법.

```docker
# network 생성
docker network create todo-app

# MySQL 컨테이너 시작
# amd-architecture
docker run -d \
     --network todo-app --network-alias mysql \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_DATABASE=todos \
     mysql:5.7

# arm-architecture
docker run -d \
     --network todo-app --network-alias mysql \
     --platform "linux/amd64" \
     -v todo-mysql-data:/var/lib/mysql \
     -e MYSQL_ROOT_PASSWORD=secret \
     -e MYSQL_DATABASE=todos \
     mysql:5.7

# MySQL 접속
docker exec -it mysql -u root -p
```

```sql
# todos 데이터베이스 확인
SHOW DATABASES;
```

```docker
docker run -it --network todo-app nicolaka/netshoot
```

## docker-compose
* 일반적으로 컨테이너를 실행할 때 (예제처럼) 여러 옵션을 줘야하는 경우가 많습니다. 이러한 옵션들을 커맨드라인으로 직접 입력하는 것은 매우 번거로우며, 컨테이너 관련 정보를 관리하는데도 불편한 점이 있습니다. 
* 'docker-compose'는 커맨드라인으로 입력하던 컨테이너의 세부사항을 yml 파일을 통해 일괄적으로 정의하고 관리할 수 있게 지원합니다. 
* docker-compose 설치는 [링크](https://docs.docker.com/compose/install/)를 참조하시면 됩니다.

```yml
# docker-compose.yml
version: "3.7"

services:
  app:
    image: node:12-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos

  mysql:
    image: mysql:5.7
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos

volumes:
  todo-mysql-data:
```

```docker
# docker-compose 실행
docker-compose up -d

# docker-compose 중지
docker-compose down
```

## 기타
```docker
# Security scanning
docker scan getting-started
```

```docker
# Image layering
docker image history getting-started
```

```docker
# Image Search
docker search [image명]
```



* 참고자료 
  * [docker 공식문서 - get started](https://docs.docker.com/get-started/)
