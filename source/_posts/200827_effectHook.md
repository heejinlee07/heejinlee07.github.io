---
title: Effect Hook이란?
date: 2020-08-27
tags:
---

## useEffect

> useEffect(didUpdate);
> 함수 컴포넌트에서 side effects를 수행할 수 있게 함.
> 명령형 또는 어떤 effect를 발생하는 함수를 인자로 받음. -> 화면이 렌더링 된 후 수행
> 기본적으로 useEffect는 렌더링 이후 수행되지만 dependency array에 특정 값을 추가하여 이 값이 변경되었을 때만 실행되게 만들 수 있다.

- side effects: 데이터 가져오기, 구독(subscription) 설정하기, 수동으로 리액트 컴포넌트의 DOM을 직접 조작하고 수정하는 것 등의 모든 기능들.
  - 정리가 필요하지 않은 effects: DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우(e.g. 네트워크 리퀘스트, DOM 수동 조작, 로깅 등은 정리(clean-up) 등)
  - 정리가 필요한 effects
- class의 componentDidMount, componentDidUpdate, componentWillUnmount와 같은 목적으로 제공되지만, 하나의 API로 통합된 것과 같음.

---

### 정리가 필요하지 않은 effects

리액트가 DOM을 업데이트한 뒤 추가로 코드를 실행해야 하는 경우. (e.g. 네트워크 리퀘스트, DOM 수동 조작, 로깅 등)

<u>class 컴포넌트</u>

> render()는 side effect를 발생시키지 않음. 이펙트는 DOM을 업데이트하고 난 이후 발생. 따라서 side effect를 componentDidMount와 componentDidUpdate 둠. 그래서 class 안에서 두 개의 생명주기 메서드에 같은 코드가 중복되기도 한다. **그 이유는 componentDidMount인지 componentDidUpdate와 상관없이 렌더링 이후에 항상 같은 코드가 수행되어야 하기 때문이지만 class 컴포넌트에서는 이러한 기능을 하는 메서드를 지원하지 않으므로 아래 코드와 같이 각각의 생명주기 메서드 안에서 함수를 호출해야 한다..**

```javascript
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  // 두 개의 생명주기 메서드 안에 같은 코드 중복
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    console.log("componentDidMount");
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
    console.log("componentDidUpdate");
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

<u>함수 컴포넌트: useEffect hook 사용</u>

> useEffect hook은 리액트에게 컴포넌트가 렌더링 된 후 어떤 일을 수행해야하는지 알려준다. effect를 기억해두었다가 DOM 업데이트 수행 후 불러낸다. useEffect는 컴포넌트 안에서 호출되기 때문에 아래 예제와 같이 count 변수(또는 그 어떤 prop)에도 접근할 수 있다. 함수 범위 안에 존재하기 때문이다.

```javascript
import React, { useState, useEffect } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log("useEffect");
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

class 컴포넌트에서는 렌더링 이후 어떤 일을 수행할 것인지에 대해 componentDidMount와 componentDidUpdate로 각각 정의해주었다. 헨더링 이전에 마운트 되었을 때와 업데이트 될 때의 상황에 대해 정의했기 때문에, componentDidMount는 마운트 될 때만 수행되고, componentDidUpdate는 업데이트 될 때만 수행된다. useEffect는 effect 안에 렌더링 이후 이루어질 작업에 대한 내용을 정의하는 방식이므로 componentDidMount와 componentDidUpdate를 effect 함수 내부에서 한 번에 처리한다. 따라서 첫 번째 렌더링과 이후 업데이트가 발생할 때마다 수행된다. 두 가지 경우 모두 effect가 수행되는 시점은 이미 DOM이 업데이트 된 시점이 렌더링 이후이다.

위의 예제에서 처럼 class 컴포넌트, 함수형 컴포넌트에서의 effect 사용에 대해서 아래와 같이 각각 console.log를 찍어보면 렌더링 이후 발생하는 일에 대해 더욱 명확히 알 수 있다.

- `마운트 시점`: componentDidMount의 'componentDidMount'와 useEffect의 'useEffect'가 console창에 출력된다.
- `사용자가 버튼을 클릭하여 업데이트 되는 시점`: componentDidMount의 'componentDidMount'는 더이상 출력되지 않고, componentDidUpdate의 'componentDidUpdate'가 버튼에 클릭 이벤트가 발생할 때마다 console창에 출력된다. useEffect의 'useEffect'는 마운트 시점과 동일하게 계속 console창에 출력된다.

```javascript
  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    console.log("componentDidMount");
  }
  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
    console.log("componentDidUpdate");
  }

    useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log("useEffect");
  });
```

| 컴포넌트 | 렌더링 이전                                                                                                     | 렌더링 이후                                                                                                       | effect 수행시점   | effect 정리                                                                 | 특징                                                                                                                                                                                                            |
| -------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| class    | componentDidMount,componentDidUpdate,componentWillUnmount로 렌더링 이후 이루어질 작업을 각각의 함수로 따로 정의 | componentDidMount는 마운트 될 때, componentDidUpdate는 업데이트 될 때,componentWillUnmount는 언마운트될 때만 수행 | DOM 업데이트 이후 | componentWillUnmount를 사용하여 정리                                        | 마운팅, 업데이트 방식으로 effect 수행                                                                                                                                                                           |
| 함수형   | useEffect를 컴포넌트 안에서 불러서 렌더링 이후 이루어질 작업에 대해 정의                                        | 렌더링 이후 매번 수행(첫번째 렌더링 이후 업데이트 될 때마다)                                                      | DOM 업데이트 이후 | useEffect() => {내부에서 return() => {언마운트 될 때 정리해야할 함수 반환}} | 렌더링 이후 effect 발생. 렌더링 시점에 이미 DOM은 업데이트 되어있음.(componentDidMount,componentDidUpdate가 동시에 실행되는 것과 유사). clean-up 함수를 사용할 경우 이전 effect는 다음 effect 실행 전에 정리됨. |

---

### 정리가 필요한 effects

외부 데이터에 구독(subscription)을 설정해야 하는 경우와 같이 메모리 누수가 발생하지 않도록 정리(clean-up)가 필요한 경우

<u>class 컴포넌트</u>

- componentDidMount: 구독(subscription) 설정
- componentWillUnmount: 구독 설정 된 내용을 정리(clean-up)

```javascript
class FriendStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }
  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline,
    });
  }

  render() {
    if (this.state.isOnline === null) {
      return "Loading...";
    }
    return this.state.isOnline ? "Online" : "Offline";
  }
}
```

<u>함수 컴포넌트</u>
위의 class 컴포넌트에서 componentDidMount(), componentWillUnmount()로 분리된 생명주기 메서드 내에 동일한 effect 관련 코드가 있다. 이처럼 subscribe와 unsubscribe는 일반적으로 밀접한 관련을 맺고 있기 때문에 함수형 컴포넌트에서 useEffect는 이 두 가지 설정을 class에서 처럼 분리하지 않고 함께 다룰 수 있도록 한다. **useEffect 내에서 함수를 반환하면 그 함수를 정리가 필요할 때 실행시키는 것이다.**

```javascript
import React, { useState, useEffect } from "react";

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // effect 이후에 어떻게 정리(clean-up)할 것인지 표시
    // cleanup이라는 이름 대신 다른 변수, 또는 화살표 함수를 사용하여도 무방함.
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
```

> 리액트가 정리하는 시점은 언제?
> 컴포넌트가 마운트해제될 때. 하지만 effect는 렌더링이 실행될 때마다 실행되므로 다음 차례의 effect를 실행하기 전에 이전의 렌더링에서 파생된 effect도 정리한다.

---

## effect 사용 팁

1. <u>Multiple Effect</u>
   서로 관련이 없는 로직을 분리하여 관련 있는 로직끼리 묶어서 결합할 수 있다. 이렇게 하면 코드가 훨씬 간결해지고, 코드가 하는 일이 무엇인지에 따라 관련있는 것들을 묶어서 로직을 구성하므로 가독성이 좋아진다. **주의할 점은 여러 effect를 사용할 경우, 지정된 순서에 맞춰 적용한다는 것이다.**

|        관심사        |                  class 컴포넌트                  |     함수형 컴포넌트      |
| :------------------: | :----------------------------------------------: | :----------------------: |
| document.title 설정  |  componentDidMount, componentDidUpdate에서 설정  |    useEffect1️⃣에 설정    |
| subscribe/unsubcribe | componentDidMount, componentWillUnmount에서 설정 |    useEffect2️⃣에 설정    |
|       based on       |                 생명주기 메서드                  | 코드가 무엇을 수행하는가 |

```javascript
//class 컴포넌트
class FriendStatusWithCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, isOnline: null };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentDidMount() {
    document.title = `You clicked ${this.state.count} times`;
    ChatAPI.subscribeToFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  componentDidUpdate() {
    document.title = `You clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    ChatAPI.unsubscribeFromFriendStatus(
      this.props.friend.id,
      this.handleStatusChange
    );
  }

  handleStatusChange(status) {
    this.setState({
      isOnline: status.isOnline
    });
  }
  // ...
```

```javascript
//함수형 컴포넌트
function FriendStatusWithCounter(props) {
  const [count, setCount] = useState(0);
  //useEffect1️⃣
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const [isOnline, setIsOnline] = useState(null);
  //useEffect2️⃣
  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
  // ...
}
```

2.  effect가 업데이트 시마다 실행되는 이유는?

<u>class 컴포넌트</u>
class 컴포넌트에서는 effect 정리가 componentWillUnmount()를 사용하여 마운트가 해제될 때만 실행된다. 그런데 class 컴포넌트에서 componentDidUpdate를 제대로 수행하지 않을 경우 componentWillUnmount()가 제대로 수행되지 않는 버그가 발생한다. 위의 FriendStatusWithCounter 예시에서 만약 componentDidUpdate()가 없었다고 가정한다면 마운트 이후 업데이트가 발생했을 때 이에 대한 처리를 할 로직이 없는 채 마운트 해제 시 subscribe가 해제된다. friend prop에 변화가 없다면 별 문제 없을 수 있지만 **만약 friend prop이 화면에 표시되어 있는 동안 변한다면 friend의 subscribe를 해지하지 못하고 계속해서 화면에 표시하게 된다. 마운트 해제가 일어나더라도 unsubscribe 정확한 타겟 아이디에 수행하지 못하고 잘못된 id에 대해 수행하게 될 수도 있다.** 결론적으로 이러한 버그를 발생시키지 않으려면 반드시 componentDidUpdate()를 사용해야 한다는 것이다.

<u>함수형 컴포넌트의 useEffect</u>
**useEffect는 class에서처럼 생명주기 메서드에 의해 업데이트가 발생하는 것이 아니라 렌더링 될 때마다 실행된다.** 즉 componentDidUpdate()와 같은 별도의 메서드를 사용하지 않아도 렌더링 될 때마다 업데이트가 실행되고, componentWillUnmount()를 사용하지 않아도 return에 함수를 반환하면 다음의 effect를 적용하기 이전의 effect는 정리된다.

3.  렌더링 이후 effect를 정리하는 것은 때때로 성능 저하를 발생시키는 경우가 있다. 이를 개선하려면?

**class 컴포넌트: componentDidUpdate에서 prevProps나 prevState와의 비교를 통해 문제 해결**

```javascript
componentDidUpdate(prevProps, prevState) {
  // prevProps와 prevState가 같지 않을 때는 다른 값이므로 업데이트
  if (prevState.count !== this.state.count) {
    document.title = `You clicked ${this.state.count} times`;
  }
}
```

**함수형 컴포넌트: dependency array**
useEffect의 두 번째 인수에 배열을 넘겨서 특정 값이 변경되지 않을 경우 건너뛰도록 설정한다. 아래와 같이 사용한다면 `count`의 값에 변화가 있을 때만 effect가 실행되고, 그렇지 않을 경우 건너뛴다. **단 두 번째 인수의 배열은 컴포넌트 범위 내에서 바뀌는 값들과 effect에 의해 사용되는 값들을 모두 포함한다. 즉 useEffect 내부에서 의존성을 가지고 있는 값들은 모두 이 배열에 포함되어야 하므로 이를 의존성 배열(dependency array)라 한다.**

```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // count가 바뀔 때만 effect를 재실행
```

- [] : 배열에 아무것도 넘기지 않으면 마운트 될 때 `단 한 번만 실행`된다. 업데이트 시에 호출되지 않는다.
  React에게 props나 state에서 가져온 어떤 값에도 의존하지 않으므로 effect를 다시 실행할 필요가 없다는 것을 알려주기 때문이다. 이렇게 하면 props와 state는 항상 초기값을 가진다.
- \[value]: 배열 안에 특정 값이 있으면 이 값이 설정되거나 바뀔 때마다 effect가 재실행된다. useEffect 내부에서 사용하는 state, props, 함수 등이 있다면 반드시 이 배열 안에 넣어줘야 한다. 민약 의존성을 지닌 값들이 있는데 이 deps 안에 넣는 것을 생략하는 경우 useEffect 에 등록한 함수가 실행 될 때 최신 props 또는 상태를 가르키지 않게 된다.

---

_References_
[Using the Effect Hook](https://ko.reactjs.org/docs/hooks-effect.html)
[Hook API 참고서](https://ko.reactjs.org/docs/hooks-reference.html)
