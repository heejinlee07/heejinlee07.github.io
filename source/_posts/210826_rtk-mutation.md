---
title: RTK Query Mutation 원문 번역
date: 2021-08-26
tags: React
---

> 원문링크: https://redux-toolkit.js.org/rtk-query/usage/mutations

# Mutation

## Overview

mutation은 서버에 데이터 업데이트를 보낼 때 사용하고, 이를 로컬 캐시에 적용하도록 한다. 또 유효하지 않은 데이터를 걸러내고, 강제로 re-fetch할 수 있도록 한다.

## Defining Mutation Endpoints

Mutation Endpoints는 createApi의 endpoints 섹션에 return 되는 객체로 정의된다. 정의되는 곳에서는 builder.mutation() 메소드를 통해 정의한다.

Mutation Endpoints는 URL(URL query params를 포함하는)의 구조의 query 콜백이나 queryFn 콜백에 정의해야 되는데, queryFn callback은 임의로 async 로직을 구성하고 결과를 반환한다. query 콜백은 URL, request 메소드에 사용하는 HTTP 메소드를 포함한 객체를 반환한다.

query 콜백이 URL을 생성하기 위한 추가 데이터가 필요한 경우에는 단일 인수로 작성되어야 하고, 만약 여러 파라미터를 전달할 예정이라면 단일 옵션 개체(option object)의 형태로 전달되어야 한다.

Mutation endpoints는 결과가 캐시되기 전에 response 내용을 수정하고, tags를 정의하여 캐시 무효화를 식별하고, 캐시 항목이 추가 및 제거될 때까지 전체 라이프 사이클 콜백을 제공한다.

```jsx
//Example of all mutation endpoint options

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    updatePost: build.mutation<Post, Partial<Post> & Pick<Post, 'id'>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: Post }) => response.data,
      invalidatesTags: ['Post'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
  }),
})
```

onQueryStarted는 [optimistic update](https://redux-toolkit.js.org/rtk-query/usage/optimistic-updates)에 사용할 수 있다.

---

## Performing Mutations with React Hooks

### Mutation Hook Behavior

useQuery와 달리 useMutatio는 tuple을 반환한다. tuple의 첫 번째 아이템은 'trigger' 함수이고, 두 번째 아이템은 status, error, data를 포함하는 객체이다.

useQuery hook과 달리 useMutation은 자동으로 실행되지 않는다. mutation을 실행하기 위해서 hook의 첫 번째 tuple 값인 trigger 함수를 호출해야 한다. [useMutaion](https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usemutation)과 관련된 자세한 내용은 링크를 참조한다.

### Frequently Used Mutation Hook Return Values

useMutation hook은 mutaion trigger 함수를 포함하는 tuple과 mutation 결과와 관련된 속성을 포함하는 객체를 반환한다 하였다.

mutaion trigger 함수가 호출될 때 해당 엔드포인트에 대한 요청을 시작한다. mutation trigger를 호출하면 upwarp 속성이 포함된 프로미스를 반환하는데, 이 속성을 호출하는 것을 통해 mutation 호출을 풀고, raw한 reponse와 error를 제공할 수 있다. 이는 mutation의 호출되는 영역에서 성공/실패 여부를 결정하는 경우에 유용하다.

mutation result는 mutation 요청에 대한 가장 최신의 data와 같은 속성을 포함하는 객체인데, 이 뿐 만 아니라 현재 요청한 라이프사이클 state에 대한 boolean 속성도 포함하고 있다.

아래는 mutation result 객체에서 가장 자주 사용하는 속성들이다. [useMutation](https://redux-toolkit.js.org/rtk-query/api/created-api/hooks#usemutation)가 return하는 전체 속성에 대한 내용은 링크를 참조한다.

- data: 존재하는 경우에, 가장 최신의 trigger response로 부터 반환된 데이터. 만약 동일한 hook의 인스턴스에서 후속 trigger가 호출되면 새로운 데이터를 받기 전에는 undefined를 반환한다. 이전 데이터에서 새로운 데이터로의 원활한 전환을 위해서 컴포넌트 레벨의 고려해야 한다.
- error: 존재하는 경우 에러의 결과.
- isUninitialized: true일 때, mutation이 아직 발생하지 않았음을 나타낸다.
- isLoading: true일 경우에 mutation이 아직 발생했고, reponse를 기다리는 중임을 나타낸다.
- isSuccess: true일 경우에 마자믹으로 실행된 mutation에서 성공적인 요청으로 부터 얻은 데이터가 있음을 나타낸다.
- isError: true일 때, 마지막으로 실행된 mutation에서 error 상태를 얻었음을 나타낸다.

note: RTK 쿼리에서 mutation은 [query](https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values)가 그런 것 처럼 'loading'와 'fetching' 사이에 시멘틱한 구분을 포함하고 있지 않다. mutation은 후속 call이 반드시 관련이 있는 것이라고 가정하지 않기 때문에, mutation은 'no fetching'과 같은 컨셉이 없고, 'loading' 또는 'not loading'의 컨셉을 가진다.

---

## Standard Mutation Example

페이지 하단의 updataPost mutation의 완전한 수정된 예시이다. 이 시나리오에서 post는 useQuery로 fetch되었고, post의 이름을 수정할 수 있는 EditablePostName 컴포넌트가 렌더된다.

```jsx
//src/features/posts/PostDetail.tsx

export const PostDetail = () => {
  const { id } = useParams<{ id: any }>()

  const { data: post } = useGetPostQuery(id)

  const [
    updatePost, // This is the mutation trigger
    { isLoading: isUpdating }, // This is the destructured mutation result
  ] = useUpdatePostMutation()

  return (
    <Box p={4}>
      <EditablePostName
        name={post.name}
        onUpdate={(name) => {
          // If you want to immediately access the result of a mutation, you need to chain `.unwrap()`
          // if you actually want the payload or to catch the error.
          // Example: `updatePost().unwrap().then(fulfilled => console.log(fulfilled)).catch(rejected => console.error(rejected))

          return (
            // Execute the trigger with the `id` and updated `name`
            updatePost({ id, name })
          )
        }}
        isLoading={isUpdating}
      />
    </Box>
  )
}
```

## Advanced Mutations with Revalidation

일반적으로 개발자가 mutation(revalidation)을 수행한 후 로컬 데이터 캐시를 서버와 재동기화하려는 경우가 매우 흔하다. RTK Query는 이에 대해 보다 중앙집권화 된 접근방법을 취함으로써 API 정의에서 invalidation 동작을 구성해야 한다. [Advanced Invalidation with abstract tag IDs](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#advanced-invalidation-with-abstract-tag-ids)를 통해 RTK Query와 Invalidation에 대한 자세한 내용을 참조하라.

## Revalidation Example

post의 [CRUD service](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) 예시이다. 이는 [Selectively invalidating lists](https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#selectively-invalidating-lists)의 전략을 구현하고, 실제 어플리케이션을 위한 좋은 기반을 제공한다.

```jsx
//src/app/services/posts.ts

// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Post {
  id: number
  name: string
}

type PostsResponse = Post[]

export const postApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<PostsResponse, void>({
      query: () => 'posts',
      // Provides a list of `Posts` by `id`.
      // If any mutation is executed that `invalidate`s any of these tags, this query will re-run to be always up-to-date.
      // The `LIST` id is a "virtual id" we just made up to be able to invalidate this query specifically if a new `Posts` element was added.
      providesTags: (result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }) => ({ type: 'Posts', id } as const)),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', id: 'LIST' }],
    }),
    addPost: build.mutation<Post, Partial<Post>>({
      query(body) {
        return {
          url: `post`,
          method: 'POST',
          body,
        }
      },
      // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
      // that newly created post could show up in any lists.
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
    updatePost: build.mutation<Post, Partial<Post>>({
      query(data) {
        const { id, ...body } = data
        return {
          url: `post/${id}`,
          method: 'PUT',
          body,
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      // In this case, `getPost` will be re-run. `getPosts` *might*  rerun, if this id was under its results.
      invalidatesTags: (result, error, { id }) => [{ type: 'Posts', id }],
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `post/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi
```

---

# Optimistic Updates

[https://redux-toolkit.js.org/rtk-query/usage/optimistic-updates](https://redux-toolkit.js.org/rtk-query/usage/optimistic-updates)

useMutation을 통해 이미 존재하고 있는 일부 데이터에 대한 업데이트를 수행하고자 할 때 RTK Query는 optimistic 업데이트를 실행하기 위한 몇가지 tool을 제공한다. 이는 사용자에게 변경사항이 즉시 적용된다는 인상을 주고 싶을 때 유용한 패턴이다.

핵심 개념은 다음과 같다:

- quey 또는 mutation이 시작 될 때 , onQueryStarted가 실행된다.
- `api.util.updateQueryData` 를 통해 캐시된 데이터를 수동으로 업데이트한다.
- promiseResult가 reject일 때 `.undo` 를 통해 이전 디스패치에서 반환된 객체의 속성으로 롤백한다.

```jsx

// Optimistic update mutation example (async await)

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'
import { Post } from './types'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPost: build.query<Post, number>({
      query: (id) => `post/${id}`,
      providesTags: ['Post'],
    }),
    updatePost: build.mutation<void, Pick<Post, 'id'> & Partial<Post>>({
      query: ({ id, ...patch }) => ({
        url: `post/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Post'],
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData('getPost', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
  }),
})
```

---

_References_
[RTK Query Mutations](https://redux-toolkit.js.org/rtk-query/usage/mutations)
