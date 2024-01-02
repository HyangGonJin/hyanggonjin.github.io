---
title: "[프로그래머스, Oracle] 그룹별 조건에 맞는 식당 목록 출력하기"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-01-02
---

# 문제
- MEMBER_PROFILE와 REST_REVIEW 테이블에서 리뷰를 가장 많이 작성한 회원의 리뷰들을 조회하는 SQL문을 작성해주세요. 회원 이름, 리뷰 텍스트, 리뷰 작성일이 출력되도록 작성해주시고, 결과는 리뷰 작성일을 기준으로 오름차순, 리뷰 작성일이 같다면 리뷰 텍스트를 기준으로 오름차순 정렬해주세요.

- 예시

MEMBER_PROFILE 테이블이 다음과 같고

| MEMBER_ID               | MEMBER_NAME | TLNO         | GENDER | DATE_OF_BIRTH |
|-------------------------|-------------|--------------|--------|---------------|
| jiho92@naver.com        | 이지호        | 01076432111  | W      | 1992-02-12    |
| jiyoon22@hotmail.com    | 김지윤        | 01032324117  | W      | 1992-02-22    |
| jihoon93@hanmail.net    | 김지훈        | 01023258688  | M      | 1993-02-23    |
| seoyeons@naver.com      | 박서연        | 01076482209  | W      | 1993-03-16    |
| yelin1130@gmail.com     | 조예린        | 01017626711  | W      | 1990-11-30    |


REST_REVIEW 테이블이 다음과 같을 때

| REVIEW_ID    | REST_ID | MEMBER_ID            | REVIEW_SCORE | REVIEW_TEXT                  | REVIEW_DATE |
|--------------|---------|----------------------|--------------|------------------------------|-------------|
| R000000065   | 00028   | soobin97@naver.com   | 5            | 부찌 국물에서 샤브샤브 맛이나고 깔끔 | 2022-04-12  |
| R000000066   | 00039   | yelin1130@gmail.com  | 5            | 김치찌개 최곱니다.               | 2022-02-12  |
| R000000067   | 00028   | yelin1130@gmail.com  | 5            | 햄이 많아서 좋아요               | 2022-02-22  |
| R000000068   | 00035   | ksyi0316@gmail.com   | 5            | 숙성회가 끝내줍니다.              | 2022-02-15  |
| R000000069   | 00035   | yoonsy95@naver.com   | 4            | 비린내가 전혀없어요.              | 2022-04-16  |


SQL을 실행하면 다음과 같이 출력되어야 합니다.

| MEMBER_NAME | REVIEW_TEXT           | REVIEW_DATE |
|-------------|-----------------------|-------------|
| 조예린        | 김치찌개 최곱니다.    | 2022-02-12  |
| 조예린        | 햄이 많아서 좋아요    | 2022-02-22  |



# 코드
```sql
WITH TBL_A AS (
    SELECT MEMBER_ID, COUNT(REVIEW_ID) AS CNT
    FROM REST_REVIEW
    GROUP BY MEMBER_ID
),
TBL_B AS (
    SELECT *
    FROM TBL_A
    WHERE CNT = (SELECT MAX(CNT) FROM TBL_A) 
)
SELECT A.MEMBER_NAME, B.REVIEW_TEXT, TO_CHAR(B.REVIEW_DATE, 'YYYY-MM-DD') AS REVIEW_DATE
FROM MEMBER_PROFILE A, REST_REVIEW B
WHERE A.MEMBER_ID = B.MEMBER_ID AND A.MEMBER_ID IN (SELECT MEMBER_ID FROM TBL_B)
ORDER BY REVIEW_DATE, REVIEW_TEXT
;
```
