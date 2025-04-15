---
title: "[polars] group_by_dynamic"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-04-15
---

이번 글에서는 polars에서 시간 window에 기반한 연산 방법인 group_by_dynamic에 대해서 알아 보겠습니다.

## 기본 개념
polars에서 group_by_dynamic 연산은 지정된 시간 단위로 데이터를 나누고, 각 시간 window 안에서 해당 컬럼의 group_by를 계산합니다. 

group_by_dynamic의 디폴트 옵션으로 시간 window의 왼쪽 boundary만 닫혀있고, 오른쪽 boundary는 열린 상태입니다 (`closed='left'`). 

주요 파라미터는 다음과 같습니다.

- index_column: 시간 window로 그룹을 설정할 컬럼. 오름차순으로 정렬되어 있어야 함.
- every: 시간 window의 interval.
- period: 시간 window의 길이. 지정하지 않으면 every와 같은 값.
- offset: 시간 window의 offset.


## 코드
예시 코드를 통해 확인한 결과는 아래와 같습니다.

```py
import polars as pl

df = pl.DataFrame({
    "timestamp": [
        "2024-01-01 00:00:00",
        "2024-01-01 00:01:00",
        "2024-01-01 00:02:00",
        "2024-01-01 00:06:00"
    ],
    "value": [10, 12, 14, 20]
}).with_columns(
    pl.col("timestamp").str.strptime(pl.Datetime, "%Y-%m-%d %H:%M:%S")
)
# timestamp	        value
# 2024-01-01 00:00:00	10
# 2024-01-01 00:01:00	12
# 2024-01-01 00:02:00	14
# 2024-01-01 00:06:00	20


df.group_by_dynamic(index_column="timestamp", every="1m", period="2m").agg(
    pl.col("value").mean().alias("mean_value")
)
# timestamp	        mean_value
# 2024-01-01 00:00:00	11.0
# 2024-01-01 00:01:00	13.0
# 2024-01-01 00:02:00	14.0
# 2024-01-01 00:05:00	20.0
# 2024-01-01 00:06:00	20.0
```

위 코드의 결과를 보면 1분 단위의 시간 window 마다, 2분 간 window의 평균값이 계산되는 것을 확인할 수 있습니다. '0시 0분 ~ 0시 2분 미만' window(=`timestamp=2024-01-01 00:00:00`)에 대응되는 값으로 10과 12의 평균인 11이 계산됩니다.


```py
df.group_by_dynamic("timestamp", every="1m", period='2m', offset="-2m", closed='right').agg(
    pl.col("value").mean()#.alias("std_value")
)
# timestamp	        mean_value
# 2023-12-31 23:58:00	10.0
# 2023-12-31 23:59:00	11.0
# 2024-01-01 00:00:00	13.0
# 2024-01-01 00:01:00	14.0
# 2024-01-01 00:04:00	20.0
# 2024-01-01 00:05:00	20.0
```

위 코드의 결과를 보면 1분 단위의 시간 window 마다, 2분 간 window의 평균값을 동일하게 계산하지만, 2분의 시간 offset과 window의 오른쪽 boundary가 closed로 바뀌어 계산되는 것을 확인할 수 있습니다. '23시 59분을 초과 ~ 0시 1분'을 포함한 window(=`timestamp=2023-12-31 23:59:00`) 에 대응되는 값으로 10과 12의 평균인 11이 계산됩니다.