---
title: CSS CASCADE
date: 2020-07-23 15:00
tags:
---

## WHAT HAPPENS TO CSS WHEN WE LOAD UP A WEBPAGE?

1. LOAD HTML
   user가 웹페이지를 오픈했을 때, html은 initial html file을 load하는 starting point가 된다.

2. parse HTML
   이 단계에서 html head를 포함한 stylesheet를 찾아서 load하고 parse하기 시작한다. 즉 html 코드가 load되면 parse하기 시작하고, 코드를 line by line으로 decode한다. 그리고 css를 load하고 parse 한다.

   - LOAD CSS & PARSE CSS
     - cascade: 충돌하는 css 선언을 해결한다. (resolving conflicting css declaractions)
     - process final css

3. RENDER TREE = DOM + CSSOM
   위의 과정을 거쳐 브라우저는 `DOM`을 build하고 전체 web document가 생성된다.
   - DOM(Document Object Model): decoding 된 전체 html code가 저장되는 곳이다.
   - CSSOM(Css Object Model): css parse가 끝나면 final css가 tree-like structure인 이 곳에 저장된다.

## CSS PARSING PHASE

```css
.my-class {
  color: blue;
  font-size: 20px;
}
```

- selector: .my-class 부분
- Declaration Block: css rules. `color: blue;`와 같이 `Declaration`으로 구성되어 있다. `Declaration`은 `Property`인 `color`와 `Declared value`인 `20px`로 구성되어 있다.

## CASCADE

서로 다른 stylesheets(different css sources: author, user, browser(user agent))와 css rules와 declarations의 충돌을 해결하고 결합하는 과정으로 어떤 속성이 가중치가 있는지 체크하는 것이고, 특정 element에는 1가지 이상의 rule이 적용된다. cascade를 체크할 때 가장 중요한 것은 css rule이 어떠한 source를 기반으로 하는 것인지와 관련되어 있다.

### different css sources

- User-Agent: 브라우저가 elemets에 제공하는 기본 스타일이며, 브라우저 마다 스타일이 다소 다르게 보여질 수 있다. css resets를 사용하여 user-agent styles를 override하는 방법을 쓰는 것이 이러한 차이를 상쇄시키는 방법 중 하나이다.

- User: 브라우저 사용자에 의해 정의되고 제어된다. 보통 style을 override하거나 웹사이트 접근성을 추가하기 위한 것으로, 모든 사람이 가지고 있는 것은 아니다.

- Author: HTML document에 선언된 css를 말한다. 일반적으로 프론트엔드 개발자가 작성하여 제어할 수 있는 것을 말한다.

_그런데 css rules와 declarations의 충돌을 어떻게 해결한다는 것일까?_

> which one takes precedence?
> `importance(weight)`, `specificity`, `source order`

- importance(weight): 선언된 위치(css source)에 근거하여 각 선언(declaration)에 서로 다른 중요성을 부여하는 것으로 시작한다.

```
1. user `!important` declarations
2. author `!important` declarations
3. author declarations
4. user declarations
5. default browser declarations
```

그런데 만약 importance가 모두 같다면?

- specificity: 선언된 selector의 specificity를 비교하고 계산한다.

```
1. inline styles
2. IDs
3. classes, pseudo-classes, attribute
4. elements, pseudo-elements
```

우선순위인 1번부터 차례로 다음과 같이 `(inline, IDs, classes, elements)`의 순서로 비교한다. 만약 비교한 결과가 (0,0,0,1), (0,1,0,1)이라면 전자가 specificity가 더 높은 것이다.

_그런데 만약 specificity가 모두 동일하다면?_

- source order: 코드의 마지막 선언은 다른 모든 선언을 override하고 적용된다. 만약 3rd-party stylesheets를 사용한다면 author stylesheet는 늘 가장 마지막에 위치해야한다.

내가 React project를 했을 때의 경험을 예시로 들어보겠다. 당시 SlidingPane이라는 라이브러리를 사용하여 팝업창을 구성했는데, 기본 설정된 배경색을 다른 색으로 변경했어야 했다. 그러나 이 라이브러리는 몹시 간결한 것이어서 그러한 변경에 대한 방법이 따로 설명되어 있지 않았다. 그래서 선택한 방법은 css파일에 변경해야 할 부분을 작성한 후 원래 있던 코드를 `background: #D9DBE0;`로 작성한 후 override하는 것이다.

```
<!-- 원래 코드: react-sliding-pane.css -->
.slide-pane {
  display: flex;
  flex-direction: column;
  background: #fff;
  min-width: 100px;
  height: 100%;
  box-shadow: 0 8px 8px rgba(0,0,0,0.5);
  transition: transform 0.5s;
  will-change: transform;
}
```

```
<!-- 내가 작성한 author 코드: Cart.css -->
.slide-pane {
  display: flex;
  flex-direction: column;
  background:  #D9DBE0;
  min-width: 100px;
  height: 100%;
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.5s;
  z-index: 80;
  will-change: transform;
  position: relative;
}
```

이렇게 작성 후 react로 작성된 Cart.js 파일의 상단에서 다음과 같은 순서로 import한다.

> import 'react-sliding-pane/dist/react-sliding-pane.css';
> import './Cart.css';

이렇게 하면 마지막에 import 된 `Cart.css`가 원래 존재하던 파일을 override하게 되기 때문에 배경색이 #fff에서 내가 설정한 #D9DBE0으로 변경된다.

## CSS Selector Specificity

CSS Selector Specificity를 비교하는 과정을 예시를 통해 보다 자세히 알아보겠다.

```html
<nav id="nav">
  <div class="pull-right">
    <a class="button button-danger" href="link.html">Don't click here!</a>
  </div>
</nav>
```

예시에서 `.button`과 `a`는 specificity가 낮은 편이기 때문에 다른 속성에서 우선순위에 밀려 배경색이 나타나지 않는다. 하지만 specificity가 낮더라도 `!important`를 선언하면 다른 어떤 속성보다도 우선순위를 갖고, 즉각 배경색이 버튼에 표시된다. 하지만 `!important`는 최소 한 번 사용하거나 되도록 쓰지 않는 것이 권장된다.

```css
body {
  padding: 50px;
}

/* 클래스 1개. low specificity */
.button {
  font-size: 20px;
  color: white;
  background-color: blue;
}

/* 가장 specificity가 낮음 */
a {
  background-color: purple;
}

/* hover를 제외하면 이 선언이 세가지 중에 가장 우선순위가 높다. */
#nav div.pull-right a.button {
  background-color: orangered;
}

#nav a.button:hover {
  background-color: yellow;
}
```

위의 코드에서 button에 마우스를 hover하면 색깔이 yellow로 바껴야 하지만, 아무런 변화가 없다. 그 이유는 pseudo class인 hover는 specificity에서 1으로 카운트되기 때문이다. 그러나 `#nav div.pull-right a.button` 이 경우 specificity는 id 1개, class 2개를 가지고 있다. `#nav a.button:hover`도 사실은 id 1개, class 2개를 가지고 있는 것인데, `hover`는 _class가 아니라 class인 것으로 여기는 pseudo class이다._ 따라서 전자는 2개의 elements를 가지고 있고, 후자는 1개의 elements를 가지고 있다. 결과적으로 `#nav div.pull-right a.button`가 훨씬 specificity가 높은 것이다. 따라서 hover는 적용되지 않는다. 만약 hover했을 때 색깔이 변경되도록 설정하고 싶다면 아래와 같이 코드를 바꾸어야 한다.

```css
#nav div.pull-right a.button {
  background-color: orangered;
}

#nav div.pull-right a.button:hover {
  background-color: green;
}

#nav a.button:hover {
  background-color: yellow;
}
```

이렇게 코드를 작성하면 `#nav div.pull-right a.button`에 pesudo class인 `hover`가 추가되어 `hover`가 붙지 않은 elements와 비교했을 때 specificity가 높아진다. 따라서 hover했을 때 색깔이 green으로 바뀌는 것이다.

---

_References_
[How CSS works: Understanding the cascade](https://blog.logrocket.com/how-css-works-understanding-the-cascade-d181cd89a4d8/)
[Advanced css and sass](https://www.udemy.com/course/advanced-css-and-sass/learn/lecture/8274402#content)
