---
title: 타입 변환과 단축 평가 / Type casting
date: 2020-02-24
tags:
---

## 타입 변환

> 하나의 데이터 타입이 다른 데이터 타입으로 자동 또는 암묵적으로 변환되는 것.
> 타입 캐스팅(Type conversion (or typecasting))은 명시적(explicit)과 암묵적(implicit)인 타입 변환이 동시에 이루어진다.

컴파일러가 자동으로 데이터 타입을 할당할 때 암묵적 타입변환이 자동으로 발생하는데, 소스코드에서도 명시적인 변환이 필요하다.

`5+2.0`에서 부동소수점 `2.0`은 암묵적으로 정수로 타입변환되는데, Number("0x11")에서 문자열인 "0x11"은 숫자 17로 명시적으로 변환된다.(16진수로 계산하여 17 (1 \* 16 + 1 = 17)

타입 강제변환(type coercion)은 암묵적인 타입 변환이 이루어진다.

```javascript
const value1 = "5";
const value2 = 9;
let sum = value1 + value2;

console.log(sum);
```

숫자 리터럴 `9`는 문자열로 변환되고, value1과 value2의 값이 연결되어 문자열 `59`가 출력된다. 자바스크립트는 문자열과 숫자가 있을 때 문자열을 이용하기 때문이다. 따라서 만약 숫자 `5 + 9`를 더한 `14`의 결과를 출력하고 싶다면 number() 메소드를 통해서 명시적인 타입 변환을 해주어야 한다.

```javascript
sum = Number(value1) + value2;
```

---

- 명시적 타입 변환(Explicit coercion) 또는 타입 캐스팅(Type casting)
  개발자가 의도적으로 값의 타입을 변환하는 것
- 암묵적 타입 변환(Implicit coercion) 또는 타입 강제 변환(Type coercion)
  개발자의 의도와 상관없이 자바스크립트 엔진에 의해 암묵적으로 타입이 자동 변환되는 것.

이러한 명시적 또는 암묵적 타입 변환이 기존 원시값을 직접 변경하는 것은 아니다. 원시값은 변경불가이기 때문이다. 타입 변환이란 기존 원시값을 사용하여 다른 타입의 새로운 원시값을 생성하는 것이다.

```javascript
// 원시값 1이 '1'로 직접 변경되는 것이 아니다.
// 1을 사용해 타입이 다른 '1'을 새롭게 생성하여 '1' + ''을 평가한다.
1 + ""; // '1'
```

## 암묵적 타입 변환

표현식을 평가할 때 코드 문맥에 부합하지 않더라도 자바스크립트는 암묵적 타입 변환을 통해 표현식을 평가하고, 문자열, 숫자, 불리언과 같은 원시 타입 중 하나로 타입을 자동 변환한다.

```javascript
1 + "2"; //"12" 문자열 타입으로 변환
1 - "1"; //0 숫자열 타입으로 변환
//불리언 타입으로 변환
```

## 명시적 타입 변환

개발자의 의도에 의해 명시적으로 타입을 변환한다.

- 문자열 타입으로 변환

  - String 생성자 함수를 new 연산자 없이 호출하는 방법 ex) String(1); -> "1"
  - Object.prototype.toString 메소드를 사용하는 방법 ex) (1).toString(); -> "1"
  - 문자열 연결 연산자를 이용하는 방법 1 + ''; -> "1"

- 숫자 타입으로 변환

  - number 생성자 함수를 new 연산자 없이 호출하는 방법 ex) Number('0') -> 0
  - parseInt, parseFloat 함수를 사용하는 방법(문자열만 숫자 타입으로 변환 가능) ex) parseInt('0') -> 0
  - 단항 산술 연산자를 이용하는 방법 ex) +'0'; -> 0
  - 산술 연산자를 이용하는 방법 ex) '0' \* 1 -> 0
  - 빈 문자열(‘’), 빈 배열([]), null, false는 0으로 변환된다.
  - true는 1로 변환된다. ex) true \* 1; -> 1
  - 객체와 빈 배열이 아닌 배열, undefined는 변환되지 않으므로 null이 된다.

- 불리언 타입으로 변환: 조건식의 평가 결과를 불리언 타입으로 암묵적 타입 변환.
  - Boolean 생성자 함수를 new 연산자 없이 호출하는 방법 ex)Boolean('x') -> true
  - ! 부정 논리 연산자를 두번 사용하는 방법 ex) !!'x' -> true
  - `falsy값: false, undefined, null, 0, -0, NaN, 빈 문자열`
  - truthy값: false 값을 제외한 모든 값

---

## 단축 평가

> 논리합(||) 연산자와 논리곱(&&) 연산자 표현식의 평가 결과는 불리언 값이 아닐 수도 있다. _논리합(||), 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한쪽으로 평가된다._ 표현식을 평가하는 도중 결과가 확정되면 나머지 평가 과정을 중단하는 것이다. 이러한 성질을 이용하여 논리곱(&&)과 논리합(||)연산자는 if문을 대체할 수 있기도 하다.

```javascript
true || anything	true
false || anything	anything
true && anything	anything
false && anything	false
```

```javascript
// 논리합(||) 연산자
true || true; // -> true
true || false; // -> true
false || true; // -> true
false || false; // -> false

// 논리곱(&&) 연산자
true && true; // -> true
true && false; // -> false
false && true; // -> false
false && false; // -> false
```

`'Cat' && 'Dog' // 'Dog'`
논리곱(&&)연산자는 두 개의 피연산자 모두 true일 때 true를 반환한다. 첫 번째 피연산자 `Cat`을 평가했을 때 true로 평가되지만 두번째 피연산자까지 평가해보아야 완전한 평가가 이루어진다. 따라서 두번째 피연산자인 `Dog`까지 평가한 후 `Dog`를 반환한다.

`'Cat' || 'Dog' // 'Cat'`
논리합(||) 연산자는 두 개의 피연산자 중 하나만 true여도 true를 반환하기 때문에 첫 번째 피연산자 `Cat`이 true이므로 두번째 피연산자 `Dog`를 평가하지 않고 바로 `Cat`을 반환한다.

---

_References_

[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Type_conversion)
[MDN](https://developer.mozilla.org/ko/docs/Glossary/Type_coercion)
[poiemaweb](https://poiemaweb.com/fastcampus/type-casting)
