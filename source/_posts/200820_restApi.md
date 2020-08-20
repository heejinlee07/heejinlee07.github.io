---
title: REST API
date: 2020-08-20 15:00
tags:
---

## REST(Representational State Transfer)

2000년도에 로이 필딩 (Roy Fielding)의 박사학위 논문에서 최초로 소개된 개념

- REST: HTTP를 기반으로 클라이언트가 서버의 리소스에 접근하는 방식을 규정한 아키텍처
- REST API: REST를 기반으로 서비스 API를 구현한 것

## REST API의 구성

- 자원(RESOURCE) - URI
- 행위(Verb) - HTTP METHOD
- 표현(Representations) - 페이로드

## REST API 설계 원칙

1. **URI는 리소스를 표현해야 한다. 리소스를 식별할 수 있는 이름은 명사형으로 사용한다.**
2. **리소스에 대한 행위는 HTTP Method(GET, POST, PUT, DELETE)로 표현한다. 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)를 알리는 방법을 말한다.**

```
URI는 리소스를 표현하는 데 중점을 두고 있으므로 명사형으로 명시
`delete`처럼 리소스에 대한 행위를 표현하면 안된다.

GET /weathers/delete/1 -> X

리소스에 대한 행위는 가장 앞에 있는 `GET`과 같은 HTTP Method로
어떠한 행위를 할 것인지를 표현한다.
GET /weathers/1 -> O
```

3. HTTP Method(GET, POST, PUT, DELETE)
   리소스에 대한 정의는 다음의 HTTP 요청 메소드를 이용하여 CRUD를 한다. CRUD는 컴퓨터 소프트웨어가 가지는 기본적인 데이터 처리 기능인 Create(생성), Read(읽기), Update(갱신), Delete(삭제)를 묶어서 일컫는 말이다. 사용자 인터페이스가 갖추어야 할 기능(정보의 참조/검색/갱신)을 가리키는 용어로서도 사용된다.

   | HTTP Method |      종류      |       목적       | 페이로드 |
   | :---------: | :------------: | :--------------: | :------: |
   |     GET     | index/retrieve | 리소스 조회/취득 |  **X**   |
   |    POST     |     create     |   리소스 생성    |  **O**   |
   |     PUT     |    replace     | 리소스 전체교체  |  **O**   |
   |    PATCH    |     update     | 리소스 일부 수정 |  **O**   |
   |   DELETE    |     delete     |   리소스 삭제    |  **X**   |

## URI 설계 시 주의사항

1. 슬래시(/)는 계층 관계를 나타낼 때 사용
2. URI 마지막 문자로 슬래시(/)를 포함하지 않는다.
3. 하이픈(-)은 URI 가독성을 높이는데 사용
4. 밑줄(\_)은 URI에 사용하지 않는다.
5. URI 경로에는 소문자가 적합하다.
6. 파일 확장자는 URI에 포함시키지 않는다.

### 리소스 간의 관계를 표현

```
/리소스명/리소스 ID/관계가 있는 다른 리소스명

ex)    GET : /users/{userid}/devices
(일반적으로 소유 ‘has’의 관계를 표현할 때)

서브 리소스에 명시적으로 표현
ex) GET : /users/{userid}/likes/devices
(관계명이 애매하거나 구체적 표현이 필요할 때)
```

### 자원을 표현

컬렉션과 도큐먼트로 URI에 표현

- Collection: 문서 또는 객체들의 집합. <u>컬렉션은 복수형으로로 사용</u>
- Document: 문서

ex) http\_://restapi.example.com/sports(**collection**)/soccer(**Document**)/players(**collection**)/13(**Document**)

---

_References_
[TOAST](https://meetup.toast.com/posts/92)
[CRUD](https://ko.wikipedia.org/wiki/CRUD)
[poiemaweb](https://poiemaweb.com/fastcampus/rest-api)
