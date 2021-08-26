---
title: Redux-tookit 원문 번역
date: 2021-07-30
tags: React
---

## Redux-toolkit 원문 번역

> 원문링크: https://redux-toolkit.js.org/introduction/getting-started#rtk-query

Redux toolkt은 리덕스 로직을 표준화하기 위한 패키지이다. 원래는 리덕스가 가지고 있는 세가지 문제점을 지원하기 위해 만들어졌다.

- 리덕스 스토어를 구성하는 방법이 지나치게 복잡하다.
- 리덕스를 사용하기 위해 많은 패키지를 설치해야 한다
- 리덕스는 지나치게 많은 보일러 플레이트 코드를 필요로 한다.

리덕스가 가진 이러한 문제점에 대헤 모든 것을 커버할 순 없지만 create-react-app과 appllo-boost를 근간으로 하여 보다 추상화된 셋업 프로세스와 가장 많이 사용되는 use cases를 처리하기 위한 방법을 제공할 수 있을 뿐 아니라 사용자가 어플리케이션 코드를 단순화할 수 있는 유용한 유틸리티를 제공한다.

리덕스 툴킷은 또한 data fetching과 캐싱을 할 수 있는 'RTK Query'를 포함하는데, 별도의 엔트리포인트 set로 패키지 안에 포함되어 있다. 옵셔널이지만 직접 data fetching 로직을 작성하지 않아도 된다.
이 툴은 리덕스 유저들에게 유용하다. 만약 당신이 프로젝트에 리덕스를 처음 적용해보는 유저거나 어플리케이션 내에 존재하는 코드를 단순화 시키고자 하는 익숙한 리덕스 유저든, 리덕스 툴킷은 당신의 리덕스 코드를 훨씬 좋게 만들 것이다.

---

## 설치방법

### Create React App을 이용

가장 추천되는 방법으로 official Redux + JS template 또는 create React App용 Redux + Ts template을 사용하는 것이다. 이 템플릿은 redux toolkit 및 react redux 구성 요소의 통합을 활용한다.

```
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

### 기존 앱

redux toolkit은 모듈 번들러용 npm 패키지로 또는 노드 어플리케이션에서 사용 가능하다.

```
# NPM
npm install @reduxjs/toolkit

# Yarn
yarn add @reduxjs/toolkit
```

또는 window.RTK의 전역 변수로 정의된 precompiled UMD package로 사용가능하다. UMD package는 `<script> `태그로 바로 사용할 수 있다.

---

## Redux-toolkit에 포함된 것

- `[configureStore()](https://redux-toolkit.js.org/api/configureStore)`: 단순화된 구성옵션과 좋은 기본값을 제공하기 위해 `createStore` 로 감싼다. 이는 자동으로 slice reducer와 결합할 수 있고, 사용자게 제공하는 리덕스 미들웨어가 무엇이든 간에 redux-thunk를 디폴트로 제공한다. 또 redux devtools extension을 사용할 수 있다.
- `[createReducer()](https://redux-toolkit.js.org/api/createReducer)`: switch 문으로 액션 타입의 목록을 작성하는 대신, case reducer funxtion들로 액션타입의 목록을 제공한다. 추가로 자동으로 immer 라이브러리를 사용하여 immutable한 업데이트를 normal mutative 코드를 통해 단순화한다. 예를 들어 state.todos[3].completed = true.처럼.
- `[createAction()](https://redux-toolkit.js.org/api/createAction)`: 주어진 액션 타입 문자열에 대한 action creator 함수를 생성한다. 이 함수는 스스로 toString()으로 정의되기 때문에 type 상수대신 사용할 수 있다.
- `[createSlice()](https://redux-toolkit.js.org/api/createSlice)`: reducer 함수의 객체, a slice name, 초기값을 받아들여서 이와 상응하는 action creators, action types을 가진 slice reducer를 자동으로 생성한다.
- `[createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)`: 액션 타입 문자열을 받아들여서 promise를 return하는 함수를 반환하고, 이 promise에 근거하여 pending/fulfilled/rejected 의 액션 타입을 디스패치하는 thunk를 생성한다.
- `[createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter)`: 스토어에 있는 정규화된 data(normalized date)를 관리하기 위해 재사용 가능한 리듀서와 selectors set를 생성한다.
- The `[createSelector` utility](https://redux-toolkit.js.org/api/createSelector) from the [Reselect](https://github.com/reduxjs/reselect) library, re-exported for ease of use.

---

# RTK Query

@reduxjs/toolkit package 에 옵셔널로 포함되어 제공되는 것이다. data fetching과 캐싱의 사용 사례를 해결하기 위해 제작되었고, app의 API 인터페이스 계틍을 정의하기 위해 작지만 강력한 툴셋을 제공한다. 웹 어플리케이션에서 데이터를 로딩하는 보통의 경우를 단순화하도록 만들어졌기 때문에 직접 data fetching과 캐싱 로직을 작성할 필요가 없다.

RTK 쿼리는 실행을 위해 Redux Toolkit 코어 위에 구축되는데, 아키텍처 내부에서 redux를 내부적으로 사용하기 위함이다. RTK 쿼리를 쓰기 위해서 리덕스나 RTK에 대한 지식이 필요하지는 않지만 RTK 쿼리가 제공하는 모든 추가적인 global store 관리 기능을 탐색할 필요가 있고, RTK 쿼리를 완전하게 사용하여 요청 및 캐시 동작의 타임라인을 재현하고, 횡단하기 위해 Redux DevTools 브라우저 확장 프로그램을 설치해야한다.

RTK 쿼리는 core Redux Toolkit package 내부에 설치되어있다. 아래 두 가지 엔트리 포인트를 통해 사용할 수 있다.

```jsx
import { createApi } from '@reduxjs/toolkit/query';

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react';
```

### RTK 쿼리안에 들어 있는 것

다음의 API가 포함된다.

- `[createApi()](https://redux-toolkit.js.org/rtk-query/api/createApi)`: RTK 쿼리 기능의 핵심. 일련의 엔드포인트로부터 데이터를 어떻게 회수해오는지와 관련된 방법, 데이터를 fetch하고 transtorm하는 방법을 설명하는 엔드리 포인트 set를 정의할 수 있다. 보통 기본 URL당 하나의 API 슬라이스를 사용하여 app에서 한 번만 쓰여야 한다.
- `[fetchBaseQuery()](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery)`: 요청을 단순화하는 목적을 가진 작은 wrapper이다. 대부분의 사용자에게 createApi에서 권장되는 baseQuery로 사용된다.
- `[<ApiProvider />](https://redux-toolkit.js.org/rtk-query/api/ApiProvider)`: 리덕스 스토어가 아직 없는 상태에서 Provider로 사용할 수 있다.
- `[setupListeners()](https://redux-toolkit.js.org/rtk-query/api/setupListeners)`: refetchOnMount, refetchOnReconnect 동작을 활성화하는 데 사용되는 유틸리티이다.

---

_References_

[Getting Started | Redux Toolkit](https://redux-toolkit.js.org/introduction/getting-started#rtk-query)
[Let's Learn Modern Redux! (with Mark Erikson) - Learn With Jason](https://youtu.be/9zySeP5vH9c)
