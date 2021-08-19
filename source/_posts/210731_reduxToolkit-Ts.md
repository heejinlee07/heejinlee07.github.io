---
title: Redux-tookit-typescript 원문 번역
date: 2021-07-31
tags: React
---

## Redux-toolkit-typescript 원문 번역

> https://redux-toolkit.js.org/tutorials/typescript

## Usage With TypeScript

Redux Toolkit은 이미 TypeScript로 작성되었으므로 TS 유형 정의가 내장되어 있다. React Redux 는 NPM 의 별도 @types/react-reduxtypedef 패키지 에 type에 대한 정의가 있다. 라이브러리 함수를 작성하는 것 외에도 type은 리덕스 스토어와 리액트 컴포넌트 사이의 인터페이스를 보다 typesage하게 작성하는 것을 쉽게ㅐ 하도록 도와주는 helper를 export한다.

React Redux v7.2.3부터는 react-redux 패키지가 @types/react-redux에 종속되어서 type 정의는 자동으로 라이브러리와 함께 설치된다. 그렇지 않은 경우에는 직접 수동으로 설치해야 한다. (npm install @types/react-redux)

[The Redux+TS template for Create-React-App](https://github.com/reduxjs/cra-template-redux-typescript) comes with a working example of these patterns already configured.

# Project Setup

Root State 및 Dispatch Types 정의

configureStore를 사용하면 추가 입력이 필요하지 않다. 하지만 추후에 필요에 따라 참조할 수 있도록 RootState type과 Dispatch type을 추출하고자 하게 된다. 스토어 자체에서 이러한 타입들을 추론한다는 것은 state slice를 추가하거나 미들웨어 세팅을 수정할 때 올바르게 업데이트 된다는 것을 의미한다.

이것들은 모두 type이기 때문에 app/store.ts와 같이 스토어 셋업 파일에서 직접 export하여 다른 파일로 import하는 것이 안전하다.

```jsx
import { configureStore } from '@reduxjs/toolkit';
// ...

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
//RooteState와 AppDispatch가 스토어 자체에서 추론된다.
export type RootState = ReturnType<typeof store.getState>;

// 추론된 타입:
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
```

---

## Define Typed Hooks

RooteState와 AppDispatch를 type들을 각각 컴포넌트로 import할 수 있지만, 어플리케이션에서 사용할 수 있도록 타입이 지정된 버전의 useDispatch, useSelector 훅을 사용하는 것이 좋다. 그 이유는 아래와 같다.

- useSelector를 쓰면 매번 (state:RootState)를 사용할 필요가 없다.
- useDispatch를 쓰면 기본 dispatch 타입은 thunk에 대해 알지 못한다. thunk를 올바르게 쓰기 위해서는thunk middlewate type을 포함한 스토어의 특정하게 커스텀된 AppDispatch를 useDispatch와 함께 사용해야 한다. 미리 유형이 정의된 **useDispatch 훅을 추가하고자 할 때는 사용하고자 하는 곳에 AppDispatch를 import해야 하는 것을 잊지 않도록 한다.**

이들은 type이 아니라 실제 변수이기 때문에 store setup 파일보다는 **app/hooks.ts와 같은 별도의 파일에 정의하는 것이 중요하다.** 이를 통해 hook을 쓰고자 하는 어떠한 파일에서든 hook을 import할 수 있게하고, 잠재적인 import 디펜던시 이슈를 피할 수 있다.

```jsx
//app/hook.ts

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// 원형의 useDispatch, useSelector 대신 아래를 사용한다.
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
```

## Application Usage

`slice state 및 액션 타입의 정의`

각각의 slice file은 초기 상태값에 대한 type을 정의해야 createSlice가 각각의 case 리듀서에 있는 state type을 올바르게 추론할 수 있다.

생성된 모든 액션들은 action.payload를 일반적인 인수로 사용하는 Redux Toolkit의 PayloadAction<T> 타입을 사용해서 정의해야 한다.

여기서 store 파일로부터 RootState를 안전하게 import 할 수 있다. circular import이긴 하지만 typsScript 컴파일러가 type을 올바르게 처리할 수 있다. 이는 selector 함수를 작성할 때 필요할 수 있다.

```jsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

// Define a type for the slice state
interface CounterState {
  value: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
```

생성된 action creator는 작성자가 reducer에 제공한 PayloadAction<T>의 타입 기반으로 payload의 인수를 수락하도록 올바르게 입력됩니다. 예를 들어, 위 코드에서 incrementByAmountsms 인수로 number를 필요로 한다.

몇몇 케이스에선 typeScript가 초기 상태의 type을 불필요하게 tigth하게 만들 수 있다. 만약 이런 일이 발생한다면 변수의 type을 선언하는 대신 `as` 를 이용해서 초기 상태를 캐스팅하는 방법으로 해결할 수 있다.

```jsx
// Workaround: cast state instead of declaring variable type
const initialState = {
  value: 0,
} as CounterState
```

# Use Typed Hooks in Components

컴포넌트 파일에서 React-Redux의 표준 hook 대신 미리 입력된 hook을 가져온다.

```jsx
import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from 'app/hooks';

import { decrement, increment } from './counterSlice';

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // omit rendering logic
}
```

---

# Usage With TypeScript

> https://redux-toolkit.js.org/usage/usage-with-typescript

리덕스 툴킷은 typeScript로 작성되었으며, 해당 API는 TypeScript 응용 프로그램과의 뛰어난 통합을 가능하게 하도록 설계되었다.

## configureStore

### state type 가져오기

state type을 가져오는 가장 쉬운 방법은 roote reducer를 미리 정의하고, returnType을 추출하는 것이다. 쇼type 이름인 state는 일반적으로 남용되기 깨문에 혼동을 막기 위해 RootState와 같이 type에 다른 이름을 주는 것을 추천한다.

```jsx
import { combineReducers } from '@reduxjs/toolkit';
const rootReducer = combineReducers({});
export type RootState = ReturnType<typeof rootReducer>;
```

혹은 rootReducer를 직접 생성하지 않고 직접 configureStore()에 slice reducer 전달 할 수 있다. 이 경우 root reducer를 올바르게 추론하기 위해 Type을 약간 수정해야 한다.

```jsx
import { configureStore } from '@reduxjs/toolkit';
// ...
const store = configureStore({
  reducer: {
    one: oneSlice.reducer,
    two: twoSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;

export default store;
```

### Dispatch 타입 가져오기

스토어에서 Dispatch 타입을 가져오려면 store를 생성한 후에 추출해야 한다. 이 역시 Dispatch는 남용되기 때문에 혼동을 막기 위해 AppDispatch처럼 다른 type 이름을 지정할 것을 추천한다. 혹은 아래처럼 useAppDispatch hook을 추출하여 useDispatch를 호출할 때 사용하는 것이 더 편할 수 도 있다.

```jsx
import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
// Export a hook that can be reused to resolve types

export default store
```

### Dispatch 타입에 대한 올바른 입력

dispatch 함수의 typedms 미들웨어 옵션에 의해 직접 추론될 수 있다. 만약 미들웨어에 올바른 타입을 추가하고 싶다면 dispatch는 이미 올바르게 입력되어 있어야 한다.

typeScript는 스프레드 연산자를 사용해서 배열을 합칠 때 array type을 확장하는 경우가 많기 때문에 getDefaultMiddleware()에 의해 리턴되는 MiddlewareArray 메소드에서 .concat(...) 또는 .prepend(...)를 사용하는 것이 추천된다.

```jsx
import { configureStore } from '@reduxjs/toolkit'
import additionalMiddleware from 'additional-middleware'
import logger from 'redux-logger'
// @ts-ignore
import untypedMiddleware from 'untyped-middleware'
import rootReducer from './rootReducer'

export type RootState = ReturnType<typeof rootReducer>
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(
        // correctly typed middlewares can just be used
        additionalMiddleware,
        // you can also type middlewares manually
        untypedMiddleware as Middleware<
          (action: Action<'specialAction'>) => number,
          RootState
        >
      )
      // prepend and concat calls can be chained
      .concat(logger),
})

export type AppDispatch = typeof store.dispatch

export default store
```

### getDefaultMiddleware 없이 MiddlewareArray 사용

getDefaultMiddleware의 사용을 완전히 스킵할 경우, 미들웨어 배열의 안전한 타입 연결에 MiddlewareArray를 사용할 수 있다. 이 class는 .concat(...) 및 추가적인 .prepend(...) 메서드에 대한 수정된 유형만 사용하여 기본 JavaScript 배열 유형을 확장한다.

하지만 const로 사용하고, 스프레드 연산자를 사용하지 않는 한 배열 유형을 확장하는 문제가 발생하지 않기 때문에 일반적으로 필요하지는 않다.

다음의 두 가지 호출은 동일하다.

```jsx
import { configureStore, MiddlewareArray } from '@reduxjs/toolkit'

configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(additionalMiddleware, logger),
})

configureStore({
  reducer: rootReducer,
  middleware: [additionalMiddleware, logger] as const,
})
```

---

## React Redux에서 추출한 Dispatch type 사용

기본적으로 React Redux useDispatch 훅에는 미들웨어를 고려하는 type이 포함되어 있지 않다. 만약 dispatching을 할 때 dispatch 함수에 대해 더 구체적인 type이 필요한 경우에는 dispatch 함수의 type을 지정하거나, custom-type이 된 버전의 useSelector를 만들어서 사용한다. ([자세한 내용은 이곳 참조](https://react-redux.js.org/using-react-redux/usage-with-typescript#typing-the-usedispatch-hook))

### createAction

대부분의 케이스에서 action.type에 대한 리터럴 정의는 필요하지 않기 때문에 아래와 같은 코드를 사용할 수 있다.

```tsx
createAction<number>('test');
```

이렇게 하면 생성된 action이 PayloadActionCreator<number, string>의 타입이 된다.

일부 설정에서는 action.type에 대한 리터럴 설정이 필요할 수도 있다. 하지만 typeScript는 수동으로 정의된 타입 매개변수와 추론된 타입 매개변수의 혼합을 허용하지 않기 때문에 일반 정의와 실제 JavaScript 코드 모두에서 타입을 지정해야 합니다.

```tsx
createAction<number, 'test'>('test');
```

중복 없이 이것을 작성하는 다른 방법을 찾고 있다면, callback을 준비하여 두 type 파라미터를 인수에서 추론할 수 있으므로 action type을 특정할 필요가 없다.

```tsx
function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}
createAction('test', withPayloadType<string>());
```

### 리터럴하게 입력된 action.type의 대안

예를 들어 case문에서 payload type을 올바르게 작성하기 위해 action.type을 유니온 식별을 위한 식별자로 사용하는 경우 이 대안에 관심이 있을 수 있다.

생성된 action creators는 [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates)로써 match 메소드를 가진다.

```tsx
const increment = createAction<number>('increment');
function test(action: Action) {
  if (increment.match(action)) {
    // action.payload inferred correctly here
    action.payload;
  }
}
```

이 match 메소드는 redux-observable과 RxJS의 filter 메소드를 조합하여 사용하는 경우에도 유용하다.

### createReducer

createReducer의 기본 호출방법은 아래와 같이 "lookup table" / "map object"를 사용하는 것이다.

```tsx
createReducer(0, {
  increment: (state, action: PayloadAction<number>) => state + action.payload,
});
```

하지만 key는 오직 문자열이기 때문에, API TypeScript를 사용할 경우 action type을 추론하거나 validate할 수 없다.

```tsx
{
  const increment = createAction<number, 'increment'>('increment');
  const decrement = createAction<number, 'decrement'>('decrement');
  createReducer(0, {
    [increment.type]: (state, action) => {
      // action is any here
    },
    [decrement.type]: (state, action: PayloadAction<string>) => {
      // even though action should actually be PayloadAction<number>, TypeScript can't detect that and won't give a warning here.
    },
  });
}
```

대안으로 RTK에 type-safe reducer builder API가 포함되어 있다.

---

# Building Type-Safe Reducer Argument Objects

createReducer에 대한 인수로 간단한 객체를 사용하는 대신, ActionReducerMapBuilder 인스턴스를 받는 콜백을 사용할 수 있다.

```tsx
const increment = createAction<number, 'increment'>('increment');
const decrement = createAction<number, 'decrement'>('decrement');
createReducer(0, (builder) =>
  builder
    .addCase(increment, (state, action) => {
      // action is inferred correctly here
    })
    .addCase(decrement, (state, action: PayloadAction<string>) => {
      // this would error out
    })
);
```

리듀서 인수 객체를 정의할 때 보다 엄격한 type 안정성이 필요한 경우에 사용이 추천된다.

### builder.addMatcher

builder.addMatcher의 첫 번째 matcher에 [type predicate](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) 함수를 사용할 수 있다. 결과적으로 두번째 reducer 인수에 대한 action 인수는 typeScript에 의해 유츄될 수 있다.

```tsx
function isNumberValueAction(action: AnyAction): action is PayloadAction<{ value: number }> {
  return typeof action.payload.value === 'number'
}

createReducer({ value: 0 }, builder =>
   builder.addMatcher(isNumberValueAction, (state, action) => {
      state.value += action.payload.value
   })
})
```

# createSlice

createSlice는 action 뿐만 아니라 reducer도 만드는데 여기서 type safety에 대해 걱정할 필요는 없다. action types는 인라인으로 제공될 수 있다.

```tsx
const slice = createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment: (state, action: PayloadAction<number>) => state + action.payload,
  },
});
// now available:
slice.actions.increment(2);
// also available:
slice.caseReducers.increment(0, { type: 'increment', payload: 5 });
```

케이스 리듀서가 너무 많아서 인라인으로 정의하는 것이 지저분하거나 슬라이스 전체에서 케이스 리듀서를 재사용하려는 경우 createSlice 외부에서 정의하여 호출하고 caseReducer처럼 입력할 수도 있다.

```tsx
type State = number;
const increment: CaseReducer<State, PayloadAction<number>> = (state, action) =>
  state + action.payload;

createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment,
  },
});
```

---

_References_

[Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started#rtk-query)
[Let's Learn Modern Redux! (with Mark Erikson) - Learn With Jason](https://youtu.be/9zySeP5vH9c)
