---
title: React Props
date: 2020-08-05 15:00
tags:
---

## props

예전에는 React 엘리먼트를 DOM 태그로 나타냈다.(엘리먼트는 React 앱의 가장 작은 단위이자, 화면에 표시할 내용을 기술하는 것이다.) 그러나 React 엘리먼트는 사용자 정의 컴포넌트로 나타낼 수 있다. 이러한 사용자 정의 엘리먼트를 발견하면 JSX 어트리뷰트와 자식을 해당 컴포넌트에 `단일 객체`로 전달한다.

const element = <Welcome name="Sara" />;

function Welcome(props) {
return <h1>Hello, {props.name}</h1>;
}
