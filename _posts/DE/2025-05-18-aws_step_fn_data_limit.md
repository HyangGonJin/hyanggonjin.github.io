---
title: "[AWS] Step function 데이터 limit"
categories: [DE]
tags: [de, aws]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-05-18
---

AWS Step Functions는 개발자가 AWS 서비스를 사용하여 (분산) 애플리케이션 구축 / 자동화 / 오케스트레이션하고, 데이터 및 ML 파이프라인을 생성할 수 있도록 지원하는 시각적 워크플로 서비스입니다. 

Step Functions에는 '데이터 크기 제한'(Data Size Limit)이 있습니다. 각 상태(State) 간 전달되는 입력(Input)과 출력(Output) 데이터, 실행 전체 결과에 대해 크기 제한이 존재하며, 이를 초과할 경우 `States.DataLimitExceeded`와 같은 오류가 발생하게 됩니다.

## 현상
AWS Step Functions에서 작업을 실행할 때 반환된 데이터 크기가 서비스의 최대 크기를 초과하면 다음과 같은 에러가 발생합니다. 

```py
"cause": "The state/task 'lambda' returned a result with a size exceeding the maximum number of bytes service limit.",
"error": "States.DataLimitExceeded"
```

## 원인
AWS Step Functions에서 각 상태에서 반환할 수 있는 데이터의 최대 크기는 256KB입니다.