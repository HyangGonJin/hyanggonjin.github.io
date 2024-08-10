---
title: "[Review] 인과추론을 위한 회귀분석의 역할"
categories: [CI]
tags: [ci]
toc : True
toc_sticky: true
math : True
mermaid: True
last_modified_at: 2024-08-10
---

본 글은 [Korea Summer Workshop on Causal Inference 2023](https://www.youtube.com/playlist?list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT)의 내용을 주관적으로 정리한 글입니다. 추가적인 설명이 필요한 분들을 위해 원래 영상 링크를 같이 첨부합니다. 

- 링크: [[Week 3-1] 인과추론을 위한 회귀분석의 역할](https://www.youtube.com/watch?v=4qTUXEg7Qt8&list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT&index=9)


# Week 3.  Regression and Matching
## 3-1. Regression for Causal Inference
### 개요
- (일반적인) 회귀분석은 '추정'만 고려함. 이것만 가지고서 추정의 결과를 바로 인과적인 효과로 해석하면 안됨.   
- $ E(Y\|X)=f(X) $라는 유연한 형태를 갖고 있어서 인과관계 뿐만 아니라 연관성, 상관성 등도 모델에 포함될 수 있음.

- 회귀분석을 인과추론에 적용할 때, 잘못된 활용 사례
	- 연구와 관련된 데이터를 모았을 때, 중요한 변수가 포함되어 있지 않은 경우.
	- 수집하거나 고려하는 covariates이 적절한가, 필요한가에 대한 고려가 부족한 경우(; 이전 연구 사례만 고려해 포함하는 경우 등).
	- 위와 유사하게 모델링하는 함수의 형태에 대한 고려도 부족한 경우.   
	$\Rightarrow$ control variables / covariates의 디자인에 대한 고려가 필요함.

### Potential Outcome 측면에서의 회귀분석
- Endogeneity(;내생성) in regression  
	- 설명변수와 오차의 상관성이 있는 경우 (; $Cov(X, \epsilon) \ne 0 \Leftrightarrow E(\epsilon \| X) \ne 0$).

- 원인
	- Selection bias
	- Simultaneity Bias(;설명변수와 종속변수가 서로 영향)
	- Measurement Error Bias(;관측오차, 측정오류)


- True Causal effect of $X$ (for binary variable $X$)   
	- $E(Y_{1}-Y_{0}) = \beta$

- Potential Outcomes (counterfactual regression function)   
	- $Y_{0i}=\alpha + \epsilon_{0i}$    
	- $Y_{1i}=\alpha + \beta + \epsilon_{1i}$   
	$\Rightarrow$ Selection Bias = $(\epsilon_{1i} - \epsilon_{0i})$ 

- Regression Model   
	- $Y_i = (1-X_i)Y_{0i} + X-iY_{1i}\\ = \alpha + \beta X_i + [\epsilon_{0i} + ( \epsilon_{1i} - \epsilon_{0i})X_i] ~(1)\\ = \alpha + [\beta + ( \epsilon_{1i} - \epsilon_{0i})]X_i +\epsilon_{0i}$   
	$\Rightarrow$ 식 (1)에서 '$[\epsilon_{0i} + ( \epsilon_{1i} - \epsilon_{0i})X_i]=\epsilon_i$'이므로, selection bias가 존재하면 설명변수 $X$와 오차항 $\epsilon$은 correlated 되어 있음(; Endogeneity).

- Estimated Treatment Effect   
	- $E(Y_1) - E(Y_0) = \beta + E(\epsilon_{1}) - E(\epsilon_{0})$   
	$\Rightarrow$  $E(\epsilon_{1}) - E(\epsilon_{0})$ = bias 존재.

- Selection on Observables Assumption
	- (관찰 가능한) control variable(; 통제변수) $C$를 통해 selection bias를 (선형적인 관계로) 설명할 수 있다.
- 만약 Selection on observables assumption을 가정할 수 있다면 (w/ Conditional Independence assumption $Cov(X,e\|C)=0$),
	1. Potential outcomes
	- $Y_{0i}=\alpha + e_i + \gamma C_{0i}$
	- $Y_{1i}=\alpha + \beta + e_i + \gamma C_{1i}$

	2. Regression model
	- $Y_i = (1-X_i)Y_{0i} + X-iY_{1i} = \alpha + \beta X_i + \gamma C_{i} + e_i$  where $C_i = (1-X_i)C_{0i}+X_iC_{1i}$

	3. Estimated treatment effect
	- $E(Y_1) - E(Y_0) = \beta + \gamma[E(C_{1}) - E(C_{0})]$    
	- $E[Y_1 - Y_0\|C] = E(Y_{1}\|C) - E(Y_{0}\|C) = \beta ~~ \cdots~~ CATE$   
	- $E[Y_1 - Y_0] = \sum_{C}E[Y_{1}-Y_{0}\|C] \cdot P(C) ~(;marginalize) = \beta ~~ \cdots~~ ATE$   

### 인과추론 관점에서의 회귀분석에 대한 재고
- Treatment를 분명히 정의해야함. 
	- causes와 controls 간의 분명한 구분이 있어야 함.   
- Control variables가 selection bias를 어떻게 설명하는지를 분명히 해야함.   
- Control variables에 대해 인과관계를 해석하지 말 것.

### 회귀분석에서 ATE를 추정하는 방법
1. Conditionally adjusted regression
	- CATE ⇒ ATE (; 위에서 서술한 방법)
2. Marginal Standardization
	- a.k.a. g-computation, parametric g-formula

- Positivity Assumption
	- 고려하는 통제변수의 모든 구간에서 treatment와 control 그룹의 observation이 존재해야 함.   
	- 모든 $c_i \in C$, $E[Y_1 - Y_0\|C=c_i]$를 계산할 수 있어야 함.