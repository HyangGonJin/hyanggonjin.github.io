---
title: "[Error] SchemaError: dtypes differ for column: Int64 != Float64"
excerpt: ""
categories: [DA]
tags: [da, polars]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-03-05
---

## 원인
해당 에러는 `polars.read_parquet()`로 데이터를 한번에 불러올 때, 특정 컬럼이 파일 별로 `int`와 `float`로 다르게 지정되어 타입이 맞지 않는다는 의미입니다.

저의 경우, 데이터를 split해 전처리를 한 뒤 저장한 parquet 파일들을 `polars.read_parquet()`로 한번에 불러올 때 발생했습니다. 전처리 단계에서 타입이 많다 보니 타입을 직접 지정해서 변환하지 않고, `try-except`로 타입 변경 시 에러가 나지 않는 경우에 해당 타입으로 변경을 진행했기 때문입니다. 

참고로 `pandas`에는 `convert_dtypes()`라는 메쏘드를 사용하면 (어느 정도) 자동으로 컬럼 타입을 지정하는 방법이 있지만, 사용하고 있는 polars 1.22.0 버전에는 그런 방법이 없어 보였습니다.

## 해결 방법
에러를 해결하기 위해 `use_pyarrow=True` 옵션을 지정해주면 됩니다.

```py
# 변경 전
df = pl.read_parquet(parquet_file_list, allow_missing_columns=True)

# 변경 후
df = pl.read_parquet(parquet_file_list, allow_missing_columns=True, use_pyarrow=True)
```