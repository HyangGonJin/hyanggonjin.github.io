---
title: "[Opensearch] index 추출 api"
categories: [DE]
tags: [de, opensearch]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-11-20
---

파이썬에서 `opensearch-py` 라이브러리를 이용해 opensearch 문서의 index를 추출하는 api에 대해서 알아보겠습니다.


## client.cat.indices
```py
from opensearchpy import OpenSearch

client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    http_auth=('user', 'password')
)

index_pattern = "logs-2024-11-*"
indices = client.cat.indices(index=index_pattern, format="json")
for index in indices:
    print(index)
# [
#   {
#     "health": "green",
#     "status": "open",
#     "index": "logs-2024-11-01",
#     "uuid": "xks7...",
#     "pri": "1",
#     "rep": "1",
#     "docs.count": "1000",
#     "docs.deleted": "0",
#     "store.size": "5mb",
#     "pri.store.size": "5mb"
#   },
#   ...
# ]
```

- `index_pattern`을 통해 특정 패턴의 인덱스만 조회합니다. 예시에서는 2024년 11월 log 데이터를 조회합니다.
- `client.cat.indices(format="json")`를 통해 index와 관련된 정보를 가져옵니다.
- 해당 방법은 인덱스의 요약 정보를 가져옵니다. 주로 인덱스의 메타데이터(상태, 문서 수, 스토리지 크기 등)만 반환하므로 데이터 양이 적어 빠르고 효율적입니다.


## client.indices.get
```py
from opensearchpy import OpenSearch

client = OpenSearch(
    hosts=[{'host': 'localhost', 'port': 9200}],
    http_auth=('user', 'password')
)

index_pattern = "logs-2024-11-*"
index_details = client.indices.get(index=index_pattern)
for index_name, details in index_details.items():
    print(f"Index: {index_name}, Details: {details}")
# {
#   "logs-2024-11-01": {
#     "aliases": {},
#     "mappings": {
#       "properties": {
#         "timestamp": { "type": "date" },
#         "message": { "type": "text" }
#       }
#     },
#     "settings": {
#       "index": {
#         "number_of_shards": "1",
#         "number_of_replicas": "1"
#       }
#     }
#   }
# }
```

- `index_pattern`을 통해 특정 패턴의 인덱스만 조회합니다. 예시에서는 2024년 11월 log 데이터를 조회합니다.
- `client.indices.get(index=index_pattern)`를 통해 index와 관련된 정보를 가져옵니다.
- 해당 방법은 지정한 인덱스의 전체 설정 및 매핑 정보를 가져옵니다. 지정된 인덱스의 세부 정보(매핑, 설정, 별칭 등)를 포함한 결과를 반환하기 때문에 상대적으로 데이터 양이 많습니다.
