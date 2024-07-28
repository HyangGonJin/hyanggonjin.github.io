---
title: "[LLM] max_length와 max_new_tokens 차이"
excerpt: ""
categories: [DA, LLM]
tags: [da, llm]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-07-28
---

(텍스트 생성을 위한) LLM 모델을 이용해 문장을 생성할 때, `max_length`나 `max_new_tokens`와 같은 값을 설정해야 하는 경우가 있습니다. 해당 파라미터들의 의미와 차이에 대해서 알아보겠습니다.


# 설명
저의 경우는 허깅페이스의 `AutoModelForCausalLM`과 `AutoTokenizer`로 불러온 모델과 토크나이저를 기반으로 `pipeline`을 이용해 텍스트 생성 작업을 진행하고 있습니다. 

공식문서에 적힌 각 파라미터의 설명은 다음과 같습니다.

> **max_length** (int, optional, defaults to 20) — The maximum length the generated tokens can have. Corresponds to the length of the input prompt + max_new_tokens. Its effect is overridden by max_new_tokens, if also set.
>
> **max_new_tokens** (int, optional) — The maximum numbers of tokens to generate, ignoring the number of tokens in the prompt.

두 파라미터 모두 생성하는 텍스트의 길이(= 최대 토큰 개수)를 설정하는 값입니다. 

다만 `max_length`는 prompt(또는 input context)를 포함한 최대 토큰 개수를 의미하고, `max_new_tokens`는 prompt를 제외한 최대 토큰 개수를 의미합니다.

# 참고자료
- [huggingface 공식문서 - transformers.TextGenerationPipeline](https://huggingface.co/docs/transformers/v4.42.0/en/main_classes/pipelines#transformers.TextGenerationPipeline)
- [huggingface 공식문서 - transformers.GenerationConfig](https://huggingface.co/docs/transformers/v4.42.0/en/main_classes/text_generation#transformers.GenerationConfig)