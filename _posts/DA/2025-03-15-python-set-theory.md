---
title: "[python] list 타입 set theory - 합집합, 교집합 등"
excerpt: ""
categories: [DA]
tags: [da, python]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-03-15
---

이번 글에서는 python list에 대해 합집합, 교집합 등 집합 연산에 대한 방법을 살펴보겠습니다.

## 기본 
코드에 사용할 list는 아래와 같습니다.

```py
list1 = [1, 2, 3, 4, 5]
list2 = [3, 4, 5, 6, 7]
```

## 합집합 (A ∪ B)

```py
set(list1) | set(list2)
# {1, 2, 3, 4, 5, 6, 7}
```

## 교집합 (A ∩ B)

```py
set(list1) & set(list2)
# {3, 4, 5}
```

## 차집합 (A - B)

```py
set(list1) - set(list2)
# {1, 2}
```

## 대칭 차집합 (A ∪ B - A ∩ B)

```py
set(list1) ^ set(list2)
# {1, 2, 6, 7}
```