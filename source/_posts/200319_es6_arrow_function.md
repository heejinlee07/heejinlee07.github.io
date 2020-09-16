---
title: ES6 함수의 추가 기능
date: 2020-03-19
tags:
---

## 함수의 구분

ES6 이전의 함수는 일반함수, 생성자 함수, 메소드의 호출 등 동일한 함수도 다양한 형태로 호출할 수 있었다. 즉 callable이면서 constructor이다. 객체에 바인딩 된 메소드 역시 일반 함수 또는 생성자 함수로 호출 가능하다. 그런데 이와 같은 경우 불필요한 프로토타입 객체를 생성한다.

```javascript
var foo = function () {};

foo(); //일반함수로 호출
new foo(); //생성자 함수로 호출
```

ES6에서는 함수 호출방식에 제약이 없어 생기는 문제를 방지하고자 함수를 사용 목적에 따라 3가지로 구분한다.

| ES6 함수의 구분 | constructor | prototype | super | arguments |
| --------------- | ----------- | --------- | ----- | --------- |
| 일반함수        | O           | O         | X     | O         |
| 메소드          | X           | X         | O     | O         |
| 화살표 함수     | X           | X         | X     | X         |

## 메소드

ES6 사양에서 메소드는 메소드 축약 표현으로 정의된 함수 만을 의미한다. 따라서 메소드는 생성자 함수로 호출할 수 없고, 인스턴스 생성, 프로퍼타입 프로퍼티, 프로토타입 등을 생성하지 않는다. 또한 메소드가 바인딩된 객체를 가리키는 내부 슬롯 \[\[HomeObject\]\]를 갖고, 이를 이용하여 super키워드를 사용할 수 있다.

```javascript
const obj = {
  x: 1,
  // foo는 메소드이다.
  foo() {
    return this.x;
  },
  // bar에 바인딩된 함수는 메소드가 아닌 일반 함수이다.
  bar: function () {
    return this.x;
  },
};

console.log(obj.foo()); // 1
console.log(obj.bar()); // 1
```

### 메소드 축약 표현

```javascript
// ES5
var obj = {
  name: "Lee",
  sayHi: function () {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee

// ES6
const obj = {
  name: "Lee",
  // 메소드 축약 표현
  sayHi() {
    console.log("Hi! " + this.name);
  },
};

obj.sayHi(); // Hi! Lee
```

## 화살표 함수

기존의 함수 정의 방법보다 간략하게 정의할 수 있고, 콜백 함수 내부에서 this가 전역 객체를 가리키는 문제를 해결하는 데 유용하다. 항상 익명이며, 생성자로 사용할 수 없다.

### 화살표 함수 정의

1. 매개변수 선언

- 매개변수가 여러 개면 소괄호 안에 매개 변수를 선언한다. 한개인 경우 소괄호를 생략할 수 있다.
  `(x,y) => {...}`

- 매개 변수가 없을 때 소괄호를 생략할 수 없다.
  `() => {...}`

2. 함수 몸체 정의

- 함수 몸체가 한 줄의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다. 이때 문은 암묵적으로 반환된다. 몸체가 여러 줄로 구성된다면 중괄호를 생략할 수 없고, 반환값이 있다면 명시적으로 반환한다.
  `x => x * x; // 왼쪽의 표현과 동일하다. x => { return x * x; }`
- 객체 리터럴을 반환할 때는 소괄호로 감싸준다.
  `() => { return { a: 1 }; } // 왼쪽표현과 동일하다. () => ({ a: 1 })`
- 즉시실행함수로 사용할 수 있다.
- 고차 함수에 인수로 전달할 수 있다.

### 화살표 함수와 일반 함수의 차이

1. 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor이다.
2. 화살표 함수는 인스턴스를 생성할 수 없으므로 prototype 프로퍼티가 없고 프로토타입도 생성하지 않는다.
3. 중복된 매개 변수 이름을 선언할 수 없다.
   `const arrow = (a, a) => a + a; // SyntaxError: Duplicate parameter name not allowed in this context`
4. 화살표 함수는 함수 자체의 this, arguments, super, new.target 바인딩을 갖지 않는다. 따라서 화살표 함수 내부에서 this, arguments, super, new.target를 참조하면 스코프 체인을 통해 상위 컨텍스트의 this, arguments, super, new.target를 참조한다.

### this

화살표 함수는 함수 자체의 this 바인딩이 없다. 화살표 함수 내부에서 this를 참조하면 상위 컨텍스트의 this를 그대로 참조한다. 이를 Lexical this라 한다. 이는 마치 렉시컬 스코프(“12.7. 렉시컬 스코프” 참고)와 같이 화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.

---

_Reference_
[poiemaweb/fastcampus](https://poiemaweb.com/fastcampus/es6-function)
[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98S)
[poiemaweb](https://poiemaweb.com/es6-enhanced-object-property#3-%EB%A9%94%EC%86%8C%EB%93%9C-%EC%B6%95%EC%95%BD-%ED%91%9C%ED%98%84)
