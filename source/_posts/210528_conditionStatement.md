---
title: 조건문
date: 2021-05-28
tags: C#
---

## 조건문

- 조건이 만족하면 if문 아래에 있는 중괄호 코드를 실행한다.
- 조건은 x와 같은 변수의 값에 따라서 참이나 거짓을 판별할 수 있는 식이나 문장을 의미.
- 조건식은 참이나 거짓을 반환해야 한다. 이러한 조건식을 `불리언 표현식`라고 말한다.

```
if(조건식)
{
	조건이 만족하면 실행하는 코드
}
```

### 구문과 표현식의 관계

- 구문: 한 줄 이상의 코드로 실행되는 집합. (구문 안에는 한 개 이상의 표현식이 포함될 수 있다.)
- 표현식: `평가`되며 void를 포함하여 값을 반환한다. (단, 일부 표현식은 단독으로 사용할 수 없다.)

## 관계(비교) 연산자

- `==` : 좌우항의 값이 같은가? => 같으면 참, 다르면 거짓 => 반환값은 `true`
- `!=` : 좌우항의 값이 다른가? => 같으면 거짓, 다르면 참 => 반환값은 `false`
- `<` : 좌항의 값이 더 작은가? => 작으면 참, 크거나 같으면 거짓 => 반환값은 `true`
- `<=` : 좌항의 값이 작거나 같은가? => 작거나 같으면 참, 크면 거짓 => 반환값은 `true`
  - `주의` : <u>`=<`는 존재하지 않는다. 사용 시 에러 발생.</u>
- `>` : 좌항의 값이 더 큰가? => 크면 참, 작거나 같으면 거짓 => 반환값은 `false`
- `>=` : 좌항의 값이 크거나 같은가? => 크거나 같으면 참, 작으면 거짓 => 반환값은 `true`
  - `주의` : <u>`=>`는 존재하지 않는다. 사용 시 에러 발생.</u>

## if/else 문

> if 문의 조건식이 참이 아닐 때 수행한다.

```
if(조건식)
{
	조건이 만족할 때만 실행하는 코드
}
else
{
	조건이 만족하지 않을 때만 실행하는 코드
}
```

## if/else if 문

```
if(조건식 A)
{
	조건식 A가 참일 때만 실행
}
else if(조건식 B)
{
	조건식 A가 거짓이고, 조건식 B가 참일 때만 실행
}
else if(조건식 C)
{
	조건식 A와 B가 거짓이고, 조건식 C가 참일 때만 실행
}
```

### if/else if문 조건식을 만들 때 주의사항

_조건문의 순서가 올바른지, 논리적으로 말이 되는지 확인한다._ 아래 예시에서 score가 95라고 가정해보았을 때, 첫번 째 만나는 if문의 조건 `(score >= 70)`을 만족하기 때문에 아래 있는 else if문은 돌지 않고 그대로 코드가 종료된다. 순서를 올바르게 하려면 `(score >= 90)`이라는 조건이 가장 먼저 와야한다.

```c#
static void Main(strings[] args)
{
	int score = int.Parse(Console.ReadLine());

	if (score >= 70)
	{
	Console.WriteLine("first");
	}
	else if (score >= 80)
	{
	Console.WriteLine("second");
	}
	else if (score >= 90)
	{
	Console.WriteLine("third");
	}
}
```

## if/else if/else 문

```
if(조건식 A)
{
	조건식 A를 만족할 때만 실행하는 코드
}
else if(조건식 B)
{
	조건식 A를 만족하지 않고, 조건식 B를 만족할 때만 실행하는 코드
}
else
{
	조건식 A, B를 모두 만족하지 않을 때만 실행하는 코드
}
```

## 코딩 표준

- 공통된 규칙인 코딩 표준이 있어야 코드를 읽기 편하고, 코드 속에 있는 문제점을 발견하기 쉽다.
- `중괄호를 항상 사용한다`: if 문이 한 줄이면 중괄호를 생략할 수 있다. 하지만 이렇게 작성시 예상치 못한 에러를 만들 수 있기 때문에 사용을 지양하도록 한다.

```c#
if (score >= 90 ) Console.WriteLine("hi");
```

만약 아래와 같이 코드를 수정하고, `score >= 90` 일 때만 hi, bye 두 글자가 출력되도록 의도했다고 가정한다. **만약 score에 70이 입력되었다면** `score >= 90`이라는 주어진 if문의 조건을 만족하지 못하기 때문에 hi, bye라는 글자가 출력될 수 없다. if 문이 중괄호를 생략할 수 있 수 있는 경우는 if 문의 코드가 한 줄일 때만 해당하기 때문에 score가 70점인데도 bye라는 글자가 출력되게 된다.

```c#
if (score >= 90 )
	Console.WriteLine("hi");
	Console.WriteLine("bye");

//score가 70점 일 때 아래와 같이 인식되기 때문에 bye가 출력되는 것이다.
if (score >= 90 )
{
Console.WriteLine("hi");
}
Console.WriteLine("bye");
```

- `세미콜론이나 중괄호로 실행 단위를 결정한다`: 줄 바꿈으로 범위를 제어하려고 하지 않는다.
  - 중괄호의 위치는 정해져 있지 않다. 아래 예시의 두 가지 모두 옳은 방법이다. 하지만 2️⃣번보다는 1️⃣번이 가독성이 좋으므로 이렇게 쓰는 것이 추천된다.
  - Visual Studio에서 ctrl + K + D를 누르면 새로운 줄에서 중괄호가 시작되는 방식으로 자동으로 포맷팅해준다.

```c#
//1️⃣
if (score >= 90 )
{
Console.WriteLine("hi");
}

//2️⃣
if (score >= 90 ) {
Console.WriteLine("hi");
}
```

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)