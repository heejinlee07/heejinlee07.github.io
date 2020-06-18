---
title: What is Redux middleware?
date: 2020-06-01 15:00
tags:
---

## Redux middleware

함수를 연달아서 두번 리턴하는 함수.

```javascript
const middleware = (store) => (next) => (action) => {
  // 하고 싶은 작업...
};
```

```javascript
function middleware(store) {
  //store: 리덕스 스토어의 인스턴스, dispatch, getState, subscribe 내장함수들이 들어있다.
  return function (next) {
    // next: 액션을 다음 미들웨어에게 전달.
    return function (action) {
      //action: 현재 처리하고 있는 액션 객체
      // 하고 싶은 작업...
    };
  };
}
```

next는 `next(action)` 이런 형태로 사용. 만약 다음 미들웨어가 없다면 리듀서에게 액션을 전달. _next를 호출하지 않으면 액션이 무시처리되어 리듀서에게 전달되지 않음._

---

_References_
[모던리액트](https://react.vlpt.us/redux-middleware/02-make-middleware.html)
