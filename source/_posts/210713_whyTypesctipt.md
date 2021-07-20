---
title: 타입스크립트를 왜 써야하는가?
date: 2021-07-13
tags: TypeScript
---

## 타입스크립트란?

> TypeScript is Typed JavaScript at Any Scale

- JS에 `타입`을 부여한 언어
- JS와 달리 브라우저에서 실행하려면 파일을 변환하는 `컴파일` 과정이 필요하다.

> TypeScript는 JS의 구문이 허용되는, JavaScript의 상위 집합 언어

- TS는 JS 위의 레이어: JS의 기능을 제공하면서 그 위에 자체 레이어를 추가한다.
- JS가 가진 `런타임 특성`을 변화시키지 않는다.
- TS의 컴파일러가 코드 검사를 마치면 타입 삭제 후 `컴파일된 코드`를 만들어낸다.

### 타입 추론

JavaScript가 동작하는 방식을 이해함으로써 TypeScript는 JavaScript 코드를 받아들이면서 타입을 가지는 타입 시스템을 구축할 수 있다.

### 타입 정의

JavaScript는 다양한 디자인 패턴을 가능하게 하는 동적 언어인데, 몇몇 디자인 패턴은 자동으로 타입을 제공하기 힘들다. 이럴 때는 TS에게 타입이 무엇이 되어야 하는지 명시 가능한 JS언어의 확장을 지원한다. 예를 들어 아래 예시에서 객체의 형태를 명시적으로 사용하기 위해 `interface` 선언했다.

```typescript
interface User {
  name: string;
  id: number;
}

const user = {
  name: 'Hayes',
  id: 0,
};
```

### 타입 구성

객체들을 조합하여 더 크고 복잡한 체계를 만드는 것처럼 TS는 유니언과 제네릭이 있다.

- `유니언`: 타입이 여러 타입 중 하나일 수 있음을 설명한다. e.g. type MyBool = true | false;
- `제네릭`: 타입에 변수를 제공하는 방법이다. 배열이 일반적인 예시이며, 제네릭이 없는 배열은 어떤 것이든 포함할 수 있다. 제네릭이 있는 배열은 배열 안의 값을 설명할 수 있다.

### 구조적 타입 시스템

TS의 핵심 원칙 중 하나로 타입 검사가 값이 있는 형태에 집중한다는 것이다. 만약 두 객체가 같은 형태를 가지면 같은 것으로 간주된다.

---

## 왜 타입스크립트를 써야하는가?

Javascript는 예기치 않은 동작을 유발하게 하는 몇 가지 문제점을 가지고 있다. 예를 들어 `==`을 사용하면 인수를 강제변환한다거나(e.g. '' == 0 => 참이다) 존재하지 않는 객체의 프로퍼티 값에 접근하려고 했을 때 접근을 허용하는 점이다. c나 c++ 같은 컴파일 언어는 실행 전 컴파일 단계에서 오류를 미리 확인하고 고칠 수 있다. **이렇게 프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것을 정적 검사라 하고, 어떤 것이 오류인지와 어떤 것이 연산 되는 값에 기인하지 않음을 정하는 것을 정적 타입 검사라 한다.**

> 그러나 JavaScript는 인터프리터 언어이기 때문에 컴파일 단계가 없고, 곧바로 실행되기 때문에 실제로 실행하기 전까지 코드의 문제를 잡아낼 수 없다. 하지만 TypeScript는 정적 타입 검사자로써 프로그램 실행 전 값의 종류를 기반으로 프로그램의 오류를 찾아낸다.

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

---

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
[TS for the New Programmer](https://typescript-kr.github.io/pages/tutorials/ts-for-the-new-programmer.html)
[TS for the JS Programmers](https://typescript-kr.github.io/pages/tutorials/ts-for-js-programmers.html)
