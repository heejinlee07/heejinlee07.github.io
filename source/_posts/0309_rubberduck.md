---
title: 200309 패스트캠퍼스 러버덕 정리
date: 2020-03-09
tags:
---

`스코프란?`

- 식별자가 유효한 범위
- 자신이 선언된 위치에 의해 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정됨.
- 스코프 내에서 식별자는 유일해야 하지만 다른 스코프에는 동명의 식별자를 쓸 수 있다.

  - 단, var는 스코프 내의 동일한 식별자를 허용하는데, 이는 의도치 않은 재할당의 부작용이 있다. let, const는 같은 스코프 내의 중복선언을 허용하지 않는다.

```javascript
var x = "global";
let y = "global";
//전역변수

function foo() {
  var x = "local";
  var x = "local2";
  let y = "local";
  let y = "local2";
  console.log(x); //local2
}

foo();

console.log(x); //global
console.log(y); //SyntaxError: Identifier 'y' has already been declared
```

var는 스코프 내에서 중복선언을 허용하기 때문에 foo라는 함수의 스코프 내에서 var x를 중복선언한 경우 x = 'local2'로 재할당된 것과 같은 효과가 발생한다. 따라서 의도치 않게 var x의 값이 변경된다. 또한 var는 함수 레벨 스코프를 가지기 때문에 foo 함수 내에서 선언된 변수는 함수 내에서만 유효하다. 따라서 함수 외부에서 console.log(x)를 하면 전역에 선언된 var x의 값인 global이 출력된다.

하지만 let은 같은 스코프 내에 중복 선언을 허용하지 않기 때문에 console.log(y)를 하면 에러가 발생한다. 또한 let은 블록 스코프 레벨을 가지기 때문에 전역에 선언된 변수를 참조할 수 없다.

`전역스코프 vs 지역스코프`
전역스코프: 코드 가장 바깥 영역. 어디에서나(함수 내부 포함) 참조가능
지역스코프: 함수 몸체 내부. 자신이 선언된 지역과 하위지역에서만 참조가능. _지역변수를 전역에서 참조하면 에러가 발생한다._

전역 스코프 <- outer 함수 <-inner 함수

```javascript
var x = "global x";
var y = "global y";
//전역변수는 어디에서나 참조할 수 있음.

function outer() {
  var z = "outer's local z";
  console.log(x); //global x
  console.log(y); // global y
  console.log(z); // outer's local z

  function inner() {
    var x = "inner's local x";

    console.log(x); // inner's local x
    console.log(y); // global y
    console.log(z); // outer's local z
  }

  inner();
}
outer();

console.log(x); //global x
console.log(z); // referenceError
```

`블록 레벨 스코프 vs 함수 레벨 스코프`

- 블록 레벨 스코프: 모든 코드 블록(함수, if문, for문 등)을 지역 스코프로 인정한다.
- 함수 레벨 스코프: 함수의 코드 블록만 지역 스코프로 인정한다. _함수에 의해서만 지역스코프가 생성된다._

> 단, var로 선언된 변수는 코드 블록 내에 선언되었더라도 지역변수가 아닌 전역변수이다.

```javascript
var x = "global x";
let y = "global y";
var z = "global z";
let u = "global u";

if (true) {
  var x = "local x";
  console.log(x); //local x
  let y = "local y";
  console.log(y); //local y
}

function foo() {
  var z = "local z";
  console.log(z); //local z
  let u = "local u";
  console.log(u); //local u
}

foo();

console.log(x); //local x
console.log(y); //global y
console.log(z); //global z
console.log(u); //global u 전역에 u가 없으면 error 발생
```

```javascript
var x = "global x";
let y = "global y";
var z = "global z";
let u = "global u";

if (true) {
  var x = "local x";
  let y = "local y";
  console.log(x); //local x
  console.log(y); //local y
  console.log(z); //global z
  console.log(u); //global u
}
/*
코드블록 내에서 x를 참조하면 블록내에 지정된 local x가 반환되고, y도 마찬가지이다.
그러나 z,u는 코드 블록 내에 할당되어져 있지 않기 때문에 상위 스코프에 z와 u의 값이 있는지
탐색하고, 값이 있었기 때문에 global z,u의 값을 반환. 만약 여기서도 값이 없었다면 상위스코프로
탐색하러 갈 것.*/

function foo() {
  var z = "local z";
  let u = "local u";
  console.log(x); //local x
  console.log(y); //global y
  console.log(z); //local z
  console.log(u); //local u
}
/*
함수 내에 z,u는 지정되어 있기 때문에 local z, local u가 반환된다. 그러나 x,y는 없기 때문에
상위 스코프로 올라가 값이 있는지 탐색한다. 상위 스코프에 x값이 있기 때문에 local x라는 값을 반환하고,
y는 상위스코프에 값이 있지만, 'local y'를 반환하지 않는다. 왜그럴까?
let은 블록레벨 스코프이기 때문에 코드 블록을 지역 스코프로 인정한다. 상위 스코프인 if문에
있는 y의 값은 if문 내에서만 유효한 값이므로 밖에서 참조할 수 없다. 따라서 if문을 건너뛰고
그보다 상위스코프인 전역에 있는 global y의 값을 가져온다.*/

foo();

console.log(x); //local x
console.log(y); //global y
console.log(z); //global z
console.log(u); //global u 전역에 u가 없으면 error 발생

/*x는 먼저 상위 스코프인 foo함수 내에 x값이 있는지 찾은 후, 없기 때문에 그보다 상위스코프인 if문 내로
향한다. var는 함수레벨스코프를 가지므로 if문 내에 선언되어도 전역변수이기 때문에 어디서나 참조
가능하다. 그러나 y의 경우 let 블록 레벨 스코프이기 때문에 if문 내에 있는 값을 참조할 수 없고,
그보다 상위인 전역에 있는 global y의 값을 가져온다.

z는 상위 스코프인 foo 함수 내에 값이 설정되어 있어서 값을 참조할 수 있을 것 같지만 함수 내에
var로 선언되어 있기 때문에, 이 값은 함수 내에서만 유효하다. 따라서 그보다 상위에 있는 값을
찾아 올라가서 global z의 값을 가져온다. u역시 마찬가지이다. 만약 전역에 u나 z의 값이 없었다면
error가 발생했을 것이다.*/
```

`렉시컬 스코프`
함수는 어디서 `호출`했는지 혹은 어디서 `정의`되었는지에 따라 상위 스코프를 결정하는데 전자를 동적스코프, 후자를 정적 스코프라고 말한다. 자바스크립트는 정적 스코프를 따르고 이를 렉시컬 스코프라 부르기도 한다.

```javascript
var x = 1;

function foo() {
  var x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); //1
bar(); //1
```
