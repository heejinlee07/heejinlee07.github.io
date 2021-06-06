---
title: 반복문
date: 2021-06-05
tags: C#
---

> for문, while문, do...while문 세가지가 있고, 모두 호환이 된다.
> break;를 사용하면 반복문의 실행을 종료한다.

## for문

> 특정 코드를 `정해진 횟수`만큼 반복하는 구문

```c#
for(초기화 코드; 반복 조건식; 증감문)
{
  반복할 코드
}
```

- 초기화 코드: 처음 딱 한번 실행된다.
- 반복 조건식: 반복문을 계속 실행하지 판단한다. 조건식이 참일 동안은 그 다음 오는 중괄호 사이의 코드를 실행한다. 조건식이 거짓이라면 for문은 종료된다.
- 증감문: 반복할 코드를 실행한 후 증감문을 실행한다.

```c#
int[] ages = new int[3];

for(int i = 0; i < 3; ++i)
{
  ages[i] = int.Parse(Console.ReadLine());
}
```

---

## while 반복문

> `특정한 조건`을 만족하는 동안 코드를 반복

- 반복할 횟수가 꼭 정해져 있지 않다.
- 무한 반복도 가능

```c#
while(조건식)
{
  조건을 만족할 동한 반복할 코드
}
```

- 조건식: 조건식이 참이면 중괄호 안의 반복할 코드를 실행
- 조건식을 만족하면 코드를 실행하는 과정을 반복

```c#
int[] ages = new int[3];
int count = 0;

while(count < 3)
{
  ages[count] = int.Parse(Console.ReadLine());
  ++count; //주의: ++count가 없으면 무한 반복 발생
}

```

### while(true)

while문의 조건이 `true`이면 항상 참이니까 무한 반복하여 코드가 실행된다.

```c#
while(true)
{
  // 조건을 만족할 동안 반복할 코드
}
```

무한 반복을 탈출하려면 아래와 같이 `while(true)`라고 작성한 후 코드 내부에서 if문을 사용하여 `break;`하는 방법이 있는데 한동안 이는 코드 내부에서 if문과 break;를 사용하는 것을 잊을 경우 무한 반복되기 때문에 나쁜 습관이라고 불렸다.

```c#
static void Main(string[] args)
{
  string passcode = "3941a"; //실제 비밀번호를 이렇게 저장해서는 안됨.
  string userInput = "";

  while(true)
  {
    Console.Write("Please enter the password: ");
    UserInput = Console.ReadLine();

    if(passcode == userInput)
    {
      Console.WriteLine("Correct! welcome home!");
      break;
    }
    Console.WriteLine("Wrong password!");
  }
}
```

그러나 조건식이 많을 경우 `while(true)`를 쓰지 않고 처리하면 아래의 예시처럼 오히려 가독성이 떨어진다.

```c#
while(something1 || something2 || something3 || something4)
{
 //something
}
```

아래 코드는 각 조건이 분리되어 가독성이 좋다.

```c#
while(true)
{
  if(something1)
  {
    break;
  }
    if(something2)
  {
    break;
  }
    if(something3)
  {
    break;
  }
}
```

---

## do-while 반복문

> while문과 유사하며, do 구문의 중괄호 코드 블럭을 반드시 한 번은 실행

```c#
do
{
  // 최소 한 번은 반드시 실행되는 코드
  // 한 번 실행 후에는 조건식이 참일 때만 실행
}while(조건식);
```

- 반복할 코드: 중괄호 사이에 작성된 코드는 무조건 1번은 실행된다.
- 조건식: 반복할 코드 실행 후 거짓이면 코드의 실행을 종료하고, 조건식이 참이면 반복할 코드를 한 번 더 실행한다.

```c#
int[] ages= new int[3];
int count = 0;

do
{
  ages[count] = int.Parse(Console.ReadLine());

  ++count;
}while(count < 3);
```

---

## for문 vs while문

### for문을 쓰는 것이 더 좋을 때

- 반복문이 시작하는 시점에 범위가 정해져 있을 때
- 배열의 모든 요소를 훑을 때

### while문을 쓰는 것이 더 좋을 때

- 반복문을 종료하는 시점이 반복문 실행 도중에 결정될 때

## while문 vs do-while문

|           | while문                    | do-while문             |
| --------- | -------------------------- | ---------------------- |
| 코드 블럭 | 한 번도 실행 안 될 수 있음 | 무조건 한 번은 실행 됨 |
| 사용 빈도 | 자주 사용                  | 자주 사용하지 않음.    |

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
