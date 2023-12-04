---
title: "[프로그래머스, Oracle] 취소되지 않은 진료 예약 조회하기"
categories: [SQL]
tags: [sql]
toc : True
toc_sticky: True
math : True
last_modified_at: 2023-12-04
---

# 문제
PATIENT, DOCTOR 그리고 APPOINTMENT 테이블에서 2022년 4월 13일 취소되지 않은 흉부외과(CS) 진료 예약 내역을 조회하는 SQL문을 작성해주세요. 진료예약번호, 환자이름, 환자번호, 진료과코드, 의사이름, 진료예약일시 항목이 출력되도록 작성해주세요. 결과는 진료예약일시를 기준으로 오름차순 정렬해주세요.


# 코드
```sql
SELECT A.APNT_NO, 
        B.PT_NAME, 
        B.PT_NO, 
        A.MCDP_CD, 
        C.DR_NAME, 
        A.APNT_YMD
FROM (
        SELECT * 
        FROM APPOINTMENT 
        WHERE TO_CHAR(APNT_YMD, 'YYYY-MM-DD') = '2022-04-13' 
            AND MCDP_CD = 'CS' 
            AND APNT_CNCL_YN = 'N'
    ) A
    LEFT JOIN PATIENT B ON A.PT_NO = B.PT_NO
    LEFT JOIN DOCTOR C ON A.MDDR_ID = C.DR_ID
ORDER BY A.APNT_YMD
;
```