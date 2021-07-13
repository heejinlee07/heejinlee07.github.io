---
title: 타입스크립트를 왜 써야하는가?
date: 2021-07-13
tags: TypeScript
---

## 타입스크립트란?

> TypeScript is Typed JavaScript at Any Scale

- JS에 `타입`을 부여한 언어
- JS와 달리 브라우저에서 실행하려면 파일을 변환하는 `컴파일` 과정이 필요하다.

## 왜 타입스크립트를 써야하는가?

```json
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}
```

API 호출을 통해 위와 같은 데이터를 response로 받아왔고, `const user = {}`와 같은 변수에 저장한다. 그리고, `name`, `email`, `address`를 화면에 출력하고자 한다면, `user.name`, `user.email`, `user.address`와 같은 방식으로 사용될 것이다.

```javascript
// user.name
Leanne Graham

//user.email
Sincere@april.biz

//user.address
[object Object]
```

그런데 다른 값들과 달리 address는 값이 객체이기 때문에 기대했던 값이 `Kulas Light`라면 이 값 대신 `[object Object]`가 반환된다. 또는 작성하는 과정에서 오탈자가 있어서 `user.adress`와 같이 사용했다면 `undefined`를 반환하게 된다. **이처럼 내가 작성한 코드의 결과가 제대로 출력되는지 여부는 화면에 표시된 데이터를 보고 나서야 알 수 있다.**

## 타입스크립트를 쓰면 좋은 점

- 에러의 사전 방지
  위 예시는 브라우저 실행 후 화면에 그려지고 나서야 어떠한 에러가 있는지 알 수 있었지만, TypeScript를 쓰면 브라우저 실행 전에 코드 상에서 미리 에러를 잡을 수 있고, 의도치 않은 값을 반환하지 않도록 수정할 수 있다.

  ```typescript
  function add(a: number, b: number): number {
    return a + b;
  }

  //type으로 지정된 number 대신 스트링 '20'을 넣었기 때문에 아래와 같은 에러 표시
  //Argument of type 'string' is not assignable to parameter of type 'number'.
  add(10, '20');

  //브라우저 실행 전에 에러를 확인하고 올바르게 고칠 수 있다.
  add(10, 20);
  ```

- 코드 가이드 및 자동 완성
  일반 javaScript 코드였다면 toLocaleString()과 같은 api를 사용하고자 할 때 `toLocaleString()`을 한 자씩 입력해야 한다. typeScript는 vscode의 IntelliSense를 이용해서 `toL`까지만 입력해도 `toLocaleString()`를 리스트에서 확인할 수 있고 이를 선택시 바로 자동완성 되어 입력이 된다. IntelliSense는 코드 완성, 매개 변수 정보, 빠른 정보 및 구성원 목록을 비롯한 다양한 코드 편집 기능을 나타내는 일반적인 용어를 말한다. IntelliSense 기능은 때때로 "코드 완성", "콘텐츠 지원" 및 "코드 힌트"와 같은 다른 이름으로 호출된다.

```typescript
function add(a: number, b: number): number {
  return a + b;
}

var result = add(10, 20);

//result.까지만 입력해도 자동완성으로 api 사용가능
result.toLocaleString();
```

## JS에서 JSDoc과 @ts-check로 ts처럼 사용하기

```javascript
// @ts-check

/**
 *
 * @param {number} a 첫번째 숫자
 * @param {number} b 두번째 숫자
 * @returns
 */

function sum(a, b) {
  return a + b;
}

sum(10, 20);
```

위의 코드처럼 사용하면 javaScript에서도 TypeScript처럼 브라우저 실행 전에 타입체크를 할 수 있다.

---

_References_
[타입스크립트 입문 - 기초부터 실전까지](https://inf.run/zNPx)
[타입스크립트 핸드북](https://joshua1988.github.io/ts/why-ts.html#%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%9E%80)
