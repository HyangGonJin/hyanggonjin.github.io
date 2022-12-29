---
title: "결측값 다루기"
categories: [DA, Python]
tags: [da, python]
toc : True
toc_sticky: true
last_modified_at: 2021-12-05
---

데이터 분석을 하면서 필수적으로 하는 작업이 '결측값 확인 및 처리'입니다.   
파이썬에서 어떤 값을 결측으로 인식하는지 확인하고, 결측이 있는 경우 함수들이 어떻게 작용하는지 알아봅니다.

## 1. 결측값 확인
 우선, 파이썬에서 어떤 값들을 결측으로 인식하는지 알아봅니다.

```py
import numpy as np
import pandas as pd

a = np.nan
b = ""
c = None

print(a) # nan
print(b) #
print(c) # None

df = pd.DataFrame(data=[a,b,c],columns=["var1"])
df.isna()
```

![image](/assets/img/missing1_output.png)


`nan`과 `None`은 결측값으로 정확히 인식하였으나, ""(빈 칸)의 경우는 결측으로 인식하지 못했습니다.     


<p align="center">
<img src = '/assets/img/pandas_missing_options.png' width="600" height="120">
        <figcaption align="center"> <출처 : pandas 공식문서> </figcaption>
<!-- </img> -->
</p> 

참고로, pandas의 `read_csv` 함수의 'na_values' 옵션을 보면 여러 형태의 결측값을 지원하고 있습니다.   
   

## 2. 결측값 연산

다음으로, 결측값이 있는 경우 다양한 연산 or 함수들이 어떻게 적용되는지 알아봅니다.

```py
import numpy as np

lst1 = [np.nan,1,2,3,4]

print(np.nan+1) # nan
print(np.sum([np.nan,1])) # nan
print(np.nansum([np.nan,1])) # 1.0

print(np.max(lst1)) # nan
print(np.min(lst1)) # nan
print(np.nanmax(lst1)) # 4.0
print(np.nanmin(lst1)) # 1.0
```

위 결과에서 보듯이 결측이 포함된 경우, 일반적으로 하는 사칙연산이나 `max`, `min` 등과 같은 함수들의 사용한다면 무조건 결측을 출력합니다. 이에 대한 해결법 중 하나로 numpy에서 지원하는 다양한 함수들을 이용할 수 있습니다. numpy에서 지원하는 결측값과 관련된 함수들을 아래를 참고하길 바랍니다.

<!-- ![결측관련 함수](./images/nan_function.png)    -->
<p align="center">
<img src = '/assets/img/nan_function.png' width="600" height="500">
        <figcaption align="center"> <출처 : numpy 공식문서> </figcaption>
<!-- </img> -->
</p> 

## 3. pandas의 `groupby`

```py
import numpy as np
import pandas as pd

a = [1,1,1]
b = [1,2,np.nan]
c = [1,3,3]
d = [2,2,1]
e = [2,3,np.nan]
f = [2,np.nan,3]

lst1 = [a,b,c,d,e,f]
df1 = pd.DataFrame(data=lst1,columns=['grp','var1','var2']) 

df1.groupby("grp",as_index=False).aggregate({'var1':'mean','var2':'mean'})
df1.groupby("grp",as_index=False).aggregate({'var1':np.sum,'var2':np.mean})
```

![image](/assets/img/pandas_groupby.png)

결측값이 포함된 데이터프레임을 이용해 pandas의 `groupby` 함수를 적용한 결과를 볼 때, 결측을 제외한 결과를 계산함을 알 수 있습니다.