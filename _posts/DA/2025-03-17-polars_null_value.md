---
title: "[polars] 결측값"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-03-17
---

이번 글에서는 polars DataFrame에서 결측값을 확인하는 방법을 살펴보겠습니다.

## 데이터 
코드에 사용된 예제 데이터는 아래와 같이 만들었습니다. 

```py
import polars as pl

# 예제 데이터
df = pl.DataFrame({
    "A": [1, 2, None, 4, 5],
    "B": [None, 2, 3, None, 5],
    "C": [1, None, 3, 4, None]
})
```

## 결측 수
컬럼 별 결측 비율은 null_count를 이용해 계산할 수 있습니다.

```py
df.null_count()
```

## 결측 비율
컬럼 별 결측 비율은 null_count와 len을 기반으로 계산할 수 있습니다.

```py
df.null_count() / len(df)
```
