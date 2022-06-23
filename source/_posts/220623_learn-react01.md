---
title: 러닝 리액트 - 02. 리액트를 위한 자바스크립트

date: 2022-06-23
tags:
---

## 02. 리액트를 위한 자바스크립트

### 변수 선언하기

- ES2015이전: var를 사용한 변수 선언
- ES2015이후(ES6): let, const를 키워드 추가

### const 키워드

> 값을 변경할 수 없는 `상수값` 선언에 사용

값을 변경하려고 시도하면 콘솔창에서 에러가 발생한다.

```javascript
//var: var로 선언된 변수는 값의 변경 가능
var pizza = true;
pizza = false;
console.log(pizza);

//const: 값의 변경 불가, 에러 발생

const pizza = true;
pizza = false;
```

### let 키워드

> 구문적인 변수 영역 규칙(lexical variable scoping)의 지원

자바스크립트는 중괄호({})를 사용해서 코드 블록을 만드는데, 함수는 코드 블록이 별도의 변수 영역을 이루지만 if/else나 for 문에서는 그렇지 않다.

```javascript
var topic = 'JavaScript';

if (topic) {
  var topic = 'React';
  console.log('block', topic); //block React
}

console.log('global', topic); //global React
```

위의 예제에서 if 블록 안의 topic 변수를 변경하면 if 밖에 있는 topic 변수도 같이 변경된다. 하지만 let을 사용하면 변수의 영역은 선언된 코드 블록 안으로 한정된다. 그러므로 아래 예제와 같이 var로 선언된 'JavaScript'변수는 var로 선언했을 때와 달리 변경되지 않은 채 유지된다. (코드 블록내에 let으로 선언된 변수에 한해서만 변경된다.)

```javascript
var topic = 'JavaScript';

if (topic) {
  let topic = 'React';
  console.log('block', topic); //block React
}

console.log('global', topic); //global javaScript
```

for구문의 경우도 마찬가지인데, 아래 예제는 컨테이너 안에 5개의 div를 만드는 예제이다. 여기서 i를 for 루프 안에서 선언해도 var로 선언했기 때문에 글로벌에 i 변수가 생기고, i가 5가 될 때까지 for 루프를 돈다. 그런데 i의 값이 글로벌 변수 i인 5이기 때문에 어떤 div 박스를 클릭해도 인덱스는 5로 표시된다.

```javascript
var div,
  container = document.getElementById('container');

for (var i = 0; i < 5; i++) {
  div = document.createElement('div');
  div.onclick = function () {
    alert('This is box #' + i);
  };
  container.appendChild(div);
  console.log(i);
}
console.log('global', i); //5
```

하지만 let으로 선언하면 i의 영역이 for문의 코드 블록 안으로 제한되기 때문에 각 박스를 클릭하면 동일하게 5가 표시되는 것이 아니라 해당하는 박스의 인덱스가 표시된다. 즉 let으로 i의 영역을 제한하는 것이다.

---

_References_
[러닝 리액트 2판](알렉스 뱅크스, 이브 포셀로 지음)
