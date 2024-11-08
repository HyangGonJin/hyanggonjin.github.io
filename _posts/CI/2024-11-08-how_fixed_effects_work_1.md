---
title: "[Review] 패널데이터와 고정효과 part 1"
categories: [CI]
tags: [ci]
toc : True
toc_sticky: true
math : True
mermaid: True
last_modified_at: 2024-11-08
---

본 글은 [Korea Summer Workshop on Causal Inference 2023](https://www.youtube.com/playlist?list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT)의 내용을 주관적으로 정리한 글입니다. 추가적인 설명이 필요한 분들을 위해 원래 영상 링크를 같이 첨부합니다. 

- 링크: [[Week 3-3] 패널데이터와 고정효과](https://www.youtube.com/watch?v=UNIF-jHY2Rk&list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT&index=13)

# Week 3.  Regression and Matching
## 3-3. How Fixed Effects Work for Causal Inference
### 예시. 모바일 푸쉬 알림의 구매 효과

- 데이터

| Customer ID | Day | Push Notification | Purchase Amount  | Gender  | Age | Address | Dummy 1 | Dummy 2 | Dummy 3 |
| ----------- | --- | ----------------- | ---------------- | --------------------- | --- | ------- | ------- | ------- | ------- |
| 1           | 1   | 0                 | 50 + 0           | 1                     | 20  | Area A  | 1       | 0       | 0       |
| 1           | 2   | 1                 | 50 + 20 = 70 | 1                     | 20  | Area A  | 1       | 0       | 0       |
| 1           | 3   | 1                 | 50 + 20 = 70 | 1                     | 20  | Area A  | 1       | 0       | 0       |
| 2           | 1   | 0                 | 10 + 0           | 0                     | 21  | Area A  | 0       | 1       | 0       |
| 2           | 2   | 1                 | 10 + 20 = 30  | 0                     | 21  | Area A  | 0       | 1       | 0       |
| 2           | 3   | 1                 | 10 + 40 = 50  | 0                     | 21  | Area A  | 0       | 1       | 0       |
| 3           | 1   | 0                 | 30 + 0           | 1                     | 22  | Area B  | 0       | 0       | 1       |
| 3           | 2   | 0                 | 30 -10 = 20   | 1                     | 22  | Area B  | 0       | 0       | 1       |
| 3           | 3   | 0                 | 30 -20 = 10   | 1                     | 22  | Area B  | 0       | 0       | 1       |


- 주어진 데이터는 Customer ID와 Day로 구성된 패널 데이터의 예시.
	- Customer ID는 'Panel unit ID'를 나타냄.
		- ID 1 & 2 = Treatment Group
		- ID 3 = Control Group
	- Day는 'Time'에 대한 변수.
- Push Notification는 'Treatment'에 대한 변수.
- Purchase Amount는 'Outcome'에 대한 변수.
- Gender, Age, Address는 'Time-invariant covariates'를 의미.
	- 분석 기간 내로 기간을 한정했을 때, 시간에 따라 값이 변하지 않으므로 'time-invariant'한 변수로 볼 수 있음.
- Dummy 1~3은 'Unit Fixed effects'를 의미.
	- Unit Fixed effects를 통해 **모든 time-invariant covariates를 설명할 수 있음** (= perfectly collinear).
	- 또한 Purchase Amount는 **time-varying한 요소지만, 유닛 별 baseline(e.g. 구매력)과 같은 time-invariant한 요소도 Unit Fixed effects에 흡수됨**.

### Q&A
- What is the treatment effect without unit fixed effects? 
	- A. 31
	- 프로그램 실행 결과
	```
	# Call:
	#   lm(formula = Purchase.Amount ~ Push.Notification, data = data)
	# Coefficients:
	#   Estimate Std. Error t value Pr(>|t|)  
	#   (Intercept)         24.000      7.964   3.013   0.0196 *
	#   Push.Notification   31.000     11.946   2.595   0.0357 *
	#   ---
	```
- What is the treatment effect with customer fixed effects? 
	- A. 25
	- 프로그램 실행 결과
	```
	# Call:
	#   lm(formula = Purchase.Amount ~ Push.Notification + Dummy.1 + 
	#        Dummy.2 + Dummy.3, data = data)
	# Coefficients: (1 not defined because of singularities)
	# Estimate Std. Error t value Pr(>|t|)  
	#   (Intercept)         20.000      5.375   3.721   0.0137 *
	#   Push.Notification   25.000      8.062   3.101   0.0268 *
	#   Dummy.1             26.667      9.309   2.864   0.0352 *
	#   Dummy.2             -6.667      9.309  -0.716   0.5060  
	#   Dummy.3                 NA         NA      NA       NA  
	# ---
	```
- What is the treatment effect with customer fixed effects, but without untreated units? 
	- A. 25
	- 프로그램 실행 결과
	```
	# Call:
	#   lm(formula = Purchase.Amount ~ Push.Notification + Dummy.1 + 
	#        Dummy.2 + Dummy.3, data = filtered_data)
	# Coefficients: (2 not defined because of singularities)
	# Estimate Std. Error t value Pr(>|t|)  
	#   (Intercept)         13.333      7.201   1.852   0.1612  
	#   Push.Notification   25.000      7.638   3.273   0.0467 *
	#   Dummy.1             33.333      7.201   4.629   0.0190 *
	#   Dummy.2                 NA         NA      NA       NA  
	#   Dummy.3                 NA         NA      NA       NA  
	# ---
	```
- What is the treatment effect with both customer and day fixed effects? 
	- A. 40
	- 프로그램 실행 결과
	```
	# Call:
	#   lm(formula = Purchase.Amount ~ Push.Notification + Dummy.1 + 
	#        Dummy.2 + Dummy.3 + Dummy.Day.1 + Dummy.Day.2 + Dummy.Day.3, 
	#      data = data)
	# Coefficients: (2 not defined because of singularities)
	# Estimate Std. Error t value Pr(>|t|)  
	#   (Intercept)         16.667      7.698   2.165   0.1190  
	#   Push.Notification   40.000     14.142   2.828   0.0663 .
	#   Dummy.1             16.667     12.172   1.369   0.2644  
	#   Dummy.2            -16.667     12.172  -1.369   0.2644  
	#   Dummy.3                 NA         NA      NA       NA  
	#   Dummy.Day.1         13.333     12.172   1.095   0.3534  
	#   Dummy.Day.2         -3.333      7.698  -0.433   0.6942  
	#   Dummy.Day.3             NA         NA      NA       NA  
	# ---
	```
- What if Customer 1 receives the treatment at Day 3? 
	- Staggered treatment(; unit 마다 treatment 시점이 다른 경우). 나중에 설명 예정.


### (참고) R v.s. Python(using statsmodels)
- 작성한 코드는 아래에 첨부.
- R과 Python statsmodels 라이브러리 결과 비교 시, 통계학적으로는 R의 결과를 보는 것이 더 적절해 보인다는 개인적인 의견.
	- 예시. 독립변수 = {상수항, Push.Notification, Dummy.1, Dummy.2, Dummy.3}.
		- 'Dummy.3 = const. - Dummy.1 - Dummy.2'으로 표현될 수 있음(; 선형종속, Linearly Dependent).
		- 독립 변수 행렬 X는 full rank가 아님 = singular matrix (; 통계적으로 not estimable한 parameter 존재).
		- R은 not estimable 파라미터의 추정 결과를 `NA`로 제공. 
		- Python statsmodels OLS는 기본적으로 Moore-Penrose Inverse(;일반화 역행렬의 특정한 형태)를 이용하므로 모든 parameter를 추정함. 하지만 추정량의 표준오차나 신뢰구간 등이 불안정한 결과를 보임.

### (참고) R 코드
```R
# install.packages("dplyr")
library(dplyr)

data <- data.frame(
  Customer.ID = c(1, 1, 1, 2, 2, 2, 3, 3, 3),
  Day = c(1, 2, 3, 1, 2, 3, 1, 2, 3),
  Push.Notification = c(0, 1, 1, 0, 1, 1, 0, 0, 0),
  Purchase.Amount = c(50, 70, 70, 10, 30, 50, 30, 20, 10),
  Gender = c(1, 1, 1, 0, 0, 0, 1, 1, 1),
  Age = c(20, 20, 20, 21, 21, 21, 22, 22, 22)
)

# Case 1. without unit fixed effects
model <- lm(Purchase.Amount ~ Push.Notification, data = data)
summary(model)


# Case 2. with unit fixed effects
data <- data %>%
  mutate(
    Dummy.1 = case_when(Customer.ID == 1 ~ 1, TRUE ~ 0),
    Dummy.2 = case_when(Customer.ID == 2 ~ 1, TRUE ~ 0),
    Dummy.3 = case_when(Customer.ID == 3 ~ 1, TRUE ~ 0)
  )
model <- lm(Purchase.Amount ~ Push.Notification + Dummy.1 + Dummy.2 + Dummy.3, data = data)
summary(model)


# Case 3. with unit fixed effects, but without control gorup
filtered_data = data %>% filter(Dummy.3 != 1)
model <- lm(Purchase.Amount ~ Push.Notification + Dummy.1 + Dummy.2 + Dummy.3, data = filtered_data)
summary(model)


# Case 4. with both customer and day fixed effects
data <- data %>%
  mutate(
    Dummy.Day.1 = case_when(Day == 1 ~ 1, TRUE ~ 0),
    Dummy.Day.2 = case_when(Day == 2 ~ 1, TRUE ~ 0),
    Dummy.Day.3 = case_when(Day == 3 ~ 1, TRUE ~ 0)
  )
model <- lm(Purchase.Amount ~ Push.Notification + Dummy.1 + Dummy.2 + Dummy.3 + Dummy.Day.1 + Dummy.Day.2 + Dummy.Day.3, data = data)
summary(model)
```

### (참고) Python 코드
```python
import pandas as pd
import statsmodels.api as sm

data = pd.DataFrame({
	'Customer.ID': [1, 1, 1, 2, 2, 2, 3, 3, 3],
	'Day': [1, 2, 3, 1, 2, 3, 1, 2, 3],
	'Push.Notification': [0, 1, 1, 0, 1, 1, 0, 0, 0],
	'Purchase.Amount': [50, 70, 70, 10, 30, 50, 30, 20, 10],
	'Gender': [1, 1, 1, 0, 0, 0, 1, 1, 1],
	'Age': [20, 20, 20, 21, 21, 21, 22, 22, 22],
	'Address': ["Area A", "Area A", "Area A", "Area A", "Area A", "Area A", "Area B", "Area B", "Area B"]
	})
data = pd.get_dummies(data, columns=['Customer.ID'], prefix='Dummy', drop_first=False)

# Case 1. without unit fixed effects
X = data[['Push.Notification']]
y = data['Purchase.Amount']
X = sm.add_constant(X)

model = sm.OLS(y, X).fit()
print(model.summary())


# Case 2. with unit fixed effects
X = data[['Push.Notification','Dummy_1', 'Dummy_2', 'Dummy_3']]
y = data['Purchase.Amount']
X = sm.add_constant(X)

model = sm.OLS(y, X).fit()
print(model.summary())


# Case 3. with unit fixed effects, but without control gorup
filtered_row = (X['Dummy_3'] != 1)
X = X[filtered_row]
y = y[filtered_row]

model = sm.OLS(y, X).fit()
print(model.summary())


# Case 4. with both customer and day fixed effects
data = pd.get_dummies(data, columns=['Day'], prefix='Dummy.Day', drop_first=False)
dummy_cols = data.columns[data.columns.str.startswith('Dummy.Day')]
data[dummy_cols] = data[dummy_cols].astype(int)

X = data[['Push.Notification','Dummy_1', 'Dummy_2', 'Dummy_3', 'Dummy.Day_1', 'Dummy.Day_2', 'Dummy.Day_3']]
y = data['Purchase.Amount']
X = sm.add_constant(X)

model = sm.OLS(y, X).fit()
print(model.summary())
```