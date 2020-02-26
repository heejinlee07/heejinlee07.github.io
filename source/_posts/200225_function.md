---
title: 함수 / Function
date: 2020-02-25
tags:
---

## 함수

input과 output가 이루어지는 일련의 과정을 문(statement)들로 구현하고 코드 블록으로 감싸서 하나의 실행 단위로 정의한 것
한 가지 일을 수행하는 코드가 블럭으로 묶여 있는 것.

```javascript
function 함수명(매개변수) {
  return 반환값;
}
//함수를 정의하는 코드블록, 함수생성

함수명(인수); //함수호출, 인수를 매개변수를 통해 함수에게 전달
//코드블록의 문을 실행하여 반환값 반환
```

> 함수명은 생략 가능(익명함수) 이름이 있다면 기명 함수

- 매개변수(parameter): 함수의 정의에서 전달받은 인수를 함수 내부로 전달하기 위해 사용하는 변수. 함수 몸체 내부에서만 참조 가능, 외부에서는 참조할 수 없다.
- 인수(argument): 함수가 호출될 때 함수로 값을 전달해주는 값. 인수를 매개변수를 통해 함수에게 전달. 값으로 평가될 수 있는 표현식이어야 한다.

> 인수 -> 인수 전달 -> 매개변수 -> return 반환값 ->함수 외부로 반환
> 매개변수와 인수의 개수가 일치하는지 여부는 체크하지 않는다.
> 매개변수의 이상적인 개수는 0개이며, 최대 3개 이상을 넘기지 않는 것을 권장한다.
> 만약 그 이상이 필요하다면 매개변수 선언 후 객체를 인수로 전달받는 것이 좋다.
> 매개 변수가 많아지면 함수 호출 시 전달해야 할 인수의 순서를 고려한다.

## 함수의 사용 이유

- 코드의 재사용: 동일한 작업을 반복 수행할 때 코드를 여러번 작성하는 대신 호출가능
- 코드의 중복 억제: 중복된 코드를 여러 번 작성하면 수정도 여러 번 해야함.
- 코드의 가독성 향상: 함수 이름(식별자)을 통해 함수의 역할 파악

## 함수 리터럴

함수 리터럴로 함수를 생성한다. _함수의 이름을 생략할 수 있다._

함수 == 객체
함수 != 일반 객체

함수 - 호출가능 / 일반 객체 - 호출불가, 함수 객체 고유의 프로퍼티 가짐.

```javascript
//add라는 이름의 변수를 만들고 함수를 담는다.

var add = function(a, b) {
  return a + b;
};
```

`함수 리터럴의 4가지 부분`

1. function이라는 예약어 (예시의 function)
2. function의 이름 (예시는 익명 함수)

- 기명함수: 함수 이름이 있음
- 익명 함수: 함수 이름이 없음.

3. function의 매개변수 (예시의 a,b)
   > 매개변수의 이름은 함수의 변수로 정의된다. 그러나 다른 변수와는 달리
   > `undefined`로 초기화되는 대신 함수가 호출될 때의 `인수`로 초기화된다.
4. 중괄호({})로 감싸진 문(statement)

- 함수의 몸체
- 함수가 호출될 때 실행된다.

---

## 함수 정의

함수를 호출하기 이전에 인수를 전달받을 매개변수와 실행할 문들, 그리고 반환할 값을 지정하는 것

### 함수 선언문

함수 리터럴과 형태는 같지만 그와 달리 함수 선언문에서는 함수 이름을 생략할 수 없다. _함수 선언문은 또한 표현식이 아닌 '문'이다._(변수에 할당할 수 없다.) 따라서 함수 선언문을 실행하면 undefined가 출력된다.

```javascript
function coffee(temp, menu) {
  return temp + menu;
}
//함수명(예시에서 coffee)
//함수명을 생략하면 오류가 발생한다.

console.log(coffee("iced", "americano"));
//icedamericano가 출력된다.
//iced americano로 출력하고 싶다면
//retuen temp + ' ' + menu;로 반환값을 작성한다.

//다음과 같이 함수를 선언할 수도 있다.
function coffee(temp, menu) {
  console.log(temp + " " + menu);
}
coffee("iced", "americano");
//iced americano
```

### 함수 선언문 vs 함수리터럴 vs 함수 표현식

function add(x,y) {
return x + y;
}

- `함수 리터럴`: 식별자는 옵션이므로 없어도 된다. 함수 리터럴은 함수 그 자체가 아니라 함수의 값이다. 따라서 함수는 함수 리터럴을 참조한다고 할 수 있다.
  단, 자바스크립트 엔진은 상황에 따라 동일한 함수 리터럴에 대해 함수 선언문(표현식이 아닌 문) 또는 함수 리터럴 표현식(표현식인 문)으로 해석하기도 한다.
- `함수 선언문`: 표현식이 아닌 문이다.
  단, 자바스크립트 엔진은 함수 선언문을 표현식으로 변환하여 함수 객체를 생성한다고 할 수 있다.
- `함수 표현식`: 표현식인 문이다.

### 함수 표현식

> 함수 리터럴로 생성한 함수 객체를 변수에 할당하는 것.

함수는 일급객체이므로 함수를 값처럼 자유롭게 사용할 수 있다. 함수는 객체 타입의 값이기 때문에 변수에 할당할 수 있고, 프로퍼티 값이 될 수 있고, 배열의 요소가 될 수도 있다.

### 함수 생성 시점과 함수 호이스팅

`함수 선언문`: 함수를 정의함. 함수 선언문 이전에 호출 및 참조 가능. 런타임 이전에 먼저 실행됨.

```javascript
console.log(add(2, 5)); //7

function add(x, y) {
  return x + y;
}
```

함수 정의 -> 함수 객체 생성 -> 함수 이름과 동일한 이름의 식별자를 암묵적으로 생성하고 생성된 함수 객체를 할당 ->런타임 ->런타임 때 평가되어 함수 리터럴이 함수 객체가 됨.

`함수 호이스팅`: 위와 같이 함수 선언문이 선두로 끌어 올려진 것처럼 동작하는 것

`변수 호이스팅 vs 함수 호이스팅`

- 공통점: 런타임 이전에 먼저 실행되어 식별자를 생성한다.
- `변수`: undefined로 초기화됨.
- `함수 선언문`: 함수 객체로 초기화됨.

`함수 표현식`: 변수 할당문의 값이 함수 리터럴인 문. 변수 선언문과 변수 할당문의 축약 표현과 동일하게 동작.

```javascript
console.log(sub(2, 5)); // TypeError: sub is not a function

var sub = function(x, y) {
  return x - y;
};
```

함수 표현식의 함수 리터럴은 할당문이 실행되는 시점(런타임)에 평가되어 함수 객체가 됨.
이 경우 함수 호이스팅이 아니라 변수 호이스팅이 발생.

> 함수 선언문은 함수 호출 전에 반드시 함수를 선언해야한다는 규칙을 무시하고, 선언문 이전에도 참조 및 호출이 가능하다.
> 따라서 가능한 함수 표현식을 쓰는 것이 권장된다.

### function 생성자 함수

객체를 생성하는 방법에는 factory함수와 생성자(constructor)함수가 있다.

`factory 함수`: 객체를 반환하는 클래스나 생성자가 아닌 함수. 자바스크립트의 함수는 new 키워드가 없어도 객체를 반환다.

`생성자 함수`: 객체를 생성하는 함수
step1. 생성자 함수를 작성하여 개체를 정의한다. (파스칼 케이스를 사용한다.)
step2. new 키워드를 사용하여 개체의 인스턴스를 만든다.

```javascript
function car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

//함수의 인자로 전달받은 값을 개체의 속성에 할당하기 위해 `this`를 사용한다.
//this는 코드블록이 실행될 때 빈 객체를 참조한다.
```

```javascript
mycar = new Car("Eagle", "Talon TSi", 1993);
//new는 빈 객체를 만든다.
//위에 정의된 함수에서 this는 new가 생성한 빈 객체를 가리킬 수 있게 한다.
//this를 통해 new가 생성한 빈 객체에 접근한다.
//new가 새로 생성한 객체에 함수의 값을 반환한다.
```

### 화살표 함수

ES6에서 새롭게 도입된 화살표 함수(Arrow function)는 function 키워드 대신 화살표(=>, Fat arrow)를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있다. 화살표 함수는 항상 익명 함수로 정의한다.

```javascript
const add = (x, y) => x + y;

console.log(add(2, 5)); // 7
```

## 반환문

- 함수의 실행을 중단하고 함수 몸체를 빠져나간다.
- 반환문 이후에 다른 문이 존재하면 그 문은 무시된다.
- 반환문을 생략하면 `undefined`가 반환된다.

```javascript
function sum(x, y) {
  return x + y; //반환문
  console.log(sum(2, 3)); //실행되지 않는다.
}
console.log(sum(2, 3)); // 5
```

---

## 다양한 함수의 형태

### 즉시실행함수

함수 정의와 동시에 즉시 호출된다. `단 한번`만 호출되며 다시 호출할 수 없다. 보통 익명함수를 사용함.

```javascript
// 익명 즉시 실행 함수
(function() {
  var a = 3;
  var b = 5;
  return a * b;
})();
```

### 재귀 함수

함수가 자기 자신을 호출하는 위, 재귀 호출을 수행하는 함수를 말한다. 재귀 함수는 자신을 무한 재귀 호출하므로 반드시 탈출 조건을 만들어야한다. 그렇지 않으면 에러가 발생한다. 대부분 재귀 함수는 for문이나 while문으로 구현할 수 있다.

### 중첩 함수

함수 내부에 정의된 함수이며, 내부 함수라 부르기도 한다. 중첩 함수를 포함하는 함수는 외부 함수라 한다.

### 콜백 함수

함수의 매개변수를 통해 전달되는 함수를 콜백 함수(Callback function)라고 하며, 콜백 함수를 매개변수를 통해 전달받은 함수를 고차 함수(Higher-Order Function, HOF)라고 한다.

콜백 함수는 고차 함수에 전달되어 헬퍼 함수의 역할을 한다.
함수 외부에서 고차 함수 내부로 주입하므로 자유롭게 교체가 가능하다.
고차 함수는 매개변수를 통해 전달받은 콜백 함수의 호출 시점을 결정하여 호출한다.

### 순수 함수와 비순수 함수

순수 함수(Pure function): 어떤 외부 상태에 의존하지도 않고 변경시키지도 않는, 즉 부수 효과가 없는 함수, 동일한 인수가 전달되면 동일한 값을 반환한다.
비순수 함수(Impure function): 외부 상태를 변경시키는 즉, 부수 효과가 있는 함수

---

_Reference_

[TCP SCHOOL](http://tcpschool.com/javascript/js_function_parameterArgument)
[OREILLY](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/ch04s02.html)
[Medium](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1)
[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Obsolete_Pages/Core_JavaScript_1.5_Guide/Creating_New_Objects/Using_a_Constructor_Function)
[Programming with Mosh](https://www.youtube.com/watch?v=23AOrSN-wmI&t=314s)
[Poiemaweb/fastcampus](https://poiemaweb.com/fastcampus/function#41-%ED%95%A8%EC%88%98-%EC%84%A0%EC%96%B8%EB%AC%B8)
