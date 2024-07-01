---
title: "[Review] 잠재적결과 프레임워크 - Korea Summer Workshop on Causal Inference 2023"
categories: [CI]
tags: [ci]
toc : True
toc_sticky: true
math : True
last_modified_at: 2024-07-01
---

본 글은 [Korea Summer Workshop on Causal Inference 2023](https://www.youtube.com/playlist?list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT)의 내용을 주관적으로 정리한 글입니다. 추가적인 설명이 필요한 분들을 위해 원래 영상 링크를 같이 첨부합니다. 

- 링크: [[Week 2-1] 잠재적결과 프레임워크](https://www.youtube.com/watch?v=c2lfzpNLnPI&list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT&index=5)


# Week 2. Randomized Controlled Trial
- 무작위 실험
	- **Identification**의 핵심
        - identification = 인과적 효과를 추정하기 위해 어떤 조건, 가정이 필요한지 고려하는 단계
	- 인과추론의 기준점

## 2-1. Potential Outcome Framework
- 비교 = '효과'를 검증하는 좋은 방법 중 하나
	- (그러면) 비교 대상을 어떻게 설정해야 할까? (= 무엇과 비교를 해야할까?)
- Potential Outcome Framework = '(좋은) 비교 대상 설정'에 대한 가이드

### 개념
- **Counterfactual** = Potential outcome for treated if not treated
	- 반사실
	- 처리, 원인이 없었을 경우의 결과
- **Causal effect** = (Actual outcome for treated if treated) - (<span style="color:red">Potential</span> outcome for <span style="color:red">treated</span> if not treated) (이상적인 정의)
	- Treatment의 (causal) effect = 잠재적 결과의 차이
	- (하지만) 우리는 원인이 있을 때와 없을 때, 모든 경우에 대한 잠재적 결과를 얻을 수 없고 단 하나만 얻을 수 있음
- **Control Group**
	- Comparison Group
	- 처리, 원인이 없는 그룹
	- <span style="color:red">Actual</span> outcome for <span style="color:red">untreated</span> if not treated 에 대해서만 관측 가능함

### 예제
![image](/assets/img/20240305211535.png)

- Treatment Group = Subject 1, 2
- Control Group = Subject 3, 4
- 추정 대상 = **ATE**
	- 개인의 treatment effect(; ITE)는 identify하기 어려움
	- 집단의 평균적인 반응은 조금 더 수월함
- 정의
	- ATE = $E(Y_i(1)) - E(Y_i(0))$
	- ATT = $E(Y_i(1)\|T_i=1) - E(Y_i(0)\|T_i=1)$   
	- ATU = $E(Y_i(1)\|T_i=0) - E(Y_i(0)\|T_i=0)$   
	- CATE(; Conditional ATE) or HTE(; Heterogeneous Treatment Effect) = 특성별 ATE

- **Selection Bias** (= endogeneity, 내생성)
	- Control group $\ne$ Counterfactual
	- (Outcome for treated if not treated) - (Outcome for untreated if not treated)
	- Treatment group과 Control Group, 두 그룹의 특성이나 성향이 다름 (다를 수 밖에 없음)
	- 그래서 Control 그룹의 결과로 Treatment 그룹의 반사실을 추정하는게 맞지 않음
	
- **Ceteris Paribus** (→ Potential Outcome Framework의 중요한 전제, 가정)
	- All other things being equal. 비교 가능한 상태를 의미
	- 'Control 그룹'이 treatment를 제외하고 나머지 특성에 대해서는 'Treatment 그룹'과 비교 가능해야(같아야) 함
		- selection bias가 제거되어야 함
