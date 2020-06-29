---
title: What is Redux middleware?
date: 2020-06-01 15:00
tags:
---

## Redux middleware

액션이 dispatch 되어서 리듀서에서 이를 처리하기 전에 사전에 지정된 작업들을 설정. *액션과 리듀서 사이의 중간자*역할. 액션이 디스패치 된 다음, 리듀서에서 해당 액션을 받아와서 업데이트 하기 전, \*추가적인 작업을 할 수 있다. 보통 비동기 작업을 처리할 때 사용한다.

### 추가적인 작업이란?

- 특정 조건에 따라 액션이 무시되게 만들 수 있습니다.
- 액션을 콘솔에 출력하거나, 서버쪽에 로깅을 할 수 있습니다.
- 액션이 디스패치 됐을 때 이를 수정해서 리듀서에게 전달되도록 할 수 있습니다.
- 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있습니다.
- 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있습니다.

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
    // next: next(action)의 형태로 액션을 다음 미들웨어에게 전달.
    // 다음 미들웨어가 없다면 리듀서에게 전달한다.
    //next를 호출하지 않으면 액션이 무시처리되어 리듀서에게 전달안됨.
    return function (action) {
      //action: 현재 처리하고 있는 액션 객체
      // 하고 싶은 작업...
    };
  };
}
```

_리덕스 스토어에 여러 개의 미들웨어 등록 가능_ 새로운 액션이 디스패치되면 첫 번째 등록한 미들웨어가 호출되고, next(action)을 호출하면 다음 미들웨어로 액션이 넘어간다. 미들웨어에서 store.dispatch를 사용하면 다른 액션을 추가로 발생시킬 수 있다.

## redux-thunk

객체 대신 함수를 생성하는 액션 생성함수를 작성. 미들웨어 안에서는 액션 값을 객체가 아닌 함수로 받아오게 하여 액션이 함수타입이면 실행시키게 만들 수 있다. _즉, 액션 객체가 아닌 함수를 디스패치 할 수 있다._

```javascript
const thunk = (store) => (next) => (action) =>
  typeof action === "function" ? action(store.dispatch, store.getState) : next(action);

//dispatch할 때
const myThunk = () => (dispatch, getState) => {
  dispatch({ type: "HELLO" });
  dispatch({ type: "BYE" });
};

dispatch(myThunk());
```

미들웨어를 사용하면 함수를 디스패치 할 수 있는데, 이때 dispatch와 getState를 파라미터로 받아와야 한다. 이 함수를 만들어주는 함수를 thunk라 부른다.

```javascript
const getComments = () => (dispatch, getState) => {
  // 액션을 dispatch할 수 있고,
  // getState를 사용하여 현재 상태를 조회할 수 있다.
  const id = getState().post.activeId;

  // 요청이 시작했음을 알리는 액션
  dispatch({type: 'GET_COMMENTS});

  // 댓글을 조회하는 프로미스를 반환하는 getCommets가 있다고 가정했을 때
  api
    .getComments(id) //요청
    .then(comments => dispatch({type:'GET_COMMENTS_SUCCESS', id, comments}))
    //성공시
    .catch(e => dispatch({type:'GET_COMMENTS_ERROR',error: e})); //실패시
};
```

```javascript
//thunk 내에서 async/await 사용 가능
const getComments = () => async (dispatch, getState) => {
  const id = getState().post.activeId;
  dispatch({ type: "GET_COMMENTS" });
  try {
    const comments = await api.getComments(id);
    dispatch({ type: "GET_COMMENTS_SUCCESS", id, comments });
  } catch (e) {
    dispatch({ type: "GET_COMMENTS_ERROR", error: e });
  }
};
```

---

_References_
[모던리액트](https://react.vlpt.us/redux-middleware/02-make-middleware.html)
