---
title: "[python] collections.defaultdict"
excerpt: ""
categories: [DA]
tags: [da, python]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-05-26
---

defaultdict는 일반적인 딕셔너리(dict)와 유사하지만, 기본값을 자동으로 설정할 수 있는 기능이 추가된 자료형입니다.

## 기본
일반 dict에서는 존재하지 않는 키에 접근하려 하면 KeyError가 발생합니다. 하지만 defaultdict는 키가 없을 경우 자동으로 설정한 기본값으로 생성해줍니다.

설정할 수 있는 기본값(arg: `default_factory`)은 아래와 같습니다.
- list: 빈 리스트
- int: 0
- float: 0.0
- set: 빈 집합 set()
- 사용자 정의 함수

## 예제
```py
from collections import defaultdict

# 리스트를 기본값으로 지정
d = defaultdict(list)

d['a'].append(1)
d['a'].append(2)
d['b'].append(3)

print(d)  
# defaultdict(<class 'list'>, {'a': [1, 2], 'b': [3]})
```

