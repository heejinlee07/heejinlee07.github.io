---
title: 브라우저의 렌더링 과정
date: 2020-07-24 12:00
tags:
---

## 브라우저 structure

![browser components](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/layers.png)

1. user interface: 유저가 볼 수 있는 모든 것. 요청한 페이지가 표시되는 창을 제외한 모든 부분(주소창, 책갈피 메뉴 등)을 말한다. 유저는 함부로 조작할 수 없고, ui backend와 함꼐 일한다.

2. browser engine: 유저 인터페이스와 렌더링 엔진 사이의 mediator

   - 브라우저에서 새로고침을 누르면 브라우저 엔진은 명령을 실행하고 웹페이지를 새로 렌더링한다.

3. rendering engine: 요청된 컨텐츠를 parse하여 화면에 렌더링한다.

- networking: https나 http 요청을 하는 부분으로 networking layer 리소스가 로드되어 있는지 확인한다.
- javasscript interpreter: javascript 코드를 parse하고 실행한다.
- ul backend: basic widgets를 그리는 데 사용된다.

4. data persistence: 자료를 저장하는 layer이다. 쿠키와 같은 모든 종류의 데이터를 로컬에 저장하거나 localStorage, IndexedDB, WebSQL 및 FileSystem과 같은 스토리지 메커니즘을 지원한다.

이처럼 브라우저는 굉장히 많은 layer로 구성되어 있으나 `렌더링 엔진`에만 주목하여 렌더링 과정을 살펴보려 한다. 기본 렌더링 엔진 플로우는 다음과 같다.

## 브라우저의 렌더링 flow

> parsing -> render tree -> layout -> paint

유저가 웹사이트를 열면 렌더링 엔진이 먼저 시작되고 파싱된다. 파싱이 끝나면 트리가 렌더되고, 트리도 렌더링이 끝나면 레이아웃이 실행된다. (브라우저에 따라서 레이아웃 혹은 리플로우라고 부른다.) 참고로 렌더 트리는 `rectangles`을 포함하는데 이는 색상, 치수 등의 visual attributes를 포함하는 것이며, 화면에 표시되는 올바른 순서를 의미한다. 레이아웃은 각 노드에게 화면에 표시 될 정확한 좌표를 제공한다는 의미이다. 이 단계를 거쳐 마지막으로 paint라는 단계에서 렌더 트리가 순회되고, 각 노드가 ul backend layer를 사용하여 painting된다. 이렇게 모든 단계를 거치면 일종의 색칠 된 object가 나오는 것이다.

### parsing

만약 parser를 개발한다면 이는 두 가지 타입으로 구성된다.

1. conventional : css and javascript
   파싱은 document를 code가 사용할 수 있는 structure로 해석하는 것을 의미한다.

> 1 + 2 \*3 -> parsing -> someting like tree structure

documents를 코드가 사용할 수 있는 structure로 translate한다.

2. unconventional: html
   html document type definition(DOCTYPE)

### render tree

돔트리가 생성되는 동안 생성된다.

- visual elements in the order which they are going to be displayed.
- elements in the render tree are called renderer or render objects.
  브라우저에 따라서 renderer 혹은 render object라고 불릴 수 있는데 이는 트리를 구성하는 작은 요소이다. 중요한 것은 렌더 오브젝트가 rectangle이라는 것이다.
- render object is a rectangle.

### layout

- calculates position and size
- most of the time possible to compute geometry in one path
- recursive process begins at the root object(<html>)

- dirty bit system
  html 태그에 있는 루트 객체가 가지고 있는 것.
  a system that makes sure that browsers don't need to do the full
  layout on every interaction.
  노드나 돔 엘리먼트를 수정했을 때 전체 트리를 모두 다 리렌더 하는 것이 아니라, 수정이 발생한 그 부분만 리렌더 되는 것. 하지만 글로벌 또는 incremental layout도 존재한다.

- global and incremental layout
  - global : affects all renders(font size), screen size
  - incremental layout: 기본적으로 dirty bit system을 사용하여 일부를 렌더링한다.

### paint

Render object인 rectangles를 색상으로 채우면 페인트 레이어가 페인트를 하는 것이다.

render tree is being traversed and the paint() method is used to display content on the page.

페인트는 렌더 트리를 통해 기본적으로 페인트 메소드를 재귀적으로 실행한다. 페인트도 역시 lobal and incremental paint로 구성된다. 글로벌 페인팅이 필요하다면 전체페이지가 리페인팅 되고, incremental painting도 같은 dirty bit system으로 진행하되 일부 필요한 부분에 대해서만 리페인팅을 진행하는 것.

reduce the effort of painting the while thing.(dirty bit system)

- painting order

1. backgroud color
2. background image
3. border
4. children
5. outline

---

## 브라우저의 렌더링 과정

브라우저의 핵심 기능은 필요한 리소스를 서버에 요청하고 서버의 응답을 받아 응답받은 리소스를 파싱하여 브라우저에 시각적으로 렌더링 하는 것이다. 위에서 살펴본 브라우저 렌더링 flow를 핵심기능에 따라 다시 분류하자면 아래와 같다.

- Fetch: network layer
- Process
  - 렌더링 엔진
  - 자바스크립트 엔진
  - ui backend
- display
  - user interface
  - 브라우저 엔진
- storage: data persistence

브라우저의 렌더링 과정은 다음과 같다.

1. html, css, javascript 등 렌더링에 필요한 리소스를 요청, 서버로부터 응답을 받는다.
2. 서버로부터 응답된 html과 css를 파싱, dom과 cssom을 생성하여 이를 결합한 render tree를 형성한다.
3. javascript는 서버로부터 응답된 javascript를 파싱, AST(abstract syntax tree)를 생성하고 바이트 코드로 변환하여 실행한다. _이때 javascript는 DOM API를 통해 dom과 cssom을 변경할 수 있고, 변경된 사항이 다시 render tree에 결합된다._
4. render tree를 기반으로 html 요소의 레이아웃을 계산하고, 브라우저 화면에 html 요소를 페인팅한다.

브라우저의 렌더링 과정은 다음과 같은 경우 반복해서 레이아웃 계산과 페인팅이 재차 실행되는 리렌더링이 발생한다. 이는 성능에 악영향을 주는 것이므로 리렌더링이 자주 발생하지 않도록 주의해야한다.

- 자바스크립트에 의한 노드 추가 또는 삭제
- 브라우저 윈도우의 리사이징에 의한 뷰포트(viewport) 크기 변경
- HTML 요소의 레이아웃(위치, 크기)에 변경을 발생시키는 width/height, margin, padding, border, display, position, top/right/bottom/left 등의 스타일 변경

## 요청과 응답 (주소창을 통해 요청)

![URI(Uniform Resource Identifier)](https://poiemaweb.com/assets/fs-images/38-2.png)

요청: 브라우저의 주소창에 url을 입력하고 엔터를 누르면 루트 요청이 서버로 전송되는데, 루트 요청시 명확히 리소스를 요청하지 않으면 암묵적으로 `index.html`을 응답하도록 기본 설정되어 있다. 이때 url의 호스트 이름은 dns를 통해 ip주소로 변환되고 이 ip 주소를 갖는 서버에게 요청을 전송한다.

### HTTP 1.1과 HTTP 2.0

HTTP: 웹에서 브라우저와 서버가 통신을 하기 위한 프로토콜(규약)이다.

- HTTP 1.1: 커넥션 당 하나의 요청과 응답만을 처리하는 `단방향 구조`이다. 따라서 여러 개의 리소스를 요청해도 개별적으로 전송되고, 응답 역시 마찬가지로 개별적으로 전달된다.
- HTTP 2.0: `다중 요청/응답`이 가능하여 커넥션 당 여러 개의 요청과 응답을 전송할 수 있다. 따라서 1.1에 비해 페이지 로드 속도가 빠르다.

## HTML 파싱과 DOM 생성

브라우저 요청에 의해 _서버가 응답한 HTML 문서는 문자열로 이루어진 순수한 텍스트이다._ 따라서 이를 브라우저에 시각적인 픽셀로 렌더링하려면 HTML 문서를 브라우저가 이해할 수 있는 자료구조인 객체로 변환하여 메모리에 저장해야 한다. 그러면 브라우저의 렌더링 엔진은 파싱된 HTML문서로 브라우저가 이해할 수 있는 자료구조인 DOM을 생성한다.

> HTML 파싱되어 DOM이 생성되는 과정(CSSOM을 생성하는 것을 제외하면 css 파싱과정도 동일하다.)
> 바이트 -> 문자 -> 토큰 -> 노드 -> DOM
>
> - 브라우저가 요청한 HTML파일을 읽어 들여 메모리에 저장한 후 메모리에 저장된 바이트(2진수)로 응답한다.
> - 브라우저는 2진수 형태로 전달받은 HTML 문서를 문자열로 변환한다. 문자열로 변환시 html 파일 내부의 `<meta charset="UTF-8">`의 인코딩 방식을 따른다.
> - 이렇게 문자열로 변환된 html 문서를 토큰으로 분해한다. 토큰은 문법적인 의미를 갖는 코드의 최소 단위를 의미한다.
> - 각 토큰들을 객체로 변환하여 노드를 생성한다. 노드는 DOM을 구성하는 기본 요소이다.
> - _html 문서는 html 요소들의 집합으로 이루어므로 중첩 관계를 갖는다._ 즉 부자 관계를 형성하고 이를 반영한 노드들은 `트리 자료구조`를 구성한다. 이를 DOM이라 한다.
> - 즉 DOM은 html문서를 파싱한 결과물이다.

## 렌더 트리 생성

렌더링 엔진은 서버로부터 응답받은 html과 css를 파싱하여 DOM과 CSSOM을 생성하는데, 이는 렌더링을 위해 `render tree`로 결합된다. 렌더링은 위한 자료구조이기 때문에 화면에 렌더링되지 않는 노드는 제외된다. 이 렌더 트리는 레이아웃의 위치와 크기를 계산하는 데 사용되고, 브라우저 화면에 픽셀을 렌더링하는 페인팅 처리에 입력된다.

---

## 자바스크립트 파싱과 실행

자바스크립트 코드에서 Dom이 제공하는 DOM API를 통해 _이미 생성된 DOM을 동적으로 조작할 수 있다._ 렌더링 엔진이 html 코드를 한 줄씩 순차적으로 parsing하며 dom을 생성하다가 자바스크립트 파일을 로드하는 script 태그나 자바스크립트 코드를 콘텐츠로 담은 script 태그를 만나면 dom 생성을 일시적으로 중단하고, 자바스크립트 엔진에게 제어권을 넘긴다. 제어권을 넘겨받으면 자바스크립트 엔진은 자바스크립트의 코드를 파싱하여 AST를 생성하고, 이를 기반으로 인터프리터가 실행할 수 있는 중간 코드인 바이트코드를 생성하여 실행한다. 이렇게 자바스크립트 파싱과 실행이 종료되면 제어권은 다시 렌더링 엔진으로 넘겨지고 html 파싱이 중단된 지점부터 다시 파싱을 시작하여 dom 생성을 재개한다. 브라우저는 이처럼 순차적으로 html, css, 자바스크립트를 파싱하고 실행한다. 따라서 자바스크립트 엔진이 dom api를 사용하는데, dom이나 cssom이 생성되기 이전이라면 에러가 발생할 수 있다._script 태그의 위치를 body 요소의 가장 아래에 위치시키면 예기치 못하게 발생할 수 있는 에러를 방지할 수 있다._

자바스크립트 파싱과 실행과정은 다음과 같다.

> 자바스크립트 소스코드 -> `토크나이징` - 토크나이저 -> 토큰 -> `파싱` - parser -> AST -> `bytecode generator` - 바이트코드 생성 -> 바이트코드 -> execution -> 인터프리터

- 토크나이징: 문자열인 자바스크립트 소스코드를 문법적 의미를 갖는 코드의 최소 단위인 토큰들로 분해한다.
- 파싱: 토큰을 분석하여 AST(추상적 구문 트리)를 생성하는데 토큰에 문법적 의미와 구조를 반영한 트리 구조의 자료 구조를 말한다.
- 바이트 코드 생성과 실행: 파싱의 결과물로 생성된 AST가 인터프리터가 실행할 수 있는 중간 코드인 바이트코드로 변환되고 실행된다.

## 리플로우와 리페인트

자바스크립트 코드에 DOM API가 사용되었다면 DOM이나 CSSOM이 변경된다. 이때 변경된 DOM과 CSSOM은 다시 렌더 트리로 결합되고 변경된 렌더 트리를 기반으로 레이아웃과 페인트 과정을 거쳐 브라우저의 화면에 다시 렌더링한다. 이를 리플로우(reflow), 리페인트(repaint)라 한다.

- 리플로우: 레이아웃 계산을 다시 하는 것을 말하며, 노드 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생한 경우에 한하여 실행된다.
- 리페인트: 재결합된 렌더 트리를 기반으로 다시 페인트를 하는 것을 말한다.

---

_References_

[How Do Web Browsers Work?](https://medium.com/hackernoon/how-do-web-browsers-work-40cefd2cb1e1)
[Kruno: How browsers work | JSUnconf 2017](https://youtu.be/0IsQqJ7pwhw)
[html5rocks](https://www.html5rocks.com/en/tutorials/internals/howbrowserswork/)
[poiemaweb](https://poiemaweb.com/fastcampus/browser-rendering#9-script-%ED%83%9C%EA%B7%B8%EC%9D%98-async--defer-%EC%96%B4%ED%8A%B8%EB%A6%AC%EB%B7%B0%ED%8A%B8)
