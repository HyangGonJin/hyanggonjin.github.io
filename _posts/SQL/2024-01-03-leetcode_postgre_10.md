---
title: "[Leetcode, PostgreSQL] 197. Rising Temperature"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-01-03
---

# 문제
- Write a solution to find all dates' Id with higher temperatures compared to its previous dates (yesterday).

- Example:

        Input: 
        Weather table:
        +----+------------+-------------+
        | id | recordDate | temperature |
        +----+------------+-------------+
        | 1  | 2015-01-01 | 10          |
        | 2  | 2015-01-02 | 25          |
        | 3  | 2015-01-03 | 20          |
        | 4  | 2015-01-04 | 30          |
        +----+------------+-------------+

        Output: 
        +----+
        | id |
        +----+
        | 2  |
        | 4  |
        +----+

        Explanation: 
        In 2015-01-02, the temperature was higher than the previous day (10 -> 25).
        In 2015-01-04, the temperature was higher than the previous day (20 -> 30).


# 코드
## My solution

```sql
WITH TBL_A AS (
    SELECT ID, 
            CASE WHEN TEMPERATURE > LAG(TEMPERATURE, 1) OVER (ORDER BY RECORDDATE) THEN TRUE
                ELSE FALSE
                END AS IDX_TEMP,
            CASE WHEN RECORDDATE - 1 = LAG(RECORDDATE, 1) OVER (ORDER BY RECORDDATE) THEN TRUE
                ELSE FALSE
                END AS IDX_DATE
    FROM WEATHER
)
SELECT ID
FROM TBL_A
WHERE IDX_TEMP IS TRUE AND IDX_DATE IS TRUE
;
```

## Claude ai

```sql
WITH dates AS (
  SELECT generate_series(
    (SELECT min(recordDate) FROM Weather), 
    (SELECT max(recordDate) FROM Weather), 
    '1 day')::date AS recordDate
),
cte AS (
  SELECT 
    d.recordDate,
    w.temperature,
    LAG(w.temperature) OVER (ORDER BY d.recordDate) AS prev_temp
  FROM dates d
  LEFT JOIN Weather w
    ON d.recordDate = w.recordDate
)

SELECT w.id
FROM cte
JOIN Weather w
  ON cte.recordDate = w.recordDate
WHERE cte.temperature > cte.prev_temp;
```

## Bard

```sql
SELECT w.id
FROM Weather w
JOIN Weather w_prev ON w.recordDate = w_prev.recordDate + INTERVAL '1 day'
WHERE w.temperature > w_prev.temperature;
```

# 설명
- `INTERVAL '1 day'`을 사용하여 날짜를 하루씩 이동하여 연속적인 날짜를 효과적으로 비교.