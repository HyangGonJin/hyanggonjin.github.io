---
title: "[DA] pendulum - datetime 다루기"
categories: [DA]
tags: [da]
toc : True
toc_sticky: true
last_modified_at: 2022-04-11
---

Python에서 `datetime` 객체를 다루는 라이브러리 중 하나인 `pendulum`에 대해서 간단히 알아보겠습니다.

# Instantiation
`pendulum`의 default timezone은 'UTC'입니다.

```py
import pendulum

dt = pendulum.datetime(2022, 3, 1)
dt
# DateTime(2022, 3, 1, 0, 0, 0, tzinfo=Timezone('UTC'))
```

`local()` 함수를 이용해 로컬 timezone 정보를 이용하는 것이 가능합니다.
```py
dt1 = pendulum.local(2022, 3, 1)
dt1
# DateTime(2022, 3, 1, 0, 0, 0, tzinfo=Timezone('Asia/Seoul'))

print(dt1.timezone.name)
# Asia/Seoul
```

`now()` 이외에도 `today()`, `tomorrow()`, `yesterday()` 등의 함수를 이용하여 datetime을 계산하는 것이 가능합니다.
```py
now = pendulum.now()
print(now)
# 2022-03-27T14:52:40.586083+09:00

dt = pendulum.today()
print(dt)
# 2022-03-27T00:00:00+09:00

dt1 = pendulum.tomorrow()
print(dt1)
# 2022-03-28T00:00:00+09:00

dt2 = pendulum.yesterday()
print(dt2)
# 2022-03-26T00:00:00+09:00
```
---
# Parsing
`parse()` 함수를 통해 '날짜' 또는 '시간'형태로 된 문자열을 파싱해 datetime으로 변환할 수 있습니다. `strict` 옵션을 이용하여 표준화되지 않은 문자열에 대해서도 파싱이 가능합니다.
```py
dt = pendulum.parse('2022-03-01 03:20:00')
print(dt)
# 2022-03-01T03:20:00+00:00

dt1 = pendulum.parse('2022-03-01')
print(dt1)
# 2022-03-01T00:00:00+00:00

dt2 = pendulum.parse('03:20:00')
print(dt2)
# 2022-03-27T03:20:00+00:00

dt3 = pendulum.parse('31-01-01', strict=False)
print(dt3)
# 2031-01-01T00:00:00+00:00
```

`from_format()`함수를 통해 형식을 지정해 문자열을 datetime 객체로 변환할 수 있습니다.
```py
dt = pendulum.from_format('1975-05-21 22', 'YYYY-MM-DD HH')
print(dt)
# 1975-05-21T22:00:00+00:00
```
---   
# Localization
`set_locale()` 와 `diff_for_humans()` 함수는 지정해 준 옵션에 따라 로컬라이즈되어 표현됩니다. 
```py
pendulum.set_locale('ko')
print(pendulum.now().add(years=1).diff_for_humans())
# 1년 후

pendulum.set_locale('en')
print(pendulum.now().add(years=1).diff_for_humans())
# in 1 year
```

---
# 참고자료
  
  * [pendulum 공식문서](https://pendulum.eustace.io/docs/#introduction)
  