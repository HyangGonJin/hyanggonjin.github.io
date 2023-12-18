---
title: "[Leetcode, PostgreSQL] 570. Managers with at Least 5 Direct Reports"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-18
---

# 문제
- Write a solution to find managers with at least five direct reports.

- Example:

        Input: 
        Employee table:
        +-----+-------+------------+-----------+
        | id  | name  | department | managerId |
        +-----+-------+------------+-----------+
        | 101 | John  | A          | null      |
        | 102 | Dan   | A          | 101       |
        | 103 | James | A          | 101       |
        | 104 | Amy   | A          | 101       |
        | 105 | Anne  | A          | 101       |
        | 106 | Ron   | B          | 101       |
        +-----+-------+------------+-----------+
        
        Output: 
        +------+
        | name |
        +------+
        | John |
        +------+


# 코드
## My solution

```sql
WITH TBL_A AS (
    SELECT A.MANAGERID, COUNT(A.MANAGERID) AS CNT
    FROM EMPLOYEE A
        LEFT JOIN EMPLOYEE B ON A.MANAGERID = B.ID
    WHERE A.MANAGERID IS NOT NULL
    GROUP BY A.MANAGERID
)
SELECT NAME
FROM EMPLOYEE
WHERE ID IN (SELECT MANAGERID FROM TBL_A WHERE CNT >= 5)
;
```

## ChatGPT 3.5

```sql
SELECT name
FROM Employee
WHERE id IN (
    SELECT managerId
    FROM Employee
    GROUP BY managerId
    HAVING COUNT(id) >= 5
)
;
```

## Bard

```sql
WITH mgrs AS (
  SELECT d.managerId
  FROM Employee d
  GROUP BY d.managerId
  HAVING COUNT(*) >= 5
)
SELECT e.name
FROM Employee e
WHERE e.id IN (SELECT managerId FROM mgrs)
;
```
