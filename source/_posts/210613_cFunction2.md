---
title: 함수의 범위
date: 2021-06-13
tags: C#
---

## 범위

> 기본적으로 어떤 범위 안에서 선언된 것은 범위 밖에서 쓰지 못한다.

```c#
static void Main(string[] args)
{
  for (int i = 0; i < 10; ++i)
  {
    string name = "Leon";
  }

  //i, name은 for문 안에서 선언된 것이므로 for 문 밖에서 사용하려면 쓸 수 없다.
  i = 200; //컴파일 오류
  name = "hi"; //컴파일 오류
}
```

> 상위 범위에서 선언한 변수/상수는 하위 범위에서 사용 가능하다.

```c#
static void Main(string[] args)
{
  string name = "Leon";

  for (int i = 0; i < 10; ++i)
  {
    name = "hi"; //OK
  }
}
```

---

## 함수의 범위

> 기본적으로 함수 안에서 선언한 모든 것은 `그 함수에서만` 사용 가능하다. 이를 `지역 변수` 라고 한다.

```c#
static int AddNumbers(int num1, int num2)
{
  //sum은 지역 변수이다. 외부에서 이 변수를 사용할 수 없다.
  int sum = num1 + num2;
  return sum;
}
```

> 함수 밖에 있는 변수/상수는 사용할 수 없다.

result가 선언된 Square는 Main함수와 같은 레벨에 있다. Main함수를 포함하고 있는 것은 Square가 아니라 Program이다. result가 Program 내부에서 선언되었다면 사용할 수 있었을 것이지만 Square 안에 선언되어 있기 때문에 컴파일 오류가 난다.

```c#
class Program
{
  static void Square(double number)
  {
    double result = number * number;
  }

  static void Main(string[] args)
  {
    double num = double.Parse(Console.ReadLine());
    Square(num);
    Console.WriteLine($"Result:  {result}"); //컴파일 오류
  }
}

```

> 함수 매개변수, 반환값 모두 `복사된 것`. `값에 의한 전달`

함수 Square를 호출할 때 Main 함수 변수 number에 들어 있는 값을 `복사`해서 함수 Square의 매개변수 number에 대입한다. `double number`는 이름만 같을 뿐 소속이 다르다.(동명이인의 개념).

`number *= number`는 `number = number * number`와 같은 의미이다. 이 연산의 결과는 함수 Square의 매개변수 number에만 영향을 주고, Main 함수의 number는 함수 속 연산의 영향을 받지 않는다. (두 함수에 같은 이름의 변수가 있다고 동일한 변수가 아니다.)

```c#
  static void Square(double number)
  {
    number *= number;
    return number;
  }

  static void Main(string[] args)
  {
    double num = 5;
    double result = Square(number); //25
  }
```

---

## 언제 함수를 작성할까?

- 처음부터 함수로 시작하지 말자.
- 현재 존재하는 혹은 향후에 발생 가능성이 높은 코드 중복을 피하고자 할 때 함수를 작성한다.
- 코드 중복은 좋지 않다. 다른 사람이 중복 코드에 있는 버그를 고칠 때, 모든 코드를 수정할 것이라는 보장이 없기 때문.

## 함수를 잘 작성하는 방법

### 함수 대신 중괄호

함수가 길어지면 동일한 이름의 지역 변수가 생기는 경우가 있다. 하지만 같은 범위 내에 이름이 중복되면 컴파일 에러가 발생한다. 이럴 경우 `중괄호`를 사용하여 범위를 분리시킨다. 이처럼 조건문이나 함수의 중괄호가 아니라 중괄호만 사용하여 새 범위를 만들 수도 있다.

아래 코드에서 length는 2번 쓰여서 컴파일 에러가 발생할 것 같지만 발생하지 않는다. 아래 코드에서는 `중괄호를 사용하여 스코프를 분리해주었기 때문에 두 함수의 범위가 다르다.` 따라서 length라는 이름이 똑같이 쓰여도 에러가 발생하지 않는다. 각각의 length는 쓰여진 함수 내에서만 유효하기 때문이다.

```c#
string[] names;
{
  int length = int.Parse(Console.ReadLine());
  //코드 생략
}

int[] scores;
{
  int length = int.Parse(Console.ReadLine());
  //코드 생략
}
```

### 함수 대신 #region과 #endregion

- `c# 전용`
- 긴 함수를 짧게 만들 수 있다. (_실제 함수 길이가 줄어드는 것은 아니다._)
- VS에서 코드를 접거나 펼 수 있게 해준다.

```c#
#region GetScores
//코드 생략
#endregion
```

```c#
#region <이름>
#endregion
```

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
