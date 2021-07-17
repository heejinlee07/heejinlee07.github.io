---
title: 컬렉션 - 딕셔너리
date: 2021-07-18
tags: C#
---

## 딕셔너리

> `List<T>`와 달리 색인이 0~n 사이의 수가 아니라 `임의의 데이터형`이다. 사전과 비슷하게 키를 이용해 그 키에 해당하는 값을 찾는다.
>
> > 키(key): 임의의 데이터형. 어떠한 데이터형도 키로 쓸 수 있다.  
> > 값(value): 실제 저장되는 값

- 딕셔너리는 배열처럼 연속된 메모리에 내부 데이터를 저장할 수 없다. 따라서 배열이 더 효율적이다.
- 다른 언어에서는 맵(map)이라고 한다.
- 배열처럼 0, 1, 2... 이런 식으로 순서대로 저장하기 힘든 경우에 쓰면 좋다.
- 데이터 저장 공간이 크고, 배열 중간에 데이터를 삽입 및 삭제를 자주해야하는 경우 쓰면 좋다.

### 딕셔너리 생성

```c#
Dictionary<TKey, TValue> <변수명> = new Dictionary<TKey, TValue>();
```

```c#
Dictionary<int, string> students = new Dictionary<int, string>();
Dictionary<int, int> scores = new Dictionary<int, int>();
```

- `TKey`: 어떤 자료형의 키를 담을지 표현
- `TValue`: 어떤 자료형의 값을 담을지 표현

### 딕셔너리에 데이터 추가하기

```c#
Dictionary.Add(TKey, TValue);
```

> 키와 매핑되는 값을 딕셔너리에 추가

```c#
Dictionary<string, string> students = new Dictionary<string, string>();
students.Add("A1","Bob");
students.Add("A2","Bobby");

//이미 들어 있는 키로 새로운 데이터를 추가하면?
students.Add("A2","Alex"); // 에러 발생
```

### 중복된 키를 확인 후 데이터 추가하기

> 이미 있는 키를 가지고 새로운 데이터를 추가하려고 하면 에러가 발생하기 때문에 이를 해결하기 위해 중복된 키가 있는지 확인 후 추가한다.

```c#
bool bSuccess = Dictionary<TKey, TValue>.TryAdd(Tkey key, TValue value);
```

```c#
Dictionary<string, string> students = new Dictionary<string, string>();
// {("A1", "Bob"),("A2", "Bobby")}

bool bSuccess1 = students.TryAdd("A1", "Bob"); //거짓
bool bSuccess1 = students.TryAdd("A3", "Alex"); //참
```

- 딕셔너리 안에 키가 이미 있으면 거짓 반환
- **딕셔너리 안에 키가 없으면 새로운 값을 넣고 참을 반환**

---

### 딕셔너리 안에 키가 있는지 확인하기

```c#
bool bContain = Dictionary<TKey, TValue>.ContainsKey(TKey, key);
```

> 딕셔너리 안에 키가 있으면 참, 없으면 거짓 반환

```c#
Dictionary<string, string> students = new Dictionary<string, string>();
// {("A1", "Bob"),("A2", "Bobby")}

bool bContain1 = students.ContainKey("A1"); //참
bool bContain2 = students.ContainKey("Bob"); //거짓
```

### 딕셔너리 안에 밸류가 있는지 확인하기

```c#
bool bContain = Dictionary<TKey, TValue>.ContainsValue(TKey, key);
```

> 딕셔너리 안에 키가 있으면 참, 없으면 거짓 반환

```c#
Dictionary<string, string> students = new Dictionary<string, string>();
// {("A1", "Bob"),("A2", "Bobby")}

bool bContain1 = students.ContainsValue("Bob"); //참
bool bContain2 = students.ContainsValue("Alex"); //거짓
```

---

### 딕셔너리의 모든 요소 삭제하기

> 딕셔너리의 모든 요소를 삭제

```c#
Dictionary<TKey, TValue>.Clear();
```

### 딕셔너리 안에 있는 요소 삭제

```c#
bool bRemoved = Dictionary<TKey, TValue>.Remove(TKey, key);
```

> 딕셔너리 안에 키가 있으면 **요소를 삭제 후 참**, 없으면 거짓 반환

```c#
Dictionary<string, string> students = new Dictionary<string, string>();
// {("A1", "Bob"),("A2", "Bobby")}

bool bRemoved1 = students.Remove("A1"); //참
bool bRemoved2 = students.Remove("A3"); //거짓
```

---

### 딕셔너리에서 키와 매핑된 값 가져오기

```c#
bool bFound = Dictionary<TKey, TValue>.TryGetValue(TKey, key, out TValue value);
```

- 딕셔너리 안에 키가 있으면 값을 `out 매개변수에 대입하고 참을 반환`
- 딕셔너리 안에 키가 없으면 거짓 반환

```c#
Dictionary<string, string> students = new Dictionary<string, string>();
// {("A1", "Bob"),("A2", "Bobby")}

string value;
bool bFound = students.TryGetValue("A1", out value)
```

### 요소 추가/접근법 - []

```c#
Dictionary<TKey, TValue>[key] = value;
```

- 키가 이미 있다면 연결된 값 변경
- **키가 없다면 키와 값을 새로운 원소로 추가**

```c#
Dictionary<string, string> students = new Dictionary<string, string>();
// {("A1", "Bob"),("A2", "Bobby")}

students["A1"] = "Tomas"
string student = students["A3"] // throws an exception
students["A2"] = "Jason"
```

| [] 사용 |                    |       |         |
| ------- | ------------------ | ----- | ------- |
| key     | A1                 | A2    | `A3`    |
| value   | ~~Bob~~ -> `Tomas` | Bobby | `Jason` |

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
