---
title: rest and spread
date: 2020-05-06 13:00
tags:
---

## 스프레드 문법(...)

하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서(전개, 분산하여, spread) 개별적인 값들의 목록으로 만든다.
스프레드 문법의 결과는 값이 아니기 떄문에 변수에 할당할 수 없고, 아래와 같은 문맥에서만 사용한다.

- 함수 호출문의 인수 목록
- 배열 리터럴의 요소 목록
- 객체 리터럴의 프로퍼티 목록

### 함수 호출문의 인수 목록

```javascript
const arr = [1, 2, 3];

// 스프레드 문법을 사용하여 배열 arr을 1, 2, 3으로 펼쳐서 Math.max에 전달한다.
// Math.max(...[1, 2, 3])는 Math.max(1, 2, 3)과 같다.
const maxValue = Math.max(...arr);

console.log(maxValue); // 3
```

`주의`
rest 파라미터와 spread는 형태가 '...'으로 동일한데 rest는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해서 매개변수 앞에 ...을 붙이는 것이고, 스프레드는 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만드는 것이다. 서로 정반대의 개념이다. 참고로 배열에서 rest는 반드시 맨마지막에 위치해야 한다. spread는 어디에 오든 상관없다.

```javascript
// Rest 파라미터는 인수들의 목록을 배열로 전달받는다.
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest); // [ 2, 3 ]
}

// 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
// [1, 2, 3] -> 1, 2, 3
foo(...[1, 2, 3]);
```

---

_Reference_
[poiemaweb/fastcampus](https://poiemaweb.com/fastcampus/destructuring)
[ES6 Javascript:The Complete Developer's Guide](https://poiemaweb.com/fastcampus/spread-syntax)
