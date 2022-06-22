---
title: Apollo Client
date: 2022-06-22
tags:
---

## makeVar

> const cartItems = makeVar([]);

선택적 초기 값으로 reactive 변수를 생성합니다.

변수의 값을 읽거나 수정하는 데 사용하는 reactive 변수 함수를 반환합니다.
사용 방법은 아래와 같습니다.

## Reactive variables

> Apollo Client 반응성(reactivity) 모델에 통합된 상태 컨테이너(state containers)

Apollo Client3의 새로운 기능인 reactive variables는 Apollo Client 캐시 외부의 로컬 상태를 나타내는 유용한 매커니즘입니다. 캐시와 분리되어 있기 때문에 reactive variables는 어떠한 타입과 구조의 데이터도 저장할 수 있고, GraphQL구문을 사용하지 않고도 어플리케이션의 어느 곳에서나 상호 작용할 수 있습니다. **가장 중요한 것은 reactive variables를 수정하면 이 변수에 의존하는 모든 활성 쿼리(query)의 업데이트가 트리거된다는 것입니다.** 추가로 이 업데이트는 useReactiveVar를 쓰는 컴포넌트의 react 상태(State)를 업데이트 합니다.

만약 어떤 query의 요청된 필드가 변수의 값을 읽는 read 함수를 정의하는 경우에는 query가 reactive variables에 의존합니다.

### Creating

> makeVar를 이용해서 reactive variables를 만듭니다.

```javascript
import { makeVar } from '@apollo/client';

const cartItemsVar = makeVar([]);
```

이 코드는 초기 값으로 빈 배열을 사용하여 reactive variables를 만듭니다.

### Reading

> reactive variables의 값을 읽으려면 makeVar를 인수 없이 호출합니다.

```javascript
const cartItemsVar = makeVar([]);

// Output: []
console.log(cartItemsVar());
```

### Modifying

> reactive variables의 값을 수정하려면 makeVar와 하나의 인수(변수의 새로운 값)에 의해 반환된 함수를 호출합니다.

```javascript
const cartItemsVar = makeVar([]);

cartItemsVar([100, 101, 102]);

// Output: [100, 101, 102]
console.log(cartItemsVar());

cartItemsVar([456]);

// Output: [456]
console.log(cartItemsVar());
```

### Reacting

Reacting이라는 이름처럼 reactive variables는 어플리케이션에서의 reactive한 변화를 트리거할 수 있습니다. reactive variable의 값을 수정하려고 하면 쿼리는 해당 변수에 종속되어 있기 때문에 새로고침되고, 어플리케이션의 UI가 즉각 업데이트됩니다. useReactiveVar hook을 사용하면 query를 wrapping하지 않고 리액트 컴포넌트를 state에 바로 포함시킬 수 있습니다.
