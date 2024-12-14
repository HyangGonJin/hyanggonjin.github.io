---
title: "[Git] 특정 directory만 타겟 브랜치 commit"
categories: [DE]
tags: [de, git]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-12-14
---

Git에서 develop 브랜치의 특정 디렉토리의 변경 내용만 타겟 브랜치에 가져오는 방법에 대해서 알아 보겠습니다.


## 타겟 브랜치로 전환
`git checkout`을 이용해 특정 디렉토리의 변경 내용만 develop 브랜치에서 가져옵니다.

```git
# 타겟 브랜치로 전환
git checkout <your-branch>

# 특정 디렉토리의 변경 사항만 가져오기
git checkout develop -- <path/to/directory>
```


## 변경 사항 커밋
기존과 동일하게 `git add` ~ `git push`을 이용해 변경 사항을 commit, push 합니다.

```git
git add <path/to/directory>
git commit -m "Merged specific directory from develop"
git push
```