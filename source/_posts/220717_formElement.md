---
title: 제어 컴포넌트 vs 비제어 컴포넌트
date: 2022-07-17
tags:
---

HTML에서 `<input>, <textarea>, <select>`와 같은 form 엘리먼트들은 자체적으로 내부 상태와 user의 입력값에 따른 내부 상태를 가진다. 그런데 리액트에서 변경가능한 state는 컴포넌트의 state로 관리되고, setState()를 통해서 업데이트하는 방식을 취한다.

```jsx
<form>
  <label>
    Name:
    <input type='text' name='name' />
  </label>
  <input type='submit' value='Submit' />
</form>
```

위의 코드는 name의 입력을 받아서 사용자가 폼을 제출하면 새로운 페이지로 이동하는 기본 HTML 동작을 수행한다. 리액트에서도 동일한 엘리먼트가 제공되기 때문에 동일한 방법의 JSX로 작성해서 사용하면 된다. 다만 폼의 제출을 처리하고 사용자가 폼에 입력한 데이터에 접근할 수 있는 자바스크립트 기능(함수)이 있으면 편리하다. 이를 위한 표준 방식이 `제어 컴포넌트`이다. 리액트에서 폼을 처리하는 방식은 `제어 컴포넌트`와 `비제어 컴포넌트` 두 가지 방식이 있다.

---

## 제어 컴포넌트

**폼 값을 DOM이 아니라 리액트로 관리하는 방식이다.** 이 방법을 사용하면 ref와 같은 참조를 사용할 필요가 없고, 명령형 코드를 사용할 필요도 없다.즉 리액트가 폼의 상태를 모두 제어하는 것이다.이러한 제어 컴포넌트가 표준 방식이라 일컬어지는 이유는 리액트 어플리케이션에서 발생하는 어떤 데이터의 변화도 `single soure of truth`를 지향하기 때문이다.

```jsx
import { useState } from 'react';

const NameForm = () => {
  const [state, setState] = useState('');

  const handleChange = (e) => {
    setState(e.target.value);
  };

  const handleSubmit = (e) => {
    alert('A name was submitted: ' + state);
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type='text' value={state} onChange={handleChange} />
      </label>
      <input type='submit' value='Submit' />
    </form>
  );
};

export default NameForm;
```

위의 예제는 폼이 제출될 때 이름을 기록하는 코드이다. 위와 같이 사용자의 입력을 리액트의 state를 활용해서 관리하고 setState()를 통해 업데이트하는 방식을 통해서 `single soure of truth`로 만들게 되면 폼을 렌더하는 리액트 컴포넌트는 폼에 발생하는 사용자 입력값을 제어할 수 있게 된다. 즉 name의 value 어트리뷰트는 form 엘리먼트에 의해 설정되기 때문에 보여지는 value는 항상 useState로 설정한 state가 되고, 이 state를 업데이트 하기 위해 사용자가 입력하는 모든 입력에서 handleChange가 동작하기 때문에 사용자가 입력할 때 보여지는 value가 업데이트 된다. 이렇게 input의 값은 항상 리액트의 state에 의해 결정되고, 리액트에 의해서 값이 제어되는 폼 엘리먼트를 제어 컴포넌트라고 한다. _다만 state가 변경될 때마다 리렌더링이 발생되는 리액트의 특성상 제어가 제어 컴포넌트는 여러번 재 렌더링 된다._

## 비제어 컴포넌트

제어 컴포넌트에서 폼 데이터가 리액트 컴포넌트에서 제어된 것과 달리 **DOM 자체에서 폼 데이터가 이루어지는 방식이다.** 비제어 방식으로 컴포넌트를 작성하려면 모든 state의 업데이트에 대해 이벤트 핸들러를 작성하는 대신 **ref를 사용해서 직접 DOM에 접근할 수 있다.** ref는 참조라고 불리는데 리액트에서 컴포넌트의 생명주기 값을 저장하는 객체이다. 이 참조는 useRef라는 훅을 통해 사용가능하다.

```jsx
import React, { useRef } from 'react';

export default function AddColorForm({ onNewColor = (f) => f }) {
  const txtTitle = useRef();
  const hexColor = useRef();

  const submit = (e) => {
    e.preventDefault();
    const title = txtTitle.current.value;
    const color = hexColor.current.value;
    onNewColor(title, color);
    txtTitle.current.value = '';
    hexColor.current.value = '';
  };

  return (
    <form onSubmit={submit}>
      <input ref={txtTitle} type='text' placeholder='color title...' required />
      <input ref={hexColor} type='color' required />
      <button>ADD</button>
    </form>
  );
}
```

위의 코드는 사용자로부터 색의 title 값과 색상값을 입력받아서 ADD 버튼 클릭시 폼이 제출되도록 하는 코드이다. 여기서 txtTitle과 hexColor에 각각 useRef를 통한 `참조`를 만들어주었다. 이렇게 참조를 걸어주게 되면 참조의 값을 직접 JSX에서 설정할 수 있게 된다. 이를 통해 DOM 엘리먼트를 직접 참조하는 참조 객체에 대한 current 필드를 생성하고, 이 필드를 통해서 DOM엘리먼트에 접근하여 엘리먼트의 값을 얻을 수 있다. 그리고 ADD 버튼을 사용자가 클릭하면 submit 함수를 호출한다.

submit이 하는 일은 먼저 e.preventDefault()를 통해 폼 요소가 기본적으로 가지고 있는 submit 동작에서 서버에 폼을 보내고자 하는 동작을 막는 것이다. 그 다음으로는 ref의 참조를 통해 폼 엘리먼트의 현재 값을 얻어온다. 그리고 이를 onNewColor()를 통해 부모에게 전달한다. 그리고 초기화를 위해 두 입력 값 txtTitle, hexColor에 대한 value를 `''`로 설정한다. 이는 DOM 노드의 값을 직접 변경한 것이다. 이렇게 작성하게 되면 DOM을 통해 폼 값을 저장한 것이므로 명령형 코드를 작성하였고, 제어되지 않는 컴포넌트를 작성한 것이다. 이런 비제어 컴포넌트는 리액트 외부에서 폼에 접근하여 입력 값을 처리하고 싶은 경우에 사용될 수 있다.

---

## 제어 컴포넌트 vs 비제어 컴포넌트

앞선 예시에서 리액트에서 폼을 다룰 때 제어 컴포넌트와 비제어 컴포넌트의 두 가지 방식으로 처리할 수 있다고 하였다. 제어 컴포넌트는 리액트에 의해서 사용자가 입력한 값이 제어되는 경우를 말한다. 비제어 컴포넌트는 form에 입력한 값이 리액트에서 의해서 작동하는 것이 아닌 리액트 외부에서 작동하는 것처럼 작동한다. 즉 사용자가 입력한 값이 리엑트의 state를 통해 state를 유지하면서 업데이트되는 방식과 같은 별도의 처리가 없어도 엘리먼트에 반영되는 것이다. 일반적으로 제어 컴포넌트를 사용하는 것이 표준방식이라 하는데 그렇다고 비제어 컴포넌트가 나쁘다거나 사용하면 안된다는 것은 아니다. 상황에 따라서 적절한 형테로 컴포넌트를 작성할 수 있다. 어떤 경우에 제어 컴포넌트 또는 비제어 컴포넌트를 써야하는지 정리해보면 다음과 같다.

### 비제어 컴포넌트

> 필요할 때 필드에서 값을 가져와야 한다. (pull the value from field)

```jsx
class Form extends Component {
  handleSubmitClick = () => {
    const name = this._name.value;
    // do something with `name`
  };

  render() {
    return (
      <div>
        <input type='text' ref={(input) => (this._name = input)} />
        <button onClick={this.handleSubmitClick}>Sign up</button>
      </div>
    );
  }
}
```

입력한 값을 제출할 때 ref를 통해 입력한 값을 가져올 수 있다. 위 코드에서는 값을 제출할 때 onClick 핸들러에서 입력한 값이 무엇인지를 얻을 수 있었다. 이는 기존 HTML에서 폼을 제출하는 방식과 유사하고, 가장 간단하게 폼을 구성하는 방식이다.

### 제어 컴포넌트

> 값을 밀어넣어 컴포넌트가 전달받은 값으로 변경된다. (kind of 'pushes' the value changes to the form component.)

제어된 방식에서 입력값은 prop과 이 값을 변경하기 위한 콜백을 받는다. 앞선 예제보다 보다 React적인 방법이라고 말할 수 있다. 입력한 값은 어떠한 방식으로 작성되던 반드시 `state`로 어딘가에 있어야 한다. `state`는 다른 컴포넌트의 state나 Redux와 같이 별도의 store에 저장되어 있을 수 있는데, 일반적으로는 아래와 같이 리액트의 state에 그 값을 저장한다.

```jsx
class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

위 코드에서 새로운 문자를 입력할 때마다 handleNameChange가 호출된다. 이 함수는 input에 입력된 새로운 값을 가져와서 state의 값으로 set한다. 초기값이 ''이기 때문에 빈 문자열로 시작하지만 만약 a를 입력하면 handleNameChange를 호출하고, setState를 호출해서 입력된 값을 전달한다. 그러면 이 input은 a로 값이 바뀌었으므로 리렌더링된다. 이 상태에서 b를 입력하게 되면 input에 입력된 ab라는 값을 얻고, state의 값을 ab로 set한다. 그리고 input은 리렌더링 되고 이제 값은 a가 아닌 ab가 된다. 즉 form 컴포넌트는 명시적으로 값을 요청할 필요없이 항상 input의 현재값을 가지게 된다.

이 말의 의미는 데이터(state)와 UI(input)이 항상 동기화된다는 의미이다. state는 input에게 값을 제공하고, input은 form에 현재 값은 변경하도록 요청한다. 이 말은 즉 form 컴포넌트가 input의 변경사항에 대해 즉시 응답할 수 있다는 것이다. 예를 들어 validation과 같은 즉각 피드백, 모든 필드에 유효한 데이터가 없으면 버튼 비활성화, 신용 카드 번호와 같은 특정 입력 시행과 같은 상황이다.

여러가지 상황을 고려해서 제어 컴포넌트를 사용할지, 비제어 컴포넌트를 사용할지에 대해 결정할 수 있다. 만약 UI 피드백이 단순하다면 비제어 컴포넌트 방식이 더 괜찮을 수 있다. 그리고, 비제어 컴포넌트 방식을 사용했더라도 언제든지 제어 컴포넌트 방식으로 마이그레이션 할 수 있는 것이다.

| 특징                           | 비제어 | 제어 |
| ------------------------------ | ------ | ---- |
| 일회성 값 검색(e.g. submit)    | O      | O    |
| 제출 시 validation             | O      | O    |
| 즉각적인 field validation      | X      | O    |
| 조건에 따른 제출 버튼 비활성화 | X      | O    |
| 입력 형식의 강제               | X      | O    |
| 하나의 데이터에 대한 여러 입력 | X      | O    |
| 동적 입력                      | X      | O    |

---

_References_

[uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html#gatsby-focus-wrapper)
[Controlled Components](https://reactjs.org/docs/forms.html#controlled-components)
[Controlled vs. Uncontrolled Components](https://reactjs.org/docs/glossary.html#controlled-vs-uncontrolled-components)
[Controlled and uncontrolled form inputs in React don't have to be complicated](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)
[러닝 리액트 2판](알렉스 뱅크스, 이브 포셀로 지음)
