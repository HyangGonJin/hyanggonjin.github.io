---
title: "[LLM] 데이터 불러오기 - load_dataset"
excerpt: ""
categories: [DA, LLM]
tags: [da, llm]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-04-28
---

허깅페이스의 `datasets` 라이브러리는 다양한 데이터셋을 쉽게 로드하고 사용할 수 있도록 돕는 매우 유용한 도구입니다. 이 라이브러리는 자연어 처리를 포함한 여러 머신 러닝 프로젝트에 필요한 데이터를 제공하며, 데이터를 탐색하고 이해하는 과정을 간소화합니다. 이번 포스트에서는 `datasets.load_dataset` 함수를 사용하여 데이터셋을 어떻게 로드하고 필요한 정보를 확인하는지 자세히 설명하겠습니다.

# 1. 소개
datasets.load_dataset 함수는 허깅페이스의 datasets 라이브러리에서 제공하는 메인 함수 중 하나로, 다양한 공개 데이터셋을 쉽게 접근할 수 있게 합니다. 이 함수를 사용하여 데이터셋을 로드할 때, 몇 가지 주요 설정이 있습니다:

- **path**
    - 데이터셋의 이름이나 경로를 지정합니다. 허깅페이스 데이터 허브에 호스팅된 데이터셋의 이름을 직접 사용하거나 데이터 경로를 설정할 수 있습니다.
- **data_files**
    - `load_dataset`의 결과로 `DatasetDict` 객체를 생성하기 위해 '필드명'과 '해당 데이터'를 key-value 형태로 설정할 수 있습니다.
- **split**
    - 데이터셋의 어떤 부분을 로드할지를 결정합니다. 일반적으로 train, test, validation 중 선택할 수 있습니다.

예제에서는 [KoAlpaca](https://github.com/Beomi/KoAlpaca/tree/main)의 [KoAlpaca_v1.1.jsonl](https://raw.githubusercontent.com/Beomi/KoAlpaca/main/KoAlpaca_v1.1.jsonl) 데이터를 이용했습니다.

# 2. 데이터 불러오기
'./data' 라는 local 디렉토리에 데이터가 있으며, 'total'이라는 key 값으로 데이터를 불러옵니다. 

```py
from datasets import load_dataset

dataset_path = './data'
dataset_name = 'KoAlpaca_v1.1.jsonl'
data_files = {"total": dataset_name}

dataset = load_dataset(path = dataset_path, data_files=data_files)
dataset
# DatasetDict({
#     total: Dataset({
#         features: ['instruction', 'output', 'url'],
#         num_rows: 21155
#     })
# })
```
train/valid/test 데이터가 구분되어 있다면 `data_files`에 key-value 값으로 '이름'과 '경로'를 설정해 한번에 불러올 수 있습니다.   

참고로 데이터 파일이 여러 개라서 디렉토리로 train, valid가 구분되어 있는 경우에도 잘 불러옵니다. 하지만 데이터 개수 등을 통해 제대로 들고왔는지는 꼭 확인해보시는 것을 추천합니다.

# 3. 데이터 핸들링
## 3.1 기본
```py
total_data = dataset['total']
total_data
# Dataset({
#     features: ['instruction', 'output', 'url'],
#     num_rows: 21155
# })
```
데이터는 'instruction', 'output', 'url', 3개의 feature로 구성되어 있으며 총 21,155개입니다. 

```py
total_data.features.keys()
# dict_keys(['instruction', 'output', 'url'])

list(total_data.features)
# ['instruction', 'output', 'url']
```
feature 정보는 위와 같은 방법으로도 확인할 수 있습니다.

```py
total_data['instruction'][:2]
# ['양파는 어떤 식물 부위인가요? 그리고 고구마는 뿌리인가요?', '스웨터의 유래는 어디에서 시작되었나요?']

total_data['output'][:2]
# ['양파는 잎이 아닌 식물의 줄기 부분입니다. 고구마는 식물의 뿌리 부분입니다. \n\n식물의 부위의 구분에 대해 궁금해하는 분이라면 분명 이 질문에 대한 답을 찾고 있을 것입니다. 양파는 잎이 아닌 줄기 부분입니다. 고구마는 다른 질문과 답변에서 언급된 것과 같이 뿌리 부분입니다. 따라서, 양파는 식물의 줄기 부분이 되고, 고구마는 식물의 뿌리 부분입니다.\n\n 덧붙이는 답변: 고구마 줄기도 볶아먹을 수 있나요? \n\n고구마 줄기도 식용으로 볶아먹을 수 있습니다. 하지만 줄기 뿐만 아니라, 잎, 씨, 뿌리까지 모든 부위가 식용으로 활용되기도 합니다. 다만, 한국에서는 일반적으로 뿌리 부분인 고구마를 주로 먹습니다.',
#  '스웨터의 유래는 14세기경 북유럽항구지역에서 어망을 짜던 기술을 의복에 활용하면서 시작되었습니다. 노동자들의 방한복에서 시작된 스웨터는 여가생활과 스포츠의 붐에 힘입어 대중화되었습니다. 이후, 겨울철 이너웨어의 대명사가 되었습니다. 스웨터는 짜서(Knit) 만든 옷을 말하며, 어부들의 방한복으로 짜여졌던 스웨터 중에서도 스코틀랜드 해안지방의 여인들은 바다로 나가는 남편이나 연인, 자식들에게 무사히 돌아올 것을 기원하며 로프나 닻 무늬를 정성껏 짜넣었다고 합니다. 그 실용성과 정성이 오늘에까지 이어지고 있습니다.']

 total_data['url'][:2]
#  ['https://kin.naver.com/qna/detail.naver?d1id=11&dirId=1116&docId=55320268',
#  'https://kin.naver.com/qna/detail.naver?d1id=11&dirId=11080102&docId=47833655']
```
데이터는 질문과 답변, 해당 url로 구성되어 있습니다.

## 3.2 feature 핸들링
```py
dataset_rename = {split: ds.rename_column("instruction", "question").rename_column("output", "answer").remove_columns('url') for split, ds in dataset.items()}
dataset_rename
# {'total': Dataset({
#      features: ['question', 'answer'],
#      num_rows: 21155
#  })}
```
feature의 이름을 바꾸려면 `rename_column(기존 feature 이름, 변경할 feature 이름)`를 이용해 바꿀 수 있습니다. 그리고 feature를 제거하려면 `remove_columns(제거할 feature)`을 이용하면 됩니다.

## 3.3 train/test 분할
```py
total_data = total_data.train_test_split(
                        train_size=0.9,
                        shuffle=True,
                        seed=42
)
print(total_data)
# DatasetDict({
#     train: Dataset({
#         features: ['question', 'answer'],
#         num_rows: 19039
#     })
#     test: Dataset({
#         features: ['question', 'answer'],
#         num_rows: 2116
#     })
# })

train_data = total_data['train']
test_data = total_data['test']
```
`train_test_split()`를 이용해 데이터를 분할할 수 있습니다. 'train_size' 또는 'test_size'를 지정해 사용할 수 있습니다. size 값은 0~1 사이 float 형식으로 지정할 경우 '비율'로, int 형식으로 지정할 경우 '샘플 크기'로 불러오는 것을 의미합니다.

# 4. 정리
이렇게 불러온 데이터를 전처리한 뒤 학습 데이터로 만들어 이용할 수 있습니다.

# 참고자료
- [huggingface 공식문서 - datasets.load_dataset](https://huggingface.co/docs/datasets/v2.18.0/en/package_reference/loading_methods#datasets.load_dataset)
- [huggingface 공식문서 - datasets.Dataset.train_test_split](https://huggingface.co/docs/datasets/v2.18.0/en/package_reference/main_classes#datasets.Dataset.train_test_split)