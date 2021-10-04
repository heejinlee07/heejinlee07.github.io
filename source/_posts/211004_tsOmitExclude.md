---
title: A difference between TypeScript Omit and exclude
date: 2021-10-04
tags: TypeScript
---

## Keyof Type Operator

Keyof Type Operator는 객체타입을 취하여 key인 stirng 또는 numeric 리터럴 유니언을 생성한다. 아래 예시에서 `type P`는 `“x” | “y”`인 타입과 같다.

```javascript
type Point = { x: number; y: number };
type P = keyof Point;
//type P = “x” | “y”
```

type이 string, 또는 number 인덱스 시그니처가 있으면 keyof가 이 types를 대신 반환한다.

```javascript
type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type A = number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;
```

이 예시에서 `M`은 `string | number`이다. 이는 JavaScript object keys가 언제나 string로 강제전환되기 때문이다. **그래서 `obj[0]`은 언제나 `obj["0"]`과 같다.** `keyof`타입은 `mapped types`와 결합해서 사용할 때 특히 유용하다.

---

## Omit\<Type, Keys>

`Type`에서 type을 구성하는 모든 속성을 선택하여 `keys`에 의해 제거될 수 있도록 한다. (key는 string 리터럴이거나 string 리터럴의 유니언이다.)

```javascript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, "description">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};

todo;

const todo: TodoPreview

type TodoInfo = Omit<Todo, "completed" | "createdAt">;

const todoInfo: TodoInfo = {
  title: "Pick up kids",
  description: "Kindergarten closes at 5pm",
};

todoInfo;

const todoInfo: TodoInfo
```

---

## Exclude\<Type, ExcludedUnion>

`Type`으로부터 type을 제외하고 모든 union 멤버가 `ExcludedUnion`으로 할당될 수 있도록 한다.

```javascript
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;

type T0 = 'b' | 'c';
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;

type T1 = 'c';
type T2 = Exclude<string | number | (() => void), Function>;

type T2 = string | number;
```

---

## Omit vs Exclude

아래 `StudentInfo`에 대해 Omit과 Exclude를 사용해보면 어떻게 될까?

```javascript
interface StudentInfo {
  isStudent: boolean
  firstName?: string
  lastName?: string
}
```

### StudentInfo라는 type에 Omit을 사용해보면 다음과 같다.

```javascript

interface OmitStudentData {
  age: number
  studentName: keyof Omit<StudentInfo, 'lastName'>
  memo: string
}
```

> type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }

Omit은 object type인 `StudentInfo`를 취해서 type 중 특정한 타입을 제거한다. 여기서 StudentInfo의 속성 `{ isStudent: boolean, firstName?: string, lastName?: string }`중 key가 'lastName'인 속성을 제거하고자 했다. 따라서 결과는 아래와 같다.

```javascript
interface StudentInfo {
  isStudent: boolean
  firstName?: string
}
```

---

### StudentInfo라는 type에 Exclude를 사용해보면 다음과 같다.

```javascript
interface ExcludeStudentData {
  age: number
  studentName: Exclude<keyof StudentInfo, 'lastName'>
  memo: string
}
```

> type Exclude<T, U> = T extends U ? never : T

Exclude는 union 멤버의 구성요소를 제거한다. 여기서 Exclude는 Union Type을 취해서 StudentInfo의 Union Type은 `Exclude<'isStudent' | 'firstName' | 'lastName' | 'lastName'>`와 같은 형태가 되는데, `'lastName'`을 제외한 나머지 `<'isStudent' | 'firstName'>`이 union 멤버가 된다. 따라서 결과는 아래와 같다.

```javascript
interface StudentInfo {
  isStudent: boolean
  firstName?: string
}
```

**_Omit, Exclude를 쓴 결과는 동일하지만 과정상 Omit은 특정 속성을 제거한 결과를 제공한다는 점, Exclude는 속성을 제거하는 것이 아니라 특정 Union Type을 제외한 나머지 Union Type을 제거한다는 차이가 있다._**

---

_References_
[The keyof type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html#the-keyof-type-operator)
[Omit<Type, Keys>](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys)
[Exclude<Type, ExcludedUnion>](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion)
[Difference b/w only Exclude and Omit (Pick & Exclude) Typescript](https://stackoverflow.com/questions/56916532/difference-b-w-only-exclude-and-omit-pick-exclude-typescript)
