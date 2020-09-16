---
title: React Hook
date: 2020-08-26
tags:
---

## hook을 도입한 동기

![react-lifecycle-methods-diagram](https://i.imgur.com/cNfpEph.png)
<a href='https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/'>출처: react-lifecycle-methods-diagram</a>

- 리액트는 코드 재사용에 대한 논의가 많았다. 컴포지션 -> 컴포넌트의 합성을 통한 재사용 희망
- 클래스 컴포넌트가 가진 단점이 많았다. 보일러 플레이트 너무 많기 때문이다.
- 라이프 사이클 세부적으로 관리해야하는 것이 많았다.
- 컴포넌트 재사용도 쉽지 않았다.

1. **컴포넌트 사이에서 상태와 관련된 로직을 재사용하기 어려움**
   class 컴포넌트가 주류로 사용되던 시기에 React 컴포넌트를 재사용하기 쉬울 것이라고 생각했으나 하나의 컴포넌트 안에 UI와 기능과 관련된 로직들이 함께 섞여있으니 재사용이 어려웠다. 그래서
   `Presentational 컴포넌트와 Container 컴포넌트`패턴을 사용하였는데 간략히 설명하자면 Presentational 컴포넌트에는 UI관련 로직을 담고, Container 컴포넌트에서는 기능과 관련된 로직을 담는 것이다. 그런데 Container 컴포넌트는 Presentational 컴포넌트와 달리 기본적인 UI 뿐 아니라 state나 effect 또는 특정 기능을 위한 로직 등을 가지고 있기 떄문에 이 패턴 역시 컴포넌트의 재사용이 어렵다.

   그래서 render props, HOC를 통해 컴포넌트를 재구성하여 재사용을 쉽게 하려고 했지만 개발자 도구를 열면 `래퍼 지옥(wrapper hell)`이 발생하는 문제가 있었다. 이는 코드의 depth를 깊어지게 할 뿐 아니라 render props, HOC 등의 여러가지 로직이 여기저기 사용되면서 코드가 복잡해지고 추적이 어려워진다. 이렇게 되면 테스트와 재사용이 어려워진다.

2. **복잡하고 중복되는 로직**
   아래의 class 컴포넌트에서는 데이터를 가져오기, subscibe/unsubscribe를 수행, state 관리 등 다양한 로직이 life cycle 메서드 내에 흩어져 있다. 게다가 같은 로직을 각각의 생명주기 메서드에서 중복하여 사용하기도 한다. 이렇게 복잡하고 중복되는 로직이 많은 컴포넌트는 이해하기 어렵고, 가독성이 떨어지는 복잡한 코드를 만들어낸다.

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

3. **class의 this가 의미하는 것은?**
   javascript의 this는 다른 언어가 의미하는 this와 다르기 때문에 혼란을 주고, class 컴포넌트 내부에서 this를 바인딩 할 때 그 this가 무엇을 가르키는 지에 대해 실수할 가능성이 높다. 그리고 이 this를 바인딩하기 위해 코드 곳곳에 this 키워드를 사용해야한다. 이러한 class의 문제가 props, state, 그리고 top-down 데이터 흐름을 읽기 어렵게 한다.

### 결론

이처럼 class 컴포넌트가 가지고 있는 문제점을 해결하면서 더욱 간결하고 명료한 React 사용을 위해 hook이 나오게 된다. **useEffect, useState, custum hook 등의 hook은 컴포넌트 내에 class 없이 React의 기능을 사용할 수 있도록 한다.**

---

## hook이란?

함수 컴포넌트에서 `React state와 생명주기 기능(lifecycle features)을 연동(hook into)`할 수 있게 해주는 함수

## hook 사용 규칙

1. 최상위(at the top level)에서만 Hook을 호출해야 함. 반복문, 조건문, 중첩된 함수 내에서 Hook 실행 금지
   최상위에서 호출해야 컴포넌트가 렌더링 될 때마다 동일한 순서로 hook이 호출되는 것이 보장됨.
2. 일반 JavaScript 함수 내에서 호출 금지. 오직 React 함수 컴포넌트 내에서 또는 custom hook 내에서만 Hook을 호출.

> hook을 사용할 때는 반드시 위의 2가지 규칙을 지켜야 한다. 그 이유는 React가 hook이 호출되는 순서에 의존하기 때문이다.

```javascript
function Form() {
  //useState1️⃣
  // 1. name이라는 state 변수를 사용
  const [name, setName] = useState("Mary");

  //useEffect1️⃣
  // 2. Effect를 사용해 폼 데이터를 저장
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  //useState2️⃣
  // 3. surname이라는 state 변수를 사용
  const [surname, setSurname] = useState("Poppins");

  //useEffect2️⃣
  // 4. Effect를 사용해서 제목을 업데이트
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}
```

위와 같이 한 컴포넌트 안에서 여러 개의 useState와 useEffect를 사용할 때, React는 hook이 호출되는 순서에 따라서 실행된다. 따라서 Form 컴포넌트가 실행되면 `useState1️⃣(1) -> useEffect1️⃣(2) -> useState2️⃣(3) -> useEffect2️⃣(4)`의 순서로 차례대로 실행되며 동작한다. 하지만 만약 조건문을 사용하여 그 내부에서 useEffect1️⃣을 아래와 같이 사용하면 아래와 같이 에러가 발생한다.

> React Hook "useEffect" is called conditionally. React Hooks must be called in the exact same order in every component render react-hooks/rules-of-hooks

```javascript
function Form() {
  //useState1️⃣
  const [name, setName] = useState("Mary");

  //useEffect1️⃣ -> skip
  useEffect(function persistForm() {
    localStorage.setItem("formData", name);
  });

  //useState2️⃣
  const [surname, setSurname] = useState("Poppins");

  //useEffect2️⃣
  useEffect(function updateTitle() {
    document.title = name + " " + surname;
  });

  // ...
}
```

이와 같이 조건문 안에서 useEffect를 쓰면 첫 번째 렌더링에서 name은 Mary이기 때문에 if에 선언된 조건이 true가 되고, hook이 동작한다. 그러나 그 다음 렌더링에서는 사용자가 form을 제출한 후 초기화 되기 때문에 if의 조건이 `name === ""`가 되므로 false가 된다. **따라서 if 조건문 안에 있는 useEffect hook을 건너뛰게 된다.** 이렇게 되면 `useState1️⃣(1) -> useEffect1️⃣(2) -> useState2️⃣(3) -> useEffect2️⃣(4)`의 순서대로 hook이 실행되지 않는다. 따라서 `useState1️⃣(1) -> skip -> useState2️⃣(2) -> useEffect2️⃣(3)`으로 순서가 엉키게 된다. React는 hook이 호출되는 순서에 따라서 실행되므로 이렇게 순서대로 호출되지 않는 경우 에러가 발생하는 것이다.

---

_References_
[Hook 소개](https://ko.reactjs.org/docs/hooks-intro.html)
[Hook 개요](https://ko.reactjs.org/docs/hooks-overview.html)
[Hook 규칙](https://ko.reactjs.org/docs/hooks-rules.html)
[Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
