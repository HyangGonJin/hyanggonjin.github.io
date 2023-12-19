---
title: "[Leetcode, PostgreSQL] 577. Employee Bonus"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-19
---

# 문제
- Write a solution to report the name and bonus amount of each employee with a bonus less than 1000.

- Example:

        Input: 
        Employee table:
        +-------+--------+------------+--------+
        | empId | name   | supervisor | salary |
        +-------+--------+------------+--------+
        | 3     | Brad   | null       | 4000   |
        | 1     | John   | 3          | 1000   |
        | 2     | Dan    | 3          | 2000   |
        | 4     | Thomas | 3          | 4000   |
        +-------+--------+------------+--------+

        Bonus table:
        +-------+-------+
        | empId | bonus |
        +-------+-------+
        | 2     | 500   |
        | 4     | 2000  |
        +-------+-------+

        Output: 
        +------+-------+
        | name | bonus |
        +------+-------+
        | Brad | null  |
        | John | null  |
        | Dan  | 500   |
        +------+-------+

# 코드
## My solution

```sql
WITH TBL_A AS (
    SELECT EMP.EMPID, EMP.NAME, BNS.BONUS
    FROM EMPLOYEE EMP
        LEFT JOIN BONUS BNS ON EMP.EMPID = BNS.EMPID
)
SELECT NAME, BONUS
FROM TBL_A A
WHERE NOT EXISTS (SELECT EMPID FROM TBL_A WHERE EMPID = A.EMPID AND BONUS >= 1000)
;
```

## ChatGPT 3.5

```sql
SELECT e.name, b.bonus
FROM Employee e
LEFT JOIN Bonus b ON e.empId = b.empId
WHERE COALESCE(b.bonus, 0) < 1000;
```

## Claude ai

```sql
SELECT e.name, b.bonus 
FROM Employee e 
LEFT JOIN Bonus b 
ON e.empId = b.empId
WHERE b.bonus IS NULL OR b.bonus < 1000;
```

# 설명
- 값이 `NULL`인 경우 어떤 조건에도 False 출력.
- `COALESCE()`를 이용해 NULL 값 지정 가능.