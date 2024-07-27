---
title: "[Error] ImportError: cannot import name 'packaging' from 'pkg_resources' when starting"
excerpt: ""
categories: [DA]
tags: [da]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-07-27
---

# TL;DR
- `transformers` 라이브러리 버전 올리는 작업 후 패키지를 import하는 부분에서 아래와 같은 에러가 발생할 수 있습니다.
    - `ImportError: cannot import name 'packaging' from 'pkg_resources' when starting`

# 해결방법
저의 경우는 `setuptools` 버전으로 인한 문제였습니다. 디펜던시로 인해 `setuptools` 버전이 70번 대 이상이 설치되어 있었고, 이를 70 미만, 정확히는 기존 설치된 `setuptools==69.5.1` 버전으로 설치하니 정상 동작했습니다.

# 참고자료
- [easydiffusion/easydiffusion - issues](https://github.com/easydiffusion/easydiffusion/issues/1781)