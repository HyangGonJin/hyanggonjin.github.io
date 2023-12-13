---
title: "[프로그래머스, Oracle] 오프라인/온라인 판매 데이터 통합하기"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-13
---

# 문제
- ONLINE_SALE 테이블과 OFFLINE_SALE 테이블에서 2022년 3월의 오프라인/온라인 상품 판매 데이터의 판매 날짜, 상품ID, 유저ID, 판매량을 출력하는 SQL문을 작성해주세요. OFFLINE_SALE 테이블의 판매 데이터의 USER_ID 값은 NULL 로 표시해주세요. 결과는 판매일을 기준으로 오름차순 정렬해주시고 판매일이 같다면 상품 ID를 기준으로 오름차순, 상품ID까지 같다면 유저 ID를 기준으로 오름차순 정렬해주세요.


# 코드
```sql
(
    SELECT TO_CHAR(SALES_DATE, 'YYYY-MM-DD') AS SALES_DATE, 
        PRODUCT_ID, 
        USER_ID, 
        SALES_AMOUNT 
    FROM ONLINE_SALE 
    WHERE TO_CHAR(SALES_DATE, 'YYYY-MM-DD') >= '2022-03-01' AND TO_CHAR(SALES_DATE, 'YYYY-MM-DD') < '2022-04-01'
)
UNION ALL
(
    SELECT TO_CHAR(SALES_DATE, 'YYYY-MM-DD') AS SALES_DATE, 
        PRODUCT_ID, 
        NULL AS USER_ID, 
        SALES_AMOUNT 
    FROM OFFLINE_SALE 
    WHERE TO_CHAR(SALES_DATE, 'YYYY-MM-DD') >= '2022-03-01' AND TO_CHAR(SALES_DATE, 'YYYY-MM-DD') < '2022-04-01'
) 
ORDER BY SALES_DATE, PRODUCT_ID, USER_ID
;
```

# 설명
- `UNION`: 쿼리의 결과를 합침. **중복 데이터를 제거함**.
- `UNION ALL`: 쿼리의 결과를 합침. **중복 데이터를 제거하지 않음**.