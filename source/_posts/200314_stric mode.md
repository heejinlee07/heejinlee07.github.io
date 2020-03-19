---
title: 엄격 모드 / Strict mode
date: 2020-03-14
tags:
---

## strict 모드의 적용

strict mode를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 'use strict';를 추가한다. 코드의 선두에 위치시키지 않는다면 제대로 동작하지 않는다.

```javascript
"use strict";

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();
```

- 전역에 적용한 strict mode는 스크립트 단위로 적용되므로, 다른 스크립트에 영향을 주지 않고 자신의 스크립트에 한정되어 적용된다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      "use strict";


    </script>
    <script>
      x = 1; // 에러가 발생하지 않는다.
      console.log(x); // 1
    </script>
  </body>
</html>
```
