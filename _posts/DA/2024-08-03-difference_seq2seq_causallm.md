---
title: "[LLM] Seq2Seq와 Causal LM의 차이"
excerpt: ""
categories: [DA, LLM]
tags: [da, llm]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-08-03
---

허깅페이스에는 `AutoModelForCausalLM`, `AutoModelForMaskedLM`, `AutoModelForSeq2SeqLM` 등의 다양한 모델 관련 Autmo 클래스가 있습니다. 각 클래스는 세부적인 method나 attribute가 다르고, LLM을 통해 풀려는 task의 종류에 따라 적절한 클래스를 사용해야 합니다. 이와 관련된 주요한 개념을 알아보겠습니다.

# 설명
Transformer의 구조는 인코더와 디코더로 이루어져 있습니다. 인코더 구조는 BERT 모델이 대표적이며 NLU task에 많이 쓰이고, 디코더 구조는 GPT 모델이 대표적이며 NLG task에 많이 사용됩니다. 

이러한 관점에서 CLM(; Causal Language Model), MLM(; Masked Language Model), Seq2SeqLM(; Seq-to-Seq Language Model)을 구분하면 다음과 같습니다.

- **CLM** - decoder 구조.
- **MLM** - encoder 구조.
- **Seq2Seq** - encoder & decoder 구조.


# 참고자료
- [블로그 - Causal LLMs and Seq2Seq Architectures](https://heidloff.net/article/causal-llm-seq2seq/)
- [Medium - Understanding Causal LLM’s, Masked LLM’s, and Seq2Seq: A Guide to Language Model Training Approaches](https://medium.com/@tom_21755/understanding-causal-llms-masked-llm-s-and-seq2seq-a-guide-to-language-model-training-d4457bbd07fa)
- [huggingface 공식문서 - transformers.AutoClasses](https://huggingface.co/docs/transformers/main/en/model_doc/auto#natural-language-processing)