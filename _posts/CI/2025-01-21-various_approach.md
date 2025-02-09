---
title: "[Review] 인과추론의 다양한 접근법"
categories: [CI]
tags: [ci]
toc : True
toc_sticky: true
math : True
mermaid: True
last_modified_at: 2025-01-21
---

본 글은 [Korea Summer Workshop on Causal Inference 2023](https://www.youtube.com/playlist?list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT)의 내용을 주관적으로 정리한 글입니다. 추가적인 설명이 필요한 분들을 위해 원래 영상 링크를 같이 첨부합니다. 

- 링크: [[Week 4-1] 인과추론의 다양한 접근법](https://www.youtube.com/watch?v=rRGua7WzVog&list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT&index=13)

# Week 4. Research Design for Causal Inference
## 4-1. Various Approaches to Causal Inference
### Data Generation Process
- 잠재적 결과 프레임워크 관점에서 인과추론은 selection bias를 없애 treatment group과 control group이 비교 가능하도록 하는 것.
- 하지만 주어진 또는 관측가능한 요인(; observable confounders) 만으로 selection bias를 설명하기에는 한계가 있음.
	- selection bias는 unobservable 요소에 의해서도 발생할 수 있음.
	- 이를 이해하기 위해서는 데이터가 어떻게 수집되었는지, 어떻게 생성되었는지에 대한 프로세스(= data generation process, selection process)에 대한 이해가 필요함.
	- 예시. '보조금 승인에 대한 인과분석'의 Data Generation Process
		- 'No application'에 대한 data는 unobservable 함.
		```mermaid
		graph TD
	  A[Individual] -->|No Application| B[Control Group without Grant]
	  A -->|Application| C[Applicant]
	  C -->|Rejected| B
	  C -->|Accepted| D[Treatment Group with Grant]
		```

- 데이터 생성 프로세스를 설명하기 위한 관점
	- Selection on Observables
		- selection process에 관여하는 모든 요인이 observable하다는 관점.
		- (예시) regression, matching, graphical causal model 등.
	- Selection on Unobservables
		- selection process의 일부 요인은 unobservable하다는 관점 → 이를 제거해 인과 효과를 추론.
		- (예시) RCT, design-based approach(; quasi experiment - 준실험 디자인 기반), selection bais correction method(; statistical modeling) 등.

### Selection on Observables
- Regression
	- 통제 변수를 이용해 selection bias를 설명.
	- 특정한 함수 형태 가정.
- Matching
	- 관측된 변수가 유사한 treatment 유닛과 control 유닛을 매칭.
	- 함수 형태에 대한 가정 하지 않음.
- 관측가능한 요인으로 selection bias를 전부 설명할 수 있다는 관점은 현실적으로 받아들이기 어려움이 있음.
- 보조적 수단 등으로 다른 인과추론 방법론들과 같이 사용.

### Selection on Unobservables
- RCT
	- 대수의 법칙 기반, 무작위 배정을 통해 selection bias를 제거함.
- (Natural) quasi-experiment
	- 자연 발생한 요인으로 인해 treatment group과 control group이 무작위 배정처럼 구분됨.

### Examples of Selection on observables and unobservables
- 예시. 회사의 ISO 인증 획득에 대한 인과 분석

| Firm         | Output without certification (Yi(0)) | Output with certification (Yi(1)) | Treatment effect (E[Yi(1) - Yi(0)]) |
|--------------|--------------------------------------|-----------------------------------|------------------------------------|
| **Both actual and potential outcomes are known**   |                                      |                                   |                                    |
| Firm A (noncertified) | 400                                  | 500                               | 100                                |
| Firm B (certified)    | 700                                  | 800                               | 100                                |
| **Only actual outcomes are known**                |                                      |                                   |                                    |
| Firm A (noncertified) | 400                                  | —                                 | ?                                  |
| Firm B (certified)    | —                                    | 800                               | ?                                  |

- Selection on observables
	- 회사의 ISO 인증과 관련된 8가지 기준 → 각 회사의 8가지 기준에 대한 데이터 (모두) 존재.
	- 8가지 변수 기반 Propensity Score 산출.
	- 특정 점수(; 예제에서는 50점) 기준으로 Matched group 1 & 2 구분.
	- 각 서브 그룹 별 treatment effect에 대한 PSM 추정량 계산.
- Selection on unobservables
	- Difference in Difference.
	- Regression Discontinuity.