---
title: 문자열, 키보드 입력
date: 2021-05-25
tags: C#
---

## 문자열

- 여러 개의 문자가 모인 집합체
- `큰따옴표(")`로 감싼다.
- 기본 자료형(컴퓨터가 바로 이해할 수 있는 자료형)이 아니다.
- 문자열은 <u>문자형(char)의 배열</u>이다.
- 문자열끼리의 더하기가 가능하다. 두 문자열을 합쳐 새로운 문자열을 만드는 방식으로 가능하다.
- 문자열과 숫자도 더하기가 가능하다. 역시 새로운 문자열을 만드는 방식으로 가능하다. e.g. "hello" + "123" => "hello123"
- 더하기 외의 빼기, 나누기 곱하기는 할 수 없다.
- `==`으로 같은 문자열인지 확인할 수 있다.
- 큰따옴표만 출력하려면 역슬래시(\\) 또는 한국 키보드일 경우 원화(₩)기호를 사용해서 나타낸다. e.g. Console.WriteLine("\\"")
- 적은 문자 그대로 출력하고 싶을 때 `@`기호를 사용한다. e.g. Console.WriteLine(@"\x61") // \x61 출력

```c#
using System;

namespace StringOperator
{
  class Program
  {
    static void Main(string[] args)
    {
			Console.WriteLine("hello" + "world");
			// Helloworld

			string message1 = "hello";
			string message2 = "hello";

			Console.WriteLine(message1 == message2) //true
    }
  }
}
```

## 문자열 포맷팅

- `+`연산자: 기호를 이용해서 문자열을 만들 수 있다.
  - 문자열 + 문자열 e.g. "hello" + "world" => "helloworld"
  - 정수형 + 문자열, 문자열 + 정수형 e.g."hello" + 100=> hello100
  - 부동소수점형 + 문자열, 문자열 + 부동소수점 e.g."hello" + 77.7 => hello77.7
  - 결합해야 할 문자열이 길어질수록 가독성이 떨어지고, 임시 문자열이 발생하면서 성능 저하가 발생함.
- 인덱싱 사용: `string.Format` 또는 `중괄호`를 사용하여 포맷팅
  - 소괄호 안에 있는 데이터를 특정 서식에 맞춰 결합
  - 소괄호 안에 있는 데이터를 서식에 맞춰 문자열로 바꿈.

```c#
using System;

namespace StringOperator
{
	class Program
	{
		static void Main(string[] args)
		{
			string name = 'Lulu';
			int id = 210525;

			//방법1
			//{0}, {1}과 같은 인덱싱으로 원하는 값을 대입.
			string message1 = string.Format("student name: {0}/ student id: {1}", name, id);
			Console.WriteLine(message1)

			//방법2
			Console.WriteLine("student name: {0}/ student id: {1}", name, id)

			//0을 두 군데에 쓴다면?
			Console.WriteLine("hello! {0} student name: {0}/ student id: {1}", name, id)
			//{0}, {1}은 뒤에 이어지는 매개변수. 따라서 0번째에 해당하는 매개변수 name, 1번째에 해당하는 매개변수 id가 작성된 곳에 출력된다.
			//hello! Lule student name: Lulu/ student id: {1}
		}
	}
}
```

- 문자열 보간: `$` 사인을 이용하여 뒤에 따라오는 매개변수 없이도 사용할 수 있다.

```c#
using System;

namespace StringOperator
{
	class Program
	{
		static void Main(string[] args)
		{
			string name = 'Lulu';
			int id = 210525;

			//방법1
			string message1 = string.Format($"student name: {name}/ student id: {id}");
			Console.WriteLine(message1)

			//방법2
			Console.WriteLine($"student name: {name}/ student id: {id}")
		}
	}
}
```

---

### 문자열 정렬

- 스페이스 바 사용: 띄어쓰기를 표현할 수 있으나 수정사항이 발생할 때 유지보수가 힘들어진다.
- 스페이스 바를 사용하지 않으면 보다 간결하게 표현가능. 유지보수가 용이하다.
  > {인덱스, 정렬 길이} (Console.WriteLine, string.Format()에서 동일하게 사용 가능)
  - 기본은 우측정렬
  - 좌측정렬은 음수로 표현. e.g. {0, -6}{1} "Lulu", "Teemo" (Lulu가 왼쪽부터 6칸을 쓰겠다는 의미.)

```c#
static void Main(string[] args)
{
	string studentName1 = "kim Leon";
	float winRate1 = 20.2351f;

	string studentName2 = "Lulu";
	float winRate2 = 70.11f;

//0번째 매개변수 studentName1은 10칸, 2번째 매개변수 winRate1,2는 15칸을 차지하도록 설정되었다.
	Console.WriteLine("{0,10}{1,15}\n", "Name", "Win Rate");
	Console.WriteLine("{0,10}{1,15}\n", "studentName1", "winRate1");
	Console.WriteLine("{0,10}{1,15}\n", "studentName1", "winRate2");
	Console.WriteLine("{0,10}{1,15}\n", "studentName1", "winRate3");
}
```

### 소수점 한자리까지만 출력

> {인덱스:f소수점 이하 자릿수}

- 소수점 이하 자릿수를 {f4}와 같이 표현하여 출력할 자릿수를 정한다.
- 매개변수의 소수점 이하 자릿수보다 출력해야할 자릿수가 큰 경우 마지막에 0을 붙인다. e.g. "{0:f2}", 10.1 => 10.10
- string.Format()에서 동일하게 사용 가능
- 정수형 가능
- `반올림` 된다.
- `F`, `f` 둘 다 사용가능.

```c#
static void Main(string[] args)
{
	Console.WriteLine("{0}", 3.14159265359); //3.14159265359
	Console.WriteLine("{0:f4}", 3.14159265359); //3.1416
	Console.WriteLine("{0:f3}", 3.14159265359); //3.142
	Console.WriteLine("{0:f2}", 3.14159265359); //3.14
	Console.WriteLine("{0:f1}", 3.14159265359); //3.1

	Console.WriteLine("{0:f2}", 10.1); //10.10
}
```

### 소수점 이하 자릿수 제어하기

> {인덱스:f소수점 이하 자릿수}

- string.Format()에서 동일하게 사용 가능
- 정수형 가능
- `반올림` 된다.
- `F`, `f` 둘 다 사용가능.
- **데이터를 바꾸는 것이 아니라** 소수점 이하 자릿수를 제어하여 출력하는 것 뿐이다.

### 10진수를 16진수로 출력하기

> {인덱스:x자릿수}

- string.Format()에서 동일하게 사용 가능
- **<u>정수형만 가능</u>**
- 소문자 x => 소문자, 대문자 X => 대문자로 출력된다.

```c#
static void Main(string[] args)
{
	Console.WriteLine("{0}", 10); //10
	Console.WriteLine("{0}:x", 10); //a
	Console.WriteLine("{0}:X", 10); //A
	Console.WriteLine("{0}:x1", 10); //a
	Console.WriteLine("{0}:x2", 10); //0a
	Console.WriteLine("{0}:x3", 10); //00a
	Console.WriteLine("{0}:x4", 10); //000a
}
```

---

## 키보드 입력으로부터 숫자 읽어오기

> Console.ReadLine();

- 명령 프롬프트에서 한 줄의 글을 읽는 기능. `string name = Console.ReadLine()`처럼 사용하면 `Console.ReadLine()`을 통해 키보드로부터 받은 입력을 문자열 변수인 name에 대입하는 것이다.
- 엔터키가 입력되기 전까지의 값을 반환.
- 키보드로부터 받은 값은 반드시 <u>`문자열`형으로 반환</u>. 문자열은 문자, 숫자도 모두 담을 수 있는 포괄적인 형태이기 때문이다.
- **문자열을 묵시적/명시적 정수형으로 변환할 수 없다.**
  - `int num1 = Console.ReadLine();`처럼 사용하면 에러 발생. (CS0029. **암시적으로** string 형식을 int 형식으로 변환할 수 없다.)
  - `int num2 = (int)Console.ReadLine();` 처럼 사용해도 에러 발생. 타입캐스팅은 서로 호환될 수 있는 숫자끼리 가능하다.(e.g. double => int) 객체 지향 프로그램을 보면 꼭 숫자끼리 가능한 것은 아니지만 현 시점에서 문자와 숫자간에 명시적 변환은 가능하지 않다고 간주하도록 한다. (CS0030. string 형식을 int 형식으로 변환할 수 없다.)
- `Parse()`를 통해 문자열을 정수형으로 변환할 수 있다.(e.g. int.Parse();)

  ```c#
  using System;

  namespace AddNumbers
  {
    class Program
    {
      static void Main(string[] args)
      {
        string numStr1 = Console.ReadLine();
        int num1 = int.Parse(numStr1);
      }
    }
  }
  ```

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
