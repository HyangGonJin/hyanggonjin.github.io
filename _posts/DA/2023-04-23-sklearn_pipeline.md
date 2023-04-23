---
title: "sklearn pipeline - Pipeline() & make_pipeline()"
categories: [DA, sklearn]
tags: [da, sklearn]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-04-23
---

`sklearn`에서 전처리 과정을 파이프라인으로 정의하는 방법인 `Pipeline`과 `make_pipeline` 함수에 대해 공통점과 차이점에 대해서 알아보겠습니다.


## TL;DR
* `Pipeline`과 `make_pipeline`을 이용해 transform의 파이프라인을 정의할 수 있음.
* `Pipeline`: 각 transform의 이름을 직접 정의해줘야 함.
* `make_pipeline`: 각 transform의 이름을 자동으로 정의함.


## 1. 데이터 전처리

먼저, 데이터를 불러와서 전처리 파이프라인까지 정의합니다. 

```py
from palmerpenguins import load_penguins

import numpy as np
import pandas as pd

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.compose import ColumnTransformer


penguins = load_penguins()
penguins = penguins.dropna(axis=0)
X_train = penguins[penguins.columns.difference(['species'])]
y_train = penguins['species']
X_train, X_test, y_train, y_test = train_test_split(X_train, y_train, random_state=42, test_size=0.4)

object_cols = X_train.select_dtypes('object').columns
num_cols = X_train.columns.difference(object_cols)

preprocessor = ColumnTransformer(
    [
        ('scaler', StandardScaler(), num_cols),
        ('encoder', OneHotEncoder(handle_unknown='infrequent_if_exist'), object_cols),
    ]
)
```

## 2. Pipeline & make_pipeline

### 2.1 Pipeline
`Pipeline` 함수를 이용해 파이프라인을 정의할 경우에는 각 transform 과정의 이름을 직접 정의해주어야 합니다. 
```py
pipe1 = Pipeline(
    [
        ('preprocessor', preprocessor),
        ('clf', LogisticRegression())
    ]
)
```

미리 만들어진 파이프라인에 대해 옵션이나 하이퍼파라미터를 지정할 경우에는 `이름__하이퍼파라미터명`(가운데는 '_' 2개)으로 정의할 수 있습니다.
```py
pipe1.set_params(clf__random_state=42)

pipe1['preprocessor'].set_params(encoder__handle_unknown='drop')
```

아래와 같이 새로운 transform 과정을 파이프라인에 포함할 수도 있습니다.
```py
from sklearn.impute import SimpleImputer
imputer = SimpleImputer()
pipe1.steps.insert(0, ('newTransformer', imputer))
```


### 2.2 make_pipeline
`make_pipeline` 함수는 `Pipeline`과는 달리 별도로 transform 이름을 지정해주지 않고, 자동으로 생성된 이름을 이용합니다. 이외 하이퍼파라미터 지정이나 transform 추가의 경우에는 위와 동일합니다.

```py
pipe2 = make_pipeline(preprocessor, LogisticRegression())

pipe2.set_params(logisticregression__random_state=42)
pipe2['columntransformer'].set_params(encoder__handle_unknown='infrequent_if_exist')

pipe2.steps.insert(0, ('newTransformer', imputer))
```



## 참고자료

- [sklearn 공식문서 - sklearn.pipeline.Pipeline](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.Pipeline.html)

- [sklearn 공식문서 - sklearn.pipeline.make_pipeline](https://scikit-learn.org/stable/modules/generated/sklearn.pipeline.make_pipeline.html#sklearn.pipeline.make_pipeline)

