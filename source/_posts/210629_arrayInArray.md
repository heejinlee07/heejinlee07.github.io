---
title: 배열의 배열
date: 2021-06-29
tags: C#
---

2차원 배열이 없는 언어에서 배열의 배열을 써야할 때가 있고, 2차원 배열을 쓸 수 있더라도 배열의 배열을 쓰는 것이 더 좋을 때가 있다.

2D 배열의 문제

- 직사각형 형태의 데이터만 지원 가능
- 하지만 각 행마다 열 수가 달라져야 한다면? 작동은 하지만 깔끔하지 않다.

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

## 안쪽 배열 접근하기

1반의 학생 정보를 담은 배열의 길이를 출력하는 코드

```c#
static void Main(string[] args)
{
  const int CLASS_COUNT = 3;
  int[] STUDENT_COUNT_PER_CLASS = {3, 2, 5};
  string[][] classrooms = new string[CLASS_COUNT][];

  for (int i = 0; i < CLASS_COUNT; ++i)
  {
    //안쪽 배열 만들기
    classrooms[i] = new string[STUDENT_COUNT_PER_CLASS[i]];
  }

  int classIndex = 0; //1반
  int studentIndex = 0; //첫번째 학생
  // 위에서 안쪽 배열을 만들었기 때문에 studentNames는 더이상 null이 아니다.
  string[] studentNames = classrooms[classIndex];
  studentNames[studentIndex] = "Severus";

  Console.WriteLine(studentNames.Length);
  Console.WriteLine($"Class 1 = Student 1 : {classrooms[classIndex][studentIndex]}");
}
```

위의 코드에서 안쪽 배열의 원소에 접근하는 방법은 다음의 2 가지가 있다. _이 2 가지 방법 중에는 방법2가 조금 더 좋다._ 특히 for문을 돌리는 것과 같은 조건이 있을 때 더 좋다. `방법2`가 deps가 더 얇기 때문이다. 방법1의 경우 바깥 배열의 색인부터 확인한 다음 그 바깥 배열의 안쪽 배열 색인을 찾아서 들어가는 구조이다. 즉 classrooms[0]인지 또는 classrooms[1]인지부터 확인한 후 해당하는 classrooms의 studentName를 찾아야 한다. `방법2`의 경우 studentNames를 미리 만들어 두었기 때문에 clarooms의 색인을 찾는 과정을 점프하고 studentNames를 찾으면 된다. 즉 classrooms[0]인지 classrooms[1]인지를 찾는 과정을 점프하여 주어진 classrooms의 색인이 [0]이라면 곧장 classrooms[0]에서 해당하는 studentNames를 찾으면 되는 것이다.

```c#
//방법1

<바깥 배열 이름>[<바깥 배열 색인>][<안쪽 배열 색인>] = 값 대입;
```

```c#
//방법2
<안쪽 배열 자료형> <변수명> = <바깥 배열 이름>[<바깥 배열 색인>];
<변수명>[<안쪽 배열 색인>] = 값 대입;
```

```c#
//바깥 배열과 안쪽 배열을 만드는 코드 생략. string classrooms[3][]
int classIndex = 0;
int studentIndex = 0;

//방법1
classrooms[classIndex][studentIndex] = "Severus";

//방법2
string[] studentNames = classrooms[classIndex];
studentNames[studentIndex] = "Severus";

```

여기서 `방법2`는 classrooms[0]에 있는 것을 복사해서 studentNames에 넣은 것이라 원본인 classrooms는 바뀌지 않는 것이라 생각될 수 있다. _그러나 바뀐다._ 보통 기본자료형은 값에 의한 전달을 한다. new로 만든 것은 기본적으로 그 자체가 참조형 데이터이다. **즉 new로 만든 것은 복사가 아니라 원본이 바뀌는 것이다.**

---

## 안쪽 배열을 늘릴 수 있는가?

안쪽 배열은 1차원 배열이기 때문에 늘릴 수 없다. 즉 배열의 크기가 2인 배열을 3으로 만들 수는 없다.

```c#
  string[][] classrooms = new string[CLASS_COUNT][];

  classrooms[0] = new string[3];
  classrooms[1] = new string[2];
  classrooms[2] = new string[5];
```

원칙적으로는 배열의 크기를 늘릴 수 없지만 필요한 경우에는 아래의 방법으로 해결한다.

- 크기가 3인 배열을 _새로 만든다._
- **for문을 이용하여 기존의 배열 데이터를 새 배열로 복사한다.**
- 새 배열을 바깥 배열에 대입한다.

### for문을 이용한 복사

```c#
  string[][] classrooms = new string[CLASS_COUNT][];

  //기존에 있던 크기가 2인 배열인 classrooms의 마지막 인덱스를 가져온다.
  //학생들 이름을 넣는 코드는 생략
  string[] classroom2 = classrooms[1];
  //크기가 2인 배열을 3으로 늘린다.
  string[] newClassroom2 = new string[classroom2.Length + 1];

  //for 문을 돌면서 기존의 배열 데이터를 새 배열로 복사한다. 기존 배열의 길이인 2만큼 for문을 돌면서 newClassroom2에 크기 2인 배열의 값을 복사한다.
  for (int i = 0; i < classroom2.Length; ++i)
  {
    newClassroom2[i] = classroom2[i];
  }

  //classroom의 크기는 2이고, newClassroom2의 크기는 3이기 때문에 for문을 돌았을 때 3번째 배열의 값은 없는 상태이다. (원래 배열의 크기가 2였으므로, 0, 1까지의 값만 복사된 상태이기 때문.)

  //마지막 배열에 접근한다. 마지막 배열에 접근할 때 보통 Length -1을 사용한다.
  //마지막 배열인 2번째 인덱스 배열의 값에 "Leanne"를 넣어준다.
  newClassroom2[newClassroom2.Length - 1] = "Leanne";

  //원래 있던 클래스에 새로 만든 newClassroom2를 넣는다. 이로써 크기가 2인 배열이 3이 되었다.
  classrooms[1] = newClassroom2;

```

### Array.Copy()를 사용한 복사

```c#
Array.Copy(원본배열이름, 새 배열(복사할 배열)이름, 원본 배열의 첫 번째 배열부터 복사할 원소의 개수);
```

```c#
string[] sourceArray = classrooms[1]; // classrooms[1];의 원소를 10개로 가정
string[] destinationArray = new string[2];
Array.Copy(sourceArray, destinationArray, destinationArray.Length);
```

```c#
  string[][] classrooms = new string[CLASS_COUNT][];

  //학생들 이름을 넣는 코드는 생략
  string[] classroom2 = classrooms[1];

  string[] newClassroom2 = new string[classroom2.Length + 1];

  //Array.Copy(원본배열, 새 배열(복사할 배열), 몇 개만큼 복사할 것인지)
  //원본배열의 크기는 2, 새 배열의 크기는 3이다. 둘의 크기가 다르기 때문에
  //원본배열의 크기인 2만큼 복사하기로 정한다.
  Array.Copy(classroom2, newClassroom2, classroom2.Length);

  //새 배열의 크기는 3이고, 위에서 배열이 2까지일때의 값을 복사했기 때문에
  //마지막 배열의 인덱스에 새 값을 넣어준다.
  newClassroom2[newClassroom2.Length - 1] = "Leanne";

  //원래 있던 클래스에 새로 만든 newClassroom2를 넣는다. 이로써 크기가 2인 배열이 3이 되었다.
  classrooms[1] = newClassroom2;
```

## 2D 배열 VS 배열의 배열

| 2D 배열                           | 배열의 배열                                                      |
| --------------------------------- | ---------------------------------------------------------------- |
| 다차원 2D 배열                    | 바깥 배열이 1차원 1D 배열                                        |
| 배열의 각 원소가 배열형이 아니다. | 행을 나타내는 바깥 배열의 각 원소도 1D 배열이다.                 |
| 엑셀 형태                         | 바깥 배열인 1차원 배열(행) 안에 안쪽배열인 1차원 배열(열)이 존재 |
| 비어 있는 원소가 있을 수 있다.    | 필요한 만큼 안쪽 배열읠 길이를 잡을 수 있다.                     |

참고로 안쪽 배열에 1D 배열이 아닌 2D 배열을 원소로 가질 수 있긴 하지만 잘 쓰이진 않는다.

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
