---
title: 함수의 실행 결과 출력되는 값
date: 2021-06-13
tags: C#
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
