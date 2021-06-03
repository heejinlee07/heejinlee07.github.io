---
title: 기본 타입
date: 2021-06-01
tags: typescript
---

Javascript는 예기치 않은 동작을 유발하게 하는 몇 가지 문제점을 가지고 있다. 예를 들어 `==`을 사용하면 인수를 강제변환한다거나(e.g. '' == 0 => 참이다) 존재하지 않는 객체의 프로퍼티 값에 접근하려고 했을 때 접근을 허용하는 점이다. c나 c++ 같은 컴파일 언어는 실행 전 컴파일 단계에서 오류를 미리 확인하고 고칠 수 있다. **이렇게 프로그램을 실행시키지 않으면서 코드의 오류를 검출하는 것을 정적 검사라 하고, 어떤 것이 오류인지와 어떤 것이 연산 되는 값에 기인하지 않음을 정하는 것을 정적 타입 검사라 한다.**

> 그러나 JavaScript는 인터프리터 언어이기 때문에 컴파일 단계가 없고, 곧바로 실행되기 때문에 실제로 실행하기 전까지 코드의 문제를 잡아낼 수 없다. 하지만 TypeScript는 정적 타입 검사자로써 프로그램 실행 전 값의 종류를 기반으로 프로그램의 오류를 찾아낸다.

## TypeScript

> TypeScript는 JS의 구문이 허용되는, JavaScript의 상위 집합 언어

- TS는 JS 위의 레이어: JS의 기능을 제공하면서 그 위에 자체 레이어를 추가한다.
- JS가 가진 `런타임 특성`을 변화시키지 않는다.
- TS의 컴파일러가 코드 검사를 마치면 타입 삭제 후 `컴파일된 코드`를 만들어낸다.

### 타입 추론

JavaScript가 동작하는 방식을 이해함으로써 TypeScript는 JavaScript 코드를 받아들이면서 타입을 가지는 타입 시스템을 구축할 수 있다.

### 타입 정의

JavaScript는 다양한 디자인 패턴을 가능하게 하는 동적 언어인데, 몇몇 디자인 패턴은 자동으로 타입을 제공하기 힘들다. 이럴 때는 TSㅇ에게 타입이 무엇이 되어야 하는지 명시 가능한 JS언어의 확장을 지원한다. 예를 들어 아래 예시에서 객체의 형태를 명시적으로 사용하기 위해 `interface` 선언했다.

```typescript
const user = {
  name: 'Hayes',
  id: 0,
};

interface User {
  name: string;
  id: number;
}
```

### 타입 구성

객체들을 조합하여 더 크고 복잡한 체계를 만드는 것처럼 TS는 유니언과 제네릭이 있다.

- 유니언: 타입이 여러 타입 중 하나일 수 있음을 설명한다. e.g. type MyBool = true | false;
- 제네릭: 타입에 변수를 제공하는 방법이다. 배열이 일반적인 예시이며, 제네릭이 없는 배열은 어떤 것이든 포함할 수 있다. 제네릭이 있는 배열은 배열 안의 값을 설명할 수 있다.

### 구조적 타입 시스템

TS의 핵심 원칙 중 하나로 타입 검사가 값이 있는 형태에 집중한다는 것이다. 만약 두 객체가 같은 형태를 가지면 같은 것으로 간주된다.

---

_References_
[TS for the New Programmer](https://typescript-kr.github.io/pages/tutorials/ts-for-the-new-programmer.html)
[TS for the JS Programmers](https://typescript-kr.github.io/pages/tutorials/ts-for-js-programmers.html)
