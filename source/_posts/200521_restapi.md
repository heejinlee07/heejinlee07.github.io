---
title: Rest API
date: 2020-05-21 17:00
tags:
---

## REST API

REST는 HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍쳐이고, REST API는 REST를 기반으로 서비스 API를 구현한 것을 의미한다.

## REST API의 구성

- 자원(resource): HTTP URI로 표현, 자원을 내용으로 함.
- 행위(verb): HTTP METHOD로 표현, 자원에 대한 행위를 내용으로 함.
- 표현(representations): HTTP 페이로드로 표현, 자원에 대한 행위의 구체적 내용을 담고 있음.

## REST API 디자인 가이드

1. URI는 자원(resource)를 표현해야 한다. URI는 통합 자원 식별자(Uniform Resource Identifier, URI)로 하나의 리소스를 가리키는 문자열이며, 인터넷 프로토콜에 항상 붙어 다니고, 인터넷에서 요구되는 기본 조건이다. 웹 상에서의 위치로 resource를 식별한다. 웹주소인 URL이 가장 흔한 URI 중 하나이다.

```
- resource는 명사형으로 사용
- resource에 대한 행위는 HTTP METHOD로 표현.

GET / getTodos / 1; (X)
GET / todos / 1; (O)
DELETE /todos/1 (O)
```

2. HTTP METHOD

   > GET: 데이터 조회
   > POST: 데이터 등록
   > PUT: 데이터 수정
   > DELETE: 데이터 제거

3. 주의사항

- 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용하며, 마지막 문자에는 슬래시(/)를 포함하지 않는다.
  `http://restapi.example.com/houses/apartments (0)`
- 가독성을 높이기 위해 하이픈(-)을 사용할 수 있지만 밑줄(\_)은 사용하지 않는다.
- URI 경로에는 소문자가 적합하고, 파일 확장자를 포함하지 않는다.

## HTTP 응답 상태 코드

1. 정상적인 수행
   200: 클라이언트의 요청을 정상적으로 수행함.
2. 클라이언트 에러 응답
   404: 요청받은 리소스를 찾을 수 없음.
3. 서버 에러 응답
   500: 서버가 처리 방법을 모르는 상황. 서버에 문제가 있다.
4. 리다이렉션
   301: 요청한 리소스의 URI가 변경되었음

---

_References_
[MDN](https://developer.mozilla.org/ko/docs/Glossary/URI)
[TOAST](https://meetup.toast.com/posts/92)
