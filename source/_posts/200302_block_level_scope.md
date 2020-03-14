---
title: let, const와 블록 레벨 스코프
date: 2020-03-02
tags:
---

## var 키워드로 선언한 변수의 문제점

### 변수 중복 선언 허용

```javascript
var x = 1;
// var 키워드로 선언된 변수는 같은 스코프 내에서 중복 선언을 허용한다.
// 아래 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 것처럼 동작한다.
var x = 2;
console.log(x); // 2
```

`var 키워드`는 중복 선언을 허용하기 때문에 위와 같이 변수가 이미 선언되어 있는 것을 모르고 중복 선언 및 할당을 하면 의도치 않게 변수값이 변경된다.

### 함수 레벨 스코프

함수의 코드 블록만이 `지역 스코프`로 인정되며, 함수 내부가 아닌 곳에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언된다고 하여도 `전역 변수`이다.

```javascript
var x = 1;

if (x === 1) {
  var x = 2;

  console.log(x);
  // expected output: 2
}

console.log(x);
// expected output: 2
```

위 코드에서 if문 내의 `var x = 2;`는 코드 블록 내에 있어서 `지역 변수`인 것처럼 보이지만 var 키워드는 함수의 코드 블록만을 `지역 스코프`로 인정하기 때문에, `전역변수`이다. 따라서 전역 변수 x가 중복 선언된 것이 되므로 의도치 않게 x의 값이 1에서 2로 변경된다. for문이나 if문 등에서 선언된 var 키워드도 전역 변수이다.

### 변수 호이스팅

var키워드로 선언한 변수는 어디에 선언되어 있든지 런타임 이전에 먼저 실행되는 변수 호이스팅이 발생한다. 따라서 선언문 이전에도 값을 참조할 수 있다. 다만 할당문 이전에 변수를 참조하면 초기화된 값인 `undefined`를 반환한다.

```javascript
console.log(foo); //undefined

foo = 123;

console.log(foo); //123

var foo;
```

var 키워드로 선언된 변수는 런타임 이전에 먼저 실행되므로 할당 전에 호출하여도 에러가 발생하지 않고, `undefined`라는 초기화된 값을 출력한다. 변수에 값을 할당하고, 값을 호출하면 그때부터는 할당된 값이 출력된다.

---

## let 키워드

### 변수 중복 선언 금지

var키워드는 동일한 이름의 변수를 중복 선언해도 에러가 발생하지 않고, 마치 재할당되는 것처럼 동작한다. 그러나 let은 동일한 이름의 변수를 중복 선언하면 이미 선언되었다는 에러가 발생한다.

```javascript
//var 키워드
var x = 1;
var x = 2;
console.log(x); //2
//동일한 변수를 중복 선언해도 에러 발생 x

//let 키워드
let y = 1;
let y = 2;
console.log(y); //SyntaxError
//동일한 변수 중복 선언 시 에러 발생
```

### 블록 레벨 스코프

모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등) 을 지역 스코프로 인정한다.

```javascript
//var 키워드
var x = 1;
if (x > 0) {
  console.log(x); //1
  var x = 2;
}
console.log(x); //2

//let 키워드
let x = 1;
if (x > 0) {
  console.log(x); //undefined
  let x = 2;
}
console.log(x); //1
```

var 키워드는 함수 레벨 스코프를 가지기 때문에 if문의 코드블록 내에 있어도 `전역변수`이다. x의 값이 2로 출력된다. let 키워드는 블록 레벨 스코프를 가지기 때문에 if문을 지역 스코프로 인정한다. 따라서 if문 블록 내의 코드블록은 `지역변수`이다. 따라서 if문 내의 x는 코드블록 내에서만 값이 유효하다. 그런데 `let x = 2`라고 선언되기 이전에 호출되었으므로 `undefined`가 출력된다. 그러나 if문 밖에 있는 x는 if문 내의 x와 다른 값이기 때문에 1이라는 값이 출력된다.

### 변수 호이스팅

let 키워드를 런타임 이전에 참조하면 에러가 발생해서 변수 호이스팅이 발생하지 않는 것처럼 보이지만 그렇지 않다. let 키워드는 선언 단계와 초기화 단계가 분리되어 실행된다. 런타임 이전에 암묵적으로 선언이 실행되고, 초기화 단계는 변수 선언문에 도달했을 때 실행된다. (var 키워드는 런타임 이전에 선언과 초기화 단계가 한번에 진행되기 때문에 런타임 이전에 참조가 가능하고, undefined를 반환한다.)

`일시적 사각지대 (Temporal Dead Zone; TDZ)`
스코프의 시작 지점부터 초기화 시작 지점(변수 선언문)까지는 변수를 참조할 수 없고, 이 구간을 일시적 사각지대라고 한다.

```javascript
// var 키워드로 선언한 변수
console.log(foo); // undefined 런타임 이전에 참조가능
//선언과 초기화가 런타임 이전에 동시에 이루어진다.

var foo;
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1

// let 키워드로 선언한 변수

console.log(foo); // ReferenceError: foo is not defined
//런타임 이전에 선언 단계만 실행된다.
//변수 초기화가 아직 이루어지지 않았으므로 참조가 불가하다.

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

선언단계는 scope의 가장 상단에서 실행되며, scope에 식별자를 등록하는 것이다. var의 경우 식별자를 등록하고, undefined라는 초기값을 할당하는 것까지의 과정이 런타임 이전에 이루어진다. 하지만 let은 변수를 선언하여 scope에 식별자를 등록하는 것까지는 동일하게 런타임 이전에 이루어지고, 변수 선언문을 만났을 때 비로소 undefined로 초기화된다. 그 전까지는 undefined도 아니고, 참조도 할 수 없는 일시적 사각지대라는 구간을 가지고 있다. 따라서 참조할 수 있는 값이 존재하지 않는 상태이기 때문에 변수 선언문 이전에 호출하면 referenceError가 발생한다.

### 전역 객체와 let

`전역 객체`: 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 어떤 객체보다도 먼저 생성되는 특수한 객체이며 어떤 객체에도 속하지 않은 최상위 객체

> 클라이언트 사이드 환경(브라우저)에서는 window, 서버 사이드 환경(Node.js)에서는 global 객체를 가리킨다.

- var 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티이다.
- let 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다.

```javascript
//브라우저 환경의 경우
var x = 1;
console.log(window.x); //1

let x = 1;
console.log(window.x); //undefined
//let은 전역 객체의 프로퍼티가 아니기 때문에 참조불가
//const도 마찬가지로 전역 객체의 프로퍼티가 아니다.
```

---

## const 키워드

### 선언과 초기화

const 키워드는 상수를 선언하기 위해 사용하고, _반드시 선언과 동시에 할당이 이루어져야 한다._ let처럼 블록 레벨 스코프이며, 변수 호이스팅이 발생하지 않는 것처럼 동작하지만 실질적으로 발생하는 것이다.

### 재할당 금지

const는 재할당이 자유로운 var,let과 달리 재할당이 금지된다. 그러나 변수에 객체를 할당한 후 객체의 프로퍼티 값을 변경(추가, 삭제, 변경 등)하는 것은 가능하다.

---

## var vs let vs const

var: 함수 블록만을 지역 스코프로 인정, 그외의 경우 모두 전역 스코프를 가짐.
let: 블록 스코프 가지므로, 선언된 블록 내 및 하위 블록에서만 값이 유효.

```javascript
function varTest() {
  var x = 1;
  if (true) {
    var x = 2; // 상위 블록과 같은 변수
    console.log(x); // 2
  }
  console.log(x); // 2
}

function letTest() {
  let x = 1;
  if (true) {
    let x = 2; // 상위 블록과 다른 변수
    console.log(x); // 2
  }
  console.log(x); // 1
}
```

---

_Reference_

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)
[Poiemaweb/fastcampus](https://poiemaweb.com/fastcampus/block-level-scope)
