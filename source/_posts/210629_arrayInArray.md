---
title: 배열의 배열
date: 2021-06-29
tags: C#
---

2차원 배열이 없는 언어에서 쓸 수 없는 경우에 대신 배열의 배열을 써야할 때가 있고, 2차원 배열을 쓸 수 있더라도 배열의 배열을 쓰는 것이 더 좋을 때가 있다.

2D 배열의 문제

- 직사각형 형태의 데이터만 지원 가능
- 하지만 각 행마다 열 수가 달라져야 한다면? 작동하는 데 깔끔하지 않음.

---

## 배열의 배열

> 배열이 2개 있는 것.

- 바깥 배열(다른 배열을 포함하는 배열)
  - 2차원 배열의 행을 나타낸다고 볼 수 있다.
  - `1차원 배열`
  - 1차원 배열의 각 요소의 형은 다시 1차원 배열(안쪽 배열)

n차원 배열은 이미 정방형(x,y)형의 모양이 있고, 각 요소가 실제 데이터인 것이고, 배열의 배열은 1차원 배열이 있고, 이 배열 안의 요소에 또다른 배열을 넣겠다는 뜻이다.

- 안쪽 배열
  - `1차원 배열`
  - 각 요소의 형은 실제 자료형

| 5줄짜리 바깥 배열 |          |          |          |          |          |
| ----------------- | -------- | -------- | -------- | -------- | -------- |
| 1                 | `string` |          |          |          |          |
| 2                 | `string` | `string` | `string` | `string` | `string` |
| 3                 | `string` | `string` |          |          |          |
| 4                 | `string` | `string` | `string` |          |          |
| 5                 | `string` | `string` | `string` | `string` | `string` |

5줄의 바깥 배열이 있고, 5줄 바깥 배열의 안에 `string`처럼 실제 자료형이 들어가는 1차원 배열을 말한다.

## 배열의 배열을 만드는 방법

- <u>string[][]</u>:배열의 배열을 만드는데, 바깥 배열의 각 원소는 문자열 배열(string[])를 받는다.
- <u>classroom</u>: 문자열 배열을 원소로 가지는 배열의 이름은 classroom이다.
- <u>`new` string`[3]`[]</u>: classroom은 3개짜리 1차원 배열이다.
- <u>new `string` [3]`[]`</u>: 각 원소는 문자열 배열(string[])을 가진다.

```
<자료형>[][]<변수명> = new <자료형>[<바깥 배열 원소 개수>][];

string[][] classromms = new string[3][];
```

## 바깥 배열의 원소에 접근하기

```
<자료형>[] <변수명> = <배열의 배열 이름>[<바깥 배열 색인>];

string [][] classrooms = new string[3][]; //반드시 필요
int classIndex = 0; //1반
string[] studentNames = classromms[classIndex]; //1반에 접근
```

```c#
static void Main(string[] args)
{
  string[][] classrooms = new string[3][];

  int classIndex = 0;
  string[] studentNames = classrooms[classIndex];

  Console.WriteLine(studentNames.Length);
}
```

위 코드의 경우 0이 나오지 않을까 생각하기 쉬운데, 0이 아닌 `null`이 나온다. `아무것도 없음`을 의미한다. classrooms 배열 안에 3만큼의 문자열 배열을 문자열 배열을 담을 공간을 만드는 역할을 할 뿐이며, 현재 텅텅 비어있는 상태이다.

## 안쪽배열 만들기

```
<바깥배열이름>[<색인>] = new <자료형>[<안쪽 배열 원소 개수>];
```

```c#
const int CLASS_COUNT = 3;
 string[][] classrooms = new string[CLASS_COUNT][];

 int[] STUDENT_COUNT_PER_CLASS = {3, 2, 5};

 for (int i = 0; i < CLASS_COUNT; ++i)
 {
   classrooms[i] = new string[ STUDENT_COUNT_PER_CLASS[i]];
 }

 //위의 코드와 동일
 classrooms[0] = new string[3];
 classrooms[1] = new string[2];
 classrooms[2] = new string[5];
```

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
