---
title: 비동기 처리
date: 2020-05-08
tags:
---

## Threads

Thread 는 기본적으로 프로그램이 작업을 완료하는데 사용할 수 있는 단일 프로세스로 각 스레드는 한 번에 하나의 작업만 수행할 수 있다. **자바스크립트는 싱글스레드이므로 컴퓨터가 여러 개의 CPU를 가지고 있어도 main thread라 불리는 단일 thread에서만 작업을 실행할 수 있다. 단 자바스크립트 엔진은 싱글 스레드로 동작, 브라우저는 멀티 스레드로 동작한다.**

그러나 다음과 같이 Web workers를 이용하여 하나의 Task가 끝나기 전까지 다음 Task가 Blocking되는 문제를 해결하였다. 여러 개의 작업을 동시에 실행할 수 있도록 시간이 오래 걸리는 처리는 worked thread에 보내서 처리하는 것이다.

- Main thread: Task A --> Task C
- Worker thread: Expensive task B

## 동기식 처리

현재 실행 중인 task가 종료될 때까지 다음에 실행될 task가 대기하는 방식이다. task를 순서대로 하나씩 처리하여 실행 순서가 직관적이지만 앞선 task가 종료되기 전까지 이후 task들은 대기하여야 한다는(블로킹) 단점이 있다.

- Block code: 웹 앱이 브라우저에서 특정 코드를 실행하느라 브라우저에게 제어권을 돌려주지 않으면 브라우저는 마치 정지된 것처럼 보이는 현상. 즉 사용자의 입력을 처리하느라 웹 앱이 프로세서에 대한 제어권을 브라우저에게 반환하지 않는 현상.

```javascript
// 콜백함수는 인수로 함수를 넘겨줄 수 있다.
function fakeSetTimeout(callback, delay) {
  callback();
}

console.log(0); //0
fakeSetTimeout(function () {
  console.log("hello"); //hello
}, 0);
console.log(1); //1
```

함수를 호출하면 실행 컨텍스트가 실행되고 이는 스택에 푸시되는데, 함수 코드의 실행이 종료되면 실행 컨텍스트 스택에서도 팝되어 제거된다. 함수의 실행순서는 이 스택으로 관리되는데 자바스크립트 엔진은 *단 하나의 실행 컨텍스트 스택을 갖는다.*따라서 실행 중인 하나의 함수가 실행될 동안에 다른 함수는 실행할 수 없고, 현재 실행 중인 함수가 모두 종료되어야 다음 함수가 실행될 수 있다. 이처럼 한 번에 하나의 task만 실행할 수 있는 것을 *싱글스레드*방식이라고 한다. 위의 콜백 함수는 동기식 처리이고, 위에서부터 아래로 순차적으로 실행된다. 따라서 메인함수가 호출되어 실행되면 그 함수가 실행되고 종료되면, 그 다음 함수, 또 그 다음 함수 이런 방식으로 순서대로 console.log에 출력된다. 따라서 `0,hello,1`의 순서대로 console에 표시된다.

---

## 비동기식 처리

자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 것이다. 이러한 처리가 필요한 이유는 화면에서 서버로 데이터를 요청했을 때, 서버에 보낸 용청에 대한 응답이 언제 돌아올지 모르고, 그러한 상황에서 다른 코드를 실행하지 않은 상태에서 마냥 기다릴 수 없기 때문이다. 비동기식 처리는 블로킹이 발생하지 않는다는 장점이 있으나 task의 실행 순서는 보장되지 않는다는 단점이 있다.

> 타이머 함수인 setTimeout과 setInterval, HTTP 요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다.

```javascript
console.log(0);
setTimeout(function () {
  console.log("hello");
}, 0);
console.log(1);
```

비동기식 처리 모델은 싱글스레드인 자바스크립트의 단점을 보완해주는 것으로 현재 실행중인 함수가 아직 종료되지 않았더라도 그 다음 task를 곧바로 실행할 수 있다. `setTimeout함수`는 일정 시간이 경과한 후에 콜백 함수를 호출하는 것인데, setTimeout 함수를 호출한 후 아직 종료되지 않았어도 곧바로 console.log(1)을 실행할 수 있다. 따라서 위의 콜백함수는 `0,1,hello`의 순서대로 console에 출력된다. 참고로 setTimeout의 web API의 타이머에게 0초 뒤에 Queue에 실행할 콜백함수를 넣어달라고 요청하는 것이다.

## 비동기식 처리의 문제점

1. Web worker는 DOM에 접근할 수 없기 때문에 UI 업데이트에 관한 지시를 할 수 없다.
2. worker에서 실행되는 코드는 차단되지 않지만 `동기적으로 실행`된다.
   순서대로 실행되는 task A, task B가 있다고 했을 때, A에서 작업된 결과를 B에서 return 받아서 써야하는 작업이 필요하다면 A에서의 처리 결과를 반환받기 전에 B가 실행되면 에러가 발생하는 문제점이 있다. 이러한 문제를 없애기 위해 _특정 작업을 비동기로 처리하는 promise를 사용하는 것이다._

<u>비동기 처리는 Event Loop, Task Quaue와 관련있다.</u>

---

## 동시성 모델과 Event Loop, 자바스크립트 엔진과 브라우저 환경의 구조

![MDN](https://developer.mozilla.org/files/4617/default.svg)
[출처]:MDN
자바스크립트는 코드 실행, 이벤트 수집과 처리, 큐에 놓인 하위 작업들을 담당하는 이벤트 루프에 기반한 동시성(concurrency) 모델을 가지고 있다.

## Call Stack

LIFO: Last In First Out
자바스크립트는 단 하나의 콜 스텍을 사용한다. 실행 컨텍스트가 추가되고 제거되는 곳이 콜 스텍이다. 스텍에 실행 컨텍스트가 생성되면 현재 실행 중인 컨텍스트가 종료되어 제거되기 전까지 다른 task는 실행되지 못하고 대기하여야 한다.

## Heap

객체가 저장되는 곳이다. 동적인 데이터를 저장하는 규모가 큰 구조화되지 않은 자료구조라고 볼 수 있다. Heap에 의해 점유된 메모리는 Javascript Code가 실행이 완료된 후에도 존재하며, 이후 JS Garbage Collector에 의해 제거된다.

> Call Stack, Heap: 동기적 처리
> Web API, Queue, Event Loop: 비동기적 처리(브라우저 또는 Node.js가 담당)

## Web API

브라우저에서 제공하는 API. DOM API와 타이머 함수, HTTP 요청(Ajax)과 같은 비동기 처리를 포함. Call Stack에서 비동기 함수가 실행되면 Web API를 호출하고(호출만 가능), Queue에서 대기하다가 Call Stack이 비었을 때 push 되어 실행된다.

## Queue

FIFO: First In First Out
setTimeout이나 setInterval과 같은 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역. 여기서 task가 대기하고 있다가 콜 스텍이 비워졌을 때 실행되며, 가장 처음에 들어온 것부터 실행된다.

## Event Loop

Call Stack과 Queue를 반복해서 확인하는 감시자 역할. 감시하다가 Call Stack이 비어있고, Queue에 대기 중인 함수가 있다면 FIFO로 Queue에 있는 함수를 Call Stack로 이동시켜 실행한다.

---

_References_
[poiemaweb](https://poiemaweb.com/fastcampus/async-programming)
[코드종](https://www.youtube.com/watch?v=j0Viy3v97gY&t=226s)
[MDN](https://developer.mozilla.org/ko/docs/Learn/JavaScript/Asynchronous/Concepts)
[CAPTAIN PANGYO](https://joshua1988.github.io/web-development/javascript/javascript-asynchronous-operation/)
[자바스크립트는 어떻게 작동하는가: 이벤트 루프와 비동기 프로그래밍의 부상, async/await을 이용한 코딩 팁 다섯 가지](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e)
