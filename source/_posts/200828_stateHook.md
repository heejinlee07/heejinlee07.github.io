---
title: State Hook이란?
date: 2020-08-28
tags:
---

## useState

React state를 함수 컴포넌트 안에서 사용할 수 있게 해주는 함수.

> const [state, setState] = useState(initialState); -> 상태 유지값과 그 값을 갱신하는 함수 반환
> 첫 번째 렌더링: state(state) = initialState의 값 -> <u>initialState는 첫 번째 렌더링에만 사용되고, 그 이후로 무시된다.</u>
> setState(newState); -> state를 갱신할 때 사용 -> 새 state의 값을 받아서 리렌더링 큐에 등록
> 두 번째 렌더링(리렌더링): setState()로 갱신된 state 값

```javascript
//class에서 state의 사용
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

//함수 컴포넌트에서 state의 사용
import React, { useState } from 'react';

function Example() {
  //함수 컴포넌트는 this를 가질 수 없으므로 useState hook을 직접 호춡
  // 새로운 state 변수를 선언하고, 이것을 count라 부른다.
  const [count, setCount] = useState(0);
```

- useState(): useState의 호출은 `state 변수 선언`을 의미. 함수가 종료되면 사라지는 일반 변수와 달리 React에 의해 사라지지 않는 특징이 있다. (class 컴포넌트의 this.state와 동일한 기능)
- useState(인자):
  - class 컴포넌트: `<button onClick={() => this.setState({ count: this.state.count + 1 })}>` 이와 같이 `객체`로 인자를 넘겨주어야했다. 그러나 함수 컴포넌트에서는 객체 뿐 아니라 숫자, 문자도 넘겨줄 수 있다.
  - 함수형 컴포넌트: `state의 초기값`. **첫 번째 렌더링 시 딱 한 번만 사용된다.** _다음 렌더링을 하는 동안 useState는 현재 state를 준다._
- **useState의 반환값: state 변수, 해당 변수를 갱신할 수 있는 함수의 두 가지 쌍.**
- state 가져오기
  - class 컴포넌트: this.state.count로 state를 가져온다.
  - 함수형 컴포넌트: count를 직접 사용한다.
- state 갱신
  - class 컴포넌트: this.setState() 호출.
  - 함수형 컴포넌트: this 호출이 필요 없음.

```javascript
//class 컴포넌트
<button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
</button>

//함수형 컴포넌트
//이미 setCount, count 변수를 가지고 있다.
<button onClick={() => setCount(count + 1)}>
    Click me
</button>
```

---

## useState의 변수 선언

> const [count, setCount] = useState(0);

배열 디스트럭처링을 이용하여 `state 변수, 해당 변수를 갱신할 수 있는 함수`로 구성된 두 가지 쌍을 가진 `배열`을 반환하도록 정의한다. 이 배열의 첫번째 요소는 초기값, 두 번째 요소는 초기값으로 설정된 변수를 갱신해주는 함수이다. 아래와 같은 구조로 fake useState함수를 구성해보고, useState 함수에 인자 0을 전달하여 `useState(0)`와 같이 호출하면 \[0,ƒ]의 값이 반환된다. 각각을 살펴보면, 배열의 첫번 째 요소인 `0`은 초기값이고, 두 번째 요소인 `ƒ`는 첫 번째 요소에 전달된 초기값을 전달받아서 새로운 값으로 갱신해 주는 함수이다. 이와 같은 useState hook은 컴포넌트 내에서 여러 개 선언할 수 있고, 개뱔적으로 갱신할 수 있다. 단, 렌더링 될 때 useState가 사용된 순서대로 실행된다.

```javascript
function useState(initialValue) {
  let value = initialValue;

  const setValue = (newValue) => {
    value = newValue;
  };

  return [value, setValue];
}

useState(0);
// [0,ƒ]

const result = useState(0);
result[0]; //0
result[1];
/*
(newValue) => {
        value = newValue
    }
*/
```

---

## Functional updates

```javascript
function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  return (
    <>
      Count: {count}
      //1️⃣
      <button onClick={() => setCount(initialCount)}>Reset</button>
      //2️⃣
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      //3️⃣
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </>
  );
}
```

- 1️⃣Reset count: 클릭했을 때 0으로 설정되어야 하므로 `setCount(newValue)`의 일반적인 형식 사용
- 2️⃣/3️⃣: `setCount(newValue)`를 했을 때 newValue는 갱신되기 이전의 값을 바탕으로 - 또는 + 되어야 함. 즉 `setCount((갱신되기 이전 값) => 갱신되기 이전 값 -1 또는 +1 )`와 같이 함수로 갱신되기 이전 값을 넘겨준 후 그 값에서 - 또는 +를 하여 newValue로 갱신한다. 이때 만약 이와 같은 함수가 이전 값을 받아서 +나 -를 수행했는데도 현재의 값과 동일한 값을 반환한다면 리렌더링이 이루어지지 않는다.
- class의 setState는 자동으로 객체를 합쳐서 갱신하는데, useState는 그렇지 않다. 대신 스프레드 문법을 사용`(e.g. return {...prevState, ...updatedValues};)`하여 class와 같은 동작을 수행할 수 있다.

---

_References_
[Hook 소개](https://ko.reactjs.org/docs/hooks-intro.html)
[Hook 개요](https://ko.reactjs.org/docs/hooks-overview.html)
[Using the State Hook](https://ko.reactjs.org/docs/hooks-state.html)
[Hook API 참고서](https://ko.reactjs.org/docs/hooks-reference.html)
