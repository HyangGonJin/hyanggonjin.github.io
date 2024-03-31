---
title: "[Git] 원격 저장소(remote repo) URL을 변경"
categories: [DE, Git]
tags: [de, git]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-03-31
---

개발 프로젝트를 진행하다 보면 원격 Git 저장소의 URL을 변경해야 하는 경우가 있습니다. 예를 들어 프로젝트 저장소를 다른 호스팅 서비스로 이전하거나, 저장소 이름을 변경하는 등의 상황이 있을 수 있습니다.

URL이 변경되면 로컬 Git 설정에서도 이러한 변경을 반영해야 합니다. 커맨드라인 명령어로 URL을 변경하는 명령어를 알아보겠습니다.


# git remote
## 현재 원격 저장소 URL 확인
```shell
git remote -v
```

`git remote -v` 명령어를 통해 현재 원격저장소의 url 정보를 확인할 수 있습니다.

## 원격 저장소 URL 변경
```shell
git remote set-url <remote-name> <new-url>
```
`remote-name`은 변경하려는 원격 저장소의 이름(대부분의 경우 `origin`), `new-url`은 새로운 원격 저장소의 URL입니다.

# 참고자료
- [Git 공식문서 - git remote](https://git-scm.com/docs/git-remote)