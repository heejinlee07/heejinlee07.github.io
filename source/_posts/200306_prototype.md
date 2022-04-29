---
title: 프로토타입 / Prototype
date: 2020-03-06
tags:
---

## 객체지향 프로그래밍

프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍(Imperative programming)의 절차지향적 관점에서 벗어나 여러 개의 독립적 단위, 즉 `객체(object)들의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임.`

- 속성을 통해 여러 개의 값을 하나의 단위로 구성한 복합적인 자료 구조를 객체라 하며 객체 지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.
- 객체의 상태(state)를 나타내는 데이터와 상태 데이터를 조작할 수 있는 동작(behavior)을 하나의 논리적인 단위로 묶어 생각한다. 따라서 객체는 상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료 구조라고 할 수 있다. 객체의 상태 데이터를 프로퍼티(property), 동작을 메소드(method)라 부른다.

## 상속과 프로토타입

- 상속: 어떤 객체의 프로퍼티 또는 메소드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다. **자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 중복을 제거한다.**

- 생성자 함수: 동일한 프로퍼티 구조를 갖는 객체를 여러 개 생성할 때 유용하지만, **생성자 함수가 인스턴스를 생성할 때마다 메소드를 중복 생성하고, 모든 인스턴스가 이를 중복 소유한다. 이는 메모리를 불필요하게 낭비하고, 퍼포먼스에 악영향을 준다.** 이런 경우 상속을 이용하여 불필요한 중복을 제거할 수 있다.

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 공유할 수 있도록 getArea 메소드를 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * Math.pow(this.radius, 2);
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype로부터 getArea 메소드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메소드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

---

## 프로토타입 객체

**객체간 상속(inheritance)을 구현하기 위해 사용.** 어떤 객체의 상위 객체의 역할을 하는 객체이며, _다른 객체에 공유 프로퍼티(메소드 포함)를 제공한다._ 또한 모든 객체는 \[[Prototype]]이라는 내부 슬롯을 가지며, 객체 생성 시 \[[Prototype]] 내부 슬롯의 값으로 프로토타입의 참조를 저장한다. *즉 모든 객체는 하나의 프로토타입을 가진다.*프로토타입은 null이거나 객체인데 모든 프로토타입은 생성자 함수와 연결되어 있다.(객체-프로토타입-생성자 함수는 서로 연결되어 있다.)

## \_\_proto\_\_ 접근자 프로퍼티

모든 객체는 \_\_proto\_\_ 접근자 프로퍼티를 통해 자신의 프로토타입, 즉 \[[Prototype]] 내부 슬롯에 접근할 수 있다. 하지만 직접 접근할 수 없으며 \_\_proto\_\_ 접근자 프로퍼티를 통해 간접적으로 프로토타입에 접근할 수 있다. _이는 상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함이며 반드시 단방향 링크드 리스트로 구현되어야 한다._ 만약 이렇게 하지 않으면 프로토타입 체인의 검색 과정에서 무한 루프에 빠질 수 있다. 또한 \_\_proto\_\_ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티이다. `Object.prototype`은 프로토타입 체인의 최상위 객체이며, 이 객체의 프로퍼티와 메서드는 모든 객체에게 상속된다.

_\_\_proto\_\_접근자 프로퍼티는 코드 내에서 직접 사용하지 않는다._ 아래와 같이 object.prototype을 상속받지 않는 객체를 만들 수도 있기 때문이다. 이 경우 \_\_proto\_\_접근자 프로퍼티를 사용하지 않는다.

```javascript
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서 Object.getPrototypeOf 메소드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

- Object.getPrototypeOf 메소드: 프로토타입을 `참조`하고 싶을 때 사용한다.
- Object.setPrototypeOf 메소드: 프로토타입을 `교체`하고 싶을 때 사용한다.

## 함수 객체의 prototype 프로퍼티

함수 객체는 \_\_proto\_\_ 외에 prototype 프로퍼티를 소유한다. 이는 함수 객체만이 소유하며, _생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다._ 따라서 생성자 함수로 호출할 수 없는 non-constructor인 화살표 함수와 메소드는 prototype 프로퍼티를 소유하지 않고, 프로토타입도 생성하지 않는다.

```javascript
const Person = (name) => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined
```

- \_\_proto\_\_접근자 프로퍼티: **모든 객체가 소유**하며, 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용한다.
- `prototype 프로퍼티`: **함수 객체만이 소유**하며, 생성자 함수가 자신이 생성할 인스턴스(객체)의 프로토타입을 할당하기 위해 사용한다.
- 객체의 \_\_proto\_\_접근자 프로퍼티와 함수 객체의 prototype 프로퍼티는 동일한 프로토타입을 가리킨다.
- 모든 프로토타입은 constructor 프로퍼티를 갖고, 이는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다. 이 연결은 생성자 함수가 생성될 때, 즉 함수 객체가 생성될 때 이루어진다.

---

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다. 이처럼 new 연산자와 생성자 함수를 호출하여 인스턴스를 생성하지 않고, 리터럴 표기법(객체 리터럴, 함수 리터럴, 배열 리터럴, 정규표현식 리터럴 등)으로 객체를 생성할 수도 있다.

- object 생성자 함수: 인수가 전달되지 않으면 추상연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성하고, 인수가 전달된 경우 인수를 객체로 변환한다.
- 객체 리터럴: 평가시 OrdinaryObjectCreate를 호출하여 빈객체를 생성하고 프로퍼티를 추가한다.

object 생성자 함수와 객체 리터럴 평가는 _OrdinaryObjectCreate를 호출하여 빈 객체를 생성하는 점은 동일하다._ 그러나 new.target의 확인, 프로퍼티를 추가하는 처리 등의 세부 내용이 다르다. 따라서 객체 리터럴에 의해 생성된 객체는 object 생성자 함수가 생성한 객체가 아니다.

```javascript
function foo() {} //생성자 함수가 아닌 함수 선언문(함수 리터럴)로 생성한 함수 foo

console.log(foo.constructor === function); //true
```

foo()는 생성자 함수로 생성하지 않았지만 constructor를 통해 확인해 보면 함수 foo의 생성자 함수가 function 생성자 함수인 것을 알 수 있다. 리터럴 표기법에 의해 생성된 객체도 `상속`을 위해 프로토타입이 필요하기 때문에 가상의 생성자 함수를 갖는다. `생성자함수-프로토타입`은 항상 쌍으로 연결되며, prototype, constructor에 의해 연결되어 있기 때문이다.

## 프로토타입의 생성 시점

모든 객체는 생성자 함수와 연결되어 있고, 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성된다.

## 사용자 정의 생성자 함수와 프로토타입 생성 시점

생성자 함수로서 호출할 수 있는, 내부 메소드 \[[construct]]를 갖는 함수 객체는 new 연산자와 함께 생성자 함수로 호출할 수 있다. 이러한 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 같이 생성된다. _함수 선언문의 경우 런타임 이전에 객체 생성 및 할당이 완료되기 때문에 프로토타입도 런타임 이전에 생성된다._ 그리고 모든 객체는 프로토타입을 가지기 때문에 프로토타입은 자신의 프로토타입인 `object.prototype`을 가진다. 단, non-constructor는 프로토타입이 생성되지 않는다.

```javascript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // {constructor: ƒ}

// 생성자 함수
function Person(name) {
  this.name = name;
}
```

## 빌트인 생성자 함수와 프로토타입 생성 시점

빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성되고, 모든 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성된다. 전역 객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체를 말한다.

---

## 객체 생성 방식과 프로토타입의 결정

다음과 같은 다양한 방식으로 객체를 생성할 수 있는데 _추상 연산 OrdinaryObjectCreate에 의해 생성된다는 공통점이 있다._ 객체 리터럴과 object 생성자 함수는 추상 연산 OrdinaryObjectCreate를 호출한다는 점과 이로 인해 연결되는 구조는 객체 리터럴에 의해 생긴 객체와 동일하다. 단, 객체 리터럴 방식은 리터럴 내부에 프로퍼티를 추가하고 object 생성자 함수는 빈 객체를 먼저 생성한 후 프로퍼티를 추가해야 한다.

- 객체 리터럴
- Object 생성자 함수
- 생성자 함수
- Object.create 메소드
- 클래스 (ES6)

## 생성자 함수에 의해 생성된 객체의 프로토타입

생성자 함수에 의해 생성되는 객체의 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체이다. 아래 예제에서 사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor 뿐이다. 프로토타입은 객체이기 때문에 일반 객체처럼 프로토타입에도 프로퍼티를 추가/삭제할 수 있다.

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메소드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```

## 프로토타입 체인

**자바스크립트가 객체 지향 프로그래밍의 상속을 구현하는 메커니즘.** 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하고자 하는 프로퍼티가 없으면 \[[Protorype]] 내부 슬롯의 참조값을 따라서 스코프체인이 그러하듯 자신의 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다.

<u>프로토타입 체인의 최상위: Object.prototype</u>
모든 객체는 `Object.prototype`을 상속받으며, 이를 프로토타입 체인의 종점이라 한다. `Object.prototype`의 프로토타입은 `null`이다. 만약 `Object.prototype`에서도 프로퍼티를 찾을 수 없다면 `undefined`를 반환한다.

프로토타입 체인이 상속과 프로퍼티 검색을 위한 메커니즘이라면 스코프 체인은 식별자 체인을 위한 메커니즘이다. 단, 스코프 체인과 프로토타입 체인을 별도의 개념이 아니라 서로 협력하면서 식별자와 프로퍼티를 검색한다.

## 캡슐화

정보의 일부를 외부에 감추어 은닉(정보 은닉(information hiding))하는 것으로 적절치 못한 접근으로부터 정보를 보호하고 객체간의 상호 의존성, 즉 결합도를 낮추는 효과가 있다.

즉시 실행 함수를 사용하여 코드를 깔끔하게 묶는다.

## 오버라이딩과 프로퍼티 쉐도잉

- 프로토타입 프로퍼티(메소드 포함): 프로토타입이 소유.
- 인스턴스 프로퍼티: 인스턴스가 소유.
- 프로퍼티 쉐도잉: 상속 관계에 의해 프로퍼티가 가려지는 현상.
- 오버라이딩: 상위 클래스가 가지고 있는 메소드를 하위 클래스가 재정의하여 사용.

프로토타입과 인스턴스에 동일한 이름의 프로퍼티를 추가했을 때, 프로토타입에 정의된 프로퍼티를 덮어쓰는 것이 아니라 프로포타입의 메소드가 인스턴스 프로퍼티에 의해 가려진다.

```javascript
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메소드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
})();

const me = new Person('Lee');

// 인스턴스 메소드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메소드가 호출된다. 프로토타입 메소드는 인스턴스 메소드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

---

## 프로토타입의 교체

부모 객체인 프로토타입을 동적으로 변경할 수 있으며, 생성자 함수에 의한 방법과 인스턴스에 의한 교체 방법이 있다. _하지만 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 링크가 파괴된다._

- 생성자 함수에 의한 프로토타입의 교체: 다른 임의의 객체를 바인딩하여 미래에 생성할 인스턴스의 프로토타입을 교체한다.
- 인스턴스에 의한 프로토타입의 교체: `__proto__` 접근자 프로퍼티를 통해 이미 생성된 객체의 프로토타입을 교체한다.

### 생성자 함수에 의한 프로토타입의 교체

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype = {
    /* constructor 프로퍼티와 생성자 함수 간의 링크를 설정하고 싶다면
  constructor: Person, 이라고 명시한다.*/
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    },
  };

  return Person;
})();

const me = new Person('Lee');
```

위와 같이 프로토타입을 객체로 교체하면 Person.prototype에 있던 `constructor`프로퍼티가 사라지기 때문에 me 객체의 생성자 함수는 Person이 아닌 Object가 나온다.

## 인스턴스에 의한 프로토타입의 교체

인스턴스의 \_\_proto\_\_ 접근자 프로퍼티(또는 Object.getPrototypeOf 메소드)를 통해 접근할 수 있다

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  /* constructor 프로퍼티와 생성자 함수 간의 링크를 설정하고 싶다면
  constructor: Person, 이라고 명시한다.*/
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  },
};

/* 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 링크 설정
Person.prototype = parent; */

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
```

인스턴스에 의한 프로토타입도 생성자 함수에 의한 프로토타입과 마찬가지로 constructor 프로퍼티와 생성자 함수 간의 연결을 파괴한다. _단, 생성자 함수에 의한 교체는 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키고 있다. 하지만 인스턴스에 의한 교체는 생성자 함수의 protorype 프로퍼티가 교체된 프로토타입을 가리키고 있지 않다._

---

## instanceof 연산자

`객체 instanceof 생성자 함수`

> 객체가 생성자 함수의 instance인가?

좌변의 객체가 우변의 생성자 함수와 연결된 인스턴스라면 true로 평가되고 그렇지 않은 경우에는 false로 평가된다. instanceof 연산자는 상속 관계를 고려한다는 것에 주의.

## Object.create에 의한 직접 상속

명시적으로 프로토타입을 지정하여 새로운 객체를 생성한다. Object.create 메소드도 다른 객체 생성 방식과 마찬가지로 추상 연산 OrdinaryObjectCreate를 호출한다.

## 객체 리터럴 내부에서 \_\_proto\_\_에 의한 직접 상속

ES6에서는 객체 리터럴 내부에서 \_\_proto\_\_접근자 프로퍼티를 사용하여 직접 상속을 구현할 수 있다.

## 정적 프로퍼티/메소드

정적(static) 프로퍼티/메소드는 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티/메소드를 말한다.

## 프로퍼티 존재 확인

```javascript
/**
 * key: 프로퍼티 키를 나타내는 문자열
 * object: 객체로 평가되는 표현식
 */
key in object;
```

in 연산자는 확인 대상 객체 내에 프로퍼티가 존재하는지 여부를 확인한다.

## 프로퍼티 열거

## for...in문

`for (변수선언문 in 객체) { … }`
객체의 모든 프로퍼티를 순회하며 열거(enumeration). 단 프로퍼티 키가 심볼인 프로퍼티는 열거하지 않는다. 순서는 보장되지 않으며 상속받은 프로토타입의 프로퍼티까지 열거한다.

## Object.keys/values/entries 메소드

상속받은 프로퍼티를 제외하고 객체 자신의 프로퍼티만을 열거하고자 할 때 사용.

- Object.keys 메소드: 객체 자신의 열거 가능한(enumerable) 프로퍼티 키를 배열로 반환한다.
- Object.values 메소드: 객체 자신의 열거 가능한 프로퍼티 값을 배열로 반환
- Object.entries 메소드: 객체 자신의 열거 가능한 프로퍼티 키와 값의 쌍의 배열을 배열에 담아 반환

---

_References_
[프로토타입](https://poiemaweb.com/fastcampus/prototype)
