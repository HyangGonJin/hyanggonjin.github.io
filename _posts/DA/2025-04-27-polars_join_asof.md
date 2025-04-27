---
title: "[polars] join_asof - 가장 가까운 값 join"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-04-27
---

이번 글에서는 polars의 `join_asof`에 대해서 알아 보겠습니다.

## 기본 개념
polars의 join_asof는 SQL의 LEFT JOIN과 비슷하지만, 정확한 일치가 아니라 가장 가까운 값을 기준으로 join하는 것이 특징입니다. 두 테이블에 대해, 비교 열을 기준으로 정렬된 상태에서 가장 가까운 값과 join하는 기능을 수행합니다. 

join_asof 관련해 기본적으로 알아야 하는 내용은 아래와 같습니다.
- join 기준이 되는 열(예: 시간, ID 등)은 반드시 정렬되어 있어야 합니다.
- 기본적으로 왼쪽 데이터프레임의 키 값보다 작거나 같은 값 중에서 가장 큰 값을 찾아 매칭합니다.
- `strategy="backward"(기본값)`: 가장 가까운 과거 값과 매칭
- `strategy="forward"`: 가장 가까운 미래 값과 매칭
- `by`: 보조 그룹핑 키 지정



## 코드
### strategy="backward"
기본값인 `strategy="backward"` 기준 예시는 아래와 같습니다. 

- time '2'는 데이터프레임 df_b에 없으므로, 2보다 작은 값 중 가장 가까운 '1'에 대한 값인 'B1'을 선택하게 됩니다. 
- time '5'는 데이터프레임 df_b에 없으므로, 5보다 작은 값 중 가장 가까운 '4'에 대한 값인 'B3'을 선택하게 됩니다.

```py
import polars as pl

df_a = pl.DataFrame({
    "time": [1, 2, 3, 5, 6],
    "value_a": ["A1", "A2", "A3", "A4", "A5"]
})

df_b = pl.DataFrame({
    "time": [1, 3, 4, 6],
    "value_b": ["B1", "B2", "B3", "B4"]
})

result = df_a.join_asof(df_b, on="time")
print(result)
# ┌───────┬────────┬────────┐
# │ time  │ value_a│ value_b│
# ├───────┼────────┼────────┤
# │ 1     │ "A1"   │ "B1"   │
# │ 2     │ "A2"   │ "B1"   │
# │ 3     │ "A3"   │ "B2"   │
# │ 5     │ "A4"   │ "B3"   │
# │ 6     │ "A5"   │ "B4"   │
# └───────┴────────┴────────┘
```

### strategy="forward"
`strategy="forward"` 기준 예시는 아래와 같습니다. 

- time '2'는 데이터프레임 df_b에 없으므로, 2보다 큰 값 중 가장 가까운 '3'에 대한 값인 'B2'을 선택하게 됩니다. 
- time '5'는 데이터프레임 df_b에 없으므로, 5보다 큰 값 중 가장 가까운 '6'에 대한 값인 'B4'을 선택하게 됩니다.

```py
result_forward = df_a.join_asof(df_b, on="time", strategy="forward")
print(result_forward)
# ┌───────┬────────┬────────┐
# │ time  │ value_a│ value_b│
# ├───────┼────────┼────────┤
# │ 1     │ "A1"   │ "B1"   │
# │ 2     │ "A2"   │ "B2"   │ 
# │ 3     │ "A3"   │ "B2"   │
# │ 5     │ "A4"   │ "B4"   │ 
# │ 6     │ "A5"   │ "B4"   │
# └───────┴────────┴────────┘
```

### by: 그룹별 조인
아래 예시와 같이 `by` 옵션은 여러 개의 그룹이 있을 때, 그룹 별 계산을 위해 사용합니다.

- stock 'A'의 time '2'는 df_b에서 '1'의 값인 'XA'를 가져옵니다.
- stock 'B'의 time '4'는 df_b에서 '4'보다 작은 값이 없어서 null로 처리됩니다.

```py
df_a = pl.DataFrame({
    "time": [1, 2, 3, 4, 5, 6],
    "stock": ["A", "A", "A", "B", "B", "B"],
    "value_a": ["A1", "A2", "A3", "B1", "B2", "B3"]
})

df_b = pl.DataFrame({
    "time": [1, 3, 5],
    "stock": ["A", "A", "B"],
    "value_b": ["XA", "YA", "XB"]
})

result = df_a.join_asof(df_b, on="time", by="stock")
print(result)
# ┌───────┬───────┬────────┬────────┐
# │ time  │ stock │ value_a│ value_b│
# ├───────┼───────┼────────┼────────┤
# │ 1     │ "A"   │ "A1"   │ "XA"   │
# │ 2     │ "A"   │ "A2"   │ "XA"   │
# │ 3     │ "A"   │ "A3"   │ "YA"   │
# │ 4     │ "B"   │ "B1"   │ null   │
# │ 5     │ "B"   │ "B2"   │ "XB"   │
# │ 6     │ "B"   │ "B3"   │ "XB"   │
# └───────┴───────┴────────┴────────┘
```