---
title: 비동기 처리
date: 2020-05-08 13:00
tags:
---

## Block code

웹 앱이 브라우저에서 특정 코드를 실행하느라 브라우저에게 제어권을 돌려주지 않으면 브라우저는 마치 정지된 것처럼 보이는 현상. 즉 사용자의 입력을 처리하느라 웹 앱이 프로세서에 대한 제어권을 브라우저에게 반환하지 않는 현상.

## Threads

Thread 는 기본적으로 프로그램이 작업을 완료하는데 사용할 수 있는 단일 프로세스로 각 스레드는 한 번에 하나의 작업만 수행할 수 있다. **자바스크립트는 싱글스레드이므로 컴퓨터가 여러 개의 CPU를 가지고 있어도 main thread라 불리는 단일 thread에서만 작업을 실행할 수 있다. 단 자바스크립트 엔진은 싱글 스레드로 동작, 브라우저는 멀티 스레드로 동작한다.**

> 그러나 다음과 같이 Web workers를 이용하여 하나의 Task가 끝나기 전까지 다음 Task가 Blocking되는 문제를 해결하였다.
> Main thread: Task A --> Task C
> Worker thread: Expensive task B
> 여러 개의 작업을 동시에 실행할 수 있도록 시간이 오래 걸리는 처리는 worked thread에 보내서 처리하는 것이다.

## 동기식 처리

task를 순서대로 처리하여 실행 순서가 직관적이지만 앞선 task가 종료되기 전까지 이후 task들은 대기하여야 한다는(블로킹) 단점이 있다.

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

---

## 비동기식 처리

> 타이머 함수인 setTimeout과 setInterval, HTTP 요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다.

```javascript
console.log(0);
setTimeout(function () {
  console.log("hello");
}, 0);
console.log(1);
```

반면 비동기식 처리 모델은 싱글스레드인 자바스크립트의 단점을 보완해주는 것으로 현재 실행중인 함수가 아직 종료되지 않았더라도 그 다음 task를 곧바로 실행할 수 있다. `setTimeout함수`는 일정 시간이 경과한 후에 콜백 함수를 호출하는 것인데, setTimeout 함수를 호출한 후 아직 종료되지 않았어도 곧바로 console.log(1)을 실행할 수 있다. 따라서 위의 콜백함수는 `0,1,hello`의 순서대로 console에 출력된다. 참고로 setTimeout의 web API의 타이머에게 0초 뒤에 Queue에 실행할 콜백함수를 넣어달라고 요청하는 것이다.

### 비동기식 처리의 문제점

1. Web worker는 DOM에 접근할 수 없기 때문에 UI 업데이트에 관한 지시를 할 수 없다.
2. worker에서 실행되는 코드는 차단되지 않지만 `동기적으로 실행`된다.
   순서대로 실행되는 task A, task B가 있다고 했을 때, A에서 작업된 결과를 B에서 return 받아서 써야하는 작업이 필요하다면 A에서의 처리 결과를 반환받기 전에 B가 실행되면 에러가 발생하는 문제점이 있다. 이러한 문제를 없애기 위해 _특정 작업을 비동기로 처리하는 promise를 사용하는 것이다._

>

---

_References_
[poiemaweb](https://poiemaweb.com/fastcampus/async-programming)
[코드종](https://www.youtube.com/watch?v=j0Viy3v97gY&t=226s)
[MDN](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Concepts)
