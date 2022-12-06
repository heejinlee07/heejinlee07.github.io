---
title: contentEditable
date: 2022-12-06
tags:
---

## 문서 영역을 편집가능하게 만들기

contentEditable은 키워드가 빈 문자열이고, ture 또는 false를 가지는 열거형 속성(enumerated attribute)이다. 빈 문자열과 true 키워드는 true state에 매핑된다. false 키워드는 false state에 매핑된다. 그리고 inherit state인 세 번째 state가 있는데 missing value 또는 invalid value를 default로 가지는 값이다. true state는 element가 편집 가능함을 의미한다. inherit state는 element의 부모가 편집이 가능 여부를 상속받음을 의미한다. false state는 element가 편집불가함을 의미한다.

예를 들어 유저가 HTML을 이용해서 아티클을 쓸 수 있는 새로운 아티클을 발행하기 위한 form과 textarea가 있는 페이지를 생각해보자.

```html
<form method="POST">
  <fieldset>
    <legend>New article</legend>
    <textarea name="article">&lt;p>Hello world.&lt;/p></textarea>
  </fieldset>
  <p><button>Publish</button></p>
</form>
```

scripting가 활성화되면, textarea element에 contenteditable 속성을 사용하면 서식이 있는 텍스트 컨트롤 요소로 바꿀 수 있다.

```html
<form method="POST">
  <fieldset>
    <legend>New article</legend>
    <textarea id="textarea" name="article">&lt;p>Hello world.&lt;/p></textarea>
    <div id="div" style="white-space: pre-wrap" hidden><p>Hello world.</p></div>
    <script>
      let textarea = document.getElementById('textarea');
      let div = document.getElementById('div');
      textarea.hidden = true;
      div.hidden = false;
      div.contentEditable = 'true';
      div.oninput = (e) => {
        textarea.value = div.innerHTML;
      };
    </script>
  </fieldset>
  <p><button>Publish</button></p>
</form>
```

다음과 같이 풍부한 효과를 내기 위해 사용할 수도 있다.

```html
<!DOCTYPE html>
<html lang="en">
  <title>Live CSS editing!</title>
  <style style="white-space:pre" contenteditable>
    html {
      margin: 0.2em;
      font-size: 2em;
      color: lime;
      background: purple;
    }
    head,
    title,
    style {
      display: block;
    }
    body {
      display: none;
    }
  </style>
</html>
```

---

_References_
[Making document regions editable: The contenteditable content attribute](https://html.spec.whatwg.org/multipage/interaction.html#contenteditable)
