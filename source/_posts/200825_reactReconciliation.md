---
title: React Reconciliation
date: 2020-08-25
tags:
---

## DOM

DOM은 HTML이 파싱되어 브라우저가 이해할 수 있는 자료구조인 DOM을 생성하는 것을 말한다. 브라우저의 렌더링 트리 생성과정은 다음과 같다.

- HTML 마크업을 처리하고 DOM 트리를 빌드
- CSS 마크업을 처리하고 CSSOM 트리를 빌드
- DOM 및 CSSOM을 결합하여 렌더링 트리를 형성
- 렌더링 트리에서 레이아웃(또는 리플로우)을 실행
  - 각 노드의 기하학적 형태를 계산한다. (각 객체의 정확한 위치와 크기 계산)
  - 이 과정을 거치면 각 노드들은 스크린의 좌표와 위치가 주어진다.
- 개별 노드를 화면에 페인트
  - 픽셀을 화면에 렌더링
  - 렌더링 된 요소들에 색을 입히며 스크린에 원하는 정보를 나타낸다.

DOM에 변화가 있을 때마다 위와 같은 과정을 반복하는데, DOM 조작이 자주, 많이 발생하면 렌더링 시간이 오래 걸리게 되고, 불필요한 연산이 많아진다.

## virtual DOM (VDOM)

UI의 이상적인 또는 “가상”적인 표현을 메모리에 저장하고 ReactDOM과 같은 라이브러리에 의해 “실제” DOM과 동기화하는 프로그래밍 개념이다. 즉 실제로 DOM을 제어하는 방식이 아니라 중간에 가상의 DOM인 Virtual DOM을 두어 개발의 편의성(DOM을 직접 제어하지 않음)과 성능(배치 처리로 DOM 변경)을 개선하는 방식이다.

## React Reconciliation

React는 엘리먼트라는 React 앱의 가장 작은 단위로 화면에 표시할 내용을 기술한다. 이는 `ReactDOM.render()`를 통해 화면에 렌더링된다. 이 엘리먼트들은 React DOM에서 트리 형태로 관리되고 표현되는데, 이때 엘리먼트 트리의 변경 전/후를 비교하여 변화가 있는 부분만 찾아서 업데이트 한다. 이처럼 React의 state나 props에 변화가 있을 React DOM에서 변경전후를 비교하여 VDOM을 실제 DOM과 동기화하는 과정을 React Reconciliation이라 한다.

## 결론

사용자가 브라우저에 어떠한 액션을 취하거나, 개발자가 DOM에 접근하여 조작하는 경우 매번 렌더링 트리를 생성하여 리플로우와 리페인트를 거쳐 DOM에 변경사항을 적용하는 과정을 반복하게 된다. 이는 변화가 발생했을 때마다 이를 DOM에 적용하기 위해 새로운 레이아웃을 계산해야하는 불필요한 연산이 초래되고, 매번 렌더링 트리를 만들어 렌더링이 이루어지는 리렌더링 과정을 거쳐야 하므로 비효율적이다. 그래서 매번 리플로우와 리렌더링 과정을 거치지 않도록, 변경된 사항의 전후를 비교하여 변경된 부분에 대해서만 업데이를 해주는 개념이 React의 렌더링 개념이며, 이 업데이트가 발생하는 React의 DOM을 virtual DOM이라 한다. 그리고 virtual DOM에서 이루어진 업데이트를 실제 DOM과 동기화하는 과정을 React Reconciliation이라 한다.

---

_References_

[렌더링 트리 생성, 레이아웃 및 페인트](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction?hl=ko)
[[번역] 리액트에 대해서 그 누구도 제대로 설명하기 어려운 것 – 왜 Virtual DOM 인가?](https://velopert.com/3236)
[Virtual DOM과 Internals](https://ko.reactjs.org/docs/faq-internals.html)
[React 렌더링과 성능 알아보기](https://meetup.toast.com/posts/110)
[엘리먼트 렌더링](https://ko.reactjs.org/docs/rendering-elements.html)
[재조정](https://ko.reactjs.org/docs/reconciliation.html#gatsby-focus-wrapper)
