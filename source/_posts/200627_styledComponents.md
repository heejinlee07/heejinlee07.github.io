---
title: Styled-Components
date: 2020-06-27 11:00
tags:
---

## CSS in JS

자바스크립트 파일 안에 스타일을 선언하는 방식

## Template literal

문자열 안에 특정 js값을 넣어서 조합할 수 있게 해주는 문법

```javascript
const name = "react";
const message = `hello ${name}`;

console.log(message);

//hello react

//객체는 Template literal로 표현해도
//원하는 결과물이 나타나지 않음.

const object = { a: 1 };
const text = `${object}`;
console.log(text);
//[object Object]

//함수도 마찬가지로 함수의 형태가
// 그대로 나타남.
const fn = () => true;
const msg = `${fn}`;
console.log(msg);

//() => true
```

## Tagged Template Literal

```javascript
const Box = styled.div`
  color: black;
`;
```

props를 사용했을 때 그 props를 읽기 위하여 사용.

```javascript
const StyledDive = styled.div`
  background: ${(props) => props.color};
`;

const MyComponent = () => <StyledDiv color="black" />;
```

```javascript
const red = "빨간색";
const blue = "파란색";

function favoriteColors(texts, ...values) {
  console.log(texts);
  console.log(values);
}

favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`;

// ['제가 좋아하는 색은', '과', '입니다' , raw: Array(3)]
//['빨간색','파란색']
```

```javascript
//또다른 예시
const red = "빨간색";
const blue = "파란색";

function favoriteColors(texts, ...values) {
  return texts.reduce((result, text, i) => `${result}${text}${values[i] ? `<b>${values[i]}</b>` : ""}`, "");
}

favoriteColors`제가 좋아하는 색은 ${red}과 ${blue}입니다.`;

//제가 좋아하는 색은 <b>빨간색</b>과 <b>파란색</b>입니다.
```

---

_Refetences_
[modern react -velopert](https://react.vlpt.us/styling/03-styled-components.html)
