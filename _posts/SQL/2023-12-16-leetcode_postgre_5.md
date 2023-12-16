---
title: "[Leetcode, PostgreSQL] 176. Second Highest Salary & 178. Rank Scores"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-16
---

# 문제 1
- Write a solution to find the second highest salary from the Employee table. 
- If there is no second highest salary, return null (return None in Pandas).

- Example 1:

        Input: 
        Employee table:
        +----+--------+
        | id | salary |
        +----+--------+
        | 1  | 100    |
        | 2  | 200    |
        | 3  | 300    |
        +----+--------+

        Output: 
        +---------------------+
        | SecondHighestSalary |
        +---------------------+
        | 200                 |
        +---------------------+

- Example 2:

        Input: 
        Employee table:
        +----+--------+
        | id | salary |
        +----+--------+
        | 1  | 100    |
        +----+--------+

        Output: 
        +---------------------+
        | SecondHighestSalary |
        +---------------------+
        | null                |
        +---------------------+

# 코드

```sql
SELECT MAX(SALARY) AS SecondHighestSalary
FROM EMPLOYEE
WHERE SALARY < (SELECT MAX(SALARY) FROM EMPLOYEE)
;
```


# 문제 2
- Write a solution to find the rank of the scores. The ranking should be calculated according to the following rules:

    - The scores should be ranked from the highest to the lowest.
    - If there is a tie between two scores, both should have the same ranking.
    - After a tie, the next ranking number should be the next consecutive integer value. In other words, there should be no holes between ranks.
    Return the result table ordered by score in descending order.


- Example:

        Input: 
        Scores table:
        +----+-------+
        | id | score |
        +----+-------+
        | 1  | 3.50  |
        | 2  | 3.65  |
        | 3  | 4.00  |
        | 4  | 3.85  |
        | 5  | 4.00  |
        | 6  | 3.65  |
        +----+-------+

        Output: 
        +-------+------+
        | score | rank |
        +-------+------+
        | 4.00  | 1    |
        | 4.00  | 1    |
        | 3.85  | 2    |
        | 3.65  | 3    |
        | 3.65  | 3    |
        | 3.50  | 4    |
        +-------+------+

# 코드

```sql
SELECT SCORE,
        DENSE_RANK() OVER (ORDER BY SCORE DESC) AS RANK
FROM SCORES
;
```
