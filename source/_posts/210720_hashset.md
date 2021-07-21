---
title: 컬렉션 - 해시셋, 컬렉션과 같이 쓰면 유용한 것들
date: 2021-07-20
tags: C#
---

- 딕셔너리와 매우 비슷하다. **차이점은 해시셋은 키만 있다는 점이다.**
- 리스트와 딕셔너리를 쓰는 경우가 거의 90%이므로 거의 쓸 일이 없고, 특별할 때만 쓴다.
- 중복 데이터를 제거할 때 가장 쓰기 편하다
-

```c#
HashSet<T> <변수명> = new HastSet <T>(); //T는 저장할 키의 자료형
```

```c#
HashSet<int> studentIDs = new HashSet <int> ();
HastSet<string> studentNames = new HashSet <string> ();

## 해시셋은 언제 사용하면 좋은가?
- 중복 데이터를 제거한
```

## 해시셋에 요소 추가하기

```c#
bool bSuccess = HastSet<T>.Add(T data);
```

- _해시셋에 `없는 키`면_ 새 요소로 추가한 후 참을 반환
- _해시셋에 `있는 키`면_ 거짓을 반환

```c#
HashSet<int> studentIDs = new HashSet <int>();
bool bSuccess1 = studentIDs.Add(123); //참
bool bSuccess2 = studentIDs.Add(456); //참
bool bSuccess3 = studentIDs.Add(123); //거짓
```

## 이 요소가 해시셋에 있나요?

```c#
bool bConatin = HastSet<T>.Contain(T data);
```

- _해시셋에 `있는 키`면_ 참을 반환
- _해시셋에 `없는 키`면_ 거짓을 반환

```c#
HashSet<int> studentIDs = new HashSet <int>(); //{123, 456}
bool bContain1 = studentIDs.Contains(123); //참
bool bContain2 = studentIDs.Contains(178); //거짓
```

## 해시셋 요소 삭제

```c#
bool bRemoved = HastSet<T>.Remove(T data);
```

- _해시셋에 `있는 키`면_ 요소를 삭제한 후 참을 반환
- _해시셋에 `없는 키`면_ 거짓을 반환

```c#
HashSet<int> studentIDs = new HashSet <int>(); //{123, 456}
bool bRemoved1 = studentIDs.Remove(123); //참
bool bRemoved2 = studentIDs.Remove(178); //거짓
```

## 해시셋의 모든 요소 삭제

```c#
HastSet<T>.clear();
```

```c#
HashSet<int> studentIDs = new HashSet <int>(); //{123, 456}
studentID.Clear();
```

---

## 해시셋의 요소 가져오기

```c#
bool bSuccess = HastSet<T>.TryGetValue(T Key, out T key);
```

- _해시셋에 `있는 키`면_ 요소를 키에 연결된 요소를 out 매개변수에 대압하고 참을 반환
- _해시셋에 `없는 키`면_ 거짓을 반환

```c#
HashSet<int> studentIDs = new HashSet <int>(); //{123, 456}
int id;
bool bSuccess = studentIDs.TryGetValue(456, out iff)
```

---

## 컬렉션과 같이 쓰면 유용한 것들

리스트를 예로 들어, 순차적으로 요소를 탐색할 때 i가 왜 필요한지에 대한 의문이 생긴다. 또 부등호를 잘못 쓰는 것처럼 실수할 가능성도 있다.

```c#
List<string> names = new List<string>(5);

for (int i = 0; i < names.Count; ++i)
{
  Console.WriteLine($"Name: {names[i]}");
}
```

### foreach

어떤 컬렉션이든 순회할 수 있는 방법이 있으면서 실수를 방지하는 좋은 방법이 바로 `foreach`이다.

```c#
foreach (T<변수명> in List<T>)
```

- foreach 문 안의 T는 리스트 선안할 때 사용한 자료형이다.
- <변수명>은 foreach 문 범위에서만 사용된다.

### 리스트와 foreach문

```c#
List<string> names = new List<string>(4096);

foreach (string name in names)
{
  Console.WriteLine(name);
}
```

### 딕셔너리와 foreach문

```c#
foreach (KeyValuePair<TKey, TValue> <변수명> in Dictionary<TKey, TValue>)
{

}
```

- KeyValuePair<TKey, TValue>의 TKey, TValue는 각각 딕셔너리를 선언할 때 사용한 키와 값의 자료형이다.
- <변수명>은 foreach 문 범위에서만 사용된다.

```c#
Dictionary<string, string> students = new Dictionary<string, string>();

foreach (KeyValuePair<string, string> score in students)
{
  Console.WrtieLine($"key: {score.key}, value: {score.Value}");
}
```

### 배열([])과 foreach문

```c#
foreach (T <변수명> in T[])
```

```c#
float scores = {30.5f, 41.0f}

foreach (float score in scores)
{
  Console.WriteLine(score);
}
```

### var

딕셔너리 foreach문이 작성해야하는 코드가 길고, 매번 keyValuePair<TKey, TValue>를 써야한다는 문제점을 var가 해결해준다.

```c#
Dictionary<string, string> students = new Dictionary<string, string>();

foreach (var score in students)
{
  Console.WriteLine($"Key: {score.key}, value: {score.value}");
}
```

- 묵시적 자료형 : 컴파일러가 알아서 자료형을 추론해줌.
- **지역 변수**에서만 사용 가능.
- 긴 자료형을 짧게 줄여준다.
- **반드시 선언과 동시에 대입해주어야 한다.**
- 대입하는 값을 통해 명백하게 자료형을 알 수 있을 때만 사용한다.

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
