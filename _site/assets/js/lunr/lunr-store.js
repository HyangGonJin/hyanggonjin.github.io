var store = [{
        "title": "결측값 다루기",
        "excerpt":"데이터 분석을 하면서 필수적으로 하는 작업이 ‘결측값 확인 및 처리’입니다. 파이썬에서 어떤 값을 결측으로 인식하는지 확인하고, 결측이 있는 경우 함수들이 어떻게 작용하는지 알아봅니다. 1. 결측값 확인 우선, 파이썬에서 어떤 값들을 결측으로 인식하는지 알아봅니다. import numpy as np import pandas as pd a = np.nan b = \"\" c = None...","categories": ["DA"],
        "tags": ["data analysis","python","numpy","pandas"],
        "url": "/da/Dealing_to_missing_data/",
        "teaser": null
      },{
        "title": "데이터베이스 연결",
        "excerpt":"파이썬에서 DB에 직접 연결이 필요한 경우가 있습니다. 이에, 파이썬을 이용해 MySQL과 MongoDB에 접근하는 방법을 알아봅니다. 1. MySQL 1.1 DB 연결 import os import sys import logging import pymysql # DB 정보. host = \"your host!\" port = \"your port!\" username = \"your username!\" database = \"your database name!\" password =...","categories": ["DE"],
        "tags": ["data engineering","mysql","mongodb"],
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
        "title": "DataFrame Style 적용하기 (1)",
        "excerpt":"pandas의 DataFrame에서는 format, highlighting 등 여러 가지 style을 지정할 수 있습니다. (경험에 의하면) style의 지정은 단순히 이쁘게 보여주는 기능 외에도 하나의 column 내에서 값을 비교하거나, 관심있는 수치 구간을 확인할 때 직관적으로 원하는 정보를 쉽게 얻을 수 있다는 장점이 있었습니다. Data 코드 작성에는 ‘KDX 한국데이터거래소’에 있는 삼성카드 온라인쇼핑 요일/시간대별 이용 특징...","categories": ["DA"],
        "tags": ["python","pandas"],
        "url": "/da/pandas-data-frame-styler/",
        "teaser": null
      },{
        "title": "DataFrame Style 적용하기 (2)",
        "excerpt":"이전 글을 통해 pandas의 데이터프레임의 셀들의 배경과 텍스트에 스타일을 설정하는 방법에 대해서 알아보았습니다. 이번에는 index나 header 등 다른 요소들에 스타일을 설정하는 방법과 더불어 유용한 기능을 알아보고자 합니다. 본문은 pandas 공식문서에 있는 ‘Table Visualization’ 부분 중 일부를 정리했습니다. import pandas as pd import numpy as np df = pd.DataFrame([[38.0, 2.0, 18.0,...","categories": ["DA"],
        "tags": ["python","pandas"],
        "url": "/da/visualization_of_tabular_data_using_styler/",
        "teaser": null
      },{
        "title": "모듈 import",
        "excerpt":"Python에서는 다양한 함수, 패키지 등이 존재하지만 부득이하게 직접 함수 등을 만들어서 사용해야하는 경우가 있습니다. 이때 import하는 파일을 모듈(module)이라고 합니다. 작성한 모듈을 어떤 식으로 불러오는지 간단한 예제를 통해서 알아보겠습니다. 먼저, 모듈에 대한 간단한 정의입니다. 모듈이란 함수나 변수 또는 클래스를 모아 놓은 파일이다. 모듈은 다른 파이썬 프로그램에서 불러와 사용할 수 있게끔 만든...","categories": ["DE"],
        "tags": ["de","python"],
        "url": "/de/import-the-py-file/",
        "teaser": null
      },{
        "title": "Airflow - MySQL operator",
        "excerpt":"Apache Airflow는 워크플로우 스케쥴을 작성하고, 모니터링하기 위한 오픈 소스 워크플로우 관리 플랫폼입니다. 파이썬을 이용하여 보다 쉽고, 복잡한 파이프라인을 구성할 수 있게 합니다. Airflow를 이용해 MySQL에 데이터를 쌓는 작업을 자동화할 수 있습니다. 0. test DB 생성 test_airflow DB를 생성한 후, 현재 날짜와 시간을 업데이트 해주는 간단한 쿼리를 작성합니다. # test_airflow.sql --...","categories": ["DE"],
        "tags": ["de","airflow","mysql"],
        "url": "/de/airflow/",
        "teaser": null
      },{
        "title": "Airflow - Custom operator",
        "excerpt":"Airflow는 다양한 Operator를 지원하지만, 필요한 Operator를 직접 만들 수도 있습니다. airflow.models.baseoperator.BaseOperator를 통해 이러한 확장성을 지원합니다. Custom Operator 생성 BaseOperator에 2가지를 override하는 것으로 Custom Operator를 생성할 수 있습니다. Constructor - 생성할 Operator의 parameter를 정의합니다. Execute - Operator가 실행할 코드를 작성합니다. Operator 생성 생성할 operator 파일을 만들어 ‘plugins-operators’ 폴더(‘custom-operator’ 등 폴더명을 다르게...","categories": ["DE"],
        "tags": ["de","mongodb","airflow"],
        "url": "/de/airflow_custom_operator/",
        "teaser": null
      }]
