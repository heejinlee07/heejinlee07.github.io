---
title: 문자열 빌더
date: 2021-07-13
tags: C#
---

> 문자열 합치기는 임시로 만들고 버려지는 문자열이 많아서 합치는 과정이 느릴 수도 있다.

```c#
Console.WriteLine("hello" + "give me" + "2" + "dollars!");
```

연산자의 평가과정에 따라 왼쪽에서 오른쪽으로 문자열을 더해가면서 임시로 생성되는 1~3번과 같은 문자열은 코드에도 보이지 않고, 변수에도 대입되어 있지 않다. 다음 문자열이 더해지기 전까지 임시로 생성되어 다음 문자열이 평가되면 사라진다. 즉 1번이 연산되어 hello + give me의 형태인 `hello give me`라는 문자열이 임시로 만들어졌다가 2번 `hello give me 2`가 연산되면 1번은 사라지게 된다.

1. hello + give me
2. hello give me + 2
3. hello give me 2 + dollars!

<u>가비지 컬렉터</u>

- 새로 만들어진 문자열들은 언젠가 지워져야 함
- 가비지 컬렉터가 이 역할을 자동으로 해준다. 다만 어느 시점에 지워지는지 알 수 없다.
- **쓰레기 문자열이 넘쳐나면 성능 저하가 올 수 있다. 어떤 문자열이 쓰이는지 쓰이지 않는지를 확인해야 하기 때문.**

## 문자열 빌더

> 가비지 컬렉터의 성능 저하와 같은 문제를 줄이기 위해 임시 문자열 수를 줄이고, 문자열을 효율적으로 만들어주는 라이브러리(클래스)

- 긴 문자열을 담을 수 있는 충분한 공간을 미리 확보
- 추가되는 문자열로 그 공간을 차례대로 채워 나간다.
- 모든 것이 준비되면 최종적으로 문자열을 만들어서 반환한다.

```c#
using System;
using System.Text;

namespace StringBuilderExample
{
    class Program
    {
        static void Main(string[] args)
        {
            const int CAPACITY = 1000;
            StringBuilder builder = new StringBuilder(CAPACITY);
            builder.Append("Hello World!");
            builder.AppendLine(" Welcome to COMP1500!");
            builder.AppendLine("Are you having fun yet?");

            Console.WriteLine(builder.ToString());

            builder.Insert(12, " Going to insert this here.");

            Console.WriteLine(builder.ToString());

            builder.Replace(" Going to insert this here.", " And replace this.");

            Console.WriteLine(builder.ToString());

            builder.Remove(12, 19);

            Console.WriteLine(builder.ToString());

            builder.Clear();

            Console.WriteLine(builder.ToString());
        }
    }
}
```

### StringBuilder 생성하기

> StringBuilder <변수명> = new StringBuilder(int CAPACITY);

- 파일 제일 위에 라이브러리 추가 - `using System.text;`
- 함수 안에서 사용 - `StringBuilder builder = new StringBuilder(CAPACITY);`

### String 추가하기

> StringBuilder의 내부 문자열에 문자열을 추가

```c#
builder.Append("Hello World!");
builder.AppendLine(" Welcome to COMP1500!");
builder.AppendLine("Are you having fun yet?");
```

- 문자열과 줄바꿈 추가 - `AppendLine(string text);`
- 문자열만 추가 - `Append(string text);`;
- 여러가지 오버로드 함수가 있다.
- 문자열이 아닌 것도 합칠 수 있다.

```c#
StringBuilder builder = new StringBuilder(4096);
builder.AppendLine("Score: " + 10);
builder.Append(3.14f);
```

### 배열의 총용량과 현재 사용중인 길이 얻기

```c#
Console.WriteLine($"Capacity: {builder.Capacity}, Length: {builder.Length}");
```

- 각각 내부 배열의 총용량과 길이 값을 가지고 있다.
- 내부 배열의 총용량 - `builder.Capacity;`
- 내부 배열의 현재 사용중인 길이 - `builder.Length;`

### 추가 공간 확보

> EnsureCapacity(int newCapacity);

```c#
builder.EnsureCapacity(1024);
```

stringBuilder의 내부 배열의 총용량을 `늘리는` 함수. 총용량보다 작은 수를 입력했다고 총용량을 줄이지는 않는다.

### 최종 문자열 얻어오기

> ToString();

```c#
StringBuilder builder = new StringBuilder(4096);
//문자열 추가하는 코드 생략
string greetings = builder.ToString();
```

- **완성한 최종 문자열을 반환**
- 현재 내부 배열의 사용중인 길이 만큼만 반환
- 오버로드 함수가 있다.

---

### 만약 처음 확보해 둔 공간을 다 쓴다면?

- **아무문제없다.**
- StringBuilder가 자동적으로 내부 공간을 늘린 뒤(기존 배열 크기의 2배) 모든 데이터를 복사한다.
- 하지만 복사를 안하는 것이 좋기 때문에 **처음부터 충분한 공간을 확보할 수 있도록 한다.**
- 2의 승수로 크기를 잡는 경우가 많다.

### StringBuilder 함수

> Insert()
> Replace()
> Remove()
> Clear()

#### Insert()

> Insert(int index, string text);

- StringBuilder의 내부 `배열 중간(int index)`에 새로운 문자열(string text)를 삽입.
- 여러 오버로드 함수가 있다.

#### Replace()

> Replace(char old, char new);

모든 old를 new로 바꾼다.

> Replace(char old, char new, int start, int count);

start번째부터 start + count번째 사이에 있는 모든 old를 new로 바꾼다. **(e.g. builder.Replace('P', 'B', 3, 3);)**

#### Remove()

> Remove(int start, int length);

start번 째부터 length개 만큼의 문자를 지운다.

#### Clear()

> builder.Clear();

- 임시 문자열을 제거하는 함수
- **이 함수를 호출 후 길이를 확인하면 0**

## StringBuilder vs 문자열 합치기

- 합칠 문자열이 몇 개 없다면 굳이 StringBuilder를 쓰지 않는다.
- 대여섯개 이상의 문자열을 합치면 그때 StringBuilder의 사용을 고려한다.

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
