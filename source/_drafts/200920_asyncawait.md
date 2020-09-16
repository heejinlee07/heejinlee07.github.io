---
title: async/await
date: 2020-09-20
tags:
---

## async/await

프로미스를 기반으로 동작한다. async/await를 사용하면 프로미스의 후속 처리 메서드 없이 동기 처리처럼 프로미스가 처리 결과를 반환하도록 구현할 수 있다.

```javascript
const fetch = require("node-fetch");

async function fetchTodo() {
  const url = "https://jsonplaceholder.typicode.com/todos/1";

  const response = await fetch(url);
  const todo = await response.json();
  console.log(todo);
  // {userId: 1, id: 1, title: 'delectus aut autem', completed: false}
}

fetchTodo();
```

## async 함수

**async 키워드를 사용해 정의하고 언제나 프로미스를 반환한다.** async function()은 await 키워드가 비동기 코드를 호출할 수 있게 해주는 함수이다. 명시적으로 프로미스를 반환하지 않아도 암묵적으로 반환값을 resolve하는 프로미스를 반환한다.

## await 키워드

프로미스가 settled 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled 상태가 되면 프로미스가 resolve한 처리 결과를 반환한다. **await 키워드는 반드시 async 함수 안에서, 프로미스 앞에서 사용해야 한다.**

## 에러처리

try…catch 문을 사용할 수 있다. 콜백 함수를 인수로 전달받는 비동기 함수와는 달리 프로미스를 반환하는 비동기 함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다. async 함수 내에서 catch 문을 사용해서 에러 처리를 하지 않으면 async 함수는 발생한 에러를 reject하는 프로미스를 반환한다. 따라서 async 함수를 호출하고 Promise.prototype.catch 후속 처리 메서드를 사용해 에러를 캐치할 수도 있다.

---

_References_
[제너레이터와 async/await](https://poiemaweb.com/fastcampus/generator#52-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC)
