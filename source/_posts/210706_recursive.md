---
title: 재귀 함수
date: 2021-07-06
tags: C#
mathjax: true
---

## 재귀 함수

함수 A가 `매개변수`만 바꾸어 다시 함수 A(자기자신)을 호출하는 방법으로 구현

## 재귀 함수의 구성요소

### 종료조건

- **더이상 재귀 함수를 호출하지 않고 값을 반환하는 조건**
- 매우 간단히 함수의 반환 값을 찾을 수 있는 경우
- 종료조건이 없으면 함수를 무한히 재귀적으로 호출한다.

### 재귀적 함수 호출

- 종료조건이 아닌 경우
- 함수의 인자를 바꿔서 스스로를 다시 호출
- 이때 함수의 인자는 현재 문제보다 작은 문제를 대표해야 한다. (매개변수를 바꿔서 지금 현재의 문제보다 조금 작은 범위의 문제에서 함수를 호출한다. 즉 함수가 바뀌는 것이 아니라 함수의 대상의 되는 문제의 범위가 작아지는 것이다.)
- 즉 동일한 동작을 보다 작은 문제에 적용한다.

```c#
//종료조건이 있는 경우
static uint SumRecursive(uint num)
{
  //종료조건
  if (num == 0)
  {
    return 0;
  }
  else
  {
    //재귀적 함수 호출
    return SumRecursive(num - 1) + num;
  }
}

//종료조건이 없는 경우
static uint SumRecursive(uint num)
{
  return SumRecursive(num - 1) + num;
}

static void Main(string[] args)
{
  Console.WriteLine(SumRecursive(3));
}
```

---

## 반복문 vs 재귀함수

모든 재귀 함수는 반복문으로 해결 가능하다. 간단한 문제의 경우 반복문으로 해결하는 것이 더 편하지만 _복잡한 문제일수록 재귀 함수를 사용하는 것이 더 편하다._

```c#
//반복문 - 피보나치 수열
public static int FibonacciIterative(uint number)
{
  uint[] list = new uint[number + 1];

  list[0] = 0;
  list[1] = 1;

  for (uint i = 2; i <=number; ++i)
  {
    list[i] = list[i - 2] + list[i - 1];
  }
  return list[number]
}
```

```c#
//재귀 함수 - 피보나치 수열
public static int FibonacciRecursive(uint number)
{
  if (number == 0)
  {
    return 0;
  }

  if (number == 1)
  {
    return 1;
  }

  return FibonacciRecursive(number - 2) + FibonacciRecursive(number - 1);
}
```

폴더의 목록을 가져오는 처리가 필요하다면 반복문보다 재귀문으로 표현하는 것이 더욱 쉽다. 폴더의 목록을 가져오는 함수(의사코드)는 다음과 같다.

```c#
// GetDirectoryNames(path): path 안에 있는 모든 폴더의 이름을 가져오는 함수
// GetFilesNames(path): path 안에 있는 모든 파일의 이름을 가져오는 함수

static string[] GetFileNamesRecursive(string path)
{
  string[] filesNames;
  string[] directoryNames = GetDitectoryNames(path);
  for (int i = 0; i < directoryNames.Length; ++i)
  {
    filesNames += GetFileNamesRecursive(directoryNames[i]);
  }
  filesNames += GetFilesNames(path);
  return filesNames;
}
```

## 재귀함수의 사용

수학적 귀납법이기 때문에 종료 조건에 반드시 예상되는 값이 반환될 것을 가정하고 신뢰하며, 그 후의 수는 종료 조건에 기초하여 값을 계산할 수 있도록 한다.

| 재귀 함수의 `장점`                                                                                                             | 재귀 함수의 `단점`                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| 개념상(이론상)으로 훌륭하다.                                                                                                   | 효율성이 떨어진다.                                                                                                  |
| 증명이 가능하다.                                                                                                               | 함수 호출 깊이에 제한이 있기 때문에 스택오버플로우가 발생할 수 있다.                                                |
| 캐싱 없이 간단한 반복문으로 작성 가능한 문제는 반복문을 사용하지만 그 외의 경우에는 설계와 이해가 용이한 재귀 함수로 작성한다. | 재귀 함수로 작성했는데 함수 호출의 최대 깊이를 확정할 수 없거나 성능상의 문제를 발견했다면 반복문으로 리팩토링한다. |

---

## 수학적 귀납법 예시

> 모든 자연수 n에 대하여 아래 조건이 항상 성립하는지 증명하라.

0 + 1 + 2 + ... + n =

$$
\frac {n(n+1)}{2}
$$

1. n이 0일 때 위의 조건이 성립하는지 본다.(종료조건)
   $$
   \frac {0 . (0 + 1)}{2}
   $$
   = 0
2. 자연수 0부터 k까지 합이 아래 조건에 성립한다고 가정한다.
   $$
   \frac {k(k+1)}{2}
   $$
3. 0부터 k까지 합 다음 자연수인 (k+1)의 합도 이 공식을 만족하는지 증명한다.  
   (0 + 1 + 2 + ... + k) + (k + 1) =
   $$
   \frac {(k+1)((k+1)+1)}{2}
   $$

---

### 피보나치의 수열

> 제 0항은 0, 제 1항은 1, 그 뒤의 모든 항은 바로 앞 두 항의 합인 수열
> 0 1 1 2 3 5 8 13 21 34 55...

<u>수학적 정의</u>

- F<sub>0</sub> = 0,
- F<sub>1</sub> = 1,
- F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub>(n > 1)

```c#
public static int FibonacciRecursive(uint number)
{
  if (number == 0)
  {
    return 0;
  }

  if (number == 1)
  {
    return 1;
  }

  return FibonacciRecursive(number - 2) + FibonacciRecursive(number - 1);
}

//FibonacciRecursive 함수 호출
static void Main(string[] args)
{
  FibonacciRecursive(10);
}
```

### 하노이의 탑

> 64개의 황금 원판이 있다. 브리흐마의 규칙에 따르면 한 번에 원판 하나씩만 옮길 수 있고, 작은 원판 위에 그보다 큰 원판은 옮길 수 없다.

1. 막대 3개가 있고, 한 막대에 `n개`의 원판이 있다.
   - **n개의 원판의 `상위 n-1개`를 다른 막대에 옮길 수 있다고 가정한다.**
     - `상위 n-1개`의 원판을 중간 막대로 옮긴다.
     - `마지막 n번째` 원판은 목적지 막대에 옮긴다.
     - 중간 막대에 있던 `상위 n-1개`의 원판을 목적지 막대에 옮긴다.
2. 막대 3개가 있고, 한 막대에 `n-1개`의 원판이 있다.
   - **`n-1개`의 원판에서 `상위 n-2개`를 다른 막대에 옮길 수 있다고 가정한다.**
     - `상위 n-2개`의 원판을 중간 막대로 옮긴다.
     - `마지막 n-1번째` 원판은 목적지 막대에 옮긴다.
     - 중간 막대에 있던 `n-2개`의 원판을 목적지 막대에 옮긴다.
3. n-3, n-4, ...을 거쳐서 마지막 `n-(n-2)`개까지 도달한다. `n-(n-2)`는 `n - n + 2`로 전개되므로 `2`가 된다.
4. 막대 3개가 있고, 한 막대에 `2개`의 원판이 있다.
   - **2개의 원판에서 `상위 1개`를 다른 막대에 옮길 수 있다고 가정한다.**
     - `1개`의 원판을 중간 막대로 옮긴다.
     - `마지막 2번째` 원판은 목적지 막대에 옮긴다.
     - 중간 막대에 있던 `1개`의 원판을 목적지 막대에 옮긴다.
5. 막대 3개가 있고, 한 막대에 `1개`의 원판이 있다.
   - **`1개`의 원판을 다른 막대에 옮길 수 있다.**
   - 1개의 원판을 목적지 막대로 옮긴다. 즉 종료 조건이 참이므로 위의 모든 과정도 참이 된다.

### 랜덤 수 생성

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
