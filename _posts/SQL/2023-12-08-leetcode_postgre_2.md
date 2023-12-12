---
title: "[Leetcode, PostgreSQL] 184. Department Highest Salary"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-08
---

# 문제
- Write a solution to find employees who have the highest salary in each of the departments.

# 코드
```sql
SELECT B.NAME AS DEPARTMENT, 
        A.NAME AS EMPLOYEE,
        A.SALARY AS SALARY
FROM EMPLOYEE A, 
    DEPARTMENT B
WHERE A.DEPARTMENTID = B.ID AND 
        (A.DEPARTMENTID, A.SALARY) IN (
                                        SELECT DEPARTMENTID, MAX(SALARY) AS MAX_SALARY 
                                        FROM EMPLOYEE 
                                        GROUP BY DEPARTMENTID
                                      ) 
;
```