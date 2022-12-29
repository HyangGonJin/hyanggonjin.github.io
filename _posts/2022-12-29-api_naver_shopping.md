---
title: "Naver API - 네이버 쇼핑 상품 정보 가져오기"
# categories:
#   - DA
# tags:
#   - da
toc : True
toc_sticky: true
last_modified_at: 2022-12-29
---

## 소개
네이버에서는 '파파고 번역'부터 '데이터랩', 'CLOVA Face Recognition' 등 여러 종류의 오픈 API를 지원하고 있습니다. 그 중 본문에서는 '검색API'를 이용해 '네이버 쇼핑'의 상품 검색 결과를 가져오는 방법을 알아보겠습니다. 네이버 오픈API에서 지원하는 목록은 [해당 링크](https://developers.naver.com/products/intro/plan/plan.md)에서 자세히 확인할 수 있습니다. 


API를 활용하기 위해 준비해야될 것들은 [해당 링크](https://developers.naver.com/main/)에서 애플리케이션을 등록한 후 약관 동의 및 인증 절차를 완료해야 합니다. 이후 과정을 위해 만든 애플리케이션의 정보는 아래와 같습니다. 

![image](/assets/img/221226-naver_api_img1.png)

애플리케이션을 만든 후, 애플리케이션 정보에서 본인의 `Client ID`와 `Client Secret`를 확인 가능합니다.


## 방법 1. requests
```py
import numpy as np
import pandas as pd

import os
import sys
import json

import urllib.request
import requests

import warnings
warnings.filterwarnings('ignore')
```

```py
headers = {
              'X-Naver-Client-Id' : 'Your Client Id',
              'X-Naver-Client-Secret' : 'Your Client Secret'
              }

url = 'https://openapi.naver.com/v1/search/shop.json'

param_dict = {
              'query' : 'TV',
              'display' : 5
              }

r = requests.get(
            url = url,
            params = param_dict,
            headers = headers
        )
tmp = r.json()
pd.DataFrame(tmp['items'])
```
`requests`의 `get` method를 통해 'XML', 'JSON' 형식으로 결과를 받을 수 있습니다. parameter로는 `url`, `query`, `display`, `headers` 등이 있습니다. `query`는 검색어로 UTF-8로 인코딩된 값이며, `display`는 한번에 표시할 검색 결과 수로 기본 10, 최대 100까지 지정 가능합니다.

아래 결과는 'TV'를 검색해 나오는 결과 중 5개만 추출한 결과입니다.
![image](/assets/img/221226-naver_api_img2.png)



## 방법 2. urllib.request
```py
headers = {
              'X-Naver-Client-Id' : 'Your Client Id',
              'X-Naver-Client-Secret' : 'Your Client Secret'
              }

client_id = headers['X-Naver-Client-Id']
client_secret = headers['X-Naver-Client-Secret']

query = "TV"
encText = urllib.parse.quote(query)
url = "https://openapi.naver.com/v1/search/shop?query=" + encText # json 결과
# url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # XML 결과
request = urllib.request.Request(url)
request.add_header("X-Naver-Client-Id", client_id)
request.add_header("X-Naver-Client-Secret", client_secret)
response = urllib.request.urlopen(request)

rescode = response.getcode()
if(rescode==200):
    response_body = response.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)

json_tv_sammple = json.loads(response_body.decode('utf-8'))
pd.DataFrame(json_tv_sammple['items'])
```
위 코드는 API 문서 중 '검색 API 블로그 검색 구현 예제'으로 나온 코드를 기반으로 작성하였으며, 파이썬 기본 패키지 중 `urllib`를 이용한 코드입니다.

주의해야할 부분은 결과를 'JSON'으로 불러올 때 UTF-8로 decoding을 해줘야 하는 부분이 '방법 1'과의 차이 중 하나입니다.

![image](/assets/img/221226-naver_api_img3.png)


### 참고자료

- [네이버 API - 사전 준비 사항](https://developers.naver.com/docs/common/openapiguide/appregister.md)

- [네이버 API 문서 - 검색/쇼핑](https://developers.naver.com/docs/serviceapi/search/shopping/shopping.md#%EC%87%BC%ED%95%91)

- [네이버 API 문서 - 검색/블로그](https://developers.naver.com/docs/serviceapi/search/blog/blog.md#%EA%B2%80%EC%83%89-api-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B2%80%EC%83%89-%EA%B5%AC%ED%98%84-%EC%98%88%EC%A0%9C)



