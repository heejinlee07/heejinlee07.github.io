---
title: 함수와 일급 객체 / First class object
date: 2020-03-05
tags:
---

## 일급 객체

- 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
- 변수나 자료 구조(객체, 배열 등)에 저장할 수 있다.
- 함수의 매개 변수에게 함수를 전달할 수 있다.
- 함수의 결과값으로 반환할 수 있다.

함수는 위의 조건을 만족하는 일급 객체이며, 이는 함수를 객체와 동일하게 사용할 수 있다는 의미이다. 함수는 값을 사용할 수 있는 곳 어디에서든 리터럴로 정의할 수 있으며, 런타임에 함수 객체로 평가된다. 또한 프로퍼티를 가질 수도 있다.

```javascript
// 함수는 무명의 리터럴로 생성할 수 있으며, 변수에 저장할 수 있다.
// 그리고 런타임에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

//함수는 객체에 저장할 수 있다.
const predicates = { increas, decrease };

// 함수의 매개 변수에게 전달할 수 있다.
// 함수의 결과값으로 반환할 수 있다.
function makeCounter(predicate) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

//함수는 매개 변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser());
console.log(increaser());
```

## arguments 프로퍼티

arguments 객체를 프로퍼티 값으로 갖는 함수 객체를 말하며, 함수 호출 시 전달된 인수(argument)들의 정보를 담고 있는 순회 가능한(iterable) 유사 배열 객체(array-like object)이며 함수 내부에서 지역 변수처럼 사용된다.**즉, 함수 외부에서는 사용할 수 없다.**

함수를 정의할 때 선언한 매개변수는 함수 몸체 내부에서 변수와 동일하게 취급된다. 즉, 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 선언되고 undefined로 초기화된 이후 인수가 할당된다. 만약 매개변수의 개수보다 인수를 많이 전달한 경우 초과된 인수는 무시된다.

런타임 시 호출된 함수의 인자 개수를 확인하고 이에 따라 함수의 동작을 달리 정의하고자 할 때 유용하다. 즉 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

일부 브라우저에서 지원하고 있으나 ES3부터 표준에서 폐지되었다.

## caller 프로퍼티

ECMAScript 스펙에 포함되지 않은 비표준 프로퍼티이다. 이후 표준화될 예정도 없는 프로퍼티이다. 함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수이다.

## length 프로퍼티

함수 객체의 length 프로퍼티는 함수 정의 시 선언한 매개변수의 개수를 가리킨다. arguments 객체의 length 프로퍼티는 인자(argument)의 개수를 가리키고, 함수 객체의 length 프로퍼티는 매개변수(parameter)의 개수를 가리킨다.

## name 프로퍼티

함수 이름을 나타내는 것으로 ES6 이전까지는 비표준이었지만 ES6에서 정식 표준이 되었다. 단 ES5와 ES6에서 동작을 달리 하므로 주의해야 한다.익명 함수 표현식의 경우, ES5에서 name 프로퍼티는 빈 문자열을 값으로 갖는다. 하지만 ES6에서는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.

## `__proto__` 접근자 프로퍼티

모든 객체는 \[[Prototype]]이라는 내부 슬롯을 갖는다. \[[Prototype]] 내부 슬롯은 객체 지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

## prototype 프로퍼티

**함수 객체만이 소유하는 프로퍼티이다. 일반 객체에는 prototype 프로퍼티가 없다.** prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 사용될 때, 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

---

_References_
[poiemaweb](https://poiemaweb.com/fastcampus/first-class-object)
