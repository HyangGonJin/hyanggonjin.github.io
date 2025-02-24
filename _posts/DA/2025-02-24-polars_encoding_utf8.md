---
title: "[DA] polars encoding - utf8 & utf8-lossy"
excerpt: ""
categories: [DA]
tags: [da]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-02-24
---

polars의 read_csv 등의 encoding 옵션 중 UTF-8 인코딩과 관련해 'utf8', 'utf8-lossy', 2가지의 옵션이 있습니다. 둘의 차이에 대해서 알아 보겠습니다. 


## encoding="utf8"
- 일반적인 UTF-8 인코딩 방식입니다.
- 파일이 완전한 UTF-8 형식이어야 하며, 인코딩 오류가 발생하면 예외(`UnicodeDecodeError`)가 발생합니다.
- 데이터가 깨지거나 인코딩 문제가 있을 경우, 그대로 멈추고 오류를 출력합니다.

## encoding="utf8-lossy"
- UTF-8 인코딩을 사용하지만, 인코딩 오류가 발생하면 해당 문자를 삭제하고 계속 읽어옵니다.
- UTF-8로 해석할 수 없는 문자가 있으면 무시하고 정상적인 데이터만 유지합니다.
- 깨진 데이터를 포함한 CSV를 읽을 때, 일부 데이터가 손실될 가능성이 있지만, 프로세스가 중단되지 않습니다.