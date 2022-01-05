---
title: RTK Query - createApi
date: 2022-01-04
tags:
---

# RTK Query

> 원문링크: https://redux-toolkit.js.org/rtk-query/api/createApi

**createApi는 RTK Query의 핵심이다.** 이를 통해 해당하는 데이터를 가져오고 변환하는 방법을 구성하는 것을 포함하여 일련의 엔드포인트들로부터 데이터를 어떻게 회수(검색)해야하는 지에 대해 일련의 엔드포인트에 대한 방법을 정의할 수 있다. createApi는 여기에 캡슐화된 데이터 fetching와 caching 프로세스는 포함하는 Redux 로직(옵셔널한 React hooks)이 담겨있는 [API slice structure](https://redux-toolkit.js.org/rtk-query/api/created-api/overview)를 생성한다.

💡 일반적으로 어플리케이션이 통신해야 하는 base URL 하나 당 하나의 API slice만 있어야 한다. 예를 들어 당신의 사이트가 /api/posts와 /api/users 모두에서 데이터를 fetch한다면 /api/를 base URL로 가지는 single API slice를 가지고 있고, posts와 users로 엔드포인트 정의를 분할했을 것이다. 이렇게 하면 엔드포인트에서 [태그](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tags) 관계를 정의해서 [자동화된 re-fetching](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching)의 이점을 효과적으로 사용할 수 있다.

유지(maintainability)의 목적을 위해 모든 엔드포인트를 포한하는 single API slice를 유지하면서 여러 파일에 걸쳐 endpoint 정의를 분할해서 사용할 수 있다. injectEndpoints 속성을 사용하여 다른 파일의 엔드포인트를 [code splitting](https://redux-toolkit.js.org/rtk-query/usage/code-splitting)을 하는 방법은 [code splitting](https://redux-toolkit.js.org/rtk-query/usage/code-splitting)을 참조한다.

```jsx
//example: src/services/pokemon.ts

// React hook의 생성을 허용하려면 React의 특정 엔트리포인트를 사용해야 한다.
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Pokemon } from './types'

// baseURL과 엔드포인트를 사용하여 서비스를 정의한다.
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

// 함수 컴포넌트에서 사용하기 위해 hooks를 export하고,
// 엔드포인트가 정의된 곳에 기반하여 자동 생성되도록 한다.
export const { useGetPokemonByNameQuery } = pokemonApi
```

## Parameters

createApi는 아래와 같은 옵션이 있는 단을 구성 객체(single configuration object)를 받아들인다.

```jsx
baseQuery(args: InternalQueryArgs, api: BaseQueryApi, extraOptions?: DefinitionExtraOptions): any;
  endpoints(build: EndpointBuilder<InternalQueryArgs, TagTypes>): Definitions;
  extractRehydrationInfo?: (
    action: AnyAction,
    {
      reducerPath,
    }: {
      reducerPath: ReducerPath
    }
  ) =>
    | undefined
    | CombinedState<Definitions, TagTypes, ReducerPath>
  tagTypes?: readonly TagTypes[];
  reducerPath?: ReducerPath;
  serializeQueryArgs?: SerializeQueryArgs<InternalQueryArgs>;
  keepUnusedDataFor?: number; // value is in seconds
  refetchOnMountOrArgChange?: boolean | number; // value is in seconds
  refetchOnFocus?: boolean;
  refetchOnReconnect?: boolean;
```

## baseQuery

base query는 `queryFn` 옵션이 특정되지 않은 경우에 각 endpoint에서 사용된다. RTK Query는 [fetchBaseQuery](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery)라고 불리는 유틸리티로 일반적인 사용 케이스에서 fetch를 감싸는 경량 wrapper로써 export된다. 만약 fetchBaseQuery가 요구 사항을 처리할 수 없는 경우에 [Customizing Queries](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries)를 참조하도록 한다.

**baseQuery function arguments**

- args: 주어진 endpoint에 대한 query 함수의 반환값
- api - signal, dispatch, getState, extra 속성을 포함하는 BaseQueryApi 객체
  - singal: Dom 요청을 중단하거나 요청이 중단되었는지 여부를 읽어들이는 데 사용할 수 있는 [AbortSignal](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal) 객체
  - dispatch: Redux store와 대응하게 하는 `store.dispatch` 매서드
  - getState: 현재의 store 상태에 접근하기 위해 호출될 수 있는 함수
  - extra: configureStore getDefaultMiddleware option에 thunk.extraArgument로 제공된다.
- extraOptions: 주어진 endpoint를 위해 제공되는 선택적 extraOptions의 값

```jsx
// Base Query signature
export type BaseQueryFn<
  Args = any,
  Result = unknown,
  Error = unknown,
  DefinitionExtraOptions = {},
  Meta = {}
> = (
  args: Args,
  api: BaseQueryApi,
  extraOptions: DefinitionExtraOptions
) => MaybePromise<QueryReturnValue<Result, Error, Meta>>

export interface BaseQueryApi {
  signal: AbortSignal
  dispatch: ThunkDispatch<any, any, any>
  getState: () => unknown
}

export type QueryReturnValue<T = unknown, E = unknown, M = unknown> =
  | {
      error: E
      data?: undefined
      meta?: M
    }
  | {
      error?: undefined
      data: T
      meta?: M
    }
```

## endpoints

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: build => ({
    // ...endpoints
  })
})
```

endpoints는 서버에 대해 수행하려는 작업들의 집합이다. builder syntax를 사용해서 객체로 정의한다. 여기에는 `query, mutaion` 의 두 가지 기본적인 엔드포인트 유형이 있다.

각 속성에 대한 세부내용이 궁금하여 [다음의 링크](https://redux-toolkit.js.org/rtk-query/api/createApi#anatomy-of-an-endpoint)를 참조한다.

```jsx
// Query endpoint definition

export type QueryDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  TagTypes extends string,
  ResultType,
  ReducerPath extends string = string
> = {
  query(arg: QueryArg): BaseQueryArg<BaseQuery>

  /* either `query` or `queryFn` can be present, but not both simultaneously */
  queryFn(
    arg: QueryArg,
    api: BaseQueryApi,
    extraOptions: BaseQueryExtraOptions<BaseQuery>,
    baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>
  ): MaybePromise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>>

  /* transformResponse only available with `query`, not `queryFn` */
  transformResponse?(
    baseQueryReturnValue: BaseQueryResult<BaseQuery>,
    meta: BaseQueryMeta<BaseQuery>,
    arg: QueryArg
  ): ResultType | Promise<ResultType>

  extraOptions?: BaseQueryExtraOptions<BaseQuery>

  providesTags?: ResultDescription<
    TagTypes,
    ResultType,
    QueryArg,
    BaseQueryError<BaseQuery>
  >

  keepUnusedDataFor?: number

  onQueryStarted?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      queryFulfilled,
      getCacheEntry,
      updateCachedData, // available for query endpoints only
    }: QueryLifecycleApi
  ): Promise<void>

  onCacheEntryAdded?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      cacheEntryRemoved,
      cacheDataLoaded,
      getCacheEntry,
      updateCachedData, // available for query endpoints only
    }: QueryCacheLifecycleApi
  ): Promise<void>
}
```

```jsx
// Mutation endpoint definition

export type MutationDefinition<
  QueryArg,
  BaseQuery extends BaseQueryFn,
  TagTypes extends string,
  ResultType,
  ReducerPath extends string = string,
  Context = Record<string, any>
> = {
  query(arg: QueryArg): BaseQueryArg<BaseQuery>

  /* either `query` or `queryFn` can be present, but not both simultaneously */
  queryFn(
    arg: QueryArg,
    api: BaseQueryApi,
    extraOptions: BaseQueryExtraOptions<BaseQuery>,
    baseQuery: (arg: Parameters<BaseQuery>[0]) => ReturnType<BaseQuery>
  ): MaybePromise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>>

  /* transformResponse only available with `query`, not `queryFn` */
  transformResponse?(
    baseQueryReturnValue: BaseQueryResult<BaseQuery>,
    meta: BaseQueryMeta<BaseQuery>,
    arg: QueryArg
  ): ResultType | Promise<ResultType>

  extraOptions?: BaseQueryExtraOptions<BaseQuery>

  invalidatesTags?: ResultDescription<TagTypes, ResultType, QueryArg>

  onQueryStarted?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      queryFulfilled,
      getCacheEntry,
    }: MutationLifecycleApi
  ): Promise<void>

  onCacheEntryAdded?(
    arg: QueryArg,
    {
      dispatch,
      getState,
      extra,
      requestId,
      cacheEntryRemoved,
      cacheDataLoaded,
      getCacheEntry,
    }: MutationCacheLifecycleApi
  ): Promise<void>
}
```

**endpoints에 익숙해지는 방법**

아래와 같이 getPosts를 키로 정의할 때, 이 이름이 api로부터 export되고, api.endpoints.getPosts.useQuery(), api.endpoints.getPosts.initiate(), api.endpoints.getPosts.select() 아래에서 reference될 수 있다는 것을 아는 것이 중요하다. 비슷한 방식으로 mutaion에도 적용이 되는데 useQuery대신 useMutaion이 적용된다.

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
interface Post {
  id: number
  name: string
}
type PostsResponse = Post[]

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'posts',
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Posts', id })) : [],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
})

// Auto-generated hooks
export const { useGetPostsQuery, useAddPostMutation } = api

// Possible exports
export const { endpoints, reducerPath, reducer, middleware } = api
// reducerPath, reducer, middleware are only used in store configuration
// endpoints will have:
// endpoints.getPosts.initiate(), endpoints.getPosts.select(), endpoints.getPosts.useQuery()
// endpoints.addPost.initiate(), endpoints.addPost.select(), endpoints.addPost.useMutation()
// see `createApi` overview for _all exports_
```

### extractRehydrationInfo

모든 디스패치된 액션에 전달되는 함수이다. 이것이 undefined 이외의 값을 반환하면 해당 반환 값은 성공하였거나 실패한 커리를 rehydrate하는데 사용된다.

```jsx
//next-redux-wrapper rehydration example

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: build => ({
    // omitted
  })
})
```

See also [Server Side Rendering](https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering) and [Persistence and Rehydration](https://redux-toolkit.js.org/rtk-query/usage/persistence-and-rehydration).

## tagTypes

string tag type 이름들이 있는 배열이다. tag types를 지정하는 것은 선택적이나 caching과 invalidation에 사용하고 싶다면 정의해야 한다. tag type을 정의할 때, `providesTags` 와 함께 제공하고, [endpoints](https://redux-toolkit.js.org/rtk-query/api/createApi#endpoints)를 구성할 때 `invalidatesTags` 와 함께 [무효화](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#invalidating-tags)시킬 수 있다.

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Post', 'User'],
  endpoints: build => ({
    // ...endpoints
  })
})
```

### reducerPath

서비스가 당신의 store에 장착될 수 있도록 하는 unique key이다. 당신의 어플리케이션에서 createApi를 한 번 이상 호출했다면 당신은 매번 unique한 value를 제공해야 하고, default는 api이다.

```jsx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const apiOne = createApi({
  reducerPath: 'apiOne',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    // ...endpoints
  })
})

const apiTwo = createApi({
  reducerPath: 'apiTwo',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    // ...endpoints
  })
})
```

---

_References_
[createApi](https://redux-toolkit.js.org/rtk-query/api/createApi)
