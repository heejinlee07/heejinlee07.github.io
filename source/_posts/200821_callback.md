---
title: 콜백패턴의 문제점
date: 2020-08-21
tags:
---

> 자바스크립트에서 비동기 처리 : 콜백함수
> ES6에서 비동기 처리 : 프로미스

## 자바스크립트에서 비동기 처리 : 콜백함수의 단점

비동기 함수 내부에서 비동기로 동작하는 코드가 있다면 코드가 완료되지 않았더라도 기다리지 않고 즉시 종료된다. 즉, 비동기 함수 내부의 비동기로 동작하는 코드는 비동기 함수가 종료된 후에 완료된다.**따라서 비동기 함수 내부의 비동기로 동작하는 코드는 처리 결과를 외부로 반환하거나 상위 스코프의 변수에 할당해도 기대한 대로 동작하지 않는다.**

### 서버의 `응답 결과를 콘솔에 출력`하는 get 함수 ✅

- get 함수: 비동기 함수 (비동기로 동작하는 코드인 이벤트 핸들러 `onload`를 포함하고 있음.)
- onload: 비동기로 동작
- 처리 순서: `get 함수 호출` -> `GET 요청을 서버에 전송` -> `onload 이벤트 핸들러 등록` -><u>`undefined반환`</u> -> <u>`즉시 종료`</u>

```javascript
// 서버의 응답 결과를 콘솔에 출력하는 코드 ✅
// GET 요청을 위한 비동기 함수
const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  // 비동기로 동작하는 onload
  xhr.onload = () => {
    if (xhr.status === 200) {
      // 서버의 응답을 콘솔에 출력한다.
      console.log(JSON.parse(xhr.response));
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

// id가 1인 post를 취득
get("https://jsonplaceholder.typicode.com/posts/1");
```

---

### 서버의 `응답 결과를 반환`하는 get 함수 ✅

- get 함수: 비동기 함수 (비동기로 동작하는 코드인 이벤트 핸들러 `onload`를 포함하고 있음.)
- onload: 비동기로 동작
- 처리순서: `get 함수 호출` -> `GET 요청을 서버에 전송` -> `onload 이벤트 핸들러 등록` -> <u>`종료` -> `undefined반환`</u>

반환문인 `return JSON.parse(xhr.response);`은 _onload 이벤트 핸들러의 반환문이지 get 함수의 반환문이 아니다._ 따라서 get 함수에 대한 명시적인 반환문이 없으므로 `undefined`를 반환한다. 즉 onload 이벤트 핸들러의 반환값은 캐치할 수 없다.

```javascript
// 서버의 응답 결과를 반환하는 코드 ✅
// GET 요청을 위한 비동기 함수
const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // ① 서버의 응답을 반환한다.
      return JSON.parse(xhr.response);
    }
    console.error(`${xhr.status} ${xhr.statusText}`);
  };
};

// ② id가 1인 post를 취득
const response = get("https://jsonplaceholder.typicode.com/posts/1");
console.log(response); // undefined
```

만약 get 함수의 상위에 변수를 선언한 후 onload 이벤트 내부에서 서버의 응답 결과를 할당하더라도 여전히 결과는 `undefined`이다. 그 이유는 처리 순서가 보장되지 않기 때문이다.

### 서버의 응답을 `상위 스코프 변수에 할당`한다면? ✅

```javascript
let todos;

// GET 요청을 위한 비동기 함수
const get = (url) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.send();

  xhr.onload = () => {
    if (xhr.status === 200) {
      // ① 서버의 응답을 상위 스코프의 변수에 할당한다.✅
      todos = JSON.parse(xhr.response);
    } else {
      console.error(`${xhr.status} ${xhr.statusText}`);
    }
  };
};

// id가 1인 post를 취득
get("https://jsonplaceholder.typicode.com/posts/1");
console.log(todos); // ② undefined
```

위와 같이 get 함수의 상위에 전역 변수가 있고, onload 이벤트 내에서 서버의 응답 결과를 할당한 경우 처리과정은 아래와 같다.

> `get 함수 호출`-> `get 함수 평가 및 실행 컨텍스트 생성` -> `콜 스택에 push` -> `코드 실행` -> `xhr.onload에 이벤트 핸들러 바인딩` -> `get 함수 종료` -> `get 함수 콜 스텍에서 pop` -> `②console.log 호출 및 실행` -> `console.log의 실행 컨텍스트 생성` -> `콜 스택에 push` -> <u>`서버로부터 응답 도착`</u> -> `load 이벤트 발생` ->

**xhr.onload의 이벤트 핸들러는 즉시 실행되지 않는다.** load 이벤트 발생 시 태스크 큐에서 대기하가다 콜 스텍이 비었을 때 콜 스텍으로 push 되어 실행된다. 즉 console.log가 종료된 후에야 실행되므로 예상했던 서버의 응답결과가 console.log에 출력되지 않고, `undefined`가 호출된다.

`xhr.onload에 이벤트 핸들러 task Queue에 push` -> `콜 스텍에 있는 모든 실행 컨텍스트 pop됨` -> `이벤트 루프` -> `콜 스텍에 push`-> `이벤트 핸들러 실행`

---

위와 같이 비동기 함수는 세 가지 문제가 있다.

1. **비동기 처리 결과를 외부에 반환할 수 없다.**
2. **상위 스코프의 변수에 할당할 수 없다.**
3. **서버로부터 데이터를 받아오기 전에 데이터를 화면에 표시하려고 하면 오류가 발생**

따라서 서버에 대한 응답을 처리하는 비동기 함수의 처리 결과는 비동기 함수 내부에서 수행해야 하고, 이를 위해 비동기 함수에 `콜백 함수`를 전달해서 처리한다. 그러나 콜백 패턴도 `비동기 함수 처리 결과` -> `비동기 함수 호출`과 같은 패턴이 반복된다면 콜백 함수가 중첩되어 복잡해지는 다음과 같은 문제점을 가지고 있다.

1. **콜백 헬**
2. **에러 처리의 한계**

### 콜백 헬

비동기 처리를 위해 콜백 함수를 연달아 사용할 경우 콜백 헬이 발생하여 가독성을 떨어뜨리고, 유지 보수를 어렵게 한다. 다음과 같이 서버로부터 응답받은 데이터를 활용하여 연속으로 get 요청을 보낼 경우 콜백 헬이 발생한다.

```javascript
get("/step1", (a) => {
  get(`/step2/${a}`, (b) => {
    get(`/step3/${b}`, (c) => {
      get(`/step4/${c}`, (d) => {
        console.log(d);
      });
    });
  });
});
```

### 에러 처리의 한계

```javascript
try {
  setTimeout(() => {
    throw new Error("Error!");
  }, 1000);
} catch (e) {
  // 에러를 캐치하지 못한다
  console.error("캐치한 에러", e);
}
```

try 구문에서 콜백함수가 에러를 발생 시키는데 이 에러는 catch 블록에서 캐치되지 않는다. 에러는 호출자 방향으로 전파되는데, setTimeout 함수의 콜백함수를 호출한 것은 setTimeout이 아니기 때문에 이 함수의 콜백함수가 발생시킨 에러는 캐치되지 않는다.

---

_References_
[poiemaweb](https://poiemaweb.com/fastcampus/promise)
