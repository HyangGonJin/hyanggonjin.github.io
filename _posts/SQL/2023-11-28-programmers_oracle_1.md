---
title: "[프로그래머스, Oracle] 조건에 부합하는 중고거래 댓글 조회하기"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-11-28
---

# 문제
USED_GOODS_BOARD와 USED_GOODS_REPLY 테이블에서 2022년 10월에 작성된 게시글 제목, 게시글 ID, 댓글 ID, 댓글 작성자 ID, 댓글 내용, 댓글 작성일을 조회하는 SQL문을 작성해주세요. 결과는 댓글 작성일을 기준으로 오름차순 정렬해주시고, 댓글 작성일이 같다면 게시글 제목을 기준으로 오름차순 정렬해주세요. 

# 주의사항
CREATED_DATE의 포맷이 예시의 포맷과 일치해야 정답처리 됩니다.

# 코드
```sql
SELECT
    b.TITLE,
    b.BOARD_ID,
    r.REPLY_ID,
    r.WRITER_ID,
    r.CONTENTS,
    TO_CHAR(r.CREATED_DATE, 'YYYY-MM-DD') AS CREATED_DATE
FROM USED_GOODS_BOARD b
    JOIN USED_GOODS_REPLY r ON b.BOARD_ID = r.BOARD_ID
WHERE TO_CHAR(b.CREATED_DATE, 'YYYY-MM') = '2022-10'
ORDER BY CREATED_DATE, b.TITLE;
```

# 해설
- TO_CHAR은 Oracle SQL에서 날짜나 숫자 값을 문자열로 변환하는데 사용되는 함수. 
- 날짜나 숫자 데이터를 특정 형식으로 표시하고 싶을 때 사용.
```sql
TO_CHAR(값, 형식)
```
