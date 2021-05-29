---
title: 논리 및 조건 연산자
date: 2021-05-29
tags: C#
---

## 논리 연산자

> 논리연산자 AND와 OR은 비트 연산자 &, |와 비슷하다.

- `&&`: 좌항과 우항이 모두 참인가? => **좌항, 우항이 모두 참이면 참**, 하나라도 참이 아니면 거짓
- `||`: 좌항 혹은 우항이 하나라도 참인가? => **좌항, 우항 하나라도 참이면 참**, 둘 다 참이 아니면 거짓
- `!`: 단항 연산자, 우항의 불리언 결과를 반대로 만든다 => 우항이 거짓이면 참, 참이면 거짓이다.

### OR(||) 연산자

> 주의: if문 안의 표현식들이 종종 평가되지 않을 때가 있다.

```c#
if(1 + 1 == 2) || (1 + 2 == 2)
```

`if(1 + 1 == 2)`를 평가하면 `참`이므로 두번 째 표현식 `(1 + 2 == 2)`는 실행되지 않는다. OR 연산자는 `참 | 참 = 참`이거나 `참 | 거짓 = 참`이다. 따라서 앞의 결과가 참이면 뒤의 코드인 `1 + 2 == 2`는 실행하지 않는다. 즉 표현식 평가를 하지 않는다.

```c#
if(1 + 2 == 2) || (1 + 1 == 2)
```

위와 같이 순서를 바꾸었을 때 `(1 + 2 == 2)`를 평가하면 `거짓`이다. 위의 경우 OR연산자(||)는 `거짓 | 참 = 참` 또는 `거짓 | 거짓 = 거짓`의 조건이 가능하다. 즉 뒤의 코드인 `if(1 + 1 == 2)`를 평가해야 그 평가 결과에 따라 참 또는 거짓이 될 수 있다. 이 경우에는 뒤의 코드까지 표현식 평가를 진행해야 한다.

### AND(&) 연산자

```c#
if(1 + 1 == 2 && 1 + 2 == 2)
```

`(1 + 1 == 2)`는 표현식 평가 결과가 참이다. 하지만 AND연산자(&)는 `참 & 참 = 참` 또는 `참 & 거짓 = 거짓`의 조건이 가능한다. 즉 뒤의 코드인 `1 + 2 == 2`를 평가해야 그 평가 결과에 따라 참 또는 거짓이 될 수 있다. 따라서 뒤의 코드까지 표현식 평가를 진행해야 한다.

```c#
if(1 + 2 == 2 && 1 + 1 == 2)
```

`1 + 2 == 2`의 결과가 거짓이다. AND 연산자는 `거짓 & 참 = 거짓`이거나 `거짓 & 거짓 = 거짓`이다. 따라서 앞의 결과가 거짓이면 뒤의 코드인 `1 + 1 == 2`는 평가하지 않아도 된다.

### if문의 다른 표현법

아래 if 문의 `(!(a == b || c == d))`의 코드를 다른 방식으로 표현하면 `(a != b && c != d)`이다. 이것이 가능한 이유는 아래와 같다.

> `!(a == b) !(||) !(c==d)` => `!(a == b) == (a !== b)` => `!(||) == &&` => `!(c == d) == (c !== d)` => `(a != b && c != d)`

```c#
if(!(a == b || c == d))
{
  //do something
}

if(a != b && c != d)
{
  //do something
}
```

---

## if/else if/if 문과 논리

**<u>불필요한 연산을 피한다.</u>**

```c#
string scoreString = Console.ReadLine();
int score = int.Parse(scoreString);

if(score >= 90)
{
  Console.WriteLine("hello1");
}
if(score < 90 && score >= 80)
{
  Console.WriteLine("hello2");
}
if(score < 80 && score >= 70)
{
  Console.WriteLine("hello3");
}
```

위의 코드는 아래와 같은 형태로 바꿀 수 있다. 첫 번째 if문의 조건 `score >= 90`를 통과했다면 이미 90점 이상은 아닌, 미만이라는 뜻이다. 따라서 두번째 평가식에서 `score < 90 && score >= 80`와 같은 코드를 짤 필요가 없다. 참고로 Console.ReadLine();은 아래와 같이 변수 할당하지 않고 사용해도 된다.

```c#
string scoreString = Console.ReadLine();
int score = int.Parse(scoreString);

// score에서 바로 사용한다.
int score = int.Parse(Console.ReadLine());
```

```c#
string scoreString = Console.ReadLine();
int score = int.Parse(scoreString);

if(score >= 90)
{
  Console.WriteLine("hello1");
}
if(score >= 80)
{
  Console.WriteLine("hello2");
}
if(score >= 70)
{
  Console.WriteLine("hello3");
}
```

아래의 코드도 `else if`가 불필요하게 사용되었다.

```c#
string scoreString = Console.ReadLine();
int score = int.Parse(scoreString);

if( score >= 90 )
{
  Console.WriteLine("hello1");
}
else if (score < 90 && score >= 80)
{
  Console.WriteLine("hello2");
}
else if (score < 80 && score >= 70)
{
  Console.WriteLine("hello3");
}
```

아래의 코드는 완전히 잘못 구현한 조건식이다. score에 두 번째 조건식에 해당하는 80보다 크거나 같은 숫자, 세번 째 조건식에 해당하는 90보다 크거나 같은 숫자가 입력되면 두 숫자 모두 `score >= 70`의 조건을 만족하기 때문에 첫 번째 조건문에서 평가가 끝나버린다. 따라서 실행되고자 원했던 예상하는 if 조건문에 도달하지 못하게 된다.

```c#
string scoreString = Console.ReadLine();
int score = int.Parse(scoreString);

if(score >= 70)
{
  Console.WriteLine("hello1");
}
if(score >= 80)
{
  Console.WriteLine("hello2");
}
if(score >= 90)
{
  Console.WriteLine("hello3");
}
```

---

## 조건 연산자

> (불리언 표현식) ? 반환값1(불리언 표현식이 참) : 반환값2(불리언 표현식이 거짓)

- **조건 연산자를 다른 말로 삼항 연산자라 한다.**
- `?`와 `!`의 두 가지 기호를 사용한다.
- 불리언 표현식을 평가하여 참과 거짓일 때 서로 다른 반환값을 반환한다.
- 매우 간단한 비교를 할 때는 if/else 구문보다 훨씬 빠르다.
- **남용하면 가독성이 떨어지기 때문에 삼항 연산자 안에 삼항 연산자를 사용하는 식의 구조로 사용하지 않도록 한다.**

## 연산자 우선순위

- 수학과 마찬가지로 대부분 연산자 결합 순서는 왼쪽에서 오른쪽으로 결합한다.(결합법칙)
- 소수 연산자만이 오른쪽에서 왼쪽으로 대입한다. e.g. a = b = c + d 는 c + d부터 더한 후 b에 대입하고, 그것을 최종적으로 a에 대입한다.
- 증감 연산자는 곱셈에 우선한다.
- \*, / 는 +, - 에 우선한다.

```c#
x = ++a * d; // x = (++a) * d
x = a++ * d; // x = (a++) * d
```

> 주의 : 우선순위와 평가 순서는 다르다.

```c#
if (1 + 1 == 2 || 3 + 2 == 5 && 1 + 2 == 2)
```

- 우선순위는 `&&`가 `||`보다 높다.
- 하지만 `3 + 2 == 5`, `1 + 2 == 2`는 실행조차 되지 않는다.
- **`||` 및 `&&` 연산자는 왼쪽에 있는 표현식의 평가를 강제하기 때문이다.**
