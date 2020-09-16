---
title: 이벤트 전파와 위임
date: 2020-08-23 13:00
tags:
---

## 이벤트 전파

특정 요소를 클릭해서 클릭 이벤트가 발생했을 때 생성된 이벤트 객체가 이벤트를 발생시킨 DOM 요소인 이벤트 타겟을 중심으로 DOM 트리를 통해 전파되는 현상을 말한다. DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 전파된다.

- 1️⃣캡처링 단계(capturing phase) : 이벤트가 `상위 요소(window)`에서 `하위 요소` 방향으로 전파
- 2️⃣타깃 단계(target phase) : 이벤트가 이벤트 타깃에 도달
- 3️⃣버블링 단계(bubbling phase) : 이벤트가 `하위 요소`에서 `상위 요소(window)` 방향으로 전파

### 이벤트 핸들러 어트리뷰트/프로퍼티 방식에서의 이벤트 전파

이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러는 `타깃 단계, 버블링 단계`의 이벤트만 캐치한다. 캡처링 단계는 캐치하지 못한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById("fruits");
      const $banana = document.getElementById("banana");

      // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우 캡처링 단계의 이벤트를 캐치한다.
      // 그러나 이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록하였기 때문에 캡처링 단계를 캡처하지 못한다.
      $fruits.onclick = (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        console.log(event.composedPath());
      };

      // 타깃 단계의 이벤트를 캐치한다.
      $banana.onclick = (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLLIElement]
        console.log(event.composedPath());
      };

      // 버블링 단계의 이벤트를 캐치한다.
      $fruits.onclick = (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        console.log(event.composedPath());
      };
    </script>
  </body>
</html>
```

### addEventListener 메서드 방식에서의 이벤트 전파

*addEventListener 메서드 방식*으로 등록하면 `타깃 단계, 버블링 단계, 캡처링 단계를 선별적으로 캐치`할 수 있다. 캡처링 단계의 이벤트를 캐치하려면 addEventListener 메서드의 3번째 인수로 true를 전달한다. 3번째 인수를 생략하거나 false를 전달하면 타깃 단계와 버블링 단계의 이벤트만 캐치할 수 있다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById("fruits");
      const $banana = document.getElementById("banana");

      // #fruits 요소의 하위 요소인 li 요소를 클릭한 경우 캡처링 단계의 이벤트를 캐치한다.
      $fruits.addEventListener(
        "click",
        (e) => {
          console.log(`이벤트 단계: ${e.eventPhase}`); // 1: 캡처링 단계
          console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
          console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        },
        true
      );

      // 타깃 단계의 이벤트를 캐치한다.
      $banana.addEventListener("click", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLLIElement]
      });

      // 버블링 단계의 이벤트를 캐치한다.
      $fruits.addEventListener("click", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
      });
    </script>
  </body>
</html>
```

---

대부분의 이벤트는 캡처링과 버블링을 통해 전파되는데, 아래 이벤트는 버블링을 통해 전파되지 않는다. 필요할 가능성은 희박하지만 만약 아래 이벤트를 상위 요소에서 캐치해야 한다면 다른 이벤트를 통해 대체해야 한다.

- 포커스 이벤트: focus/blur
- 리소스 이벤트: load/unload/abort/error
- 마우스 이벤트: mouseenter/mouseleave

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      const $fruits = document.getElementById("fruits");
      const $banana = document.getElementById("banana");

      // 1️⃣click
      $fruits.addEventListener("click", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        console.log(event.bubbles); //true
        console.log(event.composedPath()); //[li#orange, ul#fruits, body, html, document, Window]
      });

      // 2️⃣mouseleave
      $fruits.addEventListener("mouseleave", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 2: 타깃 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        console.log(event.bubbles); //false
        console.log(event.composedPath()); // [ul#fruits, body, html, document, Window]
      });

      //3️⃣mouseover
      $fruits.addEventListener("mouseover", (e) => {
        console.log(`이벤트 단계: ${e.eventPhase}`); // 3: 버블링 단계
        console.log(`이벤트 타깃: ${e.target}`); // [object HTMLLIElement]
        console.log(`커런트 타깃: ${e.currentTarget}`); // [object HTMLUListElement]
        console.log(event.bubbles); //true
        console.log(event.composedPath()); //[li#orange, ul#fruits, body, html, document, Window]
      });
    </script>
  </body>
</html>
```

> event.bubbles: 버블링을 통해 이벤트를 전파하는지 여부를 불리언으로 나타냄.
> event.composedPath(): 이벤트가 통과하는 DOM 트리 상의 경로 확인

- 1️⃣click: 버블링 단계의 이벤트를 캐치한다. event.bubbles = true;
- 2️⃣mouseleave: 이 이벤트는 버블링을 통해 전파되지 않으므로 버블링 단계의 이벤트를 캐치하지 못한다. event.bubbles = false;
- 3️⃣mouseover: mouseleave를 mouseover로 변경하면 버블링 단계의 이벤트를 캐치할 수 있다. event.bubbles = true;

---

## 이벤트 위임

이벤트는 전파되므로 이벤트 타깃은 물론 상위 DOM에서도 캐치할 수 있다. 이 점을 이용하여 여러 개의 하위 DOM 요소에 각각 이벤트 핸들러를 등록하는 대신 하나의 상위 DOM 요소에 이벤트 핸들러를 등록하는 방법이다. 이렇게 하면 동적으로 하위 DOM 요소를 추가하더라도 여기에 이벤트 핸들러를 일일이 등록할 필요가 없다.

> 이벤트 위임의 장점
> 동적인 엘리먼트에 대한 이벤트 처리가 수월하다.
> 이벤트 핸들러 관리가 쉽다.
> 메모리 사용량이 줄어들고, 메모리 누수 가능성도 줄어든다.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      #fruits {
        display: flex;
        list-style-type: none;
        padding: 0;
      }

      #fruits li {
        width: 100px;
        cursor: pointer;
      }

      #fruits .active {
        color: red;
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <nav>
      <ul id="fruits">
        <li id="apple" class="active">Apple</li>
        <li id="banana">Banana</li>
        <li id="orange">Orange</li>
      </ul>
    </nav>
    <div>선택된 내비게이션 아이템: <em class="msg">apple</em></div>
    <script>
      const $fruits = document.getElementById("fruits");
      const $msg = document.querySelector(".msg");

      // 사용자 클릭에 의해 선택된 내비게이션 아이템(li 요소)에 active 클래스를 추가하고
      // 그 외의 모든 내비게이션 아이템의 active 클래스를 제거한다.

      function activate({ target }) {
        [...$fruits.children].forEach(($fruit) => {
          $fruit.classList.toggle("active", $fruit === target);
          $msg.textContent = target.id;
        });
      }

      // 모든 내비게이션 아이템(li 요소)에 이벤트 핸들러를 등록한다.
      document.getElementById("apple").onclick = activate;
      document.getElementById("banana").onclick = activate;
      document.getElementById("orange").onclick = activate;
    </script>
  </body>
</html>
```

만약 이벤트 위임을 하지 않으면 위와 같이 이벤트 핸들러 등록이 필요한 모든 요소에 일일이 이벤트 핸들러를 등록해주어야 한다. 이는 메모리 누수와 같은 성능 저하의 원인이 되고, 유지보수에도 적합하지 않다. 이벤트 위임의 장점은 같은 코드를 이벤트 위임으로 변경한 아래 예제에서 확인할 수 있다.

```html
<!DOCTYPE html>
<html>
    <script>
      // {...위와 동일한 코드}
      const $fruits = document.getElementById("fruits");
      const $msg = document.querySelector(".msg");

     function activate({ target }) {
      // 이벤트를 발생시킨 요소(target)가 ul#fruits의 자식 요소가 아니라면 무시한다.

      /*
      상위 요소에 이벤트 핸들러를 등록할 때, 이벤트 타깃이 내가 기대한 DOM요소가 아닐 수도 있기 때문에
      matches로 해당하는 이벤트 타깃이 있는지 확인한다.
      matches: 인수로 전달된 선택자에 의해 특정 노드가 탐색 가능한지 확인한다.
      */
      if (!target.matches('#fruits > li')) return;

      [...$fruits.children].forEach($fruit => {
        $fruit.classList.toggle('active', $fruit === target);
        $msg.textContent = target.id;
      });
    }

    // 이벤트 위임: 상위 요소(ul#fruits)는 하위 요소의 이벤트를 캐치할 수 있다.
    /*
    이벤트 객체의 currentTarget: 언제나 $fruits 요소
    target 프로퍼티: 실제로 이벤트를 발생시킨 DOM 요소
    두 가지가 서로 다른 DOM 요소를 가리킬 수도 있으므로 확실하게 하기 위해 $fruits에 이벤트를 바인딩한다.
    */
    $fruits.onclick = activate;
    </script>
  </body>
</html>
```

---

_References_
[이벤트](https://poiemaweb.com/fastcampus/event)
[왜 이벤트 위임(delegation)을 해야 하는가?](https://ui.toast.com/weekly-pick/ko_20160826/)
