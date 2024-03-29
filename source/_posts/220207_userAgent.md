---
title: 사용자 에이전트 (User Agent)
date: 2022-02-07
tags:
---

> 사용자를 대표하는 컴퓨터 프로그램, 웹에서는 `브라우저`를 의미하고, 웹 페이지를 긁어가는 봇, 다운로드 관리자, 웹에 접근하는 다른앱 등이 있다.

- 브라우저는 서버에 보내는 모든 요청에 `User-Agent HTTP(사용자 에이전트 문자열) 헤더`를 보낸다.
- 여기에는 브라우저 종류, 버전 번호, 호스트 운영체제를 포함하는 브라우저 정보가 담겨있다.
- 클라이언트에서 JS의 `navigator.userAgent` 속성으로 사용자 에이전트 문자열에 접근할 수 있다.

---

## user agent를 이용한 브라우저 감지

_웹은 유저가 어떤 브라우저, 어떤 디바이스를 사용하고 있는지와 관계없이 모두에게 접근성이 용이해야 한다._ 하지만 브라우저와 웹 표준이 완벽하지 않기 때문에 몇 가지 edge case가 존재하여 브라우저 감지를 필요로 한다. **user agent를 사용하여 브라우저를 감지하는 것은 간단하지만 그것을 잘하기는 매우 어려운 문제이다.**

## 브라우저 감지 전에 고려해야할 점

> 웬만하면 user agent를 사용한 브라우저 감지를 하지 않는 것이 우선이다. 하지만 그럼에도 불구하고 필요하다고 판단된다면 아래 질문에 근거하여 _정말로 내가 왜 그 기능을 필요로 하는가를 고려해보도록 한다._

- 특정 브라우저 버전에 있는 버그를 고치려고 하는가?
  - 포럼에서 버그를 찾아보고, 처음 발견한 버그라면 질문해보도록 한다. 만약 정상적이지 않은 문제로 보인다면 브라우저 제공자의 버그 추척 시스템([Mozilla](https://bugzilla.mozilla.org/), [WebKit](https://bugs.webkit.org/), [Blink](https://www.chromium.org/issue-tracking/), [Opera](https://bugs.opera.com/login.jsp))에 보고된 버그인지 확인해본다.
- 특정 기능의 존재 여부를 체크하려고 하는가?
  - 몇몇 브라우저에서 지원하지 않는 기능을 사이트에서 사용하고자 할 때, 그 유저들을 기능은 더 적지만 작동할 것임이 분명한 옛 버전의 웹 사이트로 보내고 싶을텐데, 결국에는 언젠가 해당 브라우저에서 그 기능이 동작할 것임을 알고 있는 상황이다. 이런 상황이 user agent를 이용한 브라우저 감지를 사용하는 가장 나쁜 케이스인데, 몇몇 브라우저에서 지원하지 않는 기능들도 결국에는 지원하는 방향이 될 것이기 때문이다. 또한 비교적 인기가 덜한 브라우저의 웹 기능까지 모두 테스트하는 것은 실용적이지 않다. 이런 경우에는 user agent를 사용한 탐지를 절대 피해야 한다. 언제나 기능을 탐지할 수 있는 대안이 존재하기 때문이다.
- 사용하는 브라우저에 따라 다른 HTML을 제공해야 하는가?
  - 보통 이런 것은 나쁜 방법이지만 필요한 경우가 있다. 필요에 의해 사용해야 한다면 _먼저 정말로 이렇게 해야하는지 당신이 처한 상황에 대해 분석해보아야 한다._ non-semantic 요소인 `<div>, <span>` 등을 추가하여 피할 수 있는 방법이 있을까? user Agent 감지를 성공적으로 하는 것의 어려움은 HTML의 순수성을 혼란스럽게 할 수 있다. 또한 디자인에 대해 다시 생각해보아야 한다. 브라우저별로 다른 HTML을 사용할 필요성을 없애기 위해 점진적 향상을 고려하거나 가변 레이아웃(fluid layouts)를 사용할 수 있는가?

## user agent 사용을 대신할 방법

### 모바일 장치 감지

틀림없이 user agent의 가장 흔한 사용 및 오용은 디바이스가 모바일 디바이스인지 여부를 감지하는 것이다. 그러나 사람들은 정말로 해야하는 것이 무엇인지 간과하기 쉽다. 사람들은 user agent를 사용해서 유저의 디바이스가 터치 친화적(touch-friendly)인지 작은 스크린에서도 그에 따라 웹사이트를 최적화할 수 있는지 여부를 감지한다. user agent가 때때로 이런 것을 감지할 수 있지만 모든 디바이스에 대해 동일한 것은 아니다. 일부 모바일 장치는 큰 스크린을 가진 경우가 있고, 일부 데스크톱은 작은 터치스크린을 가진 경우가 있다. 어떤 사람은 smart TV를 쓰기도 하고, 또 어떤 사람들은 태블릿을 옆으로 움직여서 화면의 높이와 너비를 동적으로 변경할 수도 있다. 그러므로 user agent의 사용은 확실히 올바른 방법은 아니다. 그리고 더 좋은 대안이 있다.
`Navigator.maxTouchPoints`을 사용해서 유저가 터치스크린을 가졌는지 여부를 감지한다. 그런 다음 `if (!("maxTouchPoints" in Navigator)) { /*Code here*/}.`한 경우에만 기본적으로(default) user agent 화면을 확인한다. 이 정보를 통해 어떤 디바이스가 터치스크린을 가졌는지 여부를 확인하고, 이를 사용해서 전체 레이아웃을 변경하지 않고 오직 터치 스크린일 경우에 대해서만 특정 작업을 더 만들거나 유지 관리를 할 수 있다. 예를 들어, 좀 더 크고, 클릭하기 쉬운 버튼과 같은 touch 편의성(convenience)을 추가한다. 이를 위해서 스크린 사이즈에 따라 단순하게 `window.innerWidth`와 `window.addEventListener("resize", function(){ /_refresh screen size dependent things_/ }).`를 사용하면 된다. 스크린 사이즈를 위해 해야하는 일은 작은 화면에서 보여줘야할 정보를 줄이는 것이 아니다. 이런 방법은 사람들에게 데스크톱 버전을 사용하도록 강제하는 것이기 때문에 짜증만 날 뿐이다. 이보다는 작은 스크린의 긴 페이지에서는 더 적은 열(columns)의 정보를 갖도록 하고, 더 큰 스크린의 짧은 페이지에서는 더 많은 열(cloumns)를 갖도록 한다. 이러한 효과는 CSS flexbox를 이용해서 쉽게 얻을 수 있다. 그리고 항상 코드를 동적으로 만들어야 한다. 유저는 모바일 디바이스를 옆으로 움직여서 페이지의 너비와 높이를 바꿀 수 있다. 그렇기 때문에 웹 페이지가 부드럽고 유동적이며 동적으로 크카가 조정되는 동안 개발자 도구를 열어서 화면 크기를 조정할 수 있을 때까지 웹 페이지에 만족하지 않도록 한다.

---

_References_
[User agent](https://developer.mozilla.org/en-US/docs/Glossary/User_agent)
[Browser detection using the user agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent)
