---
title: React 인스턴스와 클래스
date: 2020-05-07 13:00
tags:
---

## 컴포넌트

리액트는 컴포넌트라고 불리는 코드의 파편을 이용하여 복잡한 UI를 구성하도록 한다. component는 view라고도 하며 소스코드의 일부이고, html을 생성하는 JS 함수의 모음집이라고 할 수 있다.

## 함수 컴포넌트와 클래스 컴포넌트

두 가지 유형의 컴포넌트는 모두 데이터(props) 객체 인자를 받은 후 React 엘리먼트를 반환하는 유효한 컴포넌트로 유형은 다르지만 동일하다.

```javascript
// 함수 컴포넌트
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

// 클래스 컴포넌트
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

```javascript
class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
          <li>Oculus</li>
        </ul>
      </div>
    );
  }
}
// 사용 예제: <ShoppingList name="Mark" />
```

위와 같이 컴포넌트를 사용하여 React에게 화면에 표현하고 싶은 것이 무엇인지 알려준다. 그리고 데이터가 변경될 때 컴포넌트를 효율적으로 업데이트하고 렌더링한다.
위의 예제에서 shoppingList는 React 컴포넌트 클래스 또는 React 컴포넌트 타입이라고 한다. 개별 컴포넌트는 props라는 매개변수를 받아오고 render함수를 통해 표시할 뷰 계층 구조를 반환한다.

아래 예제에서 App은 React 컴포넌트 클래스 또는 React 컴포넌트 타입이라고 하고, 인스턴스가 아니다.
이 함수는 팩토리 형태이다. 실제 DOM에 렌더링되는 컴포넌트의 인스턴스들을 만든다.

```javascript
const App = function () {
  return <div>Hi!</div>;
};
```

```javascript
// 바벨 이용
"use strict";

var App = function App() {
  return /*#__PURE__*/ React.createElement("div", null, "Hi!");
};

/*#__PURE__*/
React.createElement("div", null);
```

`<div></div>`처럼 JSX태그를 작성하고, 컴포넌트 이름을 넣을 때마다 실제 요소를 생성하는 `createElement`함수를 부른다. JSX를 이용하여 React의 구조를 작성하면 구문을 빌드하는 시점에 `React.createElement('div')` 이런 식으로 변화된다는 의미이다.

즉 컴포넌트 이름은 컴포넌트 클래스, JSX안에 사용 되는 이름은 컴포넌트 인스턴스가 된다. 이렇게 JSX컴포넌트와 인스턴스 사이를 엮는 것이다.

```javascript
// DOM에 렌더링하기 전에 컴포넌트를 인스턴스화해야한다.->JSX를 이용.
ReactDOM.render(<App />);

// ReactDOM.render(App);
// 이렇게 전달하면 '클래스'를 전달한 것.
```

---

_Reference_
[React](https://ko.reactjs.org/tutorial/tutorial.html#help-im-stuck)
[Modern React with Redux](https://www.udemy.com/course/react-redux-korean/learn/lecture/6385364#overview)
