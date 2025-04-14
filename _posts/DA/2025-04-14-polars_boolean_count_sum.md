---
title: "[polars] Boolean 컬럼에 대한 count와 sum"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-04-14
---

이번 글에서는 polars에서 Boolean 컬럼에 대한 count와 sum의 차이에 대해서 알아 보겠습니다.

## 기본 개념
polars에서 Boolean 컬럼을 대상으로 count()와 sum()을 수행했을 때의 기본 동작 원리는 다음과 같습니다.

1. `count()`
- count()는 해당 컬럼의 "전체 값 개수"(결측값 제외)를 반환합니다.
- 즉, True, False 값뿐만 아니라, None(결측값)이 없는 값들의 개수를 반환합니다.

2. `sum()`
- sum()은 Boolean 값에서 True를 1, False를 0으로 변환하여 합산합니다.
- 즉, 해당 컬럼에서 True 값의 개수를 반환하는 것과 같습니다.
- None 값은 합산에서 제외됩니다.


## 코드
예시 코드를 통해 확인한 결과는 아래와 같습니다.

count 연산의 결과가 의미하는 것은 None이 아닌 행이 5개 있다는 것이고, sum 연산의 결과는 True인 행이 3개 있다는 것을 의미합니다.

```py
import polars as pl

df = pl.DataFrame({
    "bool_col": [True, False, True, None, True, False, None]
})

count_result = df.select(pl.col("bool_col").count())
sum_result = df.select(pl.col("bool_col").sum())

print("count() 결과:", count_result)
# count() 결과:
# ┌──────────┐
# │ bool_col │
# │ ---      │
# │ u32      │
# ╞══════════╡
# │ 5        │
# └──────────┘

print("sum() 결과:", sum_result)
# sum() 결과:
# ┌──────────┐
# │ bool_col │
# │ ---      │
# │ u32      │
# ╞══════════╡
# │ 3        │
# └──────────┘
```
