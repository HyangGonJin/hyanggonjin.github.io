---
title: "[sklearn] OneHotEncoder - infrequent categories 옵션"
categories: [DA]
tags: [da, sklearn]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-02-28
---

`OneHotEncoder()`는 ML모델에서 범주형(Categorical) 변수를 다룰 때 기본적으로 다루는 함수입니다. 주로 통계학에서 dummy 변수를 만드는 경우와 nominal(;element 간의 순서가 없는 경우)한 범주형 변수의 인코딩에 사용됩니다. 

기본적인 함수인 만큼 이해하기 쉽고 단순하다는 장점이 있지만, Cardinality가 높은 경우 데이터의 차원이 커지고 sparse한 feature를 만든다는 단점도 있는 함수입니다. 

OneHotEncoder를 적용하는 방법과 Infrequent 카테고리를 처리하는 방법에 대해서 알아보겠습니다. 


## 1. 기본
`OneHotEncoder()`에서 중요한 옵션 2가지는 다음과 같습니다.   
- `drop` : (첫 번째) 카테고리 원소(element)를 drop할 것인지에 대한 옵션, {None, ‘first’, ‘if_binary’}. 통계학의 dummy 변수처럼 만들기 위해서는 'fisrt'로 지정하면 가능.
- `handle_unknown` : unknown 카테고리에 대한 옵션, {‘error’, ‘ignore’, ‘infrequent_if_exist’}. 카테고리에 새로운 값이 들어올 가능성이 있는 경우 사용하는 것이 좋음.


사용 방법은 encoder를 정의한 후, 'fit' 또는 'fit_transform' method를 이용해 데이터에 적용시킬 수 있습니다. 

```py
import numpy as np
import pandas as pd

from sklearn.preprocessing import OneHotEncoder

X = [['Male', 1], ['Female', 3], ['Female', 2]]

ohe = OneHotEncoder()

ohe.fit(X)
ohe.fit_transform(X)
```

## 2. Infrequent categories
Infrequent 카테고리는 빈도 수가 많지 않은 카테고리 원소를 의미하며 `min_frequency`나 `max_categories` 옵션을 이용할 경우 확인할 수 있습니다. 

* `min_frequency`: integer 또는 (0.0, 1.0) 사이의 float, 지정한 수(integer)보다 작은 경우나 전체 대비 지정한 비율(float)보다 작은 경우 infrequent 카테고리로 간주함.
* `max_categories`: None 또는 integer, output 피쳐 수의 상한값.

참고로 `min_frequency`와 `max_categories`의 값을 모두 지정할 경우, `min_frequency` 옵션의 값이 먼저 고려됩니다. 

```py
X = np.array([['dog'] * 5 + ['cat'] * 20 + ['rabbit'] * 10 +
              ['snake'] * 3], dtype=object).T

enc = OneHotEncoder(min_frequency=6, handle_unknown='infrequent_if_exist').fit(X)
enc.infrequent_categories_
# [array(['dog', 'snake'], dtype=object)]

enc.transform(np.array([['dog'], ['cat'], ['rabbit'], ['snake']])).toarray()
# array([[0., 0., 1.],
#        [1., 0., 0.],
#        [0., 1., 0.],
#        [0., 0., 1.]])
```



## 참고자료

- [sklearn 공식문서 - sklearn.preprocessing.OneHotEncoder](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OneHotEncoder.html)
- [sklearn 공식문서 - 6.3.4.1. Infrequent categories](https://scikit-learn.org/stable/modules/preprocessing.html#one-hot-encoder-infrequent-categories)




