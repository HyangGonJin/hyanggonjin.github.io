---
title: "[python] File format - pickle, parquet"
categories: [DE]
tags: [de, python]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-04-16
---

csv 이외에 (파이썬에서) 사용할 수 있는 데이터 저장 방식 중 2가지, pickle과 parquet에 대해서 간략하게 알아보겠습니다.

## TL;DR
1. pickle: 바이트 기반 python object 저장 방식. 읽기 속도 빠르지만 호환성 낮음.
2. parquet: 컬럼 기반 저장 방식. subset 컬럼 옵션 이용 가능하고 호환성 높음. 추가 패키지 설치가 필요함.


## 1. pickle
>pickle 모듈은 파이썬 객체 구조의 직렬화와 역 질력화를 위한 바이너리 프로토콜을 구현합니다. “피클링(pickling)”은 파이썬 객체(object) 계층 구조가 바이트 스트림으로 변환되는 절차이며, “역 피클링(unpickling)”은 반대 연산으로, (바이너리 파일 이나 바이트열류 객체로 부터의) 바이트 스트림을 객체 계층 구조로 복원합니다. 
>   
>출처: python 공식문서 - pickle

Pickle(pkl)은 바이너리(or 바이트) 기반의 python object를 저장하기 위한 기본 python 모듈입니다.

실제로 사용하며 느낀 pickle의 장점은 다음과 같습니다.
1. 다른 패키지, 모듈을 설치하지 않아도 됨.
2. (pandas) 데이터프레임을 저장하는 경우, 각 컬럼의 타입이 유지됨.
3. 읽기 속도가 빠름.

단점은 다음과 같습니다.
1. 호환성이 낮음 (python object를 저장하므로 python 생태계 내부에서만 활용이 가능).
2. 안전성이 떨어짐 ([공식문서](https://docs.python.org/ko/3/library/pickle.html) 내용 참고).
3. subset 컬럼에 대한 옵션이 없음 (데이터 크기가 큰 경우, 불필요한 컬럼이 함께 있는 경우 데이터 읽기에 있어서 비효율적).

## 2. parquet
> Apache Parquet is a columnar storage format available to any project in the Hadoop ecosystem, regardless of the choice of data processing framework, data model or programming language.
>
> 출처: Apache Parquet 공식문서 - Overview

Parquet는 Hive, Impala, Spark와 같은 Hadoop 에코시스템에서 사용하기 위해 만들어진 컬럼 기반의 저장 형식입니다. csv는 로우(row) 기반 저장 방식이고, parquet와 같은 컬럼(column) 기반의 저장 방식으로는 ORC(Optimized Row Columnar)와 같은 포맷도 있습니다.

실제로 사용하며 느낀 parquet의 장점은 다음과 같습니다. 
1. compression을 적용해 pickle이나 csv 대비 파일 크기를 줄일 수 있음.
2. subset 컬럼 옵션을 이용하여, 크기가 큰 데이터에서 필요한 컬럼만 읽어 메모리를 효율적으로 사용할 수 있음.
3. schema와 같은 meta 정보도 저장이 가능해, 각 컬럼의 타입이 유지됨.

단점은 다음과 같습니다.
1. python 기준, pyarrow나 fastparquet와 같은 다른 패키지를 설치해야함.
2. csv나 json에 비해 떨어지는 호환성.

## 3. 마무리
몇 가지 참고할 내용으로 마무리 하겠습니다. 

1. pickle은 python object를 저장하는 방식이므로, 데이터 뿐만 아니라 모델도 저장할 수 있음.
2. parquet는 지원하는 데이터 타입이 pandas 대비 많기 때문에, DB의 테이블 스키마(schema)와 데이터 타입을 맞추는데 pandas에 비해 장점이 있음.

## 참고자료

- [python 공식문서 - pickle](https://docs.python.org/ko/3/library/pickle.html)

- [Apache Parquet 공식문서 - Overview](https://parquet.apache.org/docs/overview/)

