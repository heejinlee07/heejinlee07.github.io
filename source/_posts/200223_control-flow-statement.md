---
title: 제어문 / Control flow statement
date: 2020-02-22 21:58:42
tags:
---

## 제어문

주어진 조건에 따라 코드 블록을 실행(조건문)하거나 반복 실행(반복문)할 때 사용한다. 일반적으로 코드는 위에서 아래 방향으로 순차적으로 실행된다. 제어문을 사용하면 코드의 실행 흐름을 인위적으로 제어할 수 있다.

## 블록문 (Block statement/Compound statement)

0개 이상의 문을 중괄호로 묶은 것으로 코드 블록 또는 블록이라고 부르기도 한다. 자바스크립트는 블록문을 하나의 실행 단위로 취급한다.

`문의 끝에는 세미 콜론(;)을 붙이는 것이 일반적이지만 블록문의 끝에는 세미콜론을 붙이지 않는다는 것에 주의한다.`

```javascript
// 블록문
{
  var foo = 10;
  console.log(foo);
}

//제어문
var x = 0;
while (x < 10) {
  x++;
}
console.log(x); // 10
```

## 조건문 (conditional statement)

주어진 조건식(conditional expression)의 평가 결과에 따라 코드 블럭(블록문)의 실행을 결정한다. _조건식은 불리언 값으로 평가될 수 있는 표현식이다._

### if...else문

주어진 조건식(불리언 값으로 평가될 수 있는 표현식)의 평가 결과, 즉 논리적 참 또는 거짓에 따라 실행할 코드 블록을 결정한다. 조건식의 평가 결과가 참(true)일 경우, if 문 다음의 코드 블록이 실행되고 거짓(false)일 경우, else 문 다음의 코드 블록이 실행된다.

```javascript
if (조건식) {
  // 조건식이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식이 거짓이면 이 코드 블록이 실행된다.
}
```

조건식을 추가하여 조건에 따라 실행될 코드 블록을 늘리고 싶으면 else if 문을 사용한다.

### else if문

```javascript
if (조건식1) {
  // 조건식1이 참이면 이 코드 블록이 실행된다.
} else if (조건식2) {
  // 조건식2이 참이면 이 코드 블록이 실행된다.
} else {
  // 조건식1과 조건식2가 모두 거짓이면 이 코드 블록이 실행된다.
}
```

> else if 문과 else 문은 옵션이다. 즉, 사용할 수도 있고 사용하지 않을 수도 있다. if 문과 else 문은 2번 이상 사용할 수 없지만 else if 문은 여러 번 사용할 수 있다.

```javascript
var num = 2;
var kind;

if (num > 0) {
  kind = "양수";
} else if (num < 0) {
  kind = "음수";
} else {
  kind = "영";
}
console.log(kind); // 양수
```

if...else문은 아래와 같이 삼항 조건 연산자로 바꿔 쓸 수 있다. 삼항 조건 연산자의 구조는 `조건식 ? 조건식이 true일때 반환할 값 : 조건식이 false일때 반환할 값`이다.

```javascript
var num = 2;
var kind = "";

if (num > 0) {
  kind = "양수";
} else if (num < 0) {
  kind = "음수";
} else {
  kind = "영";
}
console.log(kind); //양수
```

단, 삼항 조건 연산자는 값으로 평가되는 표현식을 만들기 때문에 변수에 할당이 가능하고, if...else문은 표현식이 아닌 문이기 때문에 변수에 할당이 불가하다.

### switch문

먼저 주어진 해당 표현식을 평가하고, 입력한 표현식과 동일한 값으로 평가되는 표현식을 찾는다.(엄격비교가 이루어진다, ===) 그리고 일치하는 case 문으로 실행 순서를 이동시킨 후 해당 case의 문(statement)을 실행한다. case문은 값을 지정한 후 콜론으로 마치고, 그 후에는 실행될 문이 온다.

만약 switch문의 표현식과 일치하는 case를 찾지 못하면 실행 순서는 default문으로 이동하고 해당 문을 실행한다. default는 보통 가장 마지막에 위치하며, 옵션이므로 사용할 수도 있고 사용하지 않을 수도 있다. 만약 default문이 없다면 switch문이 종료될 때까지 계속 실행된다.

```javascript
switch (표현식) {
  case 값1:
    switch 문의 표현식과 값1과 일치하면 실행될 문;
    break;
  case 값2:
    switch 문의 표현식과 값2와 일치하면 실행될 문;
    break;
    case 값N:
    switch 문의 표현식과 값N과 일치하면 실행될 문;
    break;
  default:
    switch 문의 표현식과 일치하는 표현식을 갖는 case 문이 없을 때 실행될 문;
}
```

```javascript
const expr = "Papayas";

switch (expr) {
  case "Oranges":
    console.log("Oranges are $0.59 a pound.");
    break;
  case "Mangoes":
  case "Papayas":
    console.log("Mangoes and papayas are $2.79 a pound.");
    // expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
    console.log("Sorry, we are out of " + expr + ".");
}
```

위 switch문은 먼저 주어진 표현식 `const expr = "Papayas";`를 평가하고, 동일한 값으로 평가되는 표현식을 찾는다. 따라서 값이 일치하는 `case "Papayas":`로 실행순서가 이동하며, 지정된 문을 실행한다. 따라서 `"Mangoes and papayas are $2.79 a pound."`라는 값을 실행하고, `break`가 있기 때문에 코드 블록을 탈출한다.

_`break`를 쓰지 않으면 어떻게 될까?_

`폴스루(fall through)`현상이 발생한다. 표현식과 동일한 case문을 실행한 후 switch문을 탈출하지 않고 switch문이 끝날 때까지 이후의 모든 case문과 default문을 실행하는 것을 말한다.

---

## 반복문 (Loop statement)

주어진 조건식의 평가 결과가 참인 경우 코드 블럭을 실행한 후 조건식을 다시 검사하여 여전히 참인 경우 코드 블록을 다시 실행한다. 이는 조건식이 거짓일 때까지 반복된다.

### for문

조건식이 거짓으로 판별될 때까지 코드 블록을 반복 실행한다.

```javascript
for (변수 선언문 또는 할당문; 조건식; 증감식) {
  조건식이 참인 경우 반복 실행될 문;
}

for (var i = 0; i < 5; 1++) {
  console.log(i);
}
```

- 변수 선언문은 for문을 실행했을 때 처음 단 한번만 실행된다.
- 선언문 실행 후 조건식으로 순서가 이동한 후 값이 true라면 코드 블록으로 이동하여 코드를 실행한다. false라면 for문의 실행이 종료된다.
- 코드 블록으로 이동하여 실행한 후 실행이 종료되면 증감식으로 이동하여 i를 1 증가한다.
- 증감식 실행 후 다시 조건식으로 이동하여 값을 평가한다. 조건식이 false가 될 때까지 순서에 따라 실행을 반복한다.

### while문

while 문은 주어진 조건식의 평가 결과가 참이면 코드 블록을 계속해서 반복 실행한다. 조건문의 평가 결과가 거짓이 되면 실행을 종료한다. 단, 조건식의 평가 결과가 언제나 참이면 무한루프가 된다.

```javascript
var count = 0;

// count가 3보다 작을 때까지 코드 블록을 계속 반복 실행한다.
while (count < 3) {
  console.log(count);
  count++;
} // 0 1 2
```

### do...while문

코드 블록을 먼저 실행하고 조건식을 평가한다. 따라서 코드 블록은 무조건 한번 이상 실행된다.

---

## break문

이블 문, 반복문(for, for…in, for…of, while, do…while) 또는 switch 문의 코드 블록을 탈출한다. 레이블 문, 반복문, switch 문의 코드 블록 이외에 break 문을 사용하면 SyntaxError(문법 에러)가 발생한다.

```javascript
if (true) {
  break; // Uncaught SyntaxError: Illegal break statement
}
```

## continue문

반복문의 코드 블록 실행을 현 지점에서 중단하고 반복문의 증감식으로 이동한다. break 문처럼 반복문을 탈출하지는 않는다.

---

_Reference_
[Poiemaweb/fastcampus](https://poiemaweb.com/fastcampus/control-flow)
[MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/switch)
