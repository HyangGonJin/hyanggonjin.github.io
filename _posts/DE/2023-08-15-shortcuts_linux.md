---
title: "[shortcuts] Linux 터미널 단축키"
categories: [DE]
tags: [de, shortcuts]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-04-25
---

리눅스 터미널에서 파일 관리, 텍스트 편집 및 검색, 시스템 정보 조회와 같은 다양한 작업을 수행하는 데 필요한 기본적인 명령어들을 알아보겠습니다.

# 파일 & 디렉토리

| 명령어 | 설명 |
|--------|--------------------|
| ls     | 디렉토리 내용 나열 |
| pwd    | 현재 작업 중인 디렉토리의 경로 출력 |
| cd     | 디렉토리 변경 |
| mkdir  | 새로운 디렉토리 생성|
| rm     | 파일이나 디렉토리를 삭제|
| touch  | 새 파일을 생성하거나 기존 파일의 수정 시간을 업데이트|
| cp     | 파일이나 디렉토리 복사|
| mv     | 파일이나 디렉토리를 이동하거나 이름을 바꿈|
| du -h -d 1 | depth 1 기준 디렉토리 크기 |


# 텍스트 검색 및 편집

| 명령어 | 설명 |
|--------|--------------------|
| grep      | 텍스트 검색 |
| cat       | 파일 내용 출력|
| less      | 파일의 내용을 줄 별로 검토|
| head | 파일의 처음부터 n줄 출력|
| tail | 파일의 마지막 n줄 출력|


# 기타

| 명령어 | 설명 |
|--------|--------------------|
| chmod      | 파일의 권한 변경 |
| 명령어 a ; 명령어 b   | a 다음에 b 실행 |
| 명령어 a && 명령어 b  | a 성공(or 실패)하면 b 실행(or 실행X) |

