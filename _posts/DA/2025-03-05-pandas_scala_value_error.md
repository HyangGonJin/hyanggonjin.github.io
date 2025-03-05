---
title: "[Error] ValueError: If using all scalar values, you must pass an index"
excerpt: ""
categories: [DA]
tags: [da, pandas]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-03-05
---

## 원인
해당 에러는 `pandas.DataFrame()`을 생성할 때 모든 값이 스칼라(단일 값)인 경우, 명시적으로 인덱스를 지정해야 한다는 의미입니다. 

저의 경우, 모든 값이 리스트나 배열이 아닌 스칼라 값인 딕셔너리를 데이터프레임으로 생성할 때 index를 지정하지 않아서 에러가 발생했습니다. 

## 해결 방법
에러를 해결하기 위해 딕셔너리를 먼저 `pandas.Series()`로 생성한 후, `to_frame()`을 적용해주면 됩니다.

```py
pd.Series(data_dict).to_frame()
```