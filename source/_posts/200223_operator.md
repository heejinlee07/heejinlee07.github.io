---
title: 연산자 / operator
date: 2020-02-22 21:57:40
tags:
---

## 연산자

하나 이상의 표현식을 대상으로 산술, 할당, 비교, 논리, 타입, 지수 연산(operation) 등을 수행해 하나의 값을 만든다. 이때 연산의 대상을 피연산자(Operand)라 하고, 이는 값으로 평가될 수 있는 표현식이어야 한다.

- 변수와 값을 어떻게 작동하게 할 것인지에 관한 것.
- 프로그래밍 언어에서 특정 연산을 하도록 하는 문자.
- 테스트 수행, 연산, 문자열 합치기 등등에 사용.
- `연산자의 부수 효과:`s 대부분의 연산자는 다른 코드에 영향을 주지 않는다. 하지만 일부 연산자는 부수 효과가 있다. 부수 효과가 있는 연산자는 할당(=) 연산자, 증가/감소(++/–) 연산자, delete 연산자이다.

```javascript
target variable = source value
a = 42 (42 값을 a에 할당한다.)
값 + 값 = 새로운 값
```

`피연산자, 피연산자 + 연산자의 조합으로 이루어진 연산자 표현식 모두 '값'으로 평가될 수 있어야 한다.`

## 산술 연산자 (Arithmetic Operator)

피연산자를 대상으로 수학적 계산(사칙 연산)을 수행해 새로운 숫자 값을 만들며, 피연산자의 개수에 따라 이항 산술 연산자 or 단항 산술 연산자로 구분한다. _산술 연산이 불가능한 경우, NaN을 반환한다._

```javascript
덧셈(+) : 5 + 2; // 7
뺄셈(-) : 5 - 2; // 3
곱셈(*) : 5 * 2; // 10
나눗셈(/) : 5 / 2; // 2.5
나머지(%) : 5 % 2; // 1
```

### 이항 산술 연산자 (Binary operators)

2개의 피연산자를 산술 연산하여 숫자 타입의 값을 만든다. _피연산자의 값을 변경하는 부수 효과는 없다. 언제나 새로운 값을 만들 뿐이다._

> operand1 operator operand2 ex) 3 + 4

### 단항 산술 연산자 (Unary operators)

1개의 피연산자를 산술 연산하여 숫자 타입의 값을 만든다. 주로 반복문에서 많이 쓰인다.

> operator operand or operand operator ex) a++ or ++a

`주의: 이항 산술 연산자와 달리 증가/감소(++/–) 연산자는 피연산자의 값을 변경하는 부수 효과가 있다.`

`증가/감소(++/--) 연산자는 위치에 따른 의미`
.전위 증가/감소 연산자: 피연산자의 앞에 위치하여 먼저 피연산자의 값을 증가/감소시킨 후, 다른 연산을 수행한다.
.증가/감소(++/--) 연산자: 피연산자의 뒤에 위치하여 먼저 다른 연산을 수행한 후, 피연산자의 값을 증가/감소시킨다.

```javascript
var num1 = 4;
++num1; // -> 5;
num1; // -> 5;

/* ++num1는 num1의 값을 먼저 증가시킨 후 할당한다.
(선증가 후할당) */

var num2 = 4;
num2++; // -> 4;
num2; //-> 5;

/* num2++은 num2의 값을 먼저 할당한 후 증가시킨다.
(선할당 후증가) */
```

---

## 문자열 연결 연산자 (String operators)

`+`연산자는 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 동작한다. 참고로 javascript에서 true는 1, false는 0과 같다.

```javascript
console.log("my " + "string"); // console logs the string "my string".

// 문자열 연결 연산자
"1" + 2; // -> '12'
1 + "2"; // -> '12'

// true는 1로 타입 변환된다.
1 + true; // -> 2

// false는 0으로 타입 변환된다.
1 + false; // -> 1
```

`암묵적 타입 변환(Implicit coercion) 또는 타입 강제 변환(Type coercion)`
개발자의 의도와는 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되기도 한다. 위 예제에서 1 + true를 연산하면 자바스크립트 엔진은 암묵적으로 불리언 타입의 값인 true를 숫자 타입인 1로 타입을 강제 변환한 후 연산을 수행한다.

---

## 할당 연산자 (Assignment Operator)

- 우항에 있는 피연산자의 평가 결과를 좌항에 있는 변수에 할당한다.
- 좌항의 피연산자는 우항의 피연산자의 값에 기초한다.
- x = y는 y의 값을 x에 할당하겠다는 뜻이다.

`할당 연산자는 좌항의 변수에 값을 할당하므로 변수의 값이 변하는 부수 효과가 있다.`

```javascript
=	: x = 5	    = x = 5
+=	: x += 5	= x = x + 5
-=	: x -= 5	= x = x - 5
*=	: x *= 5	= x = x * 5
/=	: x /= 5	= x = x / 5
%=	: x %= 5	= x = x % 5

//우항의 값을 좌항의 변수값에 할당한 후, 새로운 변수 값을 반환한다.

var x = 3; //x는 3이라는 값을 담고 있다.
var y = 4; //y는 4라는 값을 담고 있다.

x *= y; //x는  12라는 값을 담고 있다.
```

---

## 비교 연산자 (Comparison operators)

두 값(좌항과 우항)의 피연산자를 비교한 다음 그 결과로 `불리언 값을 반환`한다. 비교 연산자는 _if 문이나 for 문과 같은 제어문의 조건식에서 주로 사용한다._

### 동등/일치 비교 연산자

좌항과 우항의 피연산자가 같은 값을 갖는지 비교하여 `불리언 값을 반환`한다. 동등 비교 연산자는 느슨한 비교를 하지만 일치 비교 연산자는 엄격한 비교를 한다.

- == 동등 비교: x == y x와 y의 값이 같음
- === 일치 비교: x === y x와 y의 값과 타입이 같음
- != 부동등 비교: x != y //x와 y의 값이 다름
- !== 불일치 비교: x !== y //x와 y의 값과 타입이 다름

> 동등 비교(==) 연산자는 좌항과 우항의 피연산자를 비교할 때 먼저 암묵적 타입 변환을 통해 타입을 일치시킨 후, 같은 값인지 비교한다.
> 타입은 다르지만 암묵적 타입 변환을 통해 타입을 일치시키면 동등하다.
> 5 == '5'; // -> true

다음을 주의하여야 한다.

- NaN === NaN; : false;
- 0 === -0; : true;
- 0 == -0 : true;

### 대소 관계 비교 연산자

피연산자의 크기를 비교하여 불리언 값을 반환한다.

- `>`: x > y : x가 y보다 크다
- `<`: x < y : x가 y보다 작다
- `>=`: x >= y : x가 y보다 같거나 크다
- `<=`: x <= y : x가 y보다 같거나 크다

---

## 삼항 조건 연산자 (ternary operator)

> 조건식 ? 조건식이 true일때 반환할 값 : 조건식이 false일때 반환할 값

조건식의 평가 결과에 따라 반환할 값을 결정한다. 조건식이 참이면 콜론(:) 앞의 두번째 피연산자가 평가되어 반환되고, 거짓이면 콜론(:) 뒤의 세번째 피연산자가 평가되어 반환된다.

```javascript
var x = 2;

// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
var result = x % 2 ? "홀수" : "짝수";

console.log(result); // 짝수
```

## 논리 연산자 (Logical Operator)

우항과 좌항의 피연산자(부정 논리 연산자의 경우, 우항의 피연산자)를 논리 연산한다.

```javascript
||	논리합(OR)	✕
&&	논리곱(AND)	✕
!	부정(NOT)  ✕
```

논리 부정(!) 연산자는 언제나 불리언 값을 반환한다. 단, 피연산자가 반드시 불리언 값일 필요는 없다. 논리합(||) 또는 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. 논리합(||) 또는 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다.

## 쉼표 연산자

왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 마지막 피연산자의 평가 결과를 반환한다.

```javascript
var x, y, z;

(x = 1), (y = 2), (z = 3); // 3
```

## 그룹 연산자

연산자 우선순위(Operator precedence)와 관련있다. 일부 연산자는 합계 (프로그래밍에서 표현식이라고 함)의 결과를 계산할 때 다른 연산자보다 먼저 적용된다. JavaScript의 연산자 우선 순위는 수학 시간에 배운 것처럼 곱하기와 나누기는 항상 먼저 수행 한 다음 더하기와 빼기 (합은 항상 왼쪽에서 오른쪽으로 평가됨) 따라서 먼저 연산하고 싶은 부분을 그룹 연산자`()`로 묶어서 우선 순위를 조절할 수 있다.

```javascript
10 * 2 + 3; // -> 23

// 그룹 연산자를 사용하여 우선 순위 조절
10 * (2 + 3); // -> 50
```

## typeof 연산자

피연산자의 데이터 타입을 문자열로 반환한다. typeof 연산자는 7가지 문자열 “string”, “number”, “boolean”, “undefined”, “symbol”, “object”, “function” 중 하나를 반환한다. “null”을 반환하는 경우는 없으며 함수의 경우 “function”을 반환한다.

```javascript
var foo = null;

typeof foo === null; // -> false
foo === null; // -> true
```

typeof 연산자로 null 값을 연산해 보면 “null”이 아닌 “object”를 반환하는데 이는 자바스크립트의 첫 번째 버전의 버그이다. 따라서 null 타입을 확인할 때는 typeof 연산자 보다는 연산자(===)을 사용하는 것이 좋다. 또한 선언하지 않은 식별자를 typeof 연산자로 연산해 보면 ReferenceError가 발생하지 않고 “undefined”를 반환한다.

## 지수 연산자

ES7에서 새롭게 도입된 지수 연산자는 좌항의 피연산자를 밑으로, 우항의 피연산자를 지수로 거듭 제곱하여 숫자 타입의 값을 반환한다. 이항 연산자 중 우선순위가 가장 높다. 참고로 지수 연산자 이전에는 Math.pow(2,2)와 같이 사용하였다.

```javascript
2 ** 2; // -> 4
2 ** 2.5; // -> 5.65685424949238
2 ** 0; // -> 1
2 ** -2; // -> 0.25
(-5) ** 2; // -> 25

var num = 5;
num **= 2; // ->25
```

---

## 옵셔널 체이닝(optional chaining)

> obj?.prop
> obj?.[expr]
> arr?.[index]
> func?.(args)

좌항의 피연산자가 null 또는 undefined인 경우 undefined를 반환, 그렇지 않으면 우항의 프로퍼티 참조를 이어간다. _논리 연산자 &&와 같은 기능이다._

1. &&를 사용할 때: 중첩된 구조의 객체 obj에서 하위 중첩된 하위 속성을 찾을 때 다음과 같이 사용한다. obj.first는 태스트 없이 obj.first.second에 직접 접근할 때 생기는 에러를 방지하기 위해서 값에 접근하기 전에 null 또는 undefined가 아니라는 점을 검증하는 것이다.

   > let nestedProp = obj.first && obj.first.second;

2. 옵셔널 체이닝을 사용: &&를 사용할 때 처럼 명시적인 테스트가 필요없다.
   `?.`의 옵셔널 체이닝을 사용함으로써 obj.first.second에 접근하기 전에 obj.first가 null 또는 undefined가 아니라는 것을 암묵적으로 확인한다.

> let nestedProp = obj.first?.second;

3.  obj.first가 null or undefined라면 undefined가 반환된다. 그렇지 않으면 우항의 프로퍼티 참조를 이어간다.

> let nestedProp =
> obj.first === null || obj.first === undefined ? undefined : obj.first.second;

다음과 같이 이벤트 핸들러를 다룰 때 유용하다.

```javascript
// Written as of ES2019
function doSomething(onContent, onError) {
  try {
    // ... do something with the data
  } catch (err) {
    if (onError) {
      // Testing if onError really exists
      onError(err.message);
    }
  }
}
```

```javascript
// Using optional chaining with function calls
function doSomething(onContent, onError) {
  try {
    // ... do something with the data
  } catch (err) {
    onError?.(err.message); // no exception if onError is undefined
  }
}
```

---

_Reference_

[MDN](https://developer.mozilla.org/ko/docs/Learn/JavaScript/First_steps/Math)
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Operator_precedence)
[MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash)
[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Optional_chaining)
[Poiemaweb](https://poiemaweb.com/fastcampus/operator)
