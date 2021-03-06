---
title: 전역 변수의 문제점
date: 2020-02-27
tags:
---

## 변수의 생명 주기

변수는 자신이 선언된 위치에서 생성하고 소멸된다.

- `전역변수`: **전역 변수의 생명 주기 = 어플리케이션의 생명 주기.** 전역변수는 런타임 이전에 코드가 어디 있던지 상관 없이 가장 먼저 실행된다.
- `지역변수`: 함수 내부에 선언된 지역 변수는 함수 호출 시 생성되어 함수가 종료되면 소멸된다. _따라서 함수를 호출하지 않으면 함수 내부의 변수 선언문은 실행되지 않는다._ 지역변수는 함수가 호출된 직후 함수 몸체의 다른 코드가 실행되기 이전에 먼저 실행된다.

### 지역 변수의 생명 주기 = 함수의 생명 주기

```javascript
function foo() {
  var x = "local";
  console.log(x); // local
  return x;
}

foo();
console.log(x); // ReferenceError: x is not defined
```

함수 내부에 선언된 지역 변수 x는 foo 함수가 호출되어 실행되는 동안에만 유효하다.

> 호이스팅: 스코프를 단위로 동작
> `전역 변수 호이스팅`: 전역 변수의 선언이 전역 스코프의 선두로 끌어올려진 것처럼 동작
> `지역 변수 호이스팅`: 지역 변수의 선언이 지역 스코프의 선두로 끌어올려진 것처럼 동작

```javascript
var x = "global";

function foo() {
  console.log(x); //여기 위치한다면 x는 undefined
  var x = "local";
  console.log(x); // 여기 위치하면다면 x는 local
  return x;
}

foo();
console.log(x); // global
```

전역 변수는 런타임 이전에 가장 먼저 실행되고, **지역 변수는 함수 몸체의 다른 문들이 실행되기 전에 변수 x가 선언되어 undefined로 초기화된다.** 따라서 변수 할당문이 실행되기 이전에는 `undefined`, 할당문이 실행된 후에는 할당된 값이 출력된다.

---

### 전역 변수의 생명 주기

전역 코드는 함수 호출과 같이 전역 코드를 실행하는 특별한 `진입점(entry point)`이 없고 코드가 로드되자마자 곧바로 해석되고 실행된다. 전역 코드에는 return 문을 사용할 수 없으므로 마지막 문이 실행되어 더 이상 실행할 문이 없을 때 종료한다. _전역 변수는 전역 객체의 프로퍼티가 되기 때문에 전역 변수의 생명 주기는 전역 객체의 생명 주기와 일치한다._ 전역 객체(Global Object)는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체이다.

`전역 객체`
코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체

- 브라우저: window
- Node.JS: global
  (window와 global을 합친 globalThis도 있다.)

모든 전역함수는 전역스코프에 등록되고, 복잡한 과정을 거쳐 전역객체의 메소드가 된다.

### 전역 변수의 문제점

- `암묵적 결합`: 모든 코드가 전역 변수를 참조하고 변경할 수 있다.
- `긴 생명 주기`: 메모리 리소스를 오랜 기간 소비하므로 의도치않은 재할당이 이루어질 수 있다.
- `느린 검색 속도`: **스코프 체인 상에서 종점에 존재**하기 때문에 변수를 검색할 때 가장 마지막에 검색된다.
- `네임 스페이스 오염`: 파일이 분리되어 있어도 하나의 전역 스코프를 공유하므로 다른 파일 내에 동일한 이름의 변수나 함수가 같은 스코프 내에 있다면 예상치 못한 결과가 있을 수 있다.

```javascript
var x = 1;

//코드가 여러 줄 있다고 가정.

var x = 2;

console, log(x); //2
```

전역변수는 생명주기가 길고, 전역 어디에서든 참조할 수 있으므로 의도치않게 값을 변경할 가능성이 높다. 위와 같이 `var x = 1;`이라고 선언한 후, 여러 줄의 코드를 작성했다고 가정했을 때, `var x`로 선언된 것을 모르고, 다시 한번 `var x`를 선언하면, **var는 중복선언을 허용하기 때문에 값이 재할당되는 부작용이 발생한다.** 즉, `var x = 1;`이라고 선언한 후 `var x =2;`라고 다시 한번 중복 선언하게 되면 `x =2;`인 것처럼 동작하여 기존 변수에 값을 재할당한다. 하지만 `var x;`와 같이 사용하면 이는 무시된다.

## 전역 변수 사용 억제 방법

전역 변수가 필요한 특별한 이유가 없다면 변수의 스코프는 좁을수록 좋기 때문에 `지역 변수`를 사용한다.

1. `즉시 실행 함수`: 함수 정의와 동시에 단 한 번 호출되는 함수. 모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역 변수가 된다.

```javascript
(function () {
  console.log("hello!");
})();
//따로 호출하지 않아도 바로 실행되어 "hello!"라는 값을 반환한다.
```

2. 전역에 네임 스페이스(Namespace) 역할을 담당할 `객체를 생성`하고 전역 변수처럼 사용하고 싶은 변수를 프로퍼티로 추가
3. 모듈 패턴: 클래스를 모방하여 관련이 있는 변수와 함수를 모아 즉시 실행 함수로 감싸 하나의 모듈을 만든다.
4. ES6 모듈: 파일 자체의 독자적인 모듈 스코프를 제공한다. script태그에 `type="module"`를 추가한다.
   ```html
   <script type="module" src="app.mjs"></script>
   <!-- 확장자는 mjs를 쓰는 것이 좋다.  -->
   ```

---

_References_
[poiemaweb](https://poiemaweb.com/fastcampus/global-variable)
