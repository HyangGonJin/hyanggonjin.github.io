---
title: "[python] contextlib - contextmanager"
categories: [DE]
tags: [de, python]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-03-08
---

`contextmanager`는 Python의 contextlib 모듈에서 제공하는 데코레이터(`@contextmanager`)로, 컨텍스트 매니저(Context Manager)를 쉽게 구현할 수 있도록 도와주며, with 문을 사용할 수 있도록 만들어 주는 기능입니다. 


`contextmanager` 없이 컨텍스트 매니저를 직접 만들려면 `__enter__`와 `__exit__` 메서드를 구현해야 합니다. 하지만 번거롭고 코드도 길어질 수 있습니다.

`@contextmanager` 데코레이터를 사용하면 훨씬 간단하게 `with` 문을 지원하는 함수를 만들 수 있습니다.

## @contextmanager 데코레이터
```py
from contextlib import contextmanager

@contextmanager
def my_context():
    print("리소스 할당") # __enter__
    yield "Hello"
    print("리소스 해제") # __exit__

# 사용 예시
with my_context() as value:
    print("실행 중:", value)
```
