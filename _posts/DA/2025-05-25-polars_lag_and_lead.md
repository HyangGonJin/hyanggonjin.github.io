---
title: "[polars] Lag & Lead"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-05-25
---

이번 글에서는 polars에서 SQL의 `LAG`와 `LEAD` 방식의 처리를 하는 방법에 대해서 알아 보겠습니다.

## 기본
polars에서 `LAG`와 `LEAD`는 `shift`를 이용하면 됩니다. 

`pl.col("value").shift(n)`은 `LAG`, 즉 해당 컬럼의 n개 이전 값을 그리고 `pl.col("value").shift(-n)`은 `LEAD`, n개 이후 값을 나타냅니다.

추가적으로, 그룹 별로 처리를 하고 싶은 경우 `.over("group_value")`을 사용하면 됩니다.

## 코드
```py
import polars as pl

df = pl.DataFrame({
    "id": ["A", "A", "A", "B", "B", "B"],
    "date": [1, 2, 3, 1, 2, 3],
    "value": [10, 20, 15, 5, 7, 9]
})

df.with_columns([
    pl.col("value").shift(1).over("id").alias("prev_value"),  # LAG
    pl.col("value").shift(-1).over("id").alias("next_value")  # LEAD
])
# id	date	value	prev_value	next_value
# str	i64	i64	i64	i64
# "A"	1	10	null	20
# "A"	2	20	10	15
# "A"	3	15	20	null
# "B"	1	5	null	7
# "B"	2	7	5	9
# "B"	3	9	7	null
```
