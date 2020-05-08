---
title: 비동기 처리
date: 2020-05-08 13:00
tags:
---

### 동기식 처리

task를 순서대로 처리하여 실행 순서가 직관적이지만 앞선 task가 종료되기 전까지 이후 task들은 대기하여야 한다는 단점이 있다.

```javascript
// 콜백함수는 인수로 함수를 넘겨줄 수 있다.
function fakeSetTimeout(callback, delay) {
  callback();
}

console.log(0);
fakeSetTimeout(function () {
  console.log("hello");
}, 0);
console.log(1);
```

함수를 호출하면 실행 컨텍스트가 실행되고 이는 스택에 푸시되는데, 함수 코드의 실행이 종료되면 실행 컨텍스트 스택에서도 팝되어 제거된다. 함수의 실행순서는 이 스택으로 관리되는데 자바스크립트 엔진은 *단 하나의 실행 컨텍스트 스택을 갖는다.*따라서 실행 중인 하나의 함수가 실행될 동안에 다른 함수는 실행할 수 없고, 현재 실행 중인 함수가 모두 종료되어야 다음 함수가 실행될 수 있다. 이처럼 한 번에 하나의 task만 실행할 수 있는 것을 *싱글스레드*방식이라고 한다. 위의 콜백 함수는 동기식 처리이고, 순차적으로 실행된다. 따라서 메인함수가 호출되어 실행되면 그 함수가 실행되고 종료되면, 그 다음 함수, 또 그 다음 함수 이런 방식으로 순서대로 console.log에 출력된다. 따라서 `0,hello,1`의 순서대로 console에 표시된다.

## 비동기식 처리

```javascript
console.log(0);
setTimeout(function () {
  console.log("hello");
}, 0);
console.log(1);
```

반면 비동기식 처리 모델은 싱글스레드인 자바스크립트의 단점을 보완해주는 것으로 현재 실행중인 함수가 아직 종료되지 않았더라도 그 다음 task를 곧바로 실행할 수 있다. setTimeout합수는 일정 시간이 경과한 후에 콜백 함수를 호출하는 것인데, setTimeout 함수를 호출한 후 아직 종료되지 않았어도 곧바로 console.log(1)을 실행할 수 있다. 따라서 위의 콜백함수는 `0,1,hello`의 순서대로 console에 출력된다. 참고로 setTimeout의 web API의 타이머에게 0초 뒤에 Queuedp 실행할 콜백함수를 넣어달라고 요청하는 것이다.

---

_Reference_
[poiemaweb/fastcampus](https://poiemaweb.com/fastcampus/async-programming)
[코드종](https://www.youtube.com/watch?v=j0Viy3v97gY&t=226s)
