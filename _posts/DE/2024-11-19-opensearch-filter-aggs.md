---
title: "[Opensearch] filter & aggs 쿼리 조회 결과가 없는 경우"
categories: [DE]
tags: [de, opensearch]
toc : True
toc_sticky: True
math : True
last_modified_at: 2024-11-19
---

OpenSearch에서 `filter`와 `aggs`를 사용하는 쿼리 결과 중 결과가 조회되지 않은 상황에 대해 알아보겠습니다.


## 쿼리
아래 쿼리는 `status`가 "active"인 문서만 필터링한 문서에 대해 category 필드를 기준으로 문서 수를 집계하는 쿼리입니다.
```
{
  "query": {
    "bool": {
      "filter": [
        {
          "term": {
            "status": "active"
          }
        }
      ]
    }
  },
  "aggs": {
    "category_count": {
      "terms": {
        "field": "category.keyword",
        "size": 10
      }
    }
  }
}

```

## 결과
쿼리 결과가 다음과 같이 나왔다고 가정합니다.
```
{
  "hits": {
    "total": {
      "value": 0,
      ...
    },
    "hits": ...
  },
  "aggregations": {
    "category_count": {
      "buckets": []
    }
  }
}
```

## 설명
### hits.total.value = 0
- hits는 검색 쿼리에 의해 반환된 문서의 총 개수를 나타냅니다.
- hits.total.value = 0의 의미는 필터 조건에 부합하는 데이터가 없을 때를 의미합니다.

### aggregations.group_variable.buckets = []
- aggregations는 데이터의 집계 결과를 나타냅니다. 
- aggregations.group_variable.buckets = []의 의미는 집계가 수행되지 않았거나, 결과가 비어 있을 때를 의미합니다.
- 데이터가 없어서 집계할 항목이 없거나, 잘못된 쿼리로 인해서 집계가 제대로 수행되지 않은 상황에서 발생할 수 있습니다.