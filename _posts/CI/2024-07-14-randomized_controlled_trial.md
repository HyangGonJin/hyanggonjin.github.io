---
title: "[Review] 인과추론의 기준점: 무작위 실험"
categories: [CI]
tags: [ci]
toc : True
toc_sticky: true
math : True
last_modified_at: 2024-07-14
---

본 글은 [Korea Summer Workshop on Causal Inference 2023](https://www.youtube.com/playlist?list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT)의 내용을 주관적으로 정리한 글입니다. 추가적인 설명이 필요한 분들을 위해 원래 영상 링크를 같이 첨부합니다. 

- 링크: [[Week 2-3] 인과추론의 기준점: 무작위 실험](https://www.youtube.com/watch?v=1RbUTL3YOYE&list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT&index=7)


# Week 2. Gold Standard of Causal Inference: Randomized Controlled Trial

## 개념
- Law of large numbers
	- (Under the some assumptions,) identically & randomly 생성된 샘플의 평균이 이론적 평균(; 모평균)에 수렴한다.
- Random Assignment(; 무작위 배정)
	- (대수의 법칙에 따라) 무작위 배정을 통해 구분된 두 그룹의 차이는 Treatment의 차이 뿐 (= Ceteris Paribus) = Comparable.
	- Selection bias를 효과적으로 제거할 수 있는 방법.

## 체크리스트
1. Quality of Randomization
	- Confounders(; 교란변수)에 대한 summary statistics 계산 ⇒ 그룹 간 차이가 있는지 확인.   
> 📘 Confounders   
> 원인 변수 X와 결과 변수 Y에 동시에 영향을 주면서, 원인 변수 X와 결과 변수 Y 사이에 상관 관계를 만드는 변수.   
> 출처: [Medium 글 - Simpson’s Paradox and Confounding](https://medium.com/bondata/simpsons-paradox-and-confounding-3b90c404a4ca)
	- 무작위 배정이 잘 되었다면 confounders(의 통제 여부)가 treatment의 효과에 영향을 주지 않음.   


2. SUTVA (; Stable Unit Treatment Value Assumption)
	- 'Counterfactual consistency'(; potential 결과 = observed 결과)와 'No interference'(; treatment 그룹과 control 그룹 간 직간접적 영향 없어야함) 확인.
3. Imperfect Compliance
	- Treatment Assign(or Offer) $\ne$ Treatment Take up.
	- 연구자는 피실험자가 treatment를 (실제로) 받도록 강제할 수 없음.
	- Compliers(; 지침을 잘 따르는 집단)에 대한 Causal Effect = Local Average Treatment Effect.

