---
title: "[Leetcode, PostgreSQL] 183. Customers Who Never Order"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-20
---

# 문제
- Write a solution to find all customers who never order anything.

- Example:

        Input: 
        Customers table:
        +----+-------+
        | id | name  |
        +----+-------+
        | 1  | Joe   |
        | 2  | Henry |
        | 3  | Sam   |
        | 4  | Max   |
        +----+-------+

        Orders table:
        +----+------------+
        | id | customerId |
        +----+------------+
        | 1  | 3          |
        | 2  | 1          |
        +----+------------+

        Output: 
        +-----------+
        | Customers |
        +-----------+
        | Henry     |
        | Max       |
        +-----------+

# 코드
```sql
SELECT CUST.NAME as Customers
FROM CUSTOMERS CUST
WHERE NOT EXISTS (SELECT CUSTOMERID FROM ORDERS ORD WHERE CUST.ID = ORD.CUSTOMERID)
;
```
