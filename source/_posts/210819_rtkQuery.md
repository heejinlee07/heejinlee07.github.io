---
title: RTK Query Overview 원문 번역
date: 2021-08-19
tags: React
---

> https://redux-toolkit.js.org/rtk-query/overview

RTK Query는 강력한 data fetching과 caching 툴이다. 웹 어플리케이션 내에서 데이터를 로딩할 때 사용되는 common case들을 단순화 하기 위해 고안되었기 때문에 data fetching과 캐싱 로직을 직접 작성할 필요가 없다. Redux Tookit 패키지에서 선택적 옵션으로 포함되어 있고, Redux Tookit 기능적으로 다른 api위에 구축된다.

# Motivation

웹 어플리케이션은 보통 data를 화면에 그리기 위해 서버로부터 data를 fetch해서 가져와야 한다. 또 이 data를 업데이트 하거나 업데이트할 내용을 서버에 보내고, 서버의 데이터와 싱크를 맞추기 위해 client측에서 데이터를 캐시해서 가지고 있기도 한다. 오늘날을 어플리케이션 내에서 아래와 같은 다양한 행동이 실행되기 때문에 이 과정이 더욱 복잡하다.

- UI spinners를 보여주기 위해 loading 상태일 때를 추적한다.
- 같은 데이터를 사용할 때 중복 요청을 막는다
- UI가 보다 빠르게 느끼도록 하는 updates
- UI와 유저 인터페이스의 상호작용을 위한 캐시 수명(사이클) 매니징

Redux 코어는 늘 최소화되어 왔기 때문에 실제 로직을 작성하는 것은 개발자에게 달려있다. 이는 리덕스가 위와 같은 사용 사례를 해결하기 위한 어떠한 것도 내부에 포함하고 있지 않다는 의미이다. 리덕스 도큐먼트에서는 로딩 스테이트와 요청 결과를 트래킹하기 위한 요청 수명(사이클)이 몇 가지 일반적인 패턴이 있다고 가르쳐왔다. 그리고 Redux Toolkit의 createAsyncThunk는 이러한 전형적인 패턴을 추상화하여 고안된 것이다. 그러나 유저는 아직도 상당한 리듀서 로직을 로딩 스테이트와 데이터 캐시를 위해 사용해야 한다.

지난 몇 년간, 리액트 커뮤니티는 "data fetching과 캐싱'이 state management와 완전히 다른 관심사라는 것을 깨달았다. Redux와 같은 상태관리 라이브러리를 사용해서 데이터를 캐시할 수 있자만, 데이터 fetching과 같은 상황에서 쓸 목적으로 만들어진 별도의 툴을 사용해도 될 만큼 의미있다.

RTK Query는 Apollo Client, React Query, Urql 및 SWR과 같이 data fetching을 위한 선구적인 솔루션 툴들로부터 영감을 받았지만, API 디자인에 고유한 접근 방식을 추가했다.

- data fetching과 캐싱 로직은 Redux toolkit의 createSlice와 createAsyncThunk api를 기반으로 구축된다.
- 왜냐하면 redux toolkit은 UI에 구애받지 않는 UI-agnostic이기 때문에, RTK 쿼리는 모든 UI layer에서 사용할 수 있다.
- api endpoint는 인수를 통해 어떻케 쿼리 파라미터를 생성할 것인지와 캐싱을 위해 어떻게 응답을 변환할 것인지를 포함하여 미리 정의된다.
- RTK Query는 react hook을 생성하여 전체 data fetching과정을 캡슐화하고, 컴포넌트에 data와 isLoading필드를 제공하고, 컴포넌트가 마운트되거나 언마운트될 때 캐시된 데이터의 수명을 관리한다.
- RTK Query는 "cache entry lifecycle"옵션을 제공하는데, 이 옵션을 사용하면 초기 데이터를 fetching한 후에 웹소켓 메세지를 통해 스트리밍 캐시 업데이트 등과 같은 경우에 사용할 수 있도록 활성화 된다.
- openAPI 또는 GraphQL 스키마에서 API slice의 코드 생성에 대한 예를 찾을 수 있다.
- RTK Query는 완전히 TypeScript로 쓰여져 있기 때문에 TS 사용에 대한 좋은 경험을 제공할 수 있다.

---

# 포함된 것

## APIs

RTK Query는 Redux Toolkit 패키지의 코어를 설치하면 그곳에 포함되어 있다. 아래 두 엔트리 포인트 중 한 가지로 사용할 수 있다.

```jsx
import { createApi } from '@reduxjs/toolkit/query';

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi } from '@reduxjs/toolkit/query/react';
```

RTK Query에는 다음의 API가 포함된다.

- createApi(): RTK Query의 핵심기능이다. 여러 엔드포인트들로부터 데이터를 어떻게 회수할 것인지가 작성된 여러 엔드포인트들을 정의하고, 여기에는 데이터를 어떻게 fetch하거나 변환할 것인지에 대한 내용이 담긴다. 대부분의 경우 app에서 "하나의 base URL 당 하나의 API 슬라이스"를 사용하여 한 번만 작성되어야 한다.
- fetchBaseQuery(): 요청을 단순화하는 것을 목표로 하는 fetch를 감싸는 작은 Wrapper이다. 대부분의 사용자에게는 createApi에서 baseQuery로 사용할 것이 권장된다.
- <ApiProvider/>: Redux 스토어가 없는 경우에도 Provider로써 사용할 수 있다.
- setupListeners(): refetchOnMounte와 refetchOnReconnect를 사용할 수 있게 하는 유틸리티이다.

### 번들 크기

RTK 쿼리는 앱의 번들 사이즈에 고정된 일회성 사이즈로 추가된다. RTK Query는 Redux Toolkit과 React-Redux의 가장 상단에서 빌드되기 때문에 이렇게 추가된 사이즈는 이미 사용자가 app에서 이것을 쓰고 있는지 아닌지에 따라 다르다. 예상되는 min+gzip 번들 크기는 다음과 같다.

- RTK를 이미 사용하고 있는 경우: RTK 쿼리의 경우 ~9kb, hooks의 경우 ~2kb.
- RTK를 이미 사용하지 않는 경우:
  - React 없음: RTK+dependencies+RTK 쿼리의 경우 17kB
  - React 사용 시: 19kB + React-Redux, which is a peer dependency

endpoint들의 정의를 추가적으로 포함하고자 하면 보통 몇 바이트에 불과한 endpoints 정의 내부의 실제 코드에 근거하여 크기만 증가해야 한다

RTK 쿼리에 포함된 기능은 추가된 번들 크기에 대한 비용을 빠르게 지불하는 것을 포함하기 때문에 직접 작성한 data fetching 로직을 제거하면 대부분의 의미있는 응용 프로그램에서 size가 향상된다.

---

## 기본 사용법

### Create an API Slice

RTK Query는 Redux Toolkit 패키지의 코어를 설치하면 그곳에 포함되어 있다. 아래 두 엔트리 포인트 중 한 가지로 사용할 수 있다.

```jsx
import { createApi } from '@reduxjs/toolkit/query';

/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */

// export hooks를 쓰려면 반드시 /react로 사용
import { createApi } from '@reduxjs/toolkit/query/react';
```

React에서 일반적인 사용법은 createApi를 임포트하는 것으로 시작하여 서버의 base url을 정리하고, 접근하고자 하는 엔드포인트를 정리하기 위한 "API slice"를 정의한다.

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery } = pokemonApi
```

## 스토어 구성

"API slice"에는 자동으로 생성되는 slice 리듀서와 구독 수명주기를 매니지 할 수 있는 커스텀 미들웨어를 포함하고 있다. 이 두 가지 모두 Redux 스토어에 추가해야 한다.

```jsx
import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { pokemonApi } from './services/pokemon';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
```

## 컴포넌트에 hooks사용

마지막으로 API slice에서 자동 생성된 react hook을 컴포넌트 파일로 임포트 하고, 컴포넌트에서 필요한 파라미터를 사용하여 hooks를 호출한다. RTK Query는 mount될 때 자동으로 data를 fetch하고, 파라미터가 변경될때 re-fetch하며, 결과에 {data, isFetching} 값을 제공한다. 그리고 이 값들이 변경되면 컴포넌트를 리렌더링한다.

```jsx
import * as React from 'react';
import { useGetPokemonByNameQuery } from './services/pokemon';

export default function App() {
  // Using a query hook automatically fetches data and returns query values
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur');
  // Individual hooks are also accessible under the generated endpoints:
  // const { data, error, isLoading } = pokemonApi.endpoints.getPokemonByName.useQuery('bulbasaur')

  // render UI based on data and loading state
}
```

---

## 사용예시

```jsx
//dosApiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const DOGS_API_KEY = '4902a53c-cfda-44e4-a5d7-35b9bd5b6cb9';

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

//api slice

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.thedogapi.com/v1',
    prepareHeaders(headers) {
      headers.set('x-api-key', DOGS_API_KEY);

      return headers;
    },
  }),
  //builder에 의해 엔트리 포인트 생성
  endpoints(builder) {
    return {
      fetchBreeds: builder.query<Breed[], number | void>({
        query(limit = 10) {
          return `/breeds?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchBreedsQuery } = apiSlice;
```

```jsx
//store.ts
//configureStore: basic redux create store function의 wrapper
//create store

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counter-slice';
import { apiSlice } from '../features/dogs/dogsApiSlice';

//combine reducer
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

//ts thing
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
```

```jsx

//사용하고자 하는 곳에서 사용
import { useFetchBreedsQuery } from './features/dogs/dogsApiSlice';
import logo from './logo.svg';
import './App.css';

function App() {
  //take selector function
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const [numDogs, setNumDogs] = useState(10);
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs);

  console.log(useFetchBreedsQuery);
```

---

_References_
[RTK Query Overview](https://redux-toolkit.js.org/rtk-query/overview)
