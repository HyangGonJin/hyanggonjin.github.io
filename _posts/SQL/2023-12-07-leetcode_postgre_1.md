---
title: "[Leetcode, Postgre] 262. Trips and Users"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-07
---

# 문제
- The cancellation rate is computed by dividing the number of canceled (by client or driver) requests with unbanned users by the total number of requests with unbanned users on that day.

- Write a solution to find the cancellation rate of requests with unbanned users (both client and driver must not be banned) each day between "2013-10-01" and "2013-10-03". Round Cancellation Rate to two decimal points.


# 코드
```sql
WITH TBL_A AS (
  SELECT A.REQUEST_AT,
        CASE WHEN A.STATUS LIKE '%cancelled%' THEN 1
            ELSE 0 END AS TMP_STATUS,
        CASE WHEN B.BANNED = 'Yes' THEN 1
            ELSE 0 END AS BANNED_CLIENT, 
        CASE WHEN C.BANNED = 'Yes' THEN 1
            ELSE 0 END AS BANNED_DRIVER
  FROM TRIPS A
    LEFT JOIN (SELECT * FROM USERS WHERE ROLE = 'client') B ON A.CLIENT_ID = B.USERS_ID
    LEFT JOIN (SELECT * FROM USERS WHERE ROLE = 'driver') C ON A.DRIVER_ID = C.USERS_ID
  WHERE '2013-10-01' <= A.REQUEST_AT  AND A.REQUEST_AT <= '2013-10-03'
)
SELECT REQUEST_AT as "Day", 
       ROUND(AVG(TMP_STATUS), 2) AS "Cancellation Rate"
FROM TBL_A
WHERE BANNED_CLIENT + BANNED_DRIVER = 0
GROUP BY REQUEST_AT
;
```