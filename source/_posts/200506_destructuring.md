---
title: 디스트럭처링
date: 2020-05-06
tags:
---

## 디스트럭처링(구조 분해 할당)

구조화된 배열 또는 객체를 파괴하여 1개 이상의 변수에 개별적으로 할당하는 것. 객체 또는 배열에서 필요한 값만을 추출하여 변수에 할당할 때 유용.

### 왜 디스트럭처링이 필요한가?

객체에서 값을 찾거나 복제하고 싶을 때 ES5에서는 중복이 발생한다.

```javascript
var expense = {
  type: "Business",
  amount: "$45 USD",
};

var type = expense.type;
var amount = expense.amount;
```

같은 방식으로 값을 찾거나 복제할 때 ES6는 코드 중복을 줄일 수 있다.

```javascript
const { type } = expense;
const { amount } = expense;

// 한 단계 더 줄인다면
const { type, amount } = expense;
console.log(type, amount); //Business $45 USD
```

### 객체에서 디스트럭처링 할당

파라미터로 받아온 file로 내부의 값을 조회하여 return할 때 매번 `file.`이라고 입력해야 하는데,디스트럭처링 할당을 하면 그럴 필요가 없다.

_객체 디스트럭처링 할당 방법_

- 객체의 각 프로퍼티를 추출하여 1개 이상의 변수에 할당하는데 여러 개의 변수를 객체 리터럴{} 형태로 선언한다. 할당 기준은 프로퍼티 키이다. 이때 주의할 점은 반드시 변수명은 프로퍼티 키의 이름과 동일해야 한다.

```javascript
var savedFiled = {
  extension: "jpg",
  name: "repost",
  size: 14040,
};

// ES5
function es5FileSummary(file) {
  return `The fils ${file.name}.${file.extension} is of size ${file.size}`;
}

console.log(es5FileSummary(savedFiled));

// ES6
function es6FileSummary({ name, extension, size }, { color }) {
  return `${color} The fils ${name}.${extension} is of size ${size}`;
}

console.log(es6FileSummary(savedFiled, { color: "red" }));
```

### 배열의 디스트럭처링 할당

```javascript
// ES5
var arr = [1, 2, 3];

var one = arr[0];
var two = arr[1];
var three = arr[2];

console.log(one, two, three); // 1 2 3

// ES6
const arr = [1, 2, 3];

// 변수 one, two, three를 선언하고 배열 arr을 디스트럭처링하여 할당한다.
// 이때 할당 기준은 배열의 인덱스이다.
const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

- 프로퍼티를 디스트럭처링하고 싶을 때는 {}, 기준: 프로퍼티 키
- Element를 디스트럭처렁 하고 싶을 때는 [], 기준: 인덱스

---

_Reference_
[poiemaweb/fastcampus](https://poiemaweb.com/fastcampus/destructuring)
[ES6 Javascript:The Complete Developer's Guide](https://www.udemy.com/course/javascript-es6-tutorial/)
