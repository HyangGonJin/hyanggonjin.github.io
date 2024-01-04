---
title: "[Leetcode, PostgreSQL] 511. Game Play Analysis I"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-01-04
---

# 문제
- Write a solution to find the first login date for each player.

- Example:

        Input: 
        Activity table:
        +-----------+-----------+------------+--------------+
        | player_id | device_id | event_date | games_played |
        +-----------+-----------+------------+--------------+
        | 1         | 2         | 2016-03-01 | 5            |
        | 1         | 2         | 2016-05-02 | 6            |
        | 2         | 3         | 2017-06-25 | 1            |
        | 3         | 1         | 2016-03-02 | 0            |
        | 3         | 4         | 2018-07-03 | 5            |
        +-----------+-----------+------------+--------------+

        Output: 
        +-----------+-------------+
        | player_id | first_login |
        +-----------+-------------+
        | 1         | 2016-03-01  |
        | 2         | 2017-06-25  |
        | 3         | 2016-03-02  |
        +-----------+-------------+


# 코드
## My solution

```sql
WITH TBL_A AS (
SELECT *, 
    RANK() OVER (PARTITION BY PLAYER_ID ORDER BY EVENT_DATE) AS RANK
FROM ACTIVITY
)
SELECT PLAYER_ID, EVENT_DATE AS FIRST_LOGIN
FROM TBL_A
WHERE RANK = 1
;
```

## ChatGPT 3.5

```sql
SELECT player_id, MIN(event_date) AS first_login
FROM Activity
GROUP BY player_id;
```