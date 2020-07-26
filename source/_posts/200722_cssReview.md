---
title: MDN basic HTML
date: 2020-07-22 15:00
tags:
---

## HTML

마크업 언어. 웹페이지는 어떻게 구조화되어 있는지를 브라우저에게 알려줌. elements와 tag로 구성되어 있다.

### 요소(elements)

- elements: 각 컨텐츠를 감싸고 마크업한다. 엘리먼트 안에는 내용과 내용을 앞뒤로 감싸는 태그(여는 태그, 닫는 태그)가 있다. 엘리먼트 내부는 `<p>My cat is <strong>very</stong>grumpy.</p>`와 같이 중첩하여 사용할 수 있다.
- 속성(attributes): 요소에 실제로 나타내고 싶진 않지만 추가적인 내용을 담고 싶을 떄 사용. `<p class="editor-note">My cat is very grumpy</p>`라는 예시에서 `class="editor-note"`를 말한다.

### 블럭 레벨 요소 vs 인라인 요소

- 블럭 레벨 요소
  웹페이지 상에 블록을 만드는데, 앞뒤 요소 사이에 새로운 줄을 만들기 때문에 요소 이전과 이후 요소는 줄을 바꾼다. _블록 레벨 요소는 다른 블록 레벨 요소에 의해 중첩될 수 있지만, 인라인 요소에 중첩될 수는 없다._
- 인라인 요소
  _항상 블록 레벨 요소 내에 포함되어 있다._ 문서의 한 단락같이 큰 범위에는 적용될 수 없고, 단어 같은 작은 부분에 대해서만 적용된다. 또한 블록 레벨 요소와 다르게 새로운 줄을 만들지 않는다. 따라서 인라인 요소를 작성하면 작성한 단락 내에 표현된다.

### HTML 메타데이터

- head: 페이지를 열 때 웹 브라우저에 표시되지 않는다. metadata를 포함한다.
- title: `<h1>`태그와 헷갈릴 수 있는데, `<h1>`이 페이지를 열 때 페이지 내용의 제목에 쓰인다면, `<title>`는 문서의 컨텐츠 내부에 쓰이는 것이 아닌 html 문서 전체의 타이틀을 표현하기 위한 메타데이터를 의미한다. 이 `<title>`는 _북마크 이름, 검색결과_ 로 사용된다.

- meta: 문서의 character 인코딩을 특정하는 것으로 문서에서 허용하는 문자 집합을 의미한다. `UTF-8`은 다양한 언어들을 포함하는 것이므로 일반적으로 이를 사용하도록 한다.

### HTML에 CSS와 JavaScript 적용하기

- CSS: `<link>`를 사용하여 적용하는데, 항상 문서의 head 부분에 위치해야한다. `<link>`에서 `rel`은 문서가 stylesheet임을 나타내고, `href`는 이 파일의 경로를 나타낸다.
- JavaScript: `<script>` 태그를 사용하여 적용한다. `<head>`에 들어가도 되지만 꼭 `<head>`에만 위치해야하는 것은 아니다. 보통은 `</body>` 태그 바로 앞, 즉 본문의 맨 끝에 넣는 것이 좋다. 또한 `<script>`태그는 반드시 닫아주어야 한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My test page</title>
    <link rel="stylesheet" href="my-css-file.css" />
  </head>
  <body>
    <p>This is my page</p>
    <script src="my-js-file.js"></script>
  </body>
</html>
```

## HTML text fundamentals

시멘틱: 브라우저가 텍스트를 올바르게 표시 할 수 있도록 텍스트 구조와 의미를 제공하는 것. HTML의 주요 작업 중 하나.
