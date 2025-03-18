---
title: "[polars] 컬럼 제외"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-03-18
---

이번 글에서는 polars DataFrame에서 특정 컬럼을 제외하는 방법을 살펴보겠습니다.

## 데이터 
코드에 사용된 예제 데이터는 아래와 같이 만들었습니다. 

```py
import polars as pl

# 예제 데이터
df = pl.DataFrame({
    "A": [1, 2, 3],
    "B": [4, 5, 6],
    "C": [7, 8, 9]
})
```

## drop

```py
df.drop("B")
# ┌─────┬─────┐
# │ A   ┆ C   │
# │ --- ┆ --- │
# │ i64 ┆ i64 │
# ╞═════╪═════╡
# │ 1   ┆ 7   │
# │ 2   ┆ 8   │
# │ 3   ┆ 9   │
# └─────┴─────┘
```

## pl.exclude

```py
df.select(pl.exclude(["A", "C"]))
# ┌─────┐
# │ B   │
# │ --- │
# │ i64 │
# ╞═════╡
# │ 4   │
# │ 5   │
# │ 6   │
# └─────┘
```