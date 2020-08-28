---
title: Promise
date: 2020-08-22 13:00
tags:
---

## 프로미스의 생성

Promise 생성자 함수를 new 연산자와 함께 호출하면 프로미스(`Promise 객체`)를 생성한다. Promise 객체는 비동기 작업이 맞이할 미래의 완료 또는 실패, 그 결과 값을 나타낸다. 또한 비동기 액션이 종료된 이후, 성공했을 때의 value나 실패 이유를 처리하기 위한 handler를 연결할 수 있도록 한다. 이처럼 프로미스를 사용하면 비동기 메서드에서도 동기 메서드처럼 최종 value를 반환할 수 있다. 다만 즉시 최종 value를 반환하지는 않고, 비동기 메서드가 프로미스를 반환하면 프로미스가 미래의 어떤 시점에 받을 value를 제공한다.

```javascript
// 프로미스 생성
const promise = new Promise((resolve, reject) => {
  // Promise 함수의 콜백 함수 내부에서 비동기 처리를 수행한다.
  if (/* 비동기 처리 성공 */) {
    resolve('result');
  } else { /* 비동기 처리 실패 */
    reject('failure reason');
  }
});
```

## 프로미스의 상태

프로미스가 생성된 후 기본적으로 pending 상태를 가지고, 비동기 처리 수행의 성공 또는 실패에 따라 아래와 같이 상태가 변경된다. 그리고 필연적으로 아래 상태에 따라 resolved 되거나 unresolved된다.

![promise](https://mdn.mozillademos.org/files/8633/promises.png)
[사진출처 - MDN]

- 대기(pending): 비동기 처리가 이행하거나 거부되지 않은 초기 상태.
- 이행(fulfilled): 비동기 처리가 성공적으로 완료됨.
- 거부(rejected): 비동기 처리가 실패함.
- settled: 비동기 처리가 수행되었고, pending이 아니면서 fulfilled 또는 rejected일 때를 말한다. **settled는 상태가 아니다.** 표현의 편의를 위한 언어적 표현일 뿐이다. 일단 settled 상태가 되면 더는 다른 상태로 변화할 수 없다.

|  states   |                            meaning                            |   value    |          condition          | fates                  |
| :-------: | :-----------------------------------------------------------: | :--------: | :-------------------------: | ---------------------- |
| fulfilled |               비동기 처리가 수행된 상태 (성공)                | 처리결과값 |        resolve 호출         | resolved               |
| rejected  |               비동기 처리가 수행된 상태 (실패)                |    에러    |         reject 호출         | resolved               |
|  pending  | 비동기 처리 수행 전, fulfilled도 아니고, rejected도 아닌 상태 | undefined  | 프로미스 생성직후 기본 상태 | unresolved or resolved |

---

## 프로미스의 후속 처리 메서드

프로미스가 fulfilled 상태이거나 rejected 상태 일 때 이에 대한 후속 처리가 필요하다. 이처럼 프로미스의 비동기 처리 상태가 변화하면 후속 처리 메서드에 인수로 전달한 콜백 함수를 선택적으로 호출하고, **모든 후속 처리 메서드는 프로미스를 반환하며 비동기로 동작한다.**

### Promise.prototype.then

**언제나 Promise를 return하고, 두 개의 콜백 함수를 인수로 전달받는다.** 그리고 Promise가 이행하거나 거부했을 때, 각각에 해당하는 핸들러 함수(onFulfilled나 onRejected)가 비동기적으로 실행된다.

```javascript
p.then(onFulfilled, onRejected);

p.then(
  function (value) {
    // 이행
    // onFulfilled: Promise가 수행될 때 호출되는 Function
    // 인수: 이행 값(fulfillment value)
  },
  function (reason) {
    // 거부
    // onRejected: Promise가 거부될 때 호출되는 Function
    // 인수: 거부 이유(rejection reason)
  }
);
```

<u>반환값</u>

- ① fulfilled 상태: 비동기 처리 성공(이행). 프로미스의 비동기 처리 결과를 콜백함수의 인수로 받음.
- ② rejected 상태: 비동기 처리 실패(거부). 프로미스의 에러를 인수로 전달받음.

```javascript
// fulfilled ①
new Promise((resolve) => resolve("fulfilled")).then(
  (v) => console.log(v),
  (e) => console.error(e)
); // fulfilled

// rejected ②
new Promise((_, reject) => reject(new Error("rejected"))).then(
  (v) => console.log(v),
  (e) => console.error(e)
); // Error: rejected
```

Promise가 이행하거나 거부했을 때, 각각에 해당하는 핸들러 함수(onFulfilled나 onRejected)가 비동기적으로 실행되는 조건은 다음과 같다.

|         반환조건          |                   반환값                   |
| :-----------------------: | :----------------------------------------: |
|     함수가 값을 반환      |     then에서 반환한 프로미스의 반환값      |
|    값을 반환하지 않음     |                 undefined                  |
|         오류 발생         |     then에서 반환한 프로미스의 오류값      |
| 이미 이행한 프로미스 반환 |     then에서 반환한 프로미스의 결과값      |
| 이미 거부한 프로미스 반환 | then에서 반환한 프로미스의 결과값으로 거부 |
|  대기 중인 프로미스 반환  |       프로미스의 이행 여부와 결과값        |

### Promise.prototype.catch

**한 개의 콜백 함수를 인수로 전달받고, 프로미스가 `rejected`일 때만 호출된다.** 그리고 언제나 프로미스를 반환한다.

```javascript
p.catch(onRejected);

p.catch(function (reason) {
  // rejection
});

// rejected
new Promise((_, reject) => reject(new Error("rejected"))).catch((e) =>
  console.log(e)
); // Error: rejected
```

### Promise.prototype.finally

언제나 프로미스를 반환하고, **한 개의 콜백함수를 인수로 전달받으며, 프로미스의 성공, 실패와 상관없이 무조건 한 번 호출된다.**

```javascript
new Promise(() => {}).finally(() => console.log("finally")); // finally
```

---

_References_
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
[poiemaweb](https://poiemaweb.com/fastcampus/promise)
[States and fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)
