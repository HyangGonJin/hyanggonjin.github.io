---
title: "[Leetcode, PostgreSQL] 550. Game Play Analysis IV"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-17
---

# 문제 1
- Write a solution to report the fraction of players that logged in again on the day after the day they first logged in, rounded to 2 decimal places. 
- In other words, you need to count the number of players that logged in for at least two consecutive days starting from their first login date, then divide that number by the total number of players.

- Example:

        Input: 
        Activity table:
        +-----------+-----------+------------+--------------+
        | player_id | device_id | event_date | games_played |
        +-----------+-----------+------------+--------------+
        | 1         | 2         | 2016-03-01 | 5            |
        | 1         | 2         | 2016-03-02 | 6            |
        | 2         | 3         | 2017-06-25 | 1            |
        | 3         | 1         | 2016-03-02 | 0            |
        | 3         | 4         | 2018-07-03 | 5            |
        +-----------+-----------+------------+--------------+

        Output: 
        +-----------+
        | fraction  |
        +-----------+
        | 0.33      |
        +-----------+

- Explanation: 

  - Only the player with id 1 logged back in after the first day he had logged in so the answer is 1/3 = 0.33


# 코드
## My solution

```sql
SELECT ROUND(COUNT(DISTINCT PLAYER_ID)::DECIMAL / (SELECT COUNT(DISTINCT PLAYER_ID) FROM ACTIVITY), 2) AS FRACTION
FROM ACTIVITY
WHERE (PLAYER_ID, EVENT_DATE) IN (SELECT PLAYER_ID, MIN(EVENT_DATE) OVER (PARTITION BY PLAYER_ID) + 1 FROM ACTIVITY)
;
```

## Claude ai

```sql
WITH first_login AS (
    SELECT player_id, MIN(event_date) AS first_login_date
    FROM Activity
    GROUP BY player_id
),
second_login AS (
    SELECT a.player_id
    FROM Activity a 
    JOIN first_login f ON a.player_id = f.player_id
    WHERE a.event_date = f.first_login_date + 1
)
SELECT ROUND(COUNT(DISTINCT second_login.player_id) * 1.0 / COUNT(DISTINCT first_login.player_id), 2) AS fraction
FROM first_login
LEFT JOIN second_login
    ON first_login.player_id = second_login.player_id
;
```

# 설명
- `CAST(COLUMN_A AS DECIMAL)` = `COLUMN_A::DECIMAL`