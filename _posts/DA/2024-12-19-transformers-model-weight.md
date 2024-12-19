---
title: "[LLM] transformers - model weight 확인"
excerpt: ""
categories: [DA, LLM]
tags: [da, llm]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-12-19
---

transformers 라이브러리에서 모델의 전체 weight 수, 특정 layer의 weight 값, layer 이름 등을 확인하는 방법에 대해서 알아 보겠습니다.

## Total 파라미터 수
예제에서는 `gemma-1.1-2b-it` 모델을 이용하겠습니다.
```python
# !pip install -q transformers

# 모델 불러오기
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig

model = AutoModelForCausalLM.from_pretrained("google/gemma-1.1-2b-it")
```

전체 weight 수, 파라미터의 수는 아래와 같이 확인할 수 있습니다.
```python
print("sum(p.numel() for p in model.parameters())")
# 2,506,172,416
```


## layer 이름 확인하기
모델의 layer 또는 module에 대한 정보는 아래 코드를 통해 확인할 수 있습니다.
```python
# 모듈 이름 확인
for name, module in model.model.layers.named_modules():
    print(name)
# 0
# 0.self_attn
# 0.self_attn.q_proj
# 0.self_attn.k_proj
# 0.self_attn.v_proj
# 0.self_attn.o_proj
# 0.self_attn.rotary_emb
# 0.mlp
# 0.mlp.gate_proj
# 0.mlp.up_proj
# 0.mlp.down_proj
# 0.mlp.act_fn
# 0.input_layernorm
# 0.post_attention_layernorm
```

## 특정 layer wegiht 확인하기
위와 같은 방법을 통해 확인한 layer 또는 module 중 특정 부분의 weight(; 예제에서는 `0.self_attn.q_proj`) 정보는 아래 코드를 통해 확인할 수 있습니다.

```python
model.model.layers[0].self_attn.q_proj.weight
# Parameter containing:
# tensor([[-0.0002, -0.0028, -0.0051,  ...,  0.0058,  0.0104, -0.0053],
#         [-0.0002, -0.0083, -0.0011,  ...,  0.0035,  0.0042,  0.0063],
#         [-0.0005,  0.0012,  0.0014,  ..., -0.0063, -0.0063, -0.0016],
#         ...,
#         [-0.0001,  0.0030, -0.0051,  ..., -0.0028, -0.0003, -0.0084],
#         [ 0.0001, -0.0159,  0.0047,  ...,  0.0008, -0.0031, -0.0045],
#         [ 0.0003, -0.0062,  0.0070,  ...,  0.0088,  0.0049,  0.0072]],
#        requires_grad=True)
```