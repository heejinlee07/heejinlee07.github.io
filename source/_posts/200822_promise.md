---
title: Promise
date: 2020-08-22 13:00
tags:
---

---

_References_
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
[poiemaweb](https://poiemaweb.com/fastcampus/promise)
[States and fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)

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

프로미스가 생성된 후 기본적으로 pending 상태를 가지고, 비동기 처리 수행의 성공 또는 실패에 따라 아래와 같이 상태가 변경된다.

![promise](https://mdn.mozillademos.org/files/8633/promises.png)
[사진출처 - MDN]

- 대기(pending): 비동기 처리가 이행하거나 거부되지 않은 초기 상태.
- 이행(fulfilled): 비동기 처리가 성공적으로 완료됨.
- 거부(rejected): 비동기 처리가 실패함.
- settled: 비동기 처리가 수행되었고, pending이 아니면서 fulfilled 또는 rejected일 때를 말한다. **settled는 상태가 아니다.** 표현의 편의를 위한 언어적 표현일 뿐이다. 일단 settled 상태가 되면 더는 다른 상태로 변화할 수 없다.

|   states    |                            meaning                            |   value    |          condition          | fates                  |
| :---------: | :-----------------------------------------------------------: | :--------: | :-------------------------: | ---------------------- |
|  fulfilled  |               비동기 처리가 수행된 상태 (성공)                | 처리결과값 |        resolve 호출         | resolved               |
| reject 호출 |               비동기 처리가 수행된 상태 (실패)                |    에러    |           reject            | resolved               |
|   pending   | 비동기 처리 수행 전, fulfilled도 아니고, rejected도 아닌 상태 | undefined  | 프로미스 생성직후 기본 상태 | unresolved or resolved |

프로미스는 필연적으로 아래 상태에 따라 resolved 되거나 unresolved된다.

- `resolved`: 프로미스가 `resolved`되었다는 것은 resolve나 reject를 시도하려 해도 어떠한 효과가 없다는 것인데 이는 즉 프로미스가 다른 프로미스의 상태에 맞춰 처리되거나 상태가 'locked in(고정)'되었음을 의미한다.
  - fulfilled: non-promise value로 확인되었거나 전달된 fulfillment handler를 최대한 빨리 다시 호출하는 thenable로 해결한 경우, 혹은 또다른 프로미스를 처리하는 경우
  - Rejected: rejected 되었거나 전달된 rejection handler를 최대한 빨리 다시 호출하여 해결하는 경우, 혹은 또다른 rejected된 프로미스로 해결되는 경우
  - pending: fulfillment handler 또는 rejection handler를 호출할 수 없는 thenable로 해결된 경우 또는 pending 중인 또다른 프로미스로 해결된 경우
- `unresolved`: 프로미스가 `unresolved`되었다는 것은 말그대로 `resolved`되지 않았다는 것이다. 따라서 resolve나 reject를 시도하면 프로미스에 영향이 있다.
  - 프로미스가 unresolved라면 반드시 pending인 것이다.

프로미스는 프로미스 또는 thenable(then 메소드를 정의하는 객체 또는 함수)로 `해결`할 수 있다. 이 경우 나중에 unwrapping하기 위해 프로미스나 thenable를 저장할 수 있다. 혹은 non-promise value로 `해결`될 수 있고 해당 값으로 fulfilled 된다.

이러한 states와 fates의 관계는 재귀적이다.즉 프로미스가 thenable로 해결된 경우 fulfillment handler를 호출하고
Note that these relations are recursive, e.g. a promise that has been resolved to a thenable which will call its fulfillment handler with a promise that has been rejected is itself rejected.
