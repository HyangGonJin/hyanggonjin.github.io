---
title: "[python] list 중복 제거"
categories: [DE]
tags: [de, python]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-11-24
---

파이썬에서 list의 중복 항목을 제거하는 방법에 대해서 알아보겠습니다.


## set
```py
my_list = [1, 2, 2, 3, 4, 4, 5]
unique_list = list(set(my_list))
print(unique_list)
# [1, 2, 3, 4, 5]
```

- `set`은 순서를 보장하지 않습니다.


## list comprehension
```py
my_list = [1, 2, 2, 3, 4, 4, 5]
unique_list = []
[unique_list.append(item) for item in my_list if item not in unique_list]
print(unique_list)
# [1, 2, 3, 4, 5]
```

- 리스트 컴프리헨션을 사용하는 방법은 중복을 제거하면서 순서를 유지할 수 있습니다.


## dict 사용 (Python 3.7 이상)
```py
my_list = [1, 2, 2, 3, 4, 4, 5]
unique_list = list(dict.fromkeys(my_list))
print(unique_list)
# [1, 2, 3, 4, 5]
```

- Python 3.7부터 dict는 insert 순서를 보장합니다. `dict.fromkeys()`를 사용한 방법을 통해 순서를 유지하면서 중복을 제거할 수 있습니다.


## pandas
```py
import pandas as pd

my_list = [1, 2, 2, 3, 4, 4, 5]
unique_list = pd.unique(my_list).tolist()
print(unique_list)
# [1, 2, 3, 4, 5]
```

- `pd.unique`를 사용한 방법을 통해 순서를 유지하면서 중복을 제거할 수 있습니다.
