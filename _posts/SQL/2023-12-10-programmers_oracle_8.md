---
title: "[프로그래머스, Oracle] 입양 시각 구하기(2)"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-07
---

# 문제
- ANIMAL_OUTS 테이블은 동물 보호소에서 입양 보낸 동물의 정보를 담은 테이블입니다. ANIMAL_OUTS 테이블 구조는 다음과 같으며, ANIMAL_ID, ANIMAL_TYPE, DATETIME, NAME, SEX_UPON_OUTCOME는 각각 동물의 아이디, 생물 종, 입양일, 이름, 성별 및 중성화 여부를 나타냅니다.

- 보호소에서는 몇 시에 입양이 가장 활발하게 일어나는지 알아보려 합니다. 0시부터 23시까지, 각 시간대별로 입양이 몇 건이나 발생했는지 조회하는 SQL문을 작성해주세요. 이때 결과는 시간대 순으로 정렬해야 합니다.


# 코드
```sql
WITH TBL_A AS (
    SELECT A.HOUR, B.ANIMAL_ID
    FROM (SELECT LEVEL - 1 AS HOUR FROM DUAL CONNECT BY LEVEL <= 24) A
    LEFT JOIN (SELECT TO_NUMBER(TO_CHAR(DATETIME, 'HH24')) AS HOUR, ANIMAL_ID FROM ANIMAL_OUTS) B 
        ON A.HOUR = B.HOUR
)
SELECT HOUR,
        COUNT(ANIMAL_ID) AS COUNT
FROM TBL_A
GROUP BY HOUR
ORDER BY HOUR
;
```

# 설명
- `SELECT LEVEL - 1 AS HOUR FROM DUAL CONNECT BY LEVEL <= 24` 부분은 시간대를 0부터 23까지 생성하기 위한 쿼리