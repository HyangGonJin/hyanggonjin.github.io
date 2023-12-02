---
title: "[프로그래머스, Oracle] 특정 기간동안 대여 가능한 자동차들의 대여비용 구하기"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-02
---

# 문제
CAR_RENTAL_COMPANY_CAR 테이블과 CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블과 CAR_RENTAL_COMPANY_DISCOUNT_PLAN 테이블에서 자동차 종류가 '세단' 또는 'SUV' 인 자동차 중 2022년 11월 1일부터 2022년 11월 30일까지 대여 가능하고 30일간의 대여 금액이 50만원 이상 200만원 미만인 자동차에 대해서 자동차 ID, 자동차 종류, 대여 금액(컬럼명: FEE) 리스트를 출력하는 SQL문을 작성해주세요. 결과는 대여 금액을 기준으로 내림차순 정렬하고, 대여 금액이 같은 경우 자동차 종류를 기준으로 오름차순 정렬, 자동차 종류까지 같은 경우 자동차 ID를 기준으로 내림차순 정렬해주세요..

# 코드
```sql
WITH TBL_A AS (
                SELECT A.CAR_ID, A.CAR_TYPE, (A.DAILY_FEE * 30 * (100 - C.DISCOUNT_RATE) / 100) AS FEE
                FROM (
                        SELECT * 
                        FROM CAR_RENTAL_COMPANY_CAR 
                        WHERE CAR_TYPE in ('세단', 'SUV')
                     ) A
                    LEFT JOIN (
                                SELECT CAR_TYPE, DISCOUNT_RATE 
                                FROM CAR_RENTAL_COMPANY_DISCOUNT_PLAN 
                                WHERE CAR_TYPE in ('세단', 'SUV') AND DURATION_TYPE = '30일 이상'
                              ) C
                        ON A.CAR_TYPE = C.CAR_TYPE
                WHERE NOT EXISTS (
                                    SELECT 1
                                    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY B
                                    WHERE A.CAR_ID = B.CAR_ID
                                        AND TO_CHAR(START_DATE, 'YYYY-MM-DD') <= '2022-11-30' 
                                        AND TO_CHAR(END_DATE, 'YYYY-MM-DD') >= '2022-11-01'
                                 )
                    
                )
SELECT CAR_ID, CAR_TYPE, FEE
FROM TBL_A
WHERE 500000 <= FEE AND FEE < 2000000
ORDER BY FEE DESC, CAR_TYPE ASC, CAR_ID DESC
;
```

# 해설
- NOT EXISTS 연산자는 종종 특정 조건을 만족하는 행이 없음을 확인하기 위해 서브 쿼리와 함께 사용. 
```sql
SELECT column1, column2, ...
FROM table1
WHERE NOT EXISTS (subquery);
```