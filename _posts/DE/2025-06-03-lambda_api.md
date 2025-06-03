---
title: "[AWS] Lambda API"
categories: [DE]
tags: [de, aws]
toc : True
toc_sticky: True
math : True
last_modified_at: 2025-06-03
---

AWS SDK인 boto3의 Lambda와 관련된 주요 메서드를 알아 보겠습니다.


## 공통

```py
import boto3
import json

client = boto3.client("lambda")
```


## list_functions()
`list_functions`은 lambda 함수의 목록을 확인하는 메서드입니다.

한 번에 최대 50개의 함수 목록만 출력되며, 그 이상의 함수가 있을 경우 NextMarker 키를 사용해 페이징 처리합니다.

```py
response = client.list_functions()

for function in response['Functions']:
    print(function['FunctionName'], function['Runtime'], function['LastModified'])
```

## invoke()
`invoke`는 지정한 Lambda 함수에 이벤트 데이터를 전달하고, 해당 함수의 실행 결과를 받을 수 있게 하는 메서드입니다.

InvocationType를 통해 호출 방식을 지정할 수 있습니다.

### InvocationType="RequestResponse"
- Default 처리 방식
- 동기 호출
- Lambda 함수가 실행을 마칠 때까지 기다리고, 그 결과를 응답으로 받음
- response['Payload']를 통해 반환값 확인 가능
- 호출 결과가 필요할 때 사용 (예시. API 처리, 테스트 등)

```py
response = client.invoke(
    FunctionName=lambda_function_name,
    InvocationType="RequestResponse",
    Payload=json.dumps({"key1": "value1"}),
)

payload_bytes = response['Payload'].read() # byte
payload_str = payload_bytes.decode("utf-8") # json string
payload_dict = json.loads(payload_str) # string
print(payload_dict)
# {'statusCode': 200, 'body': '{"message": "hello world", "payload": "2025-05-25 10:19:28.079823"}'}
```

참고로 `lambda_client.invoke()`를 호출 response에서 Payload는 스트림 객체 형태로 제공됩니다. 이 값을 확인하기 위해서는 `.read()`를 적용해야 합니다.


### InvocationType="Event"
- 비동기 호출
- 함수 호출 시 `202 Accepted` 응답 즉시 반환
- 실제 실행 결과는 받을 수 없고, 에러도 받지 않음
- 호출 결과를 기다릴 필요가 없을 때 (예시. 로깅, 알림, 후속 처리 트리거 등) 사용

```py
response = client.invoke(
    FunctionName=lambda_function_name,
    InvocationType="Event",
    Payload=json.dumps({"key1": "value1"}),
)
print(response['StatusCode']) # 202: Accepted
```


### InvocationType="DryRun"
- 호출 시도만 하고 실행은 하지 않음
- 권한 확인 용도 (invoke 권한이 있는지만 체크)
- IAM 권한 검증, 배포 전 테스트 용도로 사용

```py
response = client.invoke(
    FunctionName=lambda_function_name,
    InvocationType="DryRun",
    Payload=json.dumps({"key1": "value1"}),
)
response['StatusCode'] # 204: No Content
```