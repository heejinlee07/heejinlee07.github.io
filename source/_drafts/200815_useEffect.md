---
title: useEffect
date: 2020-08-15 15:00
tags:
---

## useState

> const [state, setState] = useState(initialState);

1 번째 렌더링: state=initialState의 값
`setState`: state를 갱신할 때 사용. 새 state 값을 받아서 컴포넌트 리렌더링을 큐에 등록.
2 번째 렌더링: `setState(newState);` state=갱신된 최신 state

## useEffect

useEffect는 컴포넌트가 마운트 됐을 때 (처음 나타났을 때), 언마운트 됐을 때 (사라질 때 ), 그리고 업데이트 될 때 (특정 props가 바뀔 때) 특정 작업을 처리한다.

- 첫 번째 파라미터: 실행하고 싶은 함수,
- 두 번째 파라미터: 배열(dependency를 줄여서 deps라고 부른다. _의존되는 값들을 배열 안에 넣어준다._)
- 배열이 비어있으면 컴포넌트가 처음 화면에 나타날 때만 한 번 실행된다. 업데이트 시에는 호출안됨.

배열 안에 값이 있을 때, 배열안의 값이 설정되거나 바뀔 때마다(업데이트 된 직후) useEffect에서 등록한 함수가 호출된다. deps 배열을 아예 생략하는 경우에는 컴포넌트가 리렌더링 될 때마다 호출된다. 업데이트 시에 모든 컴포넌트가 실행된다. 부모컴포넌트가 리렌더링되면 자식 컴포넌트 또한 리렌더링되기 때문이다. 실제 DOM에 반영되는 것은 바뀐 내용이 있는 컴포넌트지만 Virtual DOM에서는 다 렌더링한다.

```javascript
useEffect(() => {
  console.log("user 값이 설정됨");
  console.log(user);
  //cleanup함수. [user]에 있는 값이 바뀌기 직전에 호출됨.
  return () => {
    console.log("user 값이 바뀌기 전");
    console.log(user);
  };
}, [user]);
// [관리 할 상태] : [] 자리에 관리 할 상태를 넣는다.
//상태 정의 아래에 ex.(useState)가 정의 된 아래에 useEffect를 구현해야 한다.
```

useEffect 안에서 사용하는 상태나, props, 함수가 있다면 deps 에 넣어주어야 한다. 만약 useEffect 안에서 사용하는 상태나 props 를 deps 에 넣지 않게 된다면 useEffect 에 등록한 함수가 실행 될 때 최신 props / 상태를 가르키지 않게 된다.

### 컴포넌트가 마운트 될 때 하는 작업

- props 로 받은 값을 컴포넌트의 state(로컬 상태)로 설정
- 외부 API 요청할 때 (REST API 등)
- 라이브러리 사용할 때 (D3, Video.js 등...)
- setInterval 을 통한 반복작업 혹은 setTimeout 을 통한 작업 예약

아래는 useEffect를 이용하여 api 요청을 하는 예시이다.

```javascript
useEffect(() => {
  const getAirList = async () => {
    dispatch({ type: AIR_SET_LOADING });
    try {
      const { data } = await api.get("/");
      dispatch({ type: AIR_SET_DATA, payload: data.RealtimeCityAir.row });
    } catch (e) {
      dispatch({ type: AIR_HAS_ERROR });
    }
  };
  getAirList();
}, [dispatch]);
```

### 언마운트 될 때 하는 작업

- setInterval, setTimeout 을 사용하여 등록한 작업들 clear 하기 (clearInterval, clearTimeout)
- 라이브러리 인스턴스 제거

> useEffect(didUpdate);

변형, 구독, 타이머, 로깅 또는 다른 부작용(side effects)은 함수 컴포넌트 본문 내에서는 허용되지 않으나, useEffect 내부에서는 사용 가능하다.

useEffect에 전달된 함수는 **화면에 렌더링이 완료된 후 수행한다. 즉 useEffect로 전달된 함수는 지연 이벤트 동안에 레이아웃 배치와 그리기를 완료한 후 발생한다.**

이렇게 모든 렌더링이 완료된 후 effect를 발생시키므로, 의존성이 변경되면 **effect는 항상 재생성된다.** 아래와 같이 useEffect의 두 번째 인자를 전달하면 두 번째 인자에 있는 값이 변경될 때만 구독이 재생성된다. 이는 effect가 종속되어 있는 값의 배열이기 때문이다.

```javascript
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]);
```

리액트 컴포넌트 - **스테이트, 프롭**에 변화에만 렌더링이 다시 발생
리액트 컴포넌트는 언제 업데이트 되는가?

useRef는 업데이트 유발하지 않음.
리액트 컴포넌트가 언제 업데이트 될지는 알 수 없다. 대신 조건을 달아서 업데이트 할지 말지에 대해 조건을 설정.

```javascript
import React, { useState } from "react";

const Parent = () => {
  return <Test newNum={20} />;
};

[15, false, "abc", useEffect];

const Test = ({ newNum }) => {
  const [num, setNum] = useState(5);
  const [random, setRandom] = useState(false);
  const [abc, setAbc] = useState("abc");

  useEffect(() => {
    setNum(newNum);
  }, [newNum]);

  return <div>{num}</div>;
};
```

```
useState
useReduce
useRef


{
  value1: 1,
  value2: 4,
  value3: [1, 4, 3],
  value4: {
    a: 1,
    b: 2
  }
}

```

```javascript
import React, { useRef } from "react";

const RefTest = () => {
  const ref = useRef({ test: 5 });

  ref.current.test;
};
```
