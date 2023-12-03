---
title: "[프로그래머스, Oracle] 자동차 대여 기록 별 대여 금액 구하기"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-03
---

# 문제
CAR_RENTAL_COMPANY_CAR 테이블과 CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블과 CAR_RENTAL_COMPANY_DISCOUNT_PLAN 테이블에서 자동차 종류가 '트럭'인 자동차의 대여 기록에 대해서 대여 기록 별로 대여 금액(컬럼명: FEE)을 구하여 대여 기록 ID와 대여 금액 리스트를 출력하는 SQL문을 작성해주세요. 결과는 대여 금액을 기준으로 내림차순 정렬하고, 대여 금액이 같은 경우 대여 기록 ID를 기준으로 내림차순 정렬해주세요.


# 코드
```sql
WITH TBL_A AS (
    SELECT A.CAR_ID, 
            A.CAR_TYPE, 
            A.DAILY_FEE, 
            B.HISTORY_ID, 
            B.DURATION, 
            COALESCE(C.DISCOUNT_RATE, 0) AS DISCOUNT_RATE,
            A.DAILY_FEE * B.DURATION * (1 - COALESCE(C.DISCOUNT_RATE, 0) / 100) AS FEE
    FROM (
            SELECT *
            FROM CAR_RENTAL_COMPANY_CAR
            WHERE CAR_TYPE='트럭'
         ) A
         LEFT JOIN (
                    SELECT CAR_ID, 
                           HISTORY_ID,
                           (END_DATE - START_DATE + 1) AS DURATION,
                           CASE WHEN 7 <= (END_DATE - START_DATE + 1) AND (END_DATE - START_DATE + 1) < 30  THEN 7
                                WHEN 30 <= (END_DATE - START_DATE + 1) AND (END_DATE - START_DATE + 1) < 90 THEN 30
                                WHEN 90 <= (END_DATE - START_DATE + 1) THEN 90
                                ELSE 0
                                END 
                                AS D_TYPE
                    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
                   ) B
                ON A.CAR_ID = B.CAR_ID
         LEFT JOIN (
                    SELECT CAR_TYPE, TO_NUMBER(REGEXP_SUBSTR(DURATION_TYPE, '\d+')) AS D_TYPE, DISCOUNT_RATE
                    FROM CAR_RENTAL_COMPANY_DISCOUNT_PLAN
                    ) C 
                ON A.CAR_TYPE = C.CAR_TYPE AND B.D_TYPE = C.D_TYPE
)
SELECT HISTORY_ID,
        FEE
FROM TBL_A
ORDER BY FEE DESC, HISTORY_ID DESC
;
```