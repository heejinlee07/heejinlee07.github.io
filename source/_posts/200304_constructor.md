---
title: 생성자 함수에 의한 객체 생성
date: 2020-03-04
tags:
---

## Object 생성자 함수

> new 연산자와 함께 호출하여 `빈 객체(인스턴스)를 생성하는 함수`.
> `인스턴스(instance)`: 생성자 함수에 의해 생성된 _객체_

```javascript
//빈 객체를 생성
const fruits = new Object();

//프로퍼티 또는 메소드 추가
fruits.name = "banana";
fruits.price = 2000;
fruits.getPrice = function () {
  return this.price;
};
fruits.introduce = function () {
  console.log("hello! " + this.name + " is " + this.getPrice() + " won");
};

console.log(fruits); //{name: 'banana', price: 50,
//getPrice: [Function], introduce: [Function]}
fruits.introduce(); //hello! banana is 2000 won
```

## 객체 리터럴에 의한 객체 생성 방식의 문제점

> 객체 리터럴에 의한 객체 생성 -> `싱글 인스턴스` -> 글로벌 오브젝트
> 생성자 함수에 의한 객체 생성 -> `많은 인스턴스` -> 여러 개의 인스턴스

객체 리터럴에 의한 객체 생성 방식은 *단 하나의 객체만을 생성*한다. **따라서 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우, 매번 같은 프로퍼티를 기술해야 하기 때문에 비효율적.**

```javascript
const car1 = {
  name: "Mercedes-Benz",
  price: 5000,
  salePrice() {
    return this.price - 1000;
  },
};

console.log("this " + car1.name + " price is " + car1.salePrice() + "won");

const car2 = {
  name: "Mercedes-Benz",
  price: 3000,
  salePrice() {
    return this.price - 1000;
  },
};

console.log("this " + car2.name + " price is " + car2.salePrice() + "won");
```

위의 예제 같은 경우, 객체 리터럴에 의해 생성되었기 때문에 동일한 프로퍼티 키를 가진 객체를 재사용하고 싶으면 객체를 매번 새로 생성해야한다.

- 객체는 프로퍼티를 통해 객체 고유의 상태(state)를 표현하고, 메소드를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 동작(behavior)을 표현한다. _그런데 프로퍼티는 객체마다 값이 다를 수 있으나 메소드는 동일한 경우가 일반적이다._
- **객체 리터럴에 의해 객체를 생성하면 프로퍼티 구조가 동일함에도 불구하고 매번 같은 프로퍼티와 메소드를 기술해야 한다.**

---

## 생성자 함수에 의한 객체 생성 방식의 장점

객체(인스턴스)를 생성하기 위한 템플릿(클래스)처럼 생성자 함수를 사용하여 **프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.** 생성자 함수를 생성할 때는 `파스칼케이스`를 사용한다.

```javascript
//생성자 함수로 객체 생성
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스 생성
const circle1 = new Circle(5);
const circle2 = new Circle(10);
const circle3 = new Circle(15);

console.log(circle1.getDiameter()); //10
console.log(circle2.getDiameter()); //20
console.log(circle3.getDiameter()); //30
```

```javascript
//Factory Function
function createCircle(radius) {
  return {
    radius,
    draw() {
      console.log("draw");
    },
  };
}

const myCircle = createCircle(1);
console.log(myCircle);

//Constructor Function
function Circle(radius) {
  this.radius = radius;
  // this는 실행할 코드를 참조하는 것. 빈 객체를 참조한다.
  // reference to the object that is executing this piece of code.
  this.draw = function () {
    console.log("draw");
  };
  //return this;
}

const circle = new Circle(1);
console.log(circle);
```

1. new 생성자가 빈 자바스크립트 객체를 만든다. (ex. const x = {};)
2. this는 new로 생성된 빈 객체를 가리키고, 이 this로 빈 객체에 접근한다.

- this는 객체 자신의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수
- this가 가리키는 값(this 바인딩)은 함수 호출 방식에 따라 동적으로 결정된다.
  - `일반 함수로서 호출` : this가 가리키는 값 -> `전역 객체(브라우저 환경에서는 window, Node.js 환경에서는 global)`
  - `메소드로서 호출`: this가 가리키는 값 -> `메소드를 호출한 객체`
  - `생성자 함수로서 호출`: this가 가리키는 값 -> `생성자 함수가(미래에) 생성할 인스턴스`

3. new 생성자가 위의 객체로부터 새로 생성된 객체를 반환한다. (return this;처럼)

**일반 함수와 동일한 방법으로 함수를 정의하고, new 연산자와 함께 호출하면 생성자 함수로 동작한다.**

---

## 생성자 함수의 인스턴스 생성 과정

생성자 함수가 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿(클래스)으로서 동작하여 **인스턴스를 생성하는 것은 필수**, 생성된 인스턴스를 초기화하는 것은 옵션이다.

```javascript
function Circle(radius) {
  // 1. 암묵적으로 빈 객체(인스턴스)가 생성되고 this에 바인딩된다.
  // console.log(this) -> Circle {}

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  // this + 프로퍼티 or 메소드
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };

  // 3. 암묵적으로 this를 반환한다.
  // 명시적으로 원시 값을 반환하면 원시 값 반환은 무시되고, 암묵적으로 this가 반환된다.
  return 100;
  // return {} -> 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
}

// 4. 인스턴스 생성.
// return 100의 경우 -> Circle 생성자 함수는 명시적으로 반환한 객체를 반환한다. -> Circle {radius: 1, getDiameter: ƒ}
//return {}의 경우 -> 명시적으로 반환한 {}(객체)를 반환한다. -> {}
const circle = new Circle(1);
console.log(circle);
```

1. `인스턴스 생성과 this 바인딩`: 암묵적으로 빈 객체가 생성되는데 이는 바로 생성자 함수가 생성한 인스턴스이며, 인스턴스는 this에 바인딩된다. 따라서 this는 생성자 함수가 생성할 인스턴스를 가리키는 것이다.
2. `인스턴스 초기화`: 생성자 함수에 있는 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 인스턴스에 프로퍼티나 메소드를 추가하고 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당한다.
3. `인스턴스 반환`: **생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스에 바인딩된 this가 암묵적으로 반환된다.** 만약 명시적으로 this가 아닌 다른 객체를 반환하면 this는 반환되지 않고 return문에 명시한 객체가 반환된다. 그러나 명시적으로 원시값을 반환하면 이는 무시되고, 암묵적으로 this가 반환된다. <u>이처럼 this가 반환하는 값이 변경되기 때문에 return문을 반드시 생략한다.</u>

---

## 내부 메소드 [[Call]]과 [[Construct]]

함수는 객체이므로 일반 객체와 동일하게 동작할 수 있고, 일반 객체의 내부 슬롯과 내부 메소드를 모두 가지고 있다. 하지만 _함수 객체는 반드시 callable이어야 한다._

- `callable`: 내부 메소드 \[[Call]]을 가지고 있다.
  **호출할 수 있는 객체인 함수**
- `constructor`: 내부 메소드 <u>\[[Construct]]를 가지고 있다.</u>
  생성자 함수로서 호출할 수 있는(new 연산자 또는 super 연산자와 함께 호출)객체
- `non-constructor`: 내부 메소드 <u>\[[Construct]]를 가지고 있지 않다.</u>
  객체를 생성자 함수로 호출할 수 없는 함수

일반적인 함수로 호출하면 함수 객체의 내부 메소드 \[[Call]]가 호출되고, 생성자 함수로 호출되면 내부 메소드 \[[Construct]]가 호출된다. **단, 생성자 함수로 정의하지 않은 일반 함수를 new 연산자와 함께 호출하면 생성자 함수로 동작한다. 즉 \[[Construct]]가 호출된다.**

함수 객체는 반드시 callable이지만 constructor일 수도 있고 non-constructor일 수 있다. 따라서 모든 함수 객체는 호출이 가능하지만 _모든 함수 객체를 생성자 함수로서 호출할 수 있는 것은 아니다._

> `constructor`: 함수 선언문, 함수 표현식, 클래스(클래스도 함수다)
> `non-constructor`: 메서드(ES6 메서드 축약 표현), 화살표 함수

---

_References_

[Questpond](https://www.youtube.com/watch?v=dVoAq2D3n44&t=51s)
[Programming with Mosh](https://www.youtube.com/watch?v=23AOrSN-wmI)
[Rob Merrill](https://www.youtube.com/watch?v=oSs_25dmxOE)
[poiemaweb](https://poiemaweb.com/fastcampus/constructor)
