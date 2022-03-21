---
title: MUI CSS injection order 원문 축약
date: 2021-09-26
tags: javaScript
---

> 원문 링크: https://mui.com/styles/advanced/#string-templates

## CSS injection order

> CSS가 어떻게 브라우저에 의해 계산되는지 이해하는 것은 언제 스타일 오버라이딩이 되는지 알기 위한 키포인트이기 때문에 매우 중요하다. 이와 관련하여 MDN의 [어떻게 계산되는가?](https://developer.mozilla.org/ko/docs/Web/CSS/Specificity)를 읽어보는 것을 추천한다.

기본적으로 style 태그는 페이지의 `<head>` 엘리먼트의 가장 마지막에 주입된다. 이 style 태그는 페이지의 다른 어떤 style 태그 (e.g. CSS module, styled components) 보다도 특수함을 가진다.

## injectFirst

`StylesProvider` 컴포넌트는 `injectFirst` prop를 가지고 있어서 head(낮은 우선순위)에서 가장 먼저 주입되는 style tag이다.

```javascript
import { StylesProvider } from '@mui/styles'

;<StylesProvider injectFirst>
  {/* Your component tree.
      Styled components can override MUI's styles. */}
</StylesProvider>
```

## makeStyles / withStyles / styled

주입되는 style tag는 makeStyles / withStyles / styled가 발생하는 같은 순위에서 발생한다. 예를 들어 color red가 아래 예시에서 우세하다.

```javascript
import clsx from 'clsx'
import { makeStyles } from '@mui/styles'

const useStylesBase = makeStyles({
  root: {
    color: 'blue' // 🔵
  }
})

const useStyles = makeStyles({
  root: {
    color: 'red' // 🔴
  }
})

export default function MyComponent() {
  // Order doesn't matter
  const classes = useStyles()
  const classesBase = useStylesBase()

  // Order doesn't matter
  const className = clsx(classes.root, classesBase.root)

  // color: red 🔴 wins.
  return <div className={className} />
}
```

hook의 호출 순서와 class name의 연속적인 순서는 상관 없다.

## insertionPoint

JSS는 이러한 상황을 해결할 수 있는 [매커니즘](https://github.com/cssinjs/jss/blob/master/docs/setup.md#specify-the-dom-insertion-point)을 제공한다. HTML내에 삽입점을 추가하는 것으로 CSS 규칙이 components에 [적용되는 순서를 제어할 수 있다.](https://cssinjs.org/jss-api/?v=v10.8.0#attach-style-sheets-in-a-specific-order)

---

_References_
[CSS injection order](https://mui.com/styles/advanced/#string-templates)
