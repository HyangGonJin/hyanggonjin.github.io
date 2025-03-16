---
title: "[polars] datetime 기준 데이터 필터링"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-03-16
---

이번 글에서는 polars를 이용하여 특정 datetime 값을 기준으로 데이터를 필터링하는 다양한 방법을 살펴보겠습니다.

## 데이터 
코드에 사용된 예제 데이터는 아래와 같이 만들었습니다. 

`df`는 id 컬럼에 대해 datetime 별 value 값이 있는 구조이며, `reference_df`는 각 id 별 reference_datetime이 기록되어 있습니다.
`df`를 `reference_df`의 reference_datetime을 기준으로 해 이전/이후를 필터링하려고 합니다.

```py
import polars as pl

# 기본 데이터
df = pl.DataFrame({
    "id": ["A", "A", "A", "B", "B", "B", "C", "C"],
    "datetime": [
        "2024-03-01 10:00:00", "2024-03-01 11:00:00", "2024-03-01 12:00:00",
        "2024-03-02 09:00:00", "2024-03-02 10:00:00", "2024-03-02 11:00:00",
        "2024-03-03 08:00:00", "2024-03-03 09:00:00"
    ],
    "value": [10, 15, 20, 25, 30, 35, 40, 45]
}).with_columns(pl.col("datetime").str.strptime(pl.Datetime, "%Y-%m-%d %H:%M:%S"))

# 매칭 테이블
reference_df = pl.DataFrame({
    "id": ["A", "B", "C"],
    "reference_datetime": ["2024-03-01 11:00:00", "2024-03-02 10:00:00", "2024-03-03 08:30:00"]
}).with_columns(pl.col("reference_datetime").str.strptime(pl.Datetime, "%Y-%m-%d %H:%M:%S"))
```

## 기본

### pl.lit()
우선 id에 대한 구분없이 특정한 시점 기준으로 데이터를 나누는 방법에 대해서 알아 보겠습니다. datetime 컬럼을 문자로 변환해서 비교해도 되지만, `pl.lit()`를 이용해 datetime 타입으로 변환 후 filter를 이용할 수 있습니다.

```py
(
    df
    .filter(
        pl.col('datetime') >= pl.lit('2024-03-02 10:00:00').str.strptime(pl.Datetime, '%Y-%m-%d %H:%M:%S')
    )
)
```

다음으로 매칭 테이블에서 정의한 id 별 reference_datetime을 기준으로 데이터를 나누는 방법에 대해서 알아 보겠습니다. 두 데이터를 join 후 filter를 이용하면 됩니다.

```py
df_with_ref = df.join(reference_df, on="id")

# 기준 datetime 이전 데이터
df_before = df_with_ref.filter(pl.col("datetime") < pl.col("reference_datetime"))

# 기준 datetime 이후 데이터
df_after = df_with_ref.filter(pl.col("datetime") >= pl.col("reference_datetime"))
```

### pl.duration()
만약 reference_datetime 기준으로 해당 시점부터 1일 후 데이터까지를 필터링하려면, `pl.duration()`을 이용할 수 있습니다.

```py
df_filtered1 = (
                df_with_ref
                .filter(
                      (pl.col("datetime") >= pl.col("reference_datetime")) &
                      (pl.col("datetime") < (pl.col("reference_datetime") + pl.duration(days=1)))
                )
)
```

`pl.duration()`을 통해 최소 '나노 초'(; nanoseconds)부터 최대 '주'(; weeks) 단위 시간 차이까지 다룰 수 있습니다. 

### pl.DataFrame.dt.offset_by()
만약, '주' 단위보다 더 긴 스케일의 시간을 다루고 싶다면, `dt.offset_by()`를 이용할 수 있습니다. 최소 '나노 초'(; nanoseconds)부터 최대 '년'(; years) 단위 시간 차이까지 다룰 수 있습니다. 

```py
df_with_ref = df.join(reference_df, on="id").with_columns(
    (pl.col("reference_datetime").dt.offset_by("1y")).alias("one_year_later")
)

df_filtered2 = (
                df_with_ref
                .filter(
                      (pl.col("datetime") >= pl.col("reference_datetime")) &
                      (pl.col("datetime") < pl.col("one_year_later"))
                )
)
df_filtered2
```