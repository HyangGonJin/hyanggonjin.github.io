---
title: "[Review] 실험/준실험 접근법의 한계"
categories: [CI]
tags: [ci]
toc : True
toc_sticky: true
math : True
mermaid: True
last_modified_at: 2024-08-04
---

본 글은 [Korea Summer Workshop on Causal Inference 2023](https://www.youtube.com/playlist?list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT)의 내용을 주관적으로 정리한 글입니다. 추가적인 설명이 필요한 분들을 위해 원래 영상 링크를 같이 첨부합니다. 

- 링크: [[Week 2-4] 실험/준실험 접근법의 한계](https://www.youtube.com/watch?v=H48usbXDS1A&list=PLKKkeayRo4PUyqxgszL-biEZOOA9j61HT&index=8)


# Week 2. Limitations of RCT
- **한계점 1. 특별한 타입의 treatment의 causal effectaks 추론 가능하다.**
	- Counterfactual Consistency의 관점에서 "Potential Outcome = Observed Outcome"을 만족하는 등 "충분히 잘 정의된" treatment에 대해서만 의미있는 인과효과를 추론할 수 있음.
- **한계점 2. 일반화 또는 다른 세팅의 실험으로의 확장이 어렵다.**
	```mermaid
	graph LR
	Population((Population)) --Random Selection--> Sample((Sample))
	Sample((Sample)) --Random Assignment--> Groups((Groups))
	```
	- Internal validity ([참고](https://www.verywellmind.com/internal-and-external-validity-4584479))
		- 해당 실험, 연구가 얼마나 잘 세팅되었는지, 구조적으로 타당한지
		- 예. Random assignment
	- External validity
		- 다른 세팅의 연구나 일반화하여 적용하기에 타당한지
		- 예. Random Selection
	- 예시. 중국 텔레마케터를 대상으로 재택근무 효과(; 생산성)에 대한 연구.
		- '미국'에도 적용 가능할까?
		- '개발자'에게도 적용 가능할까?   
		$\Rightarrow$ (바로) 일반화할 수 없음.

- Random Selection이나 Representative sample 없이 External validity를 확보할 수 있는 방법 있음.
	- Meta 분석
	- Observational 연구
	- Transportability 이론

