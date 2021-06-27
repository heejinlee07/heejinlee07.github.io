---
title: 값에 의한 전달, 참조에 의한 전달
date: 2021-06-13
tags: C#
---

| 값에 의한 전달                     | 참조에 의한 전달    |
| ---------------------------------- | ------------------- |
| 원본을 주지 않고, `복사본`을 준다. | `원본`을 준다.      |
| 원본에 손상이 없다.                | 원본에 손상이 있다. |

## 값에 의한 전달

- `원본 변수 != 인자` : 함수 매개변수에 원본 변수의 사본이 전달
- 호출된 함수의 인자 값이 변경되어도 호출자 함수에는 반영되지 않음.
  - Square함수의 값이 바꼈다고 해서 Main함수의 값도 바뀌는 것이 아니다.

```c#
class Program
{
  static void Square(double number)
  {
    number *= number;
  }

  static void Main(string[] args)
  {
    double number = 5;
    Console.WriteLine($"Before: {number}"); //5
    Square(number);
    Console.WriteLine($"After: {number}"); //5
  }
}
```

원본 변수의 값을 바꾸고 싶다면 어떻게 해야할까? return 키워드 사용. square를 호출 후 return되는 값을 Main 함수 내에 number에 재할당해준다. 이 역시 원본이 변경된 것은 아니다.

```c#
class Program
{
  static void Square(double number)
  {
    return number *= number;
  }

  static void Main(string[] args)
  {
    double number = 5;
    Console.WriteLine($"Before: {number}"); //5
    number = Square(number);
    Console.WriteLine($"After: {number}"); //25
  }
}
```

## 참조에 의한 전달

원본을 바꾸지 않는 값에 의한 전달과 달리 **원본을 바꾸는 것**을 `참조에 의한 전달`이라 한다. `ref`키워드는 값을 바꾸는 것이 아니라 원본을 전달해주겠다는 의미(원본을 바꾼다).

- `원본 변수 = 인자` : 함수 매개변수에 `원본 변수`가 전달된다.
- 호출된 함수의 인자의 값이 변경되면 호출자 함수에 반영된다.
  - Square함수의 값이 바뀌면 Main함수의 값도 바뀐다.

```c#
class Program
{
  static void Square(ref double number)
  {
    return number *= number;
  }

  static void Main(string[] args)
  {
    double number = 5;
    Console.WriteLine($"Before: {number}"); //5
    Square(ref number);
    Console.WriteLine($"After: {number}"); //25
  }
}
```

## ref 키워드 (c# 전용)

- 참조에 의한 전달을 위해 c#에서 사용
- 함수 호출 시 인자에 `ref` 키워드를 붙인다.
- `ref`키워드는 다른 프로그래밍 언어에서 널리 쓰이지 않는다. C의 포인터처럼 비슷한 개념은 있다.

---

## 배열의 참조

<details>
<summary>아래 함수를 실행한 결과로 화면에 출력되는 값은?</summary>
<div markdown="1">

1, 2, 3, 4, 5

</div>
</details>

```c#
using System;

public class Program
{
    public static void Main()
    {
        int[] array = new int[5] { 1, 2, 3, 4, 5 };
        Square1(array);

        for (int i = 0; i < array.Length; ++i)
        {
            Console.WriteLine(array[i]);
        }
    }

    public static int[] Square1(int[] arr)
    {
        int[] result = new int[arr.Length];

        for (int i = 0; i < arr.Length; ++i)
        {
            result[i] = arr[i] * arr[i];
        }

        return result;
    }
}
```

- `Square1(array);`에 `{1, 2, 3, 4, 5}`가 전달되었다.
- Square 함수 내부에서는 `{1, 2, 3, 4, 5}`의 길이인 5와 같은 길이를 가지는 result라는 배열을 생성하고, for문을 돌면서 i가 5가 되기 전까지 `result[i] = arr[i] * arr[i];`라는 계산을 수행한다.
- 그 결과로 반환되는 `result`는 `1, 4, 9, 16, 25`이다.

**Main함수로 돌아가서 그럼 Main 함수가 반환하는 값은 `1, 4, 9, 16, 25`일까?** _그렇지 않다._

마지막으로 화면에 출력되는 값은 `1, 2, 3, 4, 5`이다.
Square1 함수에는 array라는 베열의 참조가 전달되었다. 참조가 전달되었다는 의미는 Square 함수 내부에서 이 배열에 대한 어떠한 연산의 과정을 거쳐 배열 안의 요소의 값이 변경되면 array라는 배열도 변경된다는 것을 의미한다. 따라서 Square1 함수 내부에서 array라는 값에 대한 제곱을 수행하여서 `1, 4, 9, 16, 25`이 반환된다. 이 흐름대로라면 마지막으로 출력되는 값은 `1, 4, 9, 16, 25`이어야 정답이다. 하지만 `int[] result = new int[arr.Length];`라고 선언된 부분을 살펴보아야 한다. array라는 배열의 참조가 전달된 것은 맞지만 여기서 result라는 새로운 배열이 만들어졌기 때문에 Square1 함수 내부의 for문에서 연산된 결과는 array의 요소를 바꾸는 것이 아니라 새롭게 만들어진 result의 요소를 계산한 것이다. 따라서 `1, 4, 9, 16, 25`는 array의 요소를 변경한 것이 아닌 새롭게 만들어진 result라는 배열의 요소를 변경한 것이다. 즉 원래 있던 array배열과는 상관이 없어진 것이다. 따라서 마지막으로 출력되는 값은 `1, 2, 3, 4, 5`이다.

---

<details>
<summary>아래 함수를 실행한 결과로 화면에 출력되는 값은?</summary>
<div markdown="1">

1, 4, 9, 16, 25

</div>
</details>

```c#
using System;

public class Program
{
    public static void Main()
    {
        int[] array = new int[5] { 1, 2, 3, 4, 5 };
        Square2(array);

        for (int i = 0; i < array.Length; ++i)
        {
            Console.WriteLine(array[i]);
        }
    }

    public static void Square2(int[] arr)
    {
        for (int i = 0; i < arr.Length; ++i)
        {
            arr[i] *= arr[i];
        }
    }
}
```

- `Square2(array);`에 `{1, 2, 3, 4, 5}`가 전달되었다.
- Square2 함수 내부에서는 전달된 array값을 가지고 for문을 돌면서 `arr[i] *= arr[i]`라는 계산을 수행한다.
- 그 결과로 반환되는 `arr[i]`는 `1, 4, 9, 16, 25`이다.

**Main함수로 돌아가서 그럼 Main 함수가 반환하는 값은 `1, 4, 9, 16, 25`일까?** _그렇다._

Square2함수와 앞서 살펴본 Square1 함수와는 큰 차이점이 있다. Square2에는 Square1함수의 `result`처럼 새롭게 할당되는 값이 없다. 따라서 여기서 for문 내부의 연산 결과 반환되는 값은 실제로 array라는 원본 배열의 요소를 변경시킨다. 그렇기 때문에 최종적으로 `1, 4, 9, 16, 25`가 출력되는 것이다.

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
