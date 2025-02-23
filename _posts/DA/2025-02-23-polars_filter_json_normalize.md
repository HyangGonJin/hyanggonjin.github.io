---
title: "[DA] polars - filtering & json_normalize"
excerpt: ""
categories: [DA]
tags: [da]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-02-23
---

polars는 고성능의 데이터 프레임 라이브러리로, 파이썬에서 사용할 수 있으며, 큰 데이터셋을 빠르고 효율적으로 처리할 수 있는 다양한 기능을 제공합니다. polars 라이브러리를 사용하여 특정 조건을 만족하는 데이터를 필터링하는 방법과 JSON 형태의 복잡한 데이터 구조를 정규화하는 방법을 소개합니다. 


## sample 데이터
사용될 샘플 데이터는 아래와 같이 string, boolean, float 등 다양한 타입을 갖고 있으며 특히 'details'는 json 형태의 string입니다.

```py
import polars as pl

_data = [
  {
    "id": 1,
    "name": "Alice",
    "details": "{\"age\": 25, \"city\": \"Seoul\"}",
    "hobbies": ["reading", "hiking"],
    "salary": 55000.75,
    "is_employed": True,
    "created_at": "2024-02-01T12:30:00"
  },
  {
    "id": 2,
    "name": "Bob",
    "details": "{\"age\": 30, \"city\": \"Busan\"}",
    "hobbies": ["gaming", "cycling"],
    "salary": 62000.50,
    "is_employed": False,
    "created_at": "2024-01-15T09:15:00"
  },
  {
    "id": 3,
    "name": "Charlie",
    "details": "{\"age\": 28, \"city\": \"Incheon\"}",
    "hobbies": ["swimming", "running"],
    "salary": 48000.00,
    "is_employed": True,
    "created_at": "2023-12-20T14:45:00"
  },
  {
    "id": 4,
    "name": "David",
    "details": "{\"age\": 35, \"city\": \"Daegu\"}",
    "hobbies": ["cooking", "traveling"],
    "salary": 70000.00,
    "is_employed": True,
    "created_at": "2023-11-10T18:00:00"
  },
  {
    "id": 5,
    "name": "Eve",
    "details": "{\"age\": 40, \"city\": \"Gwangju\"}",
    "hobbies": ["painting", "gardening"],
    "salary": 65000.25,
    "is_employed": False,
    "created_at": "2023-10-05T07:30:00"
  },
  {
    "id": 6,
    "name": "Frank",
    "details": "{\"age\": 22, \"city\": \"Daejeon\"}",
    "hobbies": ["gaming", "reading"],
    "salary": 47000.00,
    "is_employed": False,
    "created_at": "2023-09-25T21:45:00"
  },
  {
    "id": 7,
    "name": "Grace",
    "details": "{\"age\": 33, \"city\": \"Sejong\"}",
    "hobbies": ["yoga", "hiking"],
    "salary": 72000.50,
    "is_employed": True,
    "created_at": "2023-08-15T16:20:00"
  }
]

df = pl.DataFrame(_data)
df
# ┌─────┬─────────┬─────────────────────┬──────────────┬──────────┬─────────────┬────────────────────┐
# │ id  ┆ name    ┆ details             ┆ hobbies      ┆ salary   ┆ is_employed ┆ created_at         │
# │ --- ┆ ---     ┆ ---                 ┆ ---          ┆ ---      ┆ ---         ┆ ---                │
# │ i64 ┆ str     ┆ str                 ┆ list[str]    ┆ f64      ┆ bool        ┆ str                │
# ╞═════╪═════════╪═════════════════════╪══════════════╪══════════╪═════════════╪════════════════════╡
# │ 1   ┆ Alice   ┆ {"age": 25, "city": ┆ ["reading",  ┆ 55000.75 ┆ true        ┆ 2024-02-01T12:30:0 │
# │     ┆         ┆ "Seoul"}            ┆ "hiking"]    ┆          ┆             ┆ 0                  │
# │ 2   ┆ Bob     ┆ {"age": 30, "city": ┆ ["gaming",   ┆ 62000.5  ┆ false       ┆ 2024-01-15T09:15:0 │
# │     ┆         ┆ "Busan"}            ┆ "cycling"]   ┆          ┆             ┆ 0                  │
# │ 3   ┆ Charlie ┆ {"age": 28, "city": ┆ ["swimming", ┆ 48000.0  ┆ true        ┆ 2023-12-20T14:45:0 │
# │     ┆         ┆ "Incheon"}          ┆ "running"]   ┆          ┆             ┆ 0                  │
# │ 4   ┆ David   ┆ {"age": 35, "city": ┆ ["cooking",  ┆ 70000.0  ┆ true        ┆ 2023-11-10T18:00:0 │
# │     ┆         ┆ "Daegu"}            ┆ "traveling"] ┆          ┆             ┆ 0                  │
# │ 5   ┆ Eve     ┆ {"age": 40, "city": ┆ ["painting", ┆ 65000.25 ┆ false       ┆ 2023-10-05T07:30:0 │
# │     ┆         ┆ "Gwangju"}          ┆ "gardening"] ┆          ┆             ┆ 0                  │
# │ 6   ┆ Frank   ┆ {"age": 22, "city": ┆ ["gaming",   ┆ 47000.0  ┆ false       ┆ 2023-09-25T21:45:0 │
# │     ┆         ┆ "Daejeon"}          ┆ "reading"]   ┆          ┆             ┆ 0                  │
# │ 7   ┆ Grace   ┆ {"age": 33, "city": ┆ ["yoga",     ┆ 72000.5  ┆ true        ┆ 2023-08-15T16:20:0 │
# │     ┆         ┆ "Sejong"}           ┆ "hiking"]    ┆          ┆             ┆ 0                  │
# └─────┴─────────┴─────────────────────┴──────────────┴──────────┴─────────────┴────────────────────┘
```

## filtering
polars에서 filterting을 하는 방법은 간단합니다. polars dataframe의 filter method를 사용하며, 필터링 조건을 expression으로 작성하면 됩니다. 

```py
# 특정 값 일치 여부에 따른 필터링
df.filter(pl.col('is_employed') == True)

# 특정 값 포함 여부에 따른 필터링
df.filter(pl.col('hobbies').list.contains('hiking'))
```

## datetime 타입 변환
'created_at' 컬럼은 timestamp 형식이지만 string으로 되어 있습니다. datetime 타입으로 변환하는 방법은 아래와 같습니다.

```py
df = df.with_columns(pl.col('created_at').str.strptime(pl.Datetime, "%Y-%m-%dT%H:%M:%S"))
df
# ┌─────┬─────────┬─────────────────────┬──────────────┬──────────┬─────────────┬──────────────┐
# │ id  ┆ name    ┆ details             ┆ hobbies      ┆ salary   ┆ is_employed ┆ created_at   │
# │ --- ┆ ---     ┆ ---                 ┆ ---          ┆ ---      ┆ ---         ┆ ---          │
# │ i64 ┆ str     ┆ str                 ┆ list[str]    ┆ f64      ┆ bool        ┆ datetime[μs] │
# ╞═════╪═════════╪═════════════════════╪══════════════╪══════════╪═════════════╪══════════════╡
# │ 1   ┆ Alice   ┆ {"age": 25, "city": ┆ ["reading",  ┆ 55000.75 ┆ true        ┆ 2024-02-01   │
# │     ┆         ┆ "Seoul"}            ┆ "hiking"]    ┆          ┆             ┆ 12:30:00     │
# │ 2   ┆ Bob     ┆ {"age": 30, "city": ┆ ["gaming",   ┆ 62000.5  ┆ false       ┆ 2024-01-15   │
# │     ┆         ┆ "Busan"}            ┆ "cycling"]   ┆          ┆             ┆ 09:15:00     │
# │ 3   ┆ Charlie ┆ {"age": 28, "city": ┆ ["swimming", ┆ 48000.0  ┆ true        ┆ 2023-12-20   │
# │     ┆         ┆ "Incheon"}          ┆ "running"]   ┆          ┆             ┆ 14:45:00     │
# │ 4   ┆ David   ┆ {"age": 35, "city": ┆ ["cooking",  ┆ 70000.0  ┆ true        ┆ 2023-11-10   │
# │     ┆         ┆ "Daegu"}            ┆ "traveling"] ┆          ┆             ┆ 18:00:00     │
# │ 5   ┆ Eve     ┆ {"age": 40, "city": ┆ ["painting", ┆ 65000.25 ┆ false       ┆ 2023-10-05   │
# │     ┆         ┆ "Gwangju"}          ┆ "gardening"] ┆          ┆             ┆ 07:30:00     │
# │ 6   ┆ Frank   ┆ {"age": 22, "city": ┆ ["gaming",   ┆ 47000.0  ┆ false       ┆ 2023-09-25   │
# │     ┆         ┆ "Daejeon"}          ┆ "reading"]   ┆          ┆             ┆ 21:45:00     │
# │ 7   ┆ Grace   ┆ {"age": 33, "city": ┆ ["yoga",     ┆ 72000.5  ┆ true        ┆ 2023-08-15   │
# │     ┆         ┆ "Sejong"}           ┆ "hiking"]    ┆          ┆             ┆ 16:20:00     │
# └─────┴─────────┴─────────────────────┴──────────────┴──────────┴─────────────┴──────────────┘
```

## json normalize
json 형식으로 된 문자를 필드명에 따라 컬럼으로 분리하려고 합니다. pandas의 `pd.json_normalize()`와 유사한 방식의 작업입니다. 

먼저 아래와 같이 json string 형식인 'details'를 json_decode를 통해 'json_struct'라는 struct 타입의 컬럼으로 만들어줍니다.

```py
df_json_decoded = df.with_columns(pl.col('details').str.json_decode(infer_schema_length=None).alias("json_struct"))
df_json_decoded.schema
# Schema([('id', Int64),
#         ('name', String),
#         ('details', String),
#         ('hobbies', List(String)),
#         ('salary', Float64),
#         ('is_employed', Boolean),
#         ('created_at', Datetime(time_unit='us', time_zone=None)),
#         ('json_struct', Struct({'age': Int64, 'city': String}))])
```

 json_decode의 `infer_schema_length`를 통해, struct 타입의 필드 수나 타입 등의 schema를 추론하기 위해 사용할 샘플의 수를 지정할 수 있습니다. json 내 필드가 고정되어 있고, 결측이 적을 경우에는 해당 argument 값을 작게 잡아도 문제 없습니다. `infer_schema_length = None`은 schema를 추론하기 위해 모든 데이터를 확인한다는 것을 의미하며, json 내부 필드가 변경되거나 필드 값의 결측이 많을 경우에 사용할 수 있습니다.


 다음으로 json normalize를 통해 생성된 컬럼을 구분하기 위해 기존 필드명에 prefix를 붙인 새로운 필드명을 만들어 줍니다.

 ```py
json_prefix = 'details.'

fields = df_json_decoded.schema['json_struct'].fields
fields
# [Field('age', Int64), Field('city', String)]

new_field_names = [f"{json_prefix}{field.name}" for field in fields]
new_field_names
# ['details.age', 'details.city']
 ```

마지막으로 'json_struct'의 필드명을 변경하고 unnest를 적용하면 됩니다.
 ```py
 df_json_normalized = df_json_decoded.with_columns(
                    pl.col("json_struct").struct.rename_fields(new_field_names)
                ).unnest("json_struct")
df_json_normalized
# ┌─────┬─────────┬─────────────┬────────────┬───┬────────────┬────────────┬────────────┬────────────┐
# │ id  ┆ name    ┆ details     ┆ hobbies    ┆ … ┆ is_employe ┆ created_at ┆ details.ag ┆ details.ci │
# │ --- ┆ ---     ┆ ---         ┆ ---        ┆   ┆ d          ┆ ---        ┆ e          ┆ ty         │
# │ i64 ┆ str     ┆ str         ┆ list[str]  ┆   ┆ ---        ┆ datetime[μ ┆ ---        ┆ ---        │
# │     ┆         ┆             ┆            ┆   ┆ bool       ┆ s]         ┆ i64        ┆ str        │
# ╞═════╪═════════╪═════════════╪════════════╪═══╪════════════╪════════════╪════════════╪════════════╡
# │ 1   ┆ Alice   ┆ {"age": 25, ┆ ["reading" ┆ … ┆ true       ┆ 2024-02-01 ┆ 25         ┆ Seoul      │
# │     ┆         ┆ "city":     ┆ ,          ┆   ┆            ┆ 12:30:00   ┆            ┆            │
# │     ┆         ┆ "Seoul"}    ┆ "hiking"]  ┆   ┆            ┆            ┆            ┆            │
# │ 2   ┆ Bob     ┆ {"age": 30, ┆ ["gaming", ┆ … ┆ false      ┆ 2024-01-15 ┆ 30         ┆ Busan      │
# │     ┆         ┆ "city":     ┆ "cycling"] ┆   ┆            ┆ 09:15:00   ┆            ┆            │
# │     ┆         ┆ "Busan"}    ┆            ┆   ┆            ┆            ┆            ┆            │
# │ 3   ┆ Charlie ┆ {"age": 28, ┆ ["swimming ┆ … ┆ true       ┆ 2023-12-20 ┆ 28         ┆ Incheon    │
# │     ┆         ┆ "city":     ┆ ",         ┆   ┆            ┆ 14:45:00   ┆            ┆            │
# │     ┆         ┆ "Incheon"}  ┆ "running"] ┆   ┆            ┆            ┆            ┆            │
# │ 4   ┆ David   ┆ {"age": 35, ┆ ["cooking" ┆ … ┆ true       ┆ 2023-11-10 ┆ 35         ┆ Daegu      │
# │     ┆         ┆ "city":     ┆ , "traveli ┆   ┆            ┆ 18:00:00   ┆            ┆            │
# │     ┆         ┆ "Daegu"}    ┆ ng"]       ┆   ┆            ┆            ┆            ┆            │
# │ 5   ┆ Eve     ┆ {"age": 40, ┆ ["painting ┆ … ┆ false      ┆ 2023-10-05 ┆ 40         ┆ Gwangju    │
# │     ┆         ┆ "city":     ┆ ", "garden ┆   ┆            ┆ 07:30:00   ┆            ┆            │
# │     ┆         ┆ "Gwangju"}  ┆ ing"]      ┆   ┆            ┆            ┆            ┆            │
# │ 6   ┆ Frank   ┆ {"age": 22, ┆ ["gaming", ┆ … ┆ false      ┆ 2023-09-25 ┆ 22         ┆ Daejeon    │
# │     ┆         ┆ "city":     ┆ "reading"] ┆   ┆            ┆ 21:45:00   ┆            ┆            │
# │     ┆         ┆ "Daejeon"}  ┆            ┆   ┆            ┆            ┆            ┆            │
# │ 7   ┆ Grace   ┆ {"age": 33, ┆ ["yoga",   ┆ … ┆ true       ┆ 2023-08-15 ┆ 33         ┆ Sejong     │
# │     ┆         ┆ "city":     ┆ "hiking"]  ┆   ┆            ┆ 16:20:00   ┆            ┆            │
# │     ┆         ┆ "Sejong"}   ┆            ┆   ┆            ┆            ┆            ┆            │
# └─────┴─────────┴─────────────┴────────────┴───┴────────────┴────────────┴────────────┴────────────┘
 ```