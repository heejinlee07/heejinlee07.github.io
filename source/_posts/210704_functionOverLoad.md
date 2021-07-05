---
title: 함수 오버로딩
date: 2021-07-04
tags: C#
---

## 함수 오버로딩

- 동일한 이름을 가진 함수 구현을 허용
- 단, 매개변수 목록이 달라야 한다.
- 하나의 시그니처를 가진 함수는 하나만 있어야 하고, 시그니처는 함수의 이름과 매개변수를 포함한다. 즉 매개변수와 함수의 이름이 전부 같지 않으면 다른 함수로 여긴다. **반환형은 시그니처의 일부가 아니므로 다르더라도 오버로딩이 허용이 안된다.** e.g. void A(), int A()는 허용되지 않는다.
- 매개변수가 다르다 => `오버로딩OK`
- 승격/묵시적 변환을 해도 상관없다 => `오버로딩OK`
- 매개변수가 아예 승격이 불가능 한 경우 => `오버로딩OK`
  - static string[] GetStudents(string name) //함수 바디 생략
  - static string[] GestStudents(int age) //함수 바디 생략

```c#
static void Print(int score);               // (1)
static void Print(string name);             // (2)
static void Print(float gpa, string name);  // (3)
static int Print(int score);                // (4)
static int Print(float gpa);                // (5)
```

(4)에서 컴파일 오류가 발생하고 나머지는 모두 문제 없다. (4)는 반환형이 오버로딩을 허용하지 않기 때문에 컴파일 오류가 발생한다.

## 함수 오버로딩의 장점

```c#
static float AverageFromInts(int[] scores); //함수 바디 생략
static float AverageFromFloats(float[] floats) //함수 바디 생략
```

위 두 함수의 경우 FromInts, Fromfloat가 없어도 매개변수 형에서 어떤 함수인지 유추 가능하다.

## 함수 오버로딩의 문제점

> 잘못된 함수 호출이 일어날 수 있다.

```c#
static string[] GetStudents(float height); // 함수 바디 생략
static string[] GetStudents(int age); //함수 바디 생략

// 메인 함수
int height = 175;
GetStudents(height); //GetStudents(int age)가 호출됨.
GetStudents(175); //GetStudents(int age)가 호출됨.
```

동일한 매개변수 함수가 없다면 승격/묵시적 형변환을 통해 일치하는 함수를 찾는다. 만약 원래 있던 코드 `static string[] GetStudents(int age); //함수 바디 생략`가 더이상 필요치 않게 되어 삭제했다고 가정한다. 그런데 알고보니 GetStudents(age);와 같이 나이를 호출하던 코드가 남아있었던 것이다. **이때 int age는 float height로 묵시적 변환이 된다.** 따라서 예상치 못하게 age가 아닌 heigth가 17인 학생을 찾게 된다.

```c#
static string[] GetStudents(float height); //함수 바디 생략

//메인 함수
int age = 17;
GetStudents(age); //GetStudents(float height)가 호출됨.
GetStudents(17); //GetStudents(float height)가 호출됨.
```

잘못된 함수 호출을 방지하기 위해서 위와 같은 경우에서는 오버로딩을 쓰지 않는 것이 더 좋다.

```c#
static string[] GetStudentsByHeight(float height); //함수 바디 생략
static string[] GetStudentsByAge(int age); //함수 바디 생략

//메인 함수
int height = 180;
GetStudentsByHeight(height); //int가 float로 컴파일 됨
GetStudentsByHeight(170.3f); //float니까 문제없이 컴파일 됨
GetStudentsByAge(17); //int니까 컴파일 됨
GetStudentsByAge(170.3f); //float에서 int는 불가능하므로 컴파일 에러 발생
```

---

## 기본값 인자

- 중복되는 매개변수가 많거나 약간의 차이만 가지고 있는 함수는 기본값 인자를 사용할 수 있다.
- 매개변수를 선언할 때 미리 기본값을 정해둔다.
- 매개변수는 히나 이상 가능하다.

  - 매개변수의 목록 중간에 기본값 인자가 아닌 것이 오면 안된다.
  - 매개변수의 기본값 인자는 가장 마지막에 있어야 한다.

  ```c#
  //기본값 인자 difficulty = 0이 마지막이 아니라 중간에 있으므로 컴파일 에러 발생
  static string GetHP(int level, int mapID, int difficulty = 0, string name);

  //OK
  static string GetHP(int level, int mapID, string name, int difficulty = 0);
  ```

```c#
//함수 호출 시 선택적 호출
//GetFullAddress에 state가 있으면 그 매개변수를 쓰고, 없으면 ""를 쓴다.
//GetHP에 difficulty가 있으면 그 매개변수를 쓰고, 없으면 0을 쓴다.
static string GetFullAddress(string street, string city, string state = "");
static float GetHP(int level, int mapID, int difficulty = 0);

//메인함수
GetFullAddress("123 main street", "big city", "big state"); //ok
GetFullAddress("456 main street", "seoul"); //ok

GetHP(1, 1234, 10); // OK
GetHP(1, 1234); // OK
GetHP(1, 1234, 0); // OK
```

## 기본갑 인자의 문제점

<u>나중에 누군가 기본값 인자를 중간에 추가할 때 이상한 일이 일어날 수 있다.</u>

```c#
//원래코드
static float GetHP(int level, int mapID, int difficulty = 0);
//추가된 코드
static float GetHP(int level, int mapID, int decimalPoint = 1, int difficulty = 0);
```

`int difficulty = 0`이 한 자리 뒤로 밀리고, 그 자리에 `int decimalPoint = 1`이 들어왔다. 이렇게 되면 difficulty의 숫자를 바꾸어도 수치가 눈에 띄게 안바뀐다. 즉 예상치 못한 값을 얻게 된다. `GetHP(10, 2456, 2);`를 호출했을 때 **level: 10, mapID: 2456, difficulty:2**인 결과를 의도했는데, **level: 10, mapID: 2456, `difficulty:0`**, HP는 소수점 둘째자리에서 반올림 된다.

<u>기본값 인자가 도중에 변경될 경우, 기존에 사용중인 코드에서 문제가 발생할 수 있다.</u>

```c#
//원래코드
static float GetHP(int level, int mapID, int difficulty = 0);
//추가된 코드
static float GetHP(int level, int mapID, int difficulty = 1);
```

`GetHP(10, 2456);`이나 `GetHP(10, 2456, 1);` 모두 동일한 HP를 반환한다.

## 기본인자값의 코딩표준

- 새 기본 매개변수는 언제나 가장 뒤에 위치해야 한다.(중간에 삽입하지 않는다.)
- 기본값은 언제나 0으로 한다. 0이 아닌 경우 기본 매개변수로 사용하지 않는다.
- 함수 오버로딩 대신 실제 함수 이름을 제대로 써주는 것이 좋을 때도 있음을 기억한다.(매개변수를 직접 넣어준다.)

---

## out 매개변수

```c#
static bool Trydivide(float numerator, float denominator, ref float result)
{
  if (denominator == 0.0f)
  {
    return false;
  }

 //result에 어떤 값을 대입하는데, 오타나 다른 어떤 이유로 값의 대입이 제대로 되지 않았다면
 //result의 값이 바뀐 값으로 반영되지 않고, 원래 값 그대로 남아있게 된다.
  result = numerator / denominator;

  return true;
}

static void Main(string[] args)
{
  //result1이나 result2는 실질적으로 쓰이지 않는 값이지만 ref result1, ref result2의 값을 출력하기 위해 문법상 필요하다.
  //ref 매개변수로 쓸 수 있는 변수는 반드시 초기화를 해야하기 때문이다.
  float result1 = 0.0f;
  bool bSuccess1 = TryDivide(10.0f, 0.0f, ref result1);
  float result2 = 0.0f;
  bool bSuccess2 = TryDivide(10.0f, 5.0f, ref result2);
}
```

ref를 썼을 때 아쉬운 점을 보완하기 위해 out 키워드를 사용한다.

```c#
static bool Trydivide(float numerator, float denominator, out float result)
{
  if (denominator == 0.0f)
  {
    result = 0.0f;
    return false;
  }

  result = numerator / denominator;

  return true;
}

static void Main(string[] args)
{
  //result1, result2는 어차피 안에서 쓰이지 않으니 초기화 할 필요가 없다.
  //명시적으로 result1, result2를 출력할 값이라고 알려준다.
  float result1;
  bool bSuccess1 = TryDivide(10.0f, 0, out result1);
  float result2;
  bool bSuccess2 = TryDivide(10.0f, 5.0f, out result2);
}
```

out 키워드를 쓸 때 함수 안에서 대입을 하지 않으면 컴파일 오류가 발생한다.

```c#
//대입하지 않았으므로 컴파일 에러
static bool TryAdd(float num1, float num2, out float result)
{
  return false;
}

//OK
static bool TryAdd(float num1, float num2, out float result)
{
  result = 0.0f;
  return false;
}
```

if/else if 문에서 대입하지 않은 곳이 있어도 오류가 발생한다.

```c#
//컴파일 오류
static bool TryDivide(float numerator, float denominator, out float result)
{
  if(denominator == 0.0f)
  {
    return false;
  }
  //중략
}

//OK
static bool TryDivide(float numerator, float denominator, out float result)
{
  if(denominator == 0.0f)
  {
    result = 0.0f;
    return false;
  }
  //중략
}
```

## 키보드 입력 예외처리

아래 코드에서 숫자 이외의 값을 입력하는 예외 상황이 생기면 에러가 발생한다.

```c#
int num = int.Parse(Console.ReadLine());
```

이는 `TryParse()`로 해결할 수 있다.

```c#
int num;
bool bSuccess = int.TryParse(Console.ReadLine(), out num);
//bSuccess의 값에 따라 코드를 작성
```

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
