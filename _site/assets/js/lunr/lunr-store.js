var store = [{
        "title": "결측값 다루기",
        "excerpt":"데이터 분석을 하면서 필수적으로 하는 작업이 ‘결측값 확인 및 처리’입니다. 파이썬에서 어떤 값을 결측으로 인식하는지 확인하고, 결측이 있는 경우 함수들이 어떻게 작용하는지 알아봅니다. 1. 결측값 확인 우선, 파이썬에서 어떤 값들을 결측으로 인식하는지 알아봅니다. import numpy as np import pandas as pd a = np.nan b = \"\" c = None...","categories": ["DA"],
        "tags": ["data analysis","python","numpy","pandas"],
        "url": "/da/Dealing_to_missing_data/",
        "teaser": null
      },{
        "title": "데이터베이스 연결",
        "excerpt":"파이썬에서 DB에 직접 연결이 필요한 경우가 있습니다. 이에, 파이썬을 이용해 MySQL과 MongoDB에 접근하는 방법을 알아봅니다. 1. MySQL 1.1 DB 연결 import os import sys import logging import pymysql # DB 정보. host = \"your host!\" port = \"your port!\" username = \"your username!\" database = \"your database name!\" password =...","categories": ["DE"],
        "tags": ["data engineering","python"],
        "url": "/de/Connect_to_DB(mysql,mongo)/",
        "teaser": null
      },{
        "title": "유용한 Python 함수 - Part 1.",
        "excerpt":"많은 경우에 수집된 데이터가 그대로 데이터 분석에 사용되지 않습니다. 사용하는 방법론에 따라, 분석 대상에 따라, 이외 여러 가지의 이유로 데이터를 변환하는 작업을 합니다. 이런 데이터 핸들링에 도움이 되는 python 함수들을 알아보고자 합니다. enumerate enumerate(*args, **kwargs) 예시) 반복문에서 순서와 값이 모두 필요할 때 사용. a = ['apple','banana','cat','dog'] for index, element in...","categories": ["DA"],
        "tags": ["data analysis","python","numpy","pandas"],
        "url": "/da/useful_python_functions_1/",
        "teaser": null
      },{
        "title": "유용한 Python 함수 - Part 2.",
        "excerpt":"Part 1.에 이어서 데이터 핸들링에 도움이 되는 python 함수들을 알아봅니다. pivot def pivot(index=None, columns=None, values=None) 예시) index와 column에 대해 value를 가지는 형태로 변환할 때 사용 (pivot). index와 column에 대해 unique한 값을 가지고 있어야 함 (pivot_table과의 차이). parameters index : str or object or a list of str, optional columns :...","categories": ["DA"],
        "tags": ["data analysis","python","numpy","pandas"],
        "url": "/da/useful_python_functions_2/",
        "teaser": null
      },{
        "title": "DataFrame Style",
        "excerpt":"pandas의 DataFrame에서는 format, highlighting 등 여러 가지 style을 지정할 수 있습니다. (경험에 의하면) style의 지정은 단순히 이쁘게 보여주는 기능 외에도 하나의 column 내에서 값을 비교하거나, 관심있는 수치 구간을 확인할 때 직관적으로 원하는 정보를 쉽게 얻을 수 있다는 장점이 있었습니다. Data 코드 작성에는 ‘KDX 한국데이터거래소’에 있는 삼성카드 온라인쇼핑 요일/시간대별 이용 특징...","categories": ["DA"],
        "tags": ["python","pandas"],
        "url": "/da/pandas-data-frame-styler/",
        "teaser": null
      }]
