---
title: "[Leetcode, PostgreSQL] 185. Department Top Three Salaries"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-14
---

# 문제
- A company's executives are interested in seeing who earns the most money in each of the company's departments. A high earner in a department is an employee who has a salary in the top three unique salaries for that department.

- Write a solution to find the employees who are high earners in each of the departments.
   

- Example 1:

        Input: 
        Employee table:
        +----+-------+--------+--------------+
        | id | name  | salary | departmentId |
        +----+-------+--------+--------------+
        | 1  | Joe   | 85000  | 1            |
        | 2  | Henry | 80000  | 2            |
        | 3  | Sam   | 60000  | 2            |
        | 4  | Max   | 90000  | 1            |
        | 5  | Janet | 69000  | 1            |
        | 6  | Randy | 85000  | 1            |
        | 7  | Will  | 70000  | 1            |
        +----+-------+--------+--------------+

        Department table:
        +----+-------+
        | id | name  |
        +----+-------+
        | 1  | IT    |
        | 2  | Sales |
        +----+-------+

        Output: 
        +------------+----------+--------+
        | Department | Employee | Salary |
        +------------+----------+--------+
        | IT         | Max      | 90000  |
        | IT         | Joe      | 85000  |
        | IT         | Randy    | 85000  |
        | IT         | Will     | 70000  |
        | Sales      | Henry    | 80000  |
        | Sales      | Sam      | 60000  |
        +------------+----------+--------+

- Explanation: 

        In the IT department:
        - Max earns the highest unique salary
        - Both Randy and Joe earn the second-highest unique salary
        - Will earns the third-highest unique salary

        In the Sales department:
        - Henry earns the highest salary
        - Sam earns the second-highest salary
        - There is no third-highest salary as there are only two employees

# 코드
## My solution

```sql
WITH TBL_A AS (
    SELECT B.NAME AS DEPARTMENT,
        A.NAME AS EMPLOYEE,
        A.SALARY
    FROM EMPLOYEE A,
            DEPARTMENT B
    WHERE A.DEPARTMENTID = B.ID 
),
TBL_B AS (
    SELECT DEPARTMENT, SALARY, 
            ROW_NUMBER() OVER (PARTITION BY DEPARTMENT ORDER BY SALARY DESC) AS ROW_NUM
    FROM (SELECT DISTINCT DEPARTMENT, SALARY FROM TBL_A)
)
SELECT DEPARTMENT, EMPLOYEE, SALARY
FROM TBL_A
WHERE (DEPARTMENT, SALARY) IN (SELECT DEPARTMENT, SALARY FROM TBL_B WHERE ROW_NUM <= 3)
;
```

## Claude ai

```sql
WITH CTE AS (
  SELECT D.NAME DEPARTMENT, E.NAME EMPLOYEE, E.SALARY, 
    DENSE_RANK() OVER (PARTITION BY E.DEPARTMENTID ORDER BY E.SALARY DESC) RNK
  FROM EMPLOYEE E
  JOIN DEPARTMENT D ON E.DEPARTMENTID = D.ID
)
SELECT DEPARTMENT, EMPLOYEE, SALARY
FROM CTE
WHERE RNK <= 3
;
```

## ChatGPT 3.5
```sql
WITH RANKEDSALARIES AS (
    SELECT
        E.ID AS EMPLOYEEID,
        E.NAME AS EMPLOYEE,
        E.SALARY,
        E.DEPARTMENTID,
        D.NAME AS DEPARTMENT,
        DENSE_RANK() OVER (PARTITION BY E.DEPARTMENTID ORDER BY E.SALARY DESC) AS SALARYRANK
    FROM
        EMPLOYEE E
        JOIN DEPARTMENT D ON E.DEPARTMENTID = D.ID
)
SELECT
    DEPARTMENT AS DEPARTMENT,
    EMPLOYEE AS EMPLOYEE,
    SALARY AS SALARY
FROM
    RANKEDSALARIES
WHERE
    SALARYRANK <= 3
;
```



# 설명

## DENSE_RANK()
- 윈도우 함수 중 하나로, 파티션 내의 행을 정렬한 후 순위를 매기는 기능.
- ORDER BY절을 사용하여 정렬 기준을 지정 가능.   
- 순위 중복을 허용. 즉, 동일한 값에 대해서는 동일한 순위를 부여함.   
- 순위 중복으로 인한 후속 순위의 건너뛰기가 발생하지 않음.   

## RANK()
- `DENSE_RANK()` 함수와 동일하게, 파티션 내의 행을 정렬하고 순위를 매기는 기능.
- 순위 중복 시 후속 순위를 건너뛰는 차이가 있음.
