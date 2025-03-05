---
title: "[Error] IntCastingNaNError - Int 타입에 결측이 있는 경우"
excerpt: ""
categories: [DA]
tags: [da, pandas]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-10-15
---

## TL;DR
- `pandas.DataFrame`에서 int 타입에 결측이 있는 경우 아래와 같은 에러가 발생할 수 있습니다. 
    - `IntCastingNaNError: Cannot convert non-finite values (NA or inf) to integer`

## 1. Intro
`pandas`의 기본 int 타입은 결측을 가질 수 없습니다. 그래서 결측이 있는 컬럼의 dtype을 'int' 타입으로 지정하려고 하면 `IntCastingNaNError`가 발생합니다.

```py
df = pd.DataFrame([[1,2,3], [4,None, 5]], columns=['A', 'B', 'C'])
df
#    A    B  C
# 0  1  2.0  3
# 1  4  NaN  5

df2 = pd.DataFrame([[1,2,3], [4,None, 5]], columns=['A', 'B', 'C']).astype({'A':'int', 'B':'int', 'C':'float'})  
# IntCastingNaNError: Cannot convert non-finite values (NA or inf) to integer
```

## 2. Sol 1
`astype(errors='ignore')` 옵션을 이용해 해결할 수 있습니다.

```py
df2 = pd.DataFrame([[1,2,3], [4,None, 5]], columns=['A', 'B', 'C']).astype({'A':'int', 'B':'int', 'C':'float'}, errors='ignore')
df2
#    A    B    C
# 0  1  2.0  3.0
# 1  4  NaN  5.0
```

## 3. Sol 2
`Int64`는 결측을 허용하는(nullable) 데이터 타입입니다.
```py
df3 = pd.DataFrame([[1,2,3], [4,None, 5]], columns=['A', 'B', 'C']).astype({'A':'int', 'B':'Int64', 'C':'float'})
df3
#    A     B    C
# 0  1     2  3.0
# 1  4  <NA>  5.0
```