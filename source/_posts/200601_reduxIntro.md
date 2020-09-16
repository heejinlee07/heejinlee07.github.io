---
title: What is Redux?
date: 2020-06-01
tags:
---

## Redux

리덕스 생태계에서 가장 사용률이 높은 상태관리 라이브러리. 상태관리 로직들을 다른 파일로 분리해서 효율적으로 관리할 수 있고, 글로벌 상태도 관리할 수 있음.

> Context API + useReducer를 사용해도 글로벌 상태를 관리할 수 있는데 Redux는 이보다 이전에 존재했던 라이브러리.

리덕스가 무조건 필요한 것은 아니다. 단순히 글로벌 상태를 관리하기 위한 것인데, 글로벌 상태가 별로 없다면 Context API를 사용하는 것으로도 충분히 가능함.

## Context API를 쓰는 것과 Redux의 차이점

1. 미들웨어

> 주요 기능: 비동기 작업을 더욱 체계적으로 관리 가능.

- 특정 조건에 따라 액션이 무시되게 만들 수 있디.
- 액션을 콘솔에 출력하거나 서버쪽에 로깅할 수 있게 한다.
- 액션이 디스패치 됐을 때 이를 수정해서 리듀서에 전달되도록 할 수 있다.
- 특정 액션이 발생했을 때 이에 기반하여 다른 액션이 발생되도록 할 수 있다.
- 특정 액션이 발생했을 때 특정 자바스크립트 함수를 실행시킬 수 있다.

2. 유용한 함수와 Hooks를 지원받음.

- connect: 전역적인 상태, action을 디스패치하는 함수들을 props로 받아와서 사용할 수 있다.
- useSelector, useDispatch, useStore: Redux에서 관리하고 있는 상태를 쉽게 조회하고, action을 쉽게 디스패치할 수 있다.
- 만약 Context API를 사용한다면 위와 같은 hooks를 쓰는 것이 아니라 직접 만들어줘야 한다.

3. 기본적인 최적화가 이미 되어있어서 필요한 상태가 바뀔 때만 리렌더링 된다.
4. 하나의 커다란 상태
   Context API를 사용해서 글로벌 상태를 관리하게 되면 기능별로 Context를 만들어서 사용해야 한다. 반면 Redux에서는 모든 글로벌 상태를 하나의 커다란 객체에 넣어서 사용하는 것이 필수이다. 따라서 매번 Context를 만들어서 사용하지 않아도 됨.
5. DevTools: 개발자 도구가 있어서 현재상태를 한 눈에 볼 수 있다.
6. Redux를 사용하고 있는 프로젝트가 이미 많다.

## Redux는 언제 써야하는가?

> 프로젝트의 규모가 큰가? Y-Redux, N-Context API
> 비동기 작업을 자주 하는가? Y-Redux, N-Context API
> Redux가 편하게 느껴지는가? Y-Redux, N-Context API or MobX

## Redux에서 사용되는 키워드

1. 액션(Action)
   상태에 어떤 변화가 필요할 때 액션을 발생시킨다. 하나의 객체이며 type이라는 값이 필수적으로 있어야함. 그외 필요한 값을 추가할 수도 있음. 상태 업데이트 시에 `type`을 보고 어떻게 업데이트할지 정하는 것.

```javascript
{
  type: "TOGGLE_VALUE";
}

// 필수적인 type 값 외에 필요한 값을 넣어줄 수 있다.
// 새로운 할 일을 만드는 액션이며, 이 data를 추가하겠다는 의미.
{
  type: "ADD_TODO",
  data: {
    id: 0,
    text: "리덕스 배우기"
  }
}
```

2. 액션 생성함수 (Action Creator)
   액션을 만드는 함수. 단순히 파라미터를 받아와서 액션 객체 형태로 만든다. 필수로 사용해야 하는 것은 아니지만 이렇게 하면 액션 객체를 만드는 것이 훨씬 편하다. 즉 컴포넌트에서 쉽게 액션을 발생시키기 위함이므로 보통 함수 앞에 `export` 키워드를 붙여서 다른 파일에서 불러와서 사용한다.

```javascript
// data라는 파라미터를 받아와서 객체를 만들어준다.
export function addTodo(data) {
  return {
    type: "ADD_TODO",
    data,
  };
}

// 화살표 함수로도 만들 수 있다.
export const changeInput = (text) => ({
  type: "CHANGE_INPUT",
  text,
});
```

3. 리듀서 (Reducer)
   useReducer랑 완전히 같은 형태. _변화를 일으키는 함수._ 리듀서는 두가지의 파라미터를 받아온다. action.type를 가지고 그 type이 무엇이냐에 따라 다른 업데이트 작업을 한다.

   > 리듀서는 이전 상태와 액션을 받아서 다음 상태를 반환하는 순수 함수
   > `(previousState, action) => newState`

```javascript
function counter(state, action) {
  switch (action.type) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    default:
      return state;
  }
}
```

`주의`

- 위와 같이 단순히 숫자를 더하거나 빼는 경우가 아닌 객체 또는 배열이라면 스프레드 연산자 등으로 불변성을 반드시 지켜준다.

- `default:` 부분에서 `state`를 그대로 반환한다. (useReducer에서는 default: 부분에 throw new Error('Unhandled Action')처럼 에러를 발생시키도록 처리했다.)

- API 호출이나 라우팅 전환같은 사이드이펙트를 일으키지 않도록 한다.
- Date.now()나 Math.random() 같이 순수하지 않은 함수를 호출하지 않는다.

4. 스토어 (Store)
   _리덕스에서는 한 애플리케이션당 하나의 스토어를 만든다._ 스토어 안에는, 현재의 앱 상태와, 리듀서가 들어가있고, 추가적으로 몇가지 내장 함수들이 있다.

5. 디스패치 (dispatch)
   디스패치는 스토어의 내장함수 중 하나. 디스패치는 액션을 발생 시키는 것(액션을 스토어에게 전달)

```javascript
dispatch({ type: "INCREASE" });
```

액션을 만들어서 dispatch의 파라미터로 넣어서 호출한다. 이렇게 호출하면 스토어가 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 이를 참고하여 새로운 상태를 만들어준다.

6. 구독 (subscribe)
   구독 또한 스토어의 내장함수 중 하나. subscribe 함수는, 함수 형태의 값을 파라미터로 받아온다. subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출된다. _스토어의 상태가 업데이트 될 때마다 특정함수를 호출할 수 있다._ 리액트에서 리덕스를 사용하게 될 때 보통 이 함수를 직접 사용하는 일은 별로 없다. 그 대신에 react-redux 라는 라이브러리에서 제공하는 connect 함수 또는 useSelector Hook 을 사용하여 리덕스 스토어의 상태에 구독한다.

## 리덕스의 3가지 규칙

1. 하나의 애플리케이션 안에는 하나의 스토어.
   여러 개의 스토어를 사용할 수도 있지만 권장되지 않는다.
2. 상태는 읽기전용이므로 불변성을 지켜준다.
3. 변화를 일으키는 함수인 리듀서는 순수한 함수여야 한다. 동일한 인풋에는 동일한 아웃풋이 있어야 한다. new Date()와 같은 함수는 순수하지 않은 함수이다.

- 리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받는다.
- 이전의 상태는 절대로 건드리지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환한다.
- 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환해야만 한다.

---

_References_
[Redux](https://lunit.gitbook.io/redux-in-korean/basics/reducers)
[모던리액트](https://react.vlpt.us/redux/01-keywords.html)
