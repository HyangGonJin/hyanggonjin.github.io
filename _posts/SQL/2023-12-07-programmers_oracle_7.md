---
title: "[프로그래머스, Oracle] 자동차 대여 기록에서 대여중 / 대여 가능 여부 구분하기"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-07
---

# 문제
CAR_RENTAL_COMPANY_RENTAL_HISTORY 테이블에서 2022년 10월 16일에 대여 중인 자동차인 경우 '대여중' 이라고 표시하고, 대여 중이지 않은 자동차인 경우 '대여 가능'을 표시하는 컬럼(컬럼명: AVAILABILITY)을 추가하여 자동차 ID와 AVAILABILITY 리스트를 출력하는 SQL문을 작성해주세요. 이때 반납 날짜가 2022년 10월 16일인 경우에도 '대여중'으로 표시해주시고 결과는 자동차 ID를 기준으로 내림차순 정렬해주세요.


# 코드
```sql
WITH TBL_A AS (
    SELECT CAR_ID,
        SUM(CASE WHEN TO_CHAR(START_DATE, 'YYYY-MM-DD') <= '2022-10-16' AND TO_CHAR(END_DATE, 'YYYY-MM-DD') >= '2022-10-16' THEN 1
        ELSE 0
        END) AS TMP_AVAIL
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    GROUP BY CAR_ID
)
SELECT CAR_ID,
        CASE WHEN TMP_AVAIL = 1 THEN '대여중'
        ELSE '대여 가능'
        END AS AVAILABILITY
FROM TBL_A
ORDER BY CAR_ID DESC
;
```