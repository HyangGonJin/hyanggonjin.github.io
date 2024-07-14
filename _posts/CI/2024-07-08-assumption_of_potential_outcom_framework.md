---
title: "[Review] 잠재적결과 프레임워크의 가정"
categories: [CI]
tags: [ci]
toc : True
toc_sticky: true
math : True
last_modified_at: 2024-07-08
---

본 글은 [Korea Summer Workshop on Causal Inference 2023](https://www.youtube.com/playlist?list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT)의 내용을 주관적으로 정리한 글입니다. 추가적인 설명이 필요한 분들을 위해 원래 영상 링크를 같이 첨부합니다. 

- 링크: [[Week 2-2] 잠재적결과 프레임워크의 가정](https://www.youtube.com/watch?v=e2BzsceHNX8&list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT&index=6)


# Week 2. Randomized Controlled Trial
## SUTVA(; Stable Unit Treatment Value Assumption)
- 'Potential Outcome Framework'(; 잠재적결과 프레임워크)가 성립하기 위한 기본 가정.

### 1. Counterfactual consistency
- (정의)Treatment에 대해서, Potential 결과와 Observed 결과가 같음.
- 'Potential Output = Observed Output' for treated. 

- Causal effect
	= Potential outcome w/ treatment - Potential outcome w/o treatment.
	= Observed outcome w/ treatment - Potential outcome w/o treatment.
	⇒ 두 번째 등식은 "Potential outcome w/ treatment = Observed outcome w/ treatment"(; Counterfactual consistency)를 만족하는 경우에 성립.
- **Manipulability**
	- Potential Outcome Framework는 “원인에 대한 intervention을 통해 outcome의 변화, 향상을 확인”하는 것이 목적.
	- 'Counterfactual consistnecy'를 보장하기 위해서 (원인의) ‘manipulability’가 중요함.
		- manipulable해야 counterfactual과 potential outcom을 잘 정의할 수 있음.
	- (예시) ’비만‘은 not manipulable(→ ’비만’의 원인이 다양한 만큼 observed 결과도 다양하게 나타탐) ⇒ Counterfactual consistency 만족 X.

### 2. No interference
- treatment 그룹과 control 그룹 간 (직$\cdot$간접적인) 간섭이 없어야 함.

## Treatment Effect
- 종류
	- ATE(Average Treatment Effect)
	- ATT(ATE on the Treatment)
	- ATU(ATE on the Untreated)

### (잠재적결과 프레임워크로) 추정한 Treatment Effect는 ATE일까? ATT일까?
- Observed effect of the treatment   
= {Treatment 그룹 결과} - {Control 그룹 결과}.   
= (Outcome for treated if treated) - (Outcome for untreated if not treated).    
= {(Outcome for treated if treated) - (Outcome for treated if not treated)} + {(Outcome for treated if not treated) - (Outcome for untreated if not treated)}.   
= **Causal effect** + Selection bias.   
= **ATT** + Selection bias.
- Selection bias를 충분히 작게 하거나 0으로 만들어야, data를 통해 나온 observed 효과를 causal effect로 설명할 수 있음.
- Control 그룹과의 비교로 추정할 수 있는 것은 ATT 뿐.
	- Control 그룹의 결과를 가지고 Treatment 그룹의 Counterfactual를 추론하므로써 ATT를 추정 (by Ceteris Paribus).

- **Selection bias**(; 선택편향)
	- treatment가 없을 때도 가지는 treatment/control 그룹 간의 systematic한 차이.

### 언제 ATT = ATE가 될 수 있을까?
- Treatment Group : Control Group = $\pi$ : (1-$\pi$) 일 때,
	1. ATE = $\pi$$\cdot$ATT + (1-$\pi$)$\cdot$ATU

		$\Rightarrow$ ATT - ATE = (1-$\pi$)$\cdot$(ATT - ATU)
	2. ATT 
		= ATT + ATE - ATE	
		= ATE + (1-$\pi$)$\cdot$(ATT - ATU) ($\because$ '1')
- (1-$\pi$)$\cdot$(ATT - ATU) = Differential treatment effect bias
	- 해당 bias를 없애기 위해서는 'ATT=ATU'(; **Exchangeability**), bcs. $\pi \ne 0$ 
- 경우에 따라서는 ATT 만 추정하는 것으로 충분한 경우도 있음.
	- (예시) 자연 실험(; Natural experiment)을 통해...
		- Treatment 그룹 = 쿠폰을 갖고 있는 고객.
		- Control 그룹 = 쿠폰을 갖고 있지 않은 고객.
		
		$\Rightarrow$ Treatment 그룹 $\ne$ Control 그룹 (bcs. 쿠폰의 반응성이 두 그룹에 대해서 다름. Treatment 그룹은 쿠폰의 반응성이 높을 것).
	- 필요한 효과가 ATT인지 ATE인지 분명히 하는 것이 중요함.



