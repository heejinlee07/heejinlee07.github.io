---
title: pseudo-class vs pseudo-element
date: 2021-01-05
tags:
---

## pseudo-class

> 가상 클래스 또는 의사 클래스라고 한다.

```css
/* form */
selector:pseudo-class {
  property: value;
}
```

선택자에 추가하는 키워드. 선택한 요소가 특별한 상태를 만족할 때 변화를 주기 위해 사용한다. 예를 들어 `element:hover`를 사용하면 element에 마우스 포인터가 올라갈 때만 특정 변화가 발생한다. 아래와 같이 사용하면 버튼 요소에 사용자가 마우스를 올렸을 때만 글자 색상이 파란색으로 변경된다.

```css
button:hover {
  color: blue;
}
```

## 자주 쓰이는 pseudo-class

1.  LVHA
    **(:link — :visited — :hover — :active)**의 순서를 말하는데, *:active, :visited, :focus*는 실제 스타일링 할 때 보다는 예시로 자주 사용된다. 주의할 점은 `:active`는 자신보다 뒤에 위치하고, 동등한 명시성을 가진 **(:link, :hover, :visited)**를 덮어쓰기 때문에 가장 마지막에 배치되어야 한다.

    ```css
    a:link {
      color: blue;
    } /* 방문하지 않은 링크 */
    a:visited {
      color: purple;
    } /* 방문한 링크 */
    a:hover {
      background: yellow;
    } /* 마우스를 올린 링크 */
    a:active {
      color: red;
    } /* 활성화한 링크 */

    p:active {
      background: #eee;
    } /* 활성화한 문단 */
    ```

    - :active
      사용자가 활성화한 요소를 나타낸다. 마우스를 사용할 때, `활성`이란 마우스 버튼을 누르는 순간부터 떼는 시점까지를 의미한다. 보통 \<a\>,\<button\>과 함께 사용한다.
    - :hover
      사용자가 포인팅 장치를 사용하여 상호작용 중인 요소를 선택한다. :active가 마우스를 클릭하는 동안을 의미한다면 :hover는 마우스 포인터가 특정 요소에 올라가 있는 동안을 의미한다. 보통 사용자의 마우스 포인터(커서)가 요소 위에 올라가 있을 때 선택된다. **단, :hover는 터치스크린에서 활성화하지 않거나 터치한 직후에 또는 터치 이후 다른 요소를 터치하기 전까지 계속 활성화 할 수도 있어서 문제가 많다.** 이를 주의하여 제한적으로 hover 효과를 주거나 hover가 불가능한 장치에서도 콘텐츠 접근에 문제가 없도록 개발해야 한다.

2.  형제 요소 선택

    - :first-child
      형제 요소 중 첫 요소. 초기에는 부모가 있는 요소만 선택가능했으나 Selectors Level 4부터 제한이 사라졌다. 아래 예시에서 css를 다음과 같이 작성하면 원래 아무것도 선택되지 않았다. \<p\> 태그는 부모 요소가 아니기 때문이다. 그러나 지금은 선택이 가능하다.
    - :nth-child
      형제 사이에서의 순서에 따라 요소를 선택한다. `nth-child(1)`는 형제 요소 중 첫 번째 요소를 선택하는 것이다.
    - :last-child
      형제 요소 중 가장 마지막 요소. \<div\> 태그가 여러 개 있다고 가정할 때, 가장 마지막 \<div\>에게만 `margin-bottom: 10px;`을 주고 싶다면 `div:last-child:`의 형태로 사용한다. 반대로 모든 \<div\>에 동일하게 `margin-bottom: 10px;`을 주되, 가장 마지막 \<div\>에는 별도의 margin을 주고 싶지 않다면 `div:not:last-child`와 같이 사용할 수 있다.

```html
<div />
<p>This text is selected!</p>
<p>This text isn't selected.</p>
```

```css
div p:first-child {
  color: red;
}

div p:nth-child(1) {
  color: red;
}
```

---

## pseudo-element

> 의사 요소, 또는 가상 요소라 한다.

```css
/* form */
selector::pseudo-element {
  property: value;
}
```

선택자에 추가하는 키워드. 선택한 요소의 일부분에만 스타일을 입힐 수 있다. 이때 하나의 선택자에는 하나의 의사 요소만 사용 가능하다. 예를 들어 `::first-child`를 사용하면 문단 첫 줄의 글씨체만 바꿀 수 있다.

```css
/* The first line of every <p> element. */
p::first-line {
  color: blue;
  text-transform: uppercase;
}
```

## pseudo-class vs pseudo-element

1. 규칙
   의사 클래스는 `(:)`를 사용하고, 의사 요소는 `(::)`를 사용한다. 의사 클래스는 `특정 상태`에 스타일을 적용할 때 사용하고, 의사 요소는 `특정 부분`에 스타일을 적용할 때 사용한다. 즉 의사 클래스는 사용자가 마우스를 클릭하거나 마우스 커서를 특정 요소 위에 올려두었을 때의 `특정 상태`에 이르렀을 때 변화를 주기 위해 사용하고, 의사 요소는 아래와 같이 특정 요소의 앞이나 뒤에 장식 요소를 추가할 수 있다. 보통 `content`와 함께 사용된다.

```css
/* a 태그 뒤에 삽입 */
a::after {
  content: "♥";
}

/* a 태그 뒤에 삽입 */
a::before {
  content: "♥";
}
```

2. 우선 순위
   같은 요소가 여러 선언의 대상일 때 어떤 것이 우선 적용되는지를 결정하는 **우선 순위 점수에서 가상클래스가 가상요소보다 순위가 높다.** 우선순위 점수는 다음과 같다.

   1. !important: 이를 사용하면 다른 모든 요소를 무시하고 가장 최우선으로 적용된다.
   2. 명시도: 선언된 선택자의 명시도를 우선순위에 따라 계산한다.
      1. inline styles
      2. IDs
      3. classes, `pseudo-class`, attribute
      4. elements, `pseudo-element`
   3. 선언 순서 : 명시도 점수가 같다면, 가장 마지막에 선언된 것이 우선순위를 가진다.

---

_References_
[pseudo-class](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-classes)
[pseudo-element](https://developer.mozilla.org/ko/docs/Web/CSS/Pseudo-elements)
