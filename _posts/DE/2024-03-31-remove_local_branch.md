---
title: "[Git] Local branch 삭제"
categories: [DE, Git]
tags: [de, git]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-03-31
---

Git을 사용해 코드작업을 하다보면, 불필요하거나 잘못 생성하는 브랜치가 생길 수 있습니다. 이런 경우 로컬 저장소에서 해당 브랜치를 삭제해야 합니다. Git에서 로컬 브랜치를 삭제하는 방법에 대해 알아보겠습니다.

# git branch
```shell
git branch -d <로컬 브랜치 이름> 
```

`git branch`는 브랜치 목록 확인, 제거 등 생성한 브랜치의 관리와 관련된 명령어입니다. `-d` 옵션을 이용하면 로컬 브랜치를 제거할 수 있습니다.

참고로 해당 브랜치에 병합되지 않은 수정 사항이 있거나 push되지 않은 커밋내용이 있다면 브랜치가 삭제되지 않을 수 있습니다. 그러한 경우에는 문제되는 상황을 해결하거나, `-d`가 아닌 `-D`(강제 삭제) 옵션을 이용할 수 있습니다.