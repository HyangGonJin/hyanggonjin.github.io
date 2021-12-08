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
      }]
