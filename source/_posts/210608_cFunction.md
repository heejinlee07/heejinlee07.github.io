---
title: 함수
date: 2021-06-08
tags: C#
---

## 함수

- 입력이 들어가면 어떤 결과가 출력된다.
- 중복되는 코드를 줄이는데 사용한다.
- 자주 사용하는 코드의 재활용성이 올라간다.

## 함수 정의

```c#
static <반환형> <함수명>(<매개변수 목록>)
{
  //함수 body
}
```

- 함수 시그니처(함수명(필수), static, 매개변수 목록)을 포함해야 한다.
- 반환형, 함수 body는 필수이다.

### 반환형

```c#
//반환형이 있는 함수
static int Add(int op1, int op2) //반환형 int를 생략하면 안된다.
{
  return op1 + op2;
}

//반환형이 없는 함수 return을 쓰지 않아도 된다.
static void PrintHello(string name)
{
Console.WriteLine($"Hello, {name}!");
}
```

- **프로그래밍 세계에세 함수의 출력**
- `반환형은 반드시 선언해야한다.` (선언하지 않으면 컴파일 오류 발생.)
- 반환값이 없을 수 있다. 없다면 `void` 사용.
- 반환형이 `void`가 아니면 함수 body에 `return` 키워드를 사용하여 데이터를 반환한다.
- 데이터를 반환하지 않으면 컴파일 오류 발생.

### 매개변수 목록

```c#
//2개의 매개변수가 있는 함수
static int Add(int op1, int op2)
{
  return op1 + op2;
}

//매개변수가 없는 함수
static void PrintHello()
{
  Console.WriteLonr('hello!;)
}

```

- 프로그래밍 세계에서의 임력
- int, byte와 같은 자료형 외에 int[], string과 같은 배열도 매개변수로 사용 가능.
- **필수가 아니다.**
- 매개변수와 인자는 엄밀히 말하면 다르다.
  - 매개변수: 함수를 정의할 때 함수의 입력값을 선언
  - 인자: 함수를 호출할 때 함수로 전달하는 실제값

### 메인함수의 매개변수에 데이터 전달하기

메인함수는 프로그램을 실행할 때 자동으로 호출되는 함수로 이 메인함수에 매개변수를 넘기고 싶으면 visual studio 내부의 **`프로젝트 옵션` => `실행 구성` => `Default` => `인수`**에 전달하고 싶은 데이터를 입력한다.

```c#
static void Main(string[] args)
{
  for (int i = 0; i < args.Length; ++i)
  {
    Consol.WriteLine($"args[{i}] = {args[i]}");
  }
}
```

위에서 설명한 방법대로 `Hello, C# is fun!`이라고 데이터를 입력했다면 실행했을 때 아래와 같은 결과를 얻을 수 있다. args 요소 하나에 여러 단어를 넣고 싶을 때는 `"Hello, C# is fun!" Bye!`과 같이 문장을 큰따옴표로 감싼다.

- args\[0\] = Hello,
- args\[1\] = C#,
- args\[2\] = is,
- args\[3\] = fun!

큰따옴표로 감싼 문장은 아래와 같이 출력된다.

- args\[0\] = Hello, C# is fun!
- args\[1\] = Bye!

### 배열의 길이 Length

> <배열 변수명>.Length

배열의 길이를 알려준다.

### 함수 Body

```c#
static int Add(int op1, int op2)
{
  return op1 + op2;
}
```

- 함수의 기능을 구현한 코드 블록, 그 함수의 범위를 나타냄.
- 중괄호를 이용하여 표현
- _void가 아닌 반환형을 가지고 있다면_ 반드시 `return` 키워드를 사용하여 데이터를 반환한다.

### 함수 이름

- 함수명은 어떻게 짓든지 상관없다.
- 하지만 이해하기 쉽고, 가독성을 좋게 하기 위해 함수가 어떤 기능을 가졌는지 알 수 있도록 함수명을 정한다.
- 호출자가 함수 내부를 알 필요가 없게 **함수명을 명확하게** 지어야 한다.

### 함수 호출

```c#

//반환형이 있는 경우
static int Add(int op1, int op2)
{
  return op1 + op2;
}

//반환형이 있는 함수 호출
static void Main(string[] args)
{
  int result = Add(123, 589);
}

//반환형이 없는 경우
static void PrintHello()
{
  Console.WriteLine("just hello!");
}

//반환형이 없는 함수 호출
static void Main(string[] args)
{
  PrintHello();
}
```

- 반환형이 있는 경우: `Add`함수의 반환형이 int이므로, return 되는 값을 int result에 저장하고, 함수를 소괄호를 써서 호출한다. 매개변수가 있을 경우 소괄호 내에 적어준다.
- 반환형이 없는 경우: 변수에 할당할 필요없이 소괄호를 써서 호출하기만 하면 된다.
- 함수 호출 시 인자는 변수, 상수 모두 가능하다. `int result = Add(123, 589);`에서 상수 123, 589 대신 변수를 이용하여(num1, num2 가 변수라 가정) `int result = Add(num1, num2);`처럼 사용할 수 있다.

---

## 메인 함수

```c#
static void Main(string[] args)
{
}
```

## 콘솔 화면 출력 함수

```c#
Console.Write();
Console.WriteLine();
```

## 키보드 입력 함수

```c#
Console.ReadLind();
```

## 변환 함수

```c#
int.Parse();
double.Parse();
float.Parse();
```

---

## 코딩 표준

### 함수

> 정확하게 어떤 기능을 하는지 알려주는 단어를 사용한다.

- 동사로 시작
- 제일 첫 글자는 대문자 혹은 소문자(회사마다 코딩 표준은 다름)
- 여러 단어를 연결한다면 파스칼 표기법으로 사용.

### 매개변수와 지역변수

> 정확하게 어떤 정보를 담는지 알려주는 단어 사용

- 명사 사용
- 제일 첫 글자는 소문자로 시작
- 여러 단어를 연결한다면 카멜케이스 사용

---

## 선조건 후조건

> 함수가 무슨 일을 하는지에 대한 약속. 선조건을 만족하지 못하면 후조건을 보장할 수 없다.

<u>선조건</u>

- `함수 실행 시작 전`에 참으로 가정한 조건 e.g. Divede() 함수는 분모가 0이 아니어야 한다.
- 함수 이름, 매개변수로 유추 가능하지만 부족하면 주석으로 추가 설명 (슬래시(/) 세번이면 자동으로 주석이 생성된다.)
  ```c#
  /// <summary>
  ///
  /// </summary>
  /// <param name = "numerator"></param>
  static float Divede(float number, float denominator)
  {
    return numerator / denominator;
  }
  ```

<u>후조건</u>

- 함수 `실행 후`에 보장되는 조건 e.g. 두 정수를 더하면 정수의 결과가 나온다.
- 함수 이름과 반환형으로 유추 가능

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
