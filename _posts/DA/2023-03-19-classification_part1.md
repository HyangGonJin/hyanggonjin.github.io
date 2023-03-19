---
title: "Classification 예제 - part 1. Scaler, Encoder, Pipeline"
categories: [DA, sklearn]
tags: [da, sklearn]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-03-19
---

palmerpenguins 데이터로 Classfication 예제 코드를 작성합니다. 이번 파트에서는  Scaler, Encoder를 설정하는 다양한 방법을 알아 보고, 파이프라인을 구성하는 부분까지 진행합니다.

## TL;DR
* Scaler와 Encoder 적용하는 방법   
    1. 직접 정의
    2. 클래스 정의 - `class` 
    3. 파이프라인 - `Pipeline()`   
        3.1 pipeline의 subset 컬럼 지정 - `ColumnTransformer()`



## 1. 전처리
먼저, `palmerpenguins` 패키지에 있는 데이터를 불러줍니다. 해당 데이터에는 결측치가 존재하는데 이번 예제에서는 결측치를 모두 삭제 후 진행했습니다. 이후 6:4 비율로 train과 test 데이터를 나누고, Scaler와 Encoder에 적용할 수치형 변수와 범주형 변수를 구분해줍니다.

```py
# !pip install palmerpenguins
import pandas as pd

from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer

from palmerpenguins import load_penguins

penguins = load_penguins()
penguins = penguins.dropna(axis=0)

X_train = penguins[penguins.columns.difference(['species'])]
y_train = penguins['species']
X_train, X_test, y_train, y_test = train_test_split(X_train, y_train, random_state=42, test_size=0.4)

object_cols = X_train.select_dtypes('object').columns
num_cols = X_train.columns.difference(object_cols)
```

## 2. Scaler & Encoder

### 2.1 기본
처음은 Scaler와 Encoder를 바로 정의하고 사용하는 방법입니다. 

```py
std = StandardScaler()
std.fit(X_train[num_cols])
std.transform(X_train[num_cols])

ohe = OneHotEncoder(handle_unknown='infrequent_if_exist')
ohe.fit(X_train[object_cols])
ohe.transform(X_train[object_cols]).toarray()
```

### 2.2 Class
두 번째 방법은 class로 정의한 후 사용하는 방법입니다. 

```py
from dataclasses import dataclass
@dataclass
class Stdscaler:
  df:pd.DataFrame
  subset:list

  def fit(self):
    std = StandardScaler()
    return std.fit(self.df[self.subset])

  def transform(self, X):
    std = self.fit()
    scale_df = pd.DataFrame(std.transform(X[self.subset]), columns=self.subset)
    return scale_df

@dataclass
class OHE:
  df:pd.DataFrame
  subset:list

  def fit(self):
    ohe = OneHotEncoder(handle_unknown='infrequent_if_exist')
    return ohe.fit(self.df[self.subset])

  def transform(self, X):
    ohe = self.fit()
    enc_df = pd.DataFrame(ohe.transform(X[self.subset]).toarray(), columns=ohe.get_feature_names_out(self.subset)).astype('int')
    return enc_df


std = Stdscaler(X_train, num_cols)
std.fit()
std.transform(X_train)

ohe = OHE(X_train, object_cols)
ohe.fit()
ohe.transform(X_train)
```

### 2.3 Pipeline
마지막은 sklearn의 `Pipeline`을 이용하는 방법입니다. Scaler와 Encoder를 하나의 pipeline에 정의할 수 있지만 subset 컬럼을 지정해주지 않는다면 error가 발생하게 됩니다. subset 컬럼 지정은 `sklearn.compose.ColumnTransformer`를 이용하면 됩니다. 

```py
preprocessor = ColumnTransformer(
    [
        ('scaler', StandardScaler(), num_cols),
        ('encoder', OneHotEncoder(handle_unknown='infrequent_if_exist'), object_cols),
    ]
)

pipe = Pipeline(
    [
        ('preprocessor', preprocessor),
        ('clf', LogisticRegression(random_state=42))
    ]
)


pipe.fit(X_train)
pd.DataFrame(pipe.transform(X_train), columns=pipe.get_feature_names_out())
```

## 3. 마무리
몇 가지 참고할 내용으로 이번 part를 마무리 하겠습니다. 

1. `OneHotEncoder`의 `get_feature_names_out()` method는 버전에 따라 `get_feature_names()`인 경우가 있음.

2. Scaler와 Encoder의 fit과 transform이 다른 코드 또는 다른 시점에 적용되는 경우, fit method 이후 해당 전처리 과정을 joblib 파일 등으로 저장해 이용. 


## 참고자료

- [sklearn 공식문서 - sklearn.compose.ColumnTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.compose.ColumnTransformer.html)

