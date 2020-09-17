---
title: Context API
date: 2020-06-18
tags:
---

> Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 사용한다.

- 사용자 로그인 정보
- 애플리케이션 환경 설정
- 테마

## Context API를 왜 사용해야 하는가?

리액트 어플리케이션은 props를 통해 컴포넌트 간에 데이터를 전달하는데, 여러군데서 필요한 데이터가 있을 때는 최상위 컴포넌트에서 state로 관리하고, 이를 컴포넌트에 전달한다. 기본적인 props 시스템에서는 parent component에서 child1,2,3이 있을 때 child3에게 props를 전달하려고 하면, child1,2는 해당 props를 사용하지 않더라도 props를 받아서 child3에게 전달해주어야 한다. 이렇게 규모가 작은 경우에는 여러 컴포넌트를 거쳐서 props를 전달하는 것이 그리 복잡하지 않으나 프로젝트 규모가 커지고, 여러 컴포넌트를 거쳐야 한다면 데이터의 전달이 복잡해진다. 또한 유지보수할 때 어려움을 겪을 수 있다.
이렇게 여러 컴포넌트를 거쳐서 props로 전달하지 않고, parent component에서 데이터를 받길 원하는 child3나 그 외의 자식에게 직접 전달하고 싶을 때 Conetext API를 사용한다. 결국 Conetext API의 목적은 `데이터를 주고 받는 행위`에 대한 것이다.

## Context API 사용하기

1. `createContext` 함수를 이용하여 context를 만들고, 파라미터에는 Context의 기본 상태를 지정한다.

```javascript
import { createContext } from "react";

const ColorContext = createContext({ color: "black" });

export default ColorContext;
```

2. `Consumer` 사이에 중괄호를 열어 함수를 넣어준다. 컴포넌트의 children이 있어야 할 자리에 JSX 또는 문자열이 아닌 함수를 전달하는 것.

```javascript
<ColorContext.Consumer>
  {(value) => (
    <div style={{ width: "64px", height: "64px", background: value.color }} />
  )}
</ColorContext.Consumer>
```

3. `Provider`를 사용하면 Context의 value를 변경할 수 있다.

원래 cerateContext 생성시 만든 value는 black이었으나 Provider를 red로 변경하였다. 이전에 createContext 함수를 사용할 때 파라미터로 지정해 둔 `createContext({ color: "black" });`은 별도로 Provider를 사용하지 않았을 때 사용한다. _만약 Provider를 사용하면서 value는 지정하지 않았다면 오류가 발생한다._

```javascript
const App = () => {
  return (
    <ColorContext.Provider value={{ color: "red" }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
};
```

Context의 value는 상태 값이 아닌 함수를 전달할 수도 있다.

```javascript
// createContext의 기본값은 실제 Provider의 value에 넣는 객체의 형태와 일치시킨다.
const ColorContext = createContext({
  state: { color: "black", subcolor: "red" },
  action: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

//상태는 state, 함수는 acions로 묶은 value를 전달받았다.
const value = {
    state: { color, subColor },
    actions: { setColor, setSubcolor }
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
```

useContext를 사용하면 Context를 편하게 사용할 수 있다. _단, 이는 함수형 컴포넌트에서만 사용할 수 있다._

---

_Reference_
[react](https://ko.reactjs.org/docs/render-props.html#gatsby-focus-wrapper)
Udemy
리액트를 다루는 기술
