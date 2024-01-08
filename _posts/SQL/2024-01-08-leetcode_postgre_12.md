---
title: "[Leetcode, PostgreSQL] Investments in 2016"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-01-08
---

# 문제
- Write a solution to report the sum of all total investment values in 2016 tiv_2016, for all policyholders who:
    - have the same tiv_2015 value as one or more other policyholders, and
    - are not located in the same city as any other policyholder (i.e., the (lat, lon) attribute pairs must be unique).
- Round tiv_2016 to two decimal places.


- Example:

        Input: 
        Insurance table:
        +-----+----------+----------+-----+-----+
        | pid | tiv_2015 | tiv_2016 | lat | lon |
        +-----+----------+----------+-----+-----+
        | 1   | 10       | 5        | 10  | 10  |
        | 2   | 20       | 20       | 20  | 20  |
        | 3   | 10       | 30       | 20  | 20  |
        | 4   | 10       | 40       | 40  | 40  |
        +-----+----------+----------+-----+-----+

        Output: 
        +----------+
        | tiv_2016 |
        +----------+
        | 45.00    |
        +----------+

        Explanation: 
        - The first record in the table, like the last record, meets both of the two criteria.
        The tiv_2015 value 10 is the same as the third and fourth records, and its location is unique.
        - The second record does not meet any of the two criteria. Its tiv_2015 is not like any other policyholders and its location is the same as the third record, which makes the third record fail, too.
        So, the result is the sum of tiv_2016 of the first and last record, which is 45.


# 코드
## My solution

```sql
WITH TBL_A AS (
    SELECT TIV_2015, COUNT(*) AS CNT_PH
    FROM INSURANCE
    GROUP BY TIV_2015
),
TBL_B AS (
    SELECT LAT, LON, COUNT(*) AS CNT_LOC
    FROM INSURANCE
    GROUP BY LAT, LON
)

SELECT ROUND(SUM(TIV_2016)::DECIMAL, 2) AS TIV_2016
FROM INSURANCE A
WHERE NOT EXISTS (SELECT 1 FROM TBL_A B WHERE A.TIV_2015 = B.TIV_2015 AND B.CNT_PH = 1) AND 
      NOT EXISTS (SELECT 1 FROM TBL_B C WHERE A.LAT = C.LAT AND A.LON = C.LON AND C.CNT_LOC > 1)
;
```

## ChatGPT 3.5

```sql
SELECT ROUND(SUM(tiv_2016)::numeric, 2) AS tiv_2016
FROM (
    SELECT tiv_2016
    FROM Insurance
    WHERE tiv_2015 IN (
        SELECT tiv_2015
        FROM Insurance
        GROUP BY tiv_2015
        HAVING COUNT(pid) > 1
    )
    AND (lat, lon) NOT IN (
        SELECT lat, lon
        FROM Insurance
        GROUP BY lat, lon
        HAVING COUNT(pid) > 1
    )
) AS Subquery;
```


## Bard

```sql
SELECT ROUND(SUM(tiv_2016)::numeric, 2) AS tiv_2016
FROM Insurance i
WHERE EXISTS (SELECT 1 FROM Insurance i2 WHERE i2.tiv_2015 = i.tiv_2015 AND i2.pid <> i.pid)
  AND NOT EXISTS (SELECT 1 FROM Insurance i2 WHERE i2.lat = i.lat AND i2.lon = i.lon AND i2.pid <> i.pid);
```