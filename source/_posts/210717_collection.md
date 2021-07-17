---
title: 컬렉션
date: 2021-07-14
tags: C#
---

## 컬렉션

- 동일한 형의 여러 자료를 저장하는 공간
- 자료구조의 일부
- 다른 언어에서는 컨테이너라고도 부른다.

| 배열                     | 컬렉션                              |
| ------------------------ | ----------------------------------- |
| 지료구조                 | 자료구조                            |
| 요소의 수 바꿀 수 `있음` | **요소의 수 바꿀 수 `없음`**        |
| 유용한 함수 제공 `안함`  | **유용한 함수 기본적으로 `제공함`** |

### 컬렉션 결정 시 고려사항

> 용도에 따라 다양하게 결정하게 된다. 어떤 컬렉션을 이용하는지에 따라 메모리 사용량, 성능이 달라진다.

- 색인의 종류: 배열처럼 정형화된 색인, 임의의 key값(어떤 자료형이든 ok. 그러나 정형화된 색인이 아닌 것.)
- 데이터 접근 패턴: 처음부터 끝까지 순회 or 중간에 데이터를 자주 넣고 빼는지 여부

### 컬렉션의 종류

- 단순 컬렉션: 길이가 바뀔 수 있는 배열
- 복잡한 컬렉션: 자유로운 길이 + 다양한 요소 접근 방법(배열의 접근 방법을 쓸 수 없는 데이터도 있기 때문.)

---

### 1. 리스트

- 배열과 거의 비슷
- 색인(0부터 n)을 통해 데이터에 접근
- **_그러나 배열의 길이(담을 수 있는 최대 요소 수)를 언제든 바꿀 수 있다._**

```c#
List<T> <변수명> = new List<T>();
```

```c#
List<int> scores = new List<int>();
List<string> names = new List<string>();
```

- `<T>`
  - **어떤 자료형을 담을지 표현한다.**
  - 제네릭 프로그래밍의 일부이다.
  - c++에서는 템플릿 프로그래밍이라고도 한다.
- 리스트를 생성하는 코드
- 리스트의 길이는 0
- 배열 사용하는 곳에서는 다 사용하기 좋다.

---

### `총용량`도 함께 생성하는 리스트 생성

```c#
List<T> <변수명> = new List<T>(int capacity);
```

- 총용량이 capacity인 리스트를 생성하는 코드
- 또 다른 오버로드 함수가 있다.

```c#
List<int> scores = new List<int>(6);
List<string> names = new List<string>(3);
```

| `총용량`도 함께 생성하는 리스트 | 0        | 1        | 2        | 3     | 4     | 5     | 6   |
| ------------------------------- | -------- | -------- | -------- | ----- | ----- | ----- | --- |
| scores                          | `int`    | `int`    | `int`    | `int` | `int` | `int` |
| names                           | `string` | `string` | `string` |       |       |       |

### 리스트의 총용량과 길이

```c#
int capacity = list.Capacity; //list는 List<T>
int count = list.Count; //list는 List<T>
```

> `List<T>`의 현재 총용량과 사용량을 알려준다.

```c#
List<int> scores = new List<int>(3); // {30, 40}
Console.WriteLine($"{scores.Capacity}, {scores.Count}"); // "3, 2"

List<string> names = new List<string>(5); // {"Bob", "Alex", "Bobby"}
Console.WriteLine($"{scores.Capacity}, {scores.Count}"); // "5, 3"
```

---

### 리스트에 데이터 삽입하기

```c#
Add(T data);
```

```c#
List<int> scores = new List<int>(6);
List<string> names = new List<string>(3);

scores.Add(10);
scores.Add(30);

names.Add("Bob");
names.Add("Bobby");
```

| 리스트에 데이터 삽입 | 0     | 1       | 2   | 3   | 4   | 5   | 6   |
| -------------------- | ----- | ------- | --- | --- | --- | --- | --- |
| scores               | `10`  | `30`    |     |     |     |     |     |
| names                | `Bob` | `Bobby` |     |     |     |     |     |

### 리스트에 데이터 여러 개 삽입하기

> `배열`이나 `List<T>`가 매배견수가 된다.

```c#
AddRange(IEnumerable<T> collection);
```

```c#
int[] dummy = {10, 20};

List<int> scores = new List<int>(3);
scores.AddRange(dummy);

// 배열이 아닌 다른 리스트가 있을 때 그 리스트를 다른 리스트에 삽입.
List<string> names = new List<string>(5);
names.Add("Bob");
names.Add("Bobby");

List<string> names1 = new List<string>();
// 리스트 생성시 길이가 0이므로 임의의 크기 배열을 자동으로 생성
names1.AddRange(names)
```

| 리스트에 데이터 여러개 삽입 | 0     | 1       | 2   | 3   |
| --------------------------- | ----- | ------- | --- | --- |
| scores                      | `10`  | `20`    |     |     |
| names1                      | `Bob` | `Bobby` |     |     |

### 리스트 중간에 데이터 넣기

```c#
Insert(int index, T data);
```

> 리스트의 `index번째`에 data를 넣기
> 잘못된 색인을 넣으면 에러 발생

```c#
List<int> scroes = new List<int>(3); // {30, 40}
scores.int(2, 10);

List<string> names = new List<string>(5); // {"Bob", "Bobby"}
names.Insert(1, "Alex") //이미 요소가 있는 자리에 삽입하게 되면 그 자리를 차지하고,   원래 있던 요소는 뒤로 한 칸 밀린다.
```

| 리스트 중간에 데이터 삽입 | 0     | 1                   | 2       | 3   |
| ------------------------- | ----- | ------------------- | ------- | --- |
| scores                    | `30`  | `40`                | `10`    |     |
| names                     | `Bob` | ~~Bobby~~ -> `Alex` | `Bobby` |     |

---

### 리스트에 해당하는 데이터가 있는지?

> 해당 데이터가 있으면 참, 아니면 거짓을 반환

```c#
bool bResult = list.Contains(T data); //list는 List<T>
```

```c#
List<int> scores = new List<int>(3); // {10, 30}
bool bResult1 = scores.Contains(40); //false
bool bResult2 = scores.Contains(30); //true

List<int> names = new List<string>(5); // {"Bob", "Bobby"}
bool bResult1 = names.Contains("Bob"); //true
bool bResult1 = names.Contains("bobby"); //false - 대소문자 구분
```

### 리스트에 해당하는 데이터가 어디에 있는지?

#### 1. IndexOf

```c#
int index = list.IndexOf(T data); //list는 List<T>
```

- 해당 데이터가 `처음`으로 나타난 위치의 색인을 반환
- **없다면 `-1`을 반환**
- 다양한 오버로드 함수 있음.

```c#
List<int> scores = new List<int>(3); // {30, 30}
int index1 = scores.IndexOf(40); //-1
int index2 = scores.IndexOf(30); //0

List<string> names = new List<string>(5); // {"Bob", "Bobby"}
int index1 = names.IndexOf("Bob"); //0
int index2 = names.IndexOf("bobby"); //-1 - 대소문자 구분
```

#### 2. LastIndexOf

```c#
int index = list.LasstIndexOf(T data); //list는 List<T>
```

- 해당 데이터가 `마지막`으로 나타난 위치의 색인을 반환
- **없다면 `-1`을 반환**
- 다양한 오버로드 함수 있음.

```c#
List<int> scores = new List<int>(3); // {30, 30}
int index1 = scores.LastIndexOf(40); //-1
int index2 = scores.LastIndexOf(30); //1

List<string> names = new List<string>(5); // {"Bob", "Bobby"}
int index1 = names.LastIndexOf("Bob"); //0
int index2 = names.LastIndexOf("bobby"); //-1 - 대소문자 구분
```

---

### 리스트에서 요소 삭제하기

```c#
bool bSuccess = list.Remove(T data); //list는 List<T>
```

> 리스트에 해당하는 data가 있으면 첫번째 찾은 data만 지우고 참을 반환, 없으면 거짓을 반환

```c#
List<int> scores = new List<int>(3); // {10, 30, 40}
bool bSuccess1 = scores.Remove(10); //참
//요소를 삭제하면 삭제한 요소 뒤의 요소가 앞으로 당겨진다.
bool bSuccess2 = scores.Remove(100); //거짓

List<string> names = new List<string>(5); // {"Bob", "Alex", "Bobby"}
bool bSuccess1 = names.Remove("Bob"); //참
bool bSuccess2 = names.Remove("Tom"); //거짓
```

| 리스트에서 요소 삭제 | 0              | 1      | 2       | 3   |
| -------------------- | -------------- | ------ | ------- | --- |
| scores               | ~~10~~ -> `30` | `40`   |         |     |
| names                | `Bob`          | `Alex` | `Bobby` |     |

### List\<T\>의 모든 요소를 삭제하기

```c#
list.Clear(); //list는 List<T>
```

> List\<T\>의 요소를 모두 지운다. _단, 용량을 지우는 것은 아니다._

```c#
List<string> names = new List<string>(5);
names.Clear();
```

---

### 리스트의 요소에 접근하기

```c#
// 값 얻어오기
T data = list[index]; //list는 List<T>, index는 정수형

// 값 대입하기
list[index] = <T형 데이터>; //list는 List<T>, index는 정수형
```

> 리스트의 index번째 요소에 접근

```c#
List<int> scores = new List<int>(3); //{10, 30}
scores[2] = 100; //프로그램 실행 시 예외발생
int myScore = score[0]; //myScore: 10
scores[0] = 100; //{100, 30}
```

### 리스트에 순차적으로 접근하기

> `반복문`을 이용해서 접근 가능

```c#
List<string> names = new List<string>(5); // {"Bob", "Alex", "Bobby"}

for (int i = 0; i < names.Count; ++i)
{
  Console.WriteLine($"Name: {names[i]}");
}
```

### 리스트에서 배열로 변환하기

> `List<T>`에서 순수한 배열 T[]로 변환하는 함수

- 더이상 추가나 삭제가 필요없을 때 배열 사용
- 다른 곳에 데이터를 넘겨줄 때 그 데이터가 배열이라면 리스트를 배열로 변환
- e.g. `List<int>` -> `int[]`, `List<float>` -> `float[]`

```c#
T[] array = list.ToArray(); list는 List<T>
```

```c#
List<string> names = new List<string>(5);
names.Add("Bob");
names.Add("Bobby");
names.Add("Alex");

string[] nameArray = names.ToArray();
```

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
