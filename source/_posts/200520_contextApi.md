---
title: Context API
date: 2020-05-20 11:00
tags:
---

## Context API가 필요한 이유

React의 데이터는 부모에서 자식으로 props를 통해 전달되는데, 자식 컴포넌트들이 늘어나면 전달해야하는 브릿지(중간에 의미없이 props만 전달하는 컴포넌트)가 늘어난다.

Context API를 사용하면 네스팅 컴포넌트 트리(부모->자식->자식->자식...의 구조)를 타고 props를 명시적으로 넘겨주지 않아도 컴포넌트 간에 값을 공유하도록 할 수 있다. 이렇게 하면 멀리 떨어진 컴포넌트에게 상태 또는 상태관리 함수를 보낼 수 있다. dispatch를 이용하여 전달한다.

> context API: React 컴포넌트 트리 안에서 전역적(global)이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법. 선호 로케일, 테마, 데이터 캐시, 현재 로그인한 유저, 선호하는 언어 등을 관리할 때 사용.

## 언제 필요한가?

다양한 레벨에 네스틴된 많은 컴포넌트에게 데이터를 전달할 때. _단, context는 컴포넌트를 그룹화한다는 의미이기 때문에 재사용이 어려워지므로 꼭 필요할 때만 쓰도록 한다._

## API

1. React.CreateContext

```javascript
const MyContext = React.createContext(defaultValue);
```

context 객체를 만든다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 `Provider`로부터 현재값을 읽는다.

- defaultValue: 트리 안에서 적절한 `Provider`를 찾지 못했을 때 쓰임. `Provider`를 통해 `undefined`를 값으로 보내도 구독 컴포넌트들이 `defaultValue`를 읽지 않음.

2. Context.Provider

```javascript
//상위 컴포넌트에서의 정의
<MyContext.Provider value={/* 어떤 값 */}>
  {하위 컴포넌트}
</MyContext.Provider>
```

- Provider: Context 오브젝트에 포함된 React컴포넌트로 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.

Context 변경 사항을 자손들에게 제공한다. Provider 의 Value는 하위의 모든 Consumer 에서 사용할 수 있으며, Provider 하위의 모든 Consumer 는 Provider 의 value가 변경 될 때마다 리렌더링 된다. Privider가 받은 value를 하위 컴포넌트에 넘길 때, 값을 전달 받을 수 있는 컴포넌트의 수 제한은 없다.

3. Context.Consumer

```javascript
//하위 컴포넌트에서 정의
<MyContext.Consumer>{(value) =>
//render something based on the context value
}
</MyContext.Consumer>
```

MyContext Provide의 Value의 변경 사항을 구독하며, Context 에서 가장 가까운 Provider 의 Value 를 참조한다.

함수 컴포넌트 안에서 context를 읽기 위해 쓸 수 있고, Context.Consumer의 자식은 `함수`여야 한다. 이 함수는 context의 현재값을 받고 React 노드를 반환한다.

4. Hook의 useContext

```javascript
const value = useContext(MyContext);
```

Hook의 useContext로 Context 객체의 value를 가져올 수 있다.

---

_Reference_
[React](https://ko.reactjs.org/docs/context.html#gatsby-focus-wrapper)
[fastCampusDocument](https://glenncy.s3.ap-northeast-2.amazonaws.com/lecture/reactjs/chapter10.html)
