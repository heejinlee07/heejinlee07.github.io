---
title: 프로퍼티 어트리뷰트 / Property Attribute
date: 2020-03-03
tags:
---

## 객체

ECMAScript 사양에 따르면 객체는 다음과 같이 구성된다.

- `내부 슬롯(Internal slots)`: 자바스크립트에서 접근할 수 없는 위치에 있는 저장소(storage)이며 only to operations in the specification.
- `프로퍼티의 집합(A collection of properties)`: 각각의 프로퍼티는 키를 속성과 연결한다.(fields in a record). 프로퍼티 키는 `string`이나 `symbol` 중 하나다.

## 내부 슬롯과 내부 메소드

자바스크립트 엔진의 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(Pseudo property)와 의사 메소드(Pseudo method). 내부 슬롯과 내부 메소드는 외부로 공개된 객체의 프로퍼티가 아닌 엔진의 내부 로직이기 때문에 간접적으로 접근할 수 있는 일부 경우를 제외하고는 직접 접근하거나 호출할 수 없다. 이중대괄호([[]])로 묶인 이름으로 식별한다.

- `내부 슬롯(Internal slots)`
- 메소드 슬롯(Method slot): 객체 조작을 위함 (프로퍼티 가져오기, 설정 등)
- 데이터 슬롯(Data slot): 저장소(storage)가 있음. [[Prototype]], [[Extensible]], [[PrivateFieldValues]]

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때, 프로퍼티의 상태[프로퍼티의 값(value), 값의 갱신 가능 여부(writable), 열거 가능 여부(enumerable), 재정의 가능 여부(configurable)]를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.

- `프로퍼티 어트리뷰트`: 프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값(meta-property)인 내부 슬롯([[Value]], [[Writable]], [[Enumerable]], [[Configurable]])이다. Object.getOwnPropertyDescriptor 메소드를 사용하여 간접적으로 확인할 수 있다.
- `프로퍼티 디스크립터`: 어트리뷰트의 특성을 자바스크립트 객체로 인코딩한다. 새로운 프로퍼티를 만들거나 이미 존재하고 있는 프로퍼티를 바꿀 수도 있다.
- `Object.getOwnPropertyDescriptor 메소드`: 호출 시 첫번째 매개변수에는 객체의 참조를 전달, 두번째 매개변수에는 프로퍼티 키를 문자열로 전달한다.

```javascript
const person = {
  name: "Lee"
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, "name"));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

프로퍼티가 여러 개일 때 프로퍼티 어트리뷰트 정보를 알고 싶다면 `getOwnPropertyDescriptors`를 사용한다.

## 데이터 프로퍼티와 접근자 프로퍼티

- `데이터 프로퍼티`: 데이터를 저장. 키와 값으로 구성된 일반적인 프로퍼티. 키에 값을 연결
- `접근자 프로퍼티`: 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수(Accessor function)로 구성된 프로퍼티. 값을 가져오거나 저장하기 위해 하나 혹은 두 개의 접근자 함수 (get, set)을 연결짓는다.
  getter/setter 함수가 있는데 getter은 get 어트리뷰트, setter은 set 어트리뷰트에 저장됨.

  ### 데이터 프로퍼티

  데이터 프로퍼티는 프로퍼티 어트리뷰트를 갖는데, JS 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.

  - [[Value]]: value. 프로퍼티 키로 프로퍼티 값에 접근하면 반환되는 값
  - [[Writable]]: writable. 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다. `false`인 경우 [[value]]의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다.
  - [[Enumerable]]: enumerable. 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다. [[Enumerable]]의 값이 false인 경우, 해당 프로퍼티는 for…in 문이나 Object.keys 메소드 등으로 열거할 수 없다.
  - [[Configurable]]: configurable. 프로퍼티의 재정의 가능 여부를 나타내며 불리언 값을 갖는다. 값이 false인 경우, 해당 프로퍼티의 삭제, 프로퍼티 어트리뷰트 값의 변경이 금지된다.

### 접근자 프로퍼티

자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(Accessor function)로 구성된 프로퍼티다.

- [[Get]]: get. 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수. 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.
- [[Set]]: set. 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수. 프로퍼티 어트리뷰트 [[Set]]의 값, 즉 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환된다.
- [[Enumerable]]: enumerable. 데이터 프로퍼티의 [[Enumerable]]와 같다.
- [[Configurable]]: configurable. false라면 이 속성은 제거될 수 없고, 데이터 속성을 수정할 수 없다.

## 프로퍼티 정의

새로운 프로퍼티를 추가하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나, 기존 프로퍼티의 프로퍼티 어트리뷰트를 재정의하는 것. 객체의 프로퍼티가 어떻게 동작해야하는지를 명확히 정의할 수 있다. Object.defineProperty 메소드 사용

## 객체 변경 방지

객체는 변경 가능한 값이므로 재할당없이 직접 변경이 가능하다. 즉, 프로퍼티를 추가하거나 삭제할 수 있고, 프로퍼티의 값을 갱신할 수 있으며 Object.defineProperty 또는 Object.defineProperties 메소드를 사용하여 프로퍼티 어트리뷰트를 재정의할 수도 있다.

### 객체 확장 금지

Object.preventExtensions 메소드는 객체의 확장을 금지한다. 객체 확장 금지란 프로퍼티 추가 금지를 의미한다. 즉, 확장이 금지된 객체는 프로퍼티 추가가 금지된다. 확장이 금지된 객체인지 여부는 Object.isExtensible 메소드로 확인 할 수 있다.

### 객체 밀봉

Object.seal 메소드는 객체를 밀봉한다. 객체 밀봉(seal)이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지를 의미한다. 즉, 밀봉된 객체는 읽기와 쓰기만 가능하게 된다. 밀봉된 객체인지 여부는 Object.isSealed 메소드로 확인 할 수 있다.

### 객체 동결

Object.freeze 메소드는 객체를 동결한다. 객체 동결(freeze)이란 프로퍼티 추가 및 삭제와 프로퍼티 어트리뷰트 재정의 금지, 프로퍼티 값 갱신 금지를 의미한다. 즉, 동결된 객체는 읽기만 가능하게 된다. 밀봉된 객체인지 여부는 Object.isFrozen 메소드로 확인 할 수 있다.

### 불변 객체

지금까지 살펴본 변경 방지 메소드들은 얕은 변경 방지(Shallow only)로 직속 프로퍼티만 변경이 방지되고 중첩 객체까지는 영향을 주지는 못하다. 따라서 Object.freeze 메소드로 객체를 동결하여도 중첩 객체까지 동결할 수 없다.

---

_Reference_

[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)
[2ality](https://2ality.com/2019/11/object-property-attributes.html)
[ECMAScript](http://ecma-international.org/ecma-262/10.0/#sec-object-internal-methods-and-internal-slots)
