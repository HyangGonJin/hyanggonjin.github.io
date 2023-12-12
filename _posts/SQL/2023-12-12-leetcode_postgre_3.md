---
title: "[Leetcode, PostgreSQL] 180. Consecutive Numbers"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-12
---

# 문제
- Find all numbers that appear at least three times consecutively.
- Example 1:

        Input: 
        Logs table:
        +----+-----+
        | id | num |
        +----+-----+
        | 1  | 1   |
        | 2  | 1   |
        | 3  | 1   |
        | 4  | 2   |
        | 5  | 1   |
        | 6  | 2   |
        | 7  | 2   |
        +----+-----+

        Output: 
        +-----------------+
        | ConsecutiveNums |
        +-----------------+
        | 1               |
        +-----------------+
- Explanation: 1 is the only number that appears consecutively for at least three times.


# 코드
```sql
WITH TBL_A AS (
        SELECT ID, NUM,
                LEAD(NUM, 1) OVER (ORDER BY ID) AS NEXT_NUM,
                LEAD(NUM, 2) OVER (ORDER BY ID) AS NEXT_NUM2
        FROM LOGS
)
SELECT DISTINCT NUM AS "ConsecutiveNums"
FROM TBL_A
WHERE NUM = NEXT_NUM AND NEXT_NUM = NEXT_NUM2
;
```

# 설명

- LEAD 함수는 다음 행의 데이터를 확인하는데 이용 (출처: [PostgreSQL LEAD Function](https://www.postgresqltutorial.com/postgresql-window-function/postgresql-lead-function/)).
```sql
LEAD(expression [,offset [,default_value]]) 
OVER (
    [PARTITION BY partition_expression, ... ]
    ORDER BY sort_expression [ASC | DESC], ...
)
```

