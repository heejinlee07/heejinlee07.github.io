---
title: 출력, 상수
date: 2021-05-10
tags:
---

```c#
using system;

namespace HelloWorld
{
    class Program
    {
        // 메인 함수
        static void Main(string[] args)
        {
            Console.WriteLine("Hello world!");
        }
    }
}
```

## 메인 함수

- 시작점(entry point)
- c# 프로그램은 반드시 어떤 함수에서부터 실행되어야 한다.
- 그 `어떤` 함수가 바로 `Main`함수이다. (또는 메서드라고 표현한다.)
- exe 파일을 실행하면 Main 함수가 자동으로 실행된다.

### Main 함수 앞의 static

- c#은 OOP 언어라서 기본적으로 static을 안쓰지만 Main 함수는 진입점, 프로그램에 딱 하나만 있는 것. 따라서 프로그램의 진입점은 딱 하나만 있기 때문에 static을 넣어서 정적이라고 표현.
- 전역 함수가 된다.

### string[] args

- 메인 함수가 외부로부터 받는 데이터
- 함수 인자 또는 메서드 인자라고 부른다.
- 커맨드 라인으로부터 인자를 받는다.
  - 커맨드 라인: exe 파일을 실행할 때 추가적으로 넣는 정보
  - **e.g. HelloWorld.exe Hi C# is fun** 는 Hi, C#, is, fun 총 네 개의 인자가 들어간다.
  - 이 인자들이 args 배열에 저장된다.

## void

- 반환형
- 모든 함수는 반환형이 존재한다.
- 실제로 값을 반환할 수도 있고, 반환하지 않을 수도 있다.
- 함수가 어떤 형태의 데이터를 반환하는지.
- 반환값이 없다는 의미.

## 반환형의 역할

- 커맨드 라인이 반환형을 받아서 exe 프로그램이 올바르게 실행되었는지 여부를 알 수 있다.
  - 0: 성공을 의미
  - 0이 아닌 값: 오류 코드

## 메인 메서드의 정수값 반환

- 정수를 반환할 때 `int`를 사용한다.
- 실제로 값을 반환할 때는 `return` 키워드를 사용한다.

```c#
static int Main(string[] args)
{
    return 0; //0을 돌려보낸다.
}
```
