---
title: GraphQL & Apollo
date: 2022-06-17
tags:
---

REST API : GraphQL 이전부터 사용.

- URI + 요청

GraphQL은 왜 만들어졌는가?

difference between graphQL and rest API

restAPI의 문제점

- Overfetching

💡 딱 필요한 정보들만 받아올 수는 없을까?

- Underfetching

💡 필요한 정보들을 요청 한 번에 받아올 수는 없을까?

rest API GET = query {}
rest API POST 와 같이 서버로 데이터를 추가/수정/삭제하는 경우
mutation {}

## GraphQL의 강점

- 필요한 정보들만 선택하여 받아올 수 있음
  - overfetching 문제 해결
  - 데이터 전송량 감소
- 여러 계층의 정보들을 한 번에 받아올 수 있음
  - underfetching 문제 해결
  - 요청횟수 감소
- 하나의 endpoint에서 모든 요청을 처리
  - 하나의 URI에서 POST로 모든 요청 가능

## Apollo

GraphQL은 명세, 형식일 뿐. GraphQL을 구현할 솔루션이 필요하다.

- 백엔드에서 정보를 제공 및 처리
- 프론트엔드에서 요청 전송
- GraphQL.js, GraphQL Yoga, AWS Amplify, Relay...
- 기타 솔루션들 살펴보기

- Apollo는 백/프론트 모두 제공
- 간편하고 쉬운 설정
- 풍성한 기능들 제공

### ApolloServer

- ApolloServer : typeDef와 resolver를 인자로 받아 서버 생성
- typeDef: GraphQL 명세에서 사용될 데이터, 요청의 타입 지정
- gql로 생성됨
- resolver
  - 서비스의 액션들을 함수로 지정
  - 요청에 따라 데이터를 반환, 입력, 수정, 삭제
  - GraphQL playground
    - 작성한 GraphQL type, resolver 명세 확인
    - 데이터 요청 및 전송 테스트

## GraphQL 자료형

1. 스칼라 타입

```javascript
type EquipmentAdv {
    id: ID!
    used_by: String!
    count: Int!
    use_rate: Float
    is_new: Boolean!
 }
```

- ID: 기본적으로는 String이나, 고유 식별자 역할임을 나타냄
- String: UTF-8 문자열
- Int: 부호가 있는 32비트 정수
- Float: 부호가 있는 부동소수점 값
- Boolean: 참/거짓 값

2. ! : Non Null
   null을 반환할 수 없음

3. 열거 타입
   미리 지정된 값들 중에서만 반환
4. 리스트 타입
   특정 타입의 배열을 반환

| 선언부     | users: null | users:[] | users:[...,null] |
| ---------- | ----------- | -------- | ---------------- |
| [String]   | ✅          | ✅       | ✅               |
| [String!]  | ✅          | ✅       | ❌               |
| [String]!  | ❌          | ✅       | ✅               |
| [String!]! | ❌          | ✅       | ❌               |

5. 객체 타입 : 사용자에 의해 정의된 타입들
6. union: 타입 여럿을 한 배열에 반환하고자 할 떄 사용
7. intergace
   - 유사한 객체 타입을 만들기 위한 공통 필드 타입
   - 추상 타입 - 다른 타입에 implement 되기 위한 타입

---

_References_
[Apollo Client](https://www.apollographql.com/docs/react/)
[GraphQL](https://graphql.org/code/#javascript)
