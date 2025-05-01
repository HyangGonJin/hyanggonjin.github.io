---
title: "[Docker] Dangling image 제거"
categories: [DE]
tags: [de, docker]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-05-01
---

Docker에서 어떠한 태그도 연결되지 않은 이미지를 dangling 이미지라고 합니다. repository나 tag 이름이 \<none> 으로 표시되는 이미지입니다. dangling 이미지는 보통 이미지 빌드 중 중간에 실패했거나, 태그가 변경된 후 남겨진 불필요한 이미지로, 주기적으로 정리해주는 것이 디스크 공간 확보에 도움이 됩니다.


## 단일 명령어

```docker
docker image prune [-f]
```

- -f 또는 --force: 확인 없이 바로 삭제합니다.
- dangling 이미지만 삭제하며, <none>:<none>으로 표시되는 이미지가 포함됩니다.


## 이미지 확인 후 삭제

```py
# dangling 이미지 확인
docker images -f "dangling=true"

# dangling 이미지 제거
docker rmi $(docker images -f "dangling=true" -q)
```
- -q는 이미지 ID만 출력합니다.