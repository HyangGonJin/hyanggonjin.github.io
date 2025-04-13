---
title: "[polars] anti_join - 한쪽 테이블에만 있는 행 반환"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-04-13
---

이번 글에서는 polars의 `anti_join`에 대해서 알아 보겠습니다.

## 기본 개념
Anti Join은 두 개의 테이블을 조인할 때, 한쪽 테이블에는 있지만 다른 테이블에는 존재하지 않는 행만 반환하는 join 방식입니다.

SQL 기준으로, LEFT JOIN 후 NULL 값이 있는 행만 필터링하는 방식과 동일합니다.



## 코드
polars에서 anti_join을 하는 방법은 `how='anti'`를 이용하시면 됩니다. 

결과를 보면, df_a에는 있지만 df_b에는 없는 행(id: 1, 2, 5)만 남게됩니다.

```py
import polars as pl

df_a = pl.DataFrame({
    "id": [1, 2, 3, 4, 5],
    "name": ["Alice", "Bob", "Charlie", "David", "Eve"]
})

df_b = pl.DataFrame({
    "id": [3, 4],
    "name": ["Charlie", "David"]
})

df_anti_join = df_a.join(df_b, on="id", how="anti")
print(df_anti_join)
# ┌─────┬───────┐
# │ id  │ name  │
# │ --- │ ---   │
# ├─────┼───────┤
# │ 1   │ Alice │
# │ 2   │ Bob   │
# │ 5   │ Eve   │
# └─────┴───────┘
```
