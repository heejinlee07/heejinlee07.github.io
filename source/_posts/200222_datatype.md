---
title: 데이터 타입/ Data type
date: 2020-02-22
tags:
---

## 데이터 타입

자바스크립트의 모든 값은 데이터 타입을 갖는다. 자바스크립트(ES6)는 7개의 데이터 타입을 제공한다. 7개의 데이터 타입은 원시 타입(primitive type)과 객체 타입(object/reference type)으로 분류할 수 있다.

- `원시 타입(primitive type)`: 숫자, 문자열, 불리언, undefined, null, symbol

- `객체 타입(object/reference type)`: 객체, 함수, 배열 등

### typeof

typeof를 사용하면 자료형이 무엇인지 확인할 수 있다. 아래와 같이 `typeof 피연산자`의 형태로 사용한다.

> typeof operand
> typeof(operand)

```javascript
console.log(typeof 42);
// expected output: "number"

console.log(typeof "blubber");
// expected output: "string"

console.log(typeof true);
// expected output: "boolean"
```

### typeof null === 'object' 인 이유는?

typeof null은 'null'을 반환하지 않는다. _null의 타입은 원시타입인데, `object`를 반환한다._ 이는 첫 번째 자바스크립트 버전의 고칠 수 없는 버그이다. 만약 고치게 될 경우 기존 코드에 영향을 미칠 수 있기 때문이다.

---

## 숫자 타입

자바스크립트의 숫자는 `실수 타입` 하나만 존재한다. (C, Java와 같은 언어는 정수와 실수 등으로 숫자를 구분함.) 정수나 음의 정수 등도 모두 실수로 처리한다.

- 정수, 실수, 2진수, 8진수, 16진수 리터럴은 모두 메모리에 배정밀도 64비트 부동소수점 형식의 2진수로 저장
- 자바스크립트는 2진수, 8진수, 16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 해석된다.

```javascript
var binary = 0b01000001; // 2진수
var octal = 0o101; // 8진수
var hex = 0x41; // 16진수

// 표기법만 다를 뿐 모두 같은 값이다.
console.log(binary); // 65
console.log(octal); // 65
console.log(hex); // 65
console.log(binary === octal); // true
console.log(octal === hex); // true
```

javascript는 모든 수를 실수로 처리하기 때문에 정수와 정수를 나눴을 때 실수가 나올 수도 있다. (`ex. console.log(3/2) //1.5`)

- 다음과 같은 3가지 특별한 값을 표현할 수도 있다. NaN의 경우 반드시 대소문자를 구별해야 한다.
  - Infinity : 양의 무한대
  - Infinity : 음의 무한대
  - NaN : 산술 연산 불가(not-a-number)

## 문자열 타입

텍스트 데이터를 나타내는 데 사용하며, 0개 이상의 16bit 유니코드 문자(UTF-16) 들의 집합이다. 작은 따옴표(‘’), 큰 따옴표(“”) 또는 백틱(``)으로 텍스트를 감싸서 사용한다.

> 'abc', '', "", \`a\` 모두 문자열이다.

_만약 문자열을 따옴표('')로 감싸지 않는다면?_

```javascript
var string = "hello";
typeof string; // "string"

var str = hello;
//ReferenceError: hello is not defined
```

위와 같이 문자열을 따옴표('')로 감싸지 않으면 자바스크립트 엔진은 문자열을 키워드나 식별자와 같은 토큰으로 인식하므로 에러가 발생한다. _문자열을 따옴표로 감싸는 이유는 키워드, 식별자 같은 토큰과 구분하기 위해서이기 때문이다._ 또한 스페이스와 같은 공백 문자도 따옴표 없이는 사용할 수 없다.

## 템플럿 리터럴

ES6부터 도입되었으며, 작은 따옴표(‘’) 또는 큰 따옴표(“”) 같은 일반적인 따옴표 대신 백틱(backtick) (``)을 사용한다.

### 멀티라인 문자열

일반문자열에서는 개행이 허용되지 않으므로 백슬래시(\\)로 시작하는 이스케이프 시퀀스를 사용해야 하지만, 백틱(``)을 사용하면 개행하지 않아도 되고, 공백도 있는 그대로 적용된다.

```javascript
//일반문자열은 이스케이프 시퀀스를 사용하여 줄바꿈한다. (줄바꿈 /n)
var template = '<ul>\n\t<li><a href="#">Home</a></li>\n</ul>';

console.log(template);

//템플릿 문자열은 이스케이프 시퀀스가 없어도 줄바꿈 가능 (백틱사용)
var template = `<ul>
  <li><a href="#">Home</a></li>
</ul>`;

console.log(template);
```

### 표현식 삽입

`${ }`으로 표현식을 감싸서 사용한다. 이때 표현식의 평가 결과가 문자열이 아니더라도 문자열로 강제 타입 변환되어 삽입된다. 단, 템플릿 리터럴을 일반 문자열에서 삽입하면 문자열로 취급된다.

```javascript
//일반 문자열은 '+'연산자로 문자열을 연결한다.
var first = "hello";
var second = "world";
console.log(first + " " + second); //hello world

//템플릿 리터럴
var first = "hello";
var second = "world";
console.log(`${first} ${second}`); //hello world
```

---

## 불리언 타입

논리적 참, 거짓을 나타내는 `true`와 `false`를 말한다. 제어문에서 주로 사용한다.

## undefined 타입

개발자가 의도적으로 할당하기 위한 값이 아니라 자바스크립트 엔진이 변수를 초기화할 때 사용하는 값. 변수 선언이 되면 자바스크립트 엔진은 `undefined`를 암묵적으로 할당한다. _변수 참조 시 `undefined`가 반환된다면 변수 선언 후 아직 할당이 이루어지지 않았음을 알 수 있다._

## null 타입

변수에 값이 없다는 것을 의도적으로 명시(의도적 부재 Intentional absence)하고 싶다면 `undefined`가 아니라 `null`을 할당한다. _`null`을 할당하는 것은 변수가 이전에 참조하던 값을 더이상 참조하지 않겠다는 의미이며, 가비지 컬렉팅이 이루어질 것이다._

## symbole 타입

ES6에서 새롭게 추가된 7번째 타입으로 변경 불가능한 원시 타입이며, 다른 값과 중복되지 않는다. 심볼은 주로 이름의 충돌 위험이 없는 객체의 유일한 프로퍼티 키(property key)를 만들기 위해 사용한다. 함수를 호출해 생성하지만 참조할 수는 없다.

```javascript
// 심볼 값 생성
var key = Symbol("key");
console.log(typeof key); // symbol

// 객체 생성
var obj = {};

// 심볼 key를 이름의 충돌 위험이 없는 유일한 프로퍼티 키로 사용한다.
obj[key] = "value";
console.log(obj[key]); // value
```

---

## 데이터 타입의 필요성

- 데이터 타입에 의한 메모리 공간의 확보와 참조
  자바스크립트 엔진은 데이터 타입, 즉 값의 종류에 따라 정해진 크기의 메모리 공간을 확보한다. 즉, 변수에 할당되는 값의 데이터 타입에 따라 확보해야 할 메모리 공간의 크기가 결정된다.

- 데이터 타입에 의한 값의 해석
  - 값을 저장할 때 확보해야 하는 메모리 공간의 크기를 결정하기 위해
  - 값을 참조할 때 한번에 읽어 들여야 할 메모리 공간의 크기를 결정하기 위해
  - 메모리에서 읽어 들인 2진수를 어떻게 해석할 지를 결정하기 위해

## 정적 타입(static/strong type)

C나 Java와 같은 정적 타입(Static/Strong type) 언어는 변수를 선언할 때 변수에 할당할 수 있는 값의 종류, 즉 데이터 타입을 사전에 선언해야 한다. 이를 명시적 타입 선언(explicit type declaration)이라 한다.

## 동적 타입(Dynamic/Weak type)

자바스크립트는 값을 할당하는 시점에 변수의 타입이 동적으로 결정되고 변수의 타입을 언제든지 자유롭게 변경할 수 있다. _다시 말해 자바스크립트 변수는 선언이 아닌 할당에 의해 타입이 결정된다._ 그리고 재할당에 의해 변수의 타입은 언제든지 동적으로 변할 수 있다.

- 변수는 꼭 필요한 경우에만 사용, 변수보다는 상수를 사용하여 값의 변경을 억제한다.
- 식별자 네이밍 규칙에 따라 변수 이름은 의미를 파악하기 쉽게 네이밍한다.
- 변수의 유효 범위(스코프)는 최대한 좁게 만들며, 전역 변수는 최대한 사용하지 않는다.

---

_Reference_
[Poiemaweb](https://poiemaweb.com/fastcampus/type)
[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/typeof)
[2ality](https://2ality.com/2013/10/typeof-null.html)
