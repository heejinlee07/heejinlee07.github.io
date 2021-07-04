---
title: 문자열 분할
date: 2021-07-04
tags: C#
---

## 문자열 분할

게임 몬스터 데이터를 읽어와야한다고 가정한다. 각 몬스터는 어떤 특정한 정형화된 형식을 만들어야 프로그램으로 읽을 수 있다.

**<u>1. 키와 값</u>**
키가 어떤 용도의 데이터인지 알려준다. 파일 안에서 순서가 바뀌어도 상관없다.

```c#
//name, HP, MP의 키값으로 데이터를 찾기 때문에 순서가 바뀌어도 상관없다.
name: "Pokemon"
HP:1
MP: 1000
```

위의 경우 보통 한 몬스터의 데이터만 한 파일 안에 저장한다. 만약 여러 몬스터 데이터를 저장해야 한다면 방법은 아래 두 가지가 있다.

- 몬스터 하나당 파일 하나: 파일이 너무 많아진다는 단점이 있고, 이는 성능저하의 원인이 된다.
- 한 파일에 배열과 같은 형태로 집어 넣는다: XML 또는 아래 코드와 같은 JSON 형태
  ```json
  {
    "monstars": [
      {"name": "Pokemon1", "HP":1, "MP": 1000}
      {"name": "Pokemon2", "HP":2, "MP": 2000}
    ]
  }
  ```

**<u>2. 표</u>**
정형화된 다수의 데이터를 한 곳에 저장하기 용이하다. 아래 표처럼 엑셀과 같은 형태. 열 색인으로 어떤 용도의 데이터인지 결정한다. 순서를 바꿀 수는 없다.

| name     | HP  | MP   |
| -------- | --- | ---- |
| pokemon1 | 1   | 1000 |
| pokemon2 | 2   | 2000 |

표의 형태를 사용하는 경우 흔히 `엑셀파일`을 이용한다. 엑셀파일은 텍스트 파일이 아니기 때문에 CSV(comma-separated values)파일로 저장 가능하다. CSV는 텍스트 파일이며 각 값은 아래와 같이 쉼표로 분리된다.

```
name, HP, MP
pokemon1, 1, 1000
pokemon2, 2, 2000
```

몬스터 CSV데이터를 읽는 의사 코드

```c#
string[] lines =
{
  "pokemon1,1,1000",
  "pokemon2,2,2000"
};

for (int i = 0; i <lines; ++i)
{
  string line = lines[i];

  //for 문을 써서 문자열을 읽어온 뒤 string[] tokens에 저장

  Console.WriteLine($"몬스터 경고: tokens[0] (HP: {tokens[1]}, MP: {tokens[2]})");
}
```

---

## 토큰을 읽어오는 법

> 토큰: 연속된 데이터에서 쪼갤 수 있는 가장 작은 단위

- 별도의 for문이 필요
- string의 `IndexOf()`, `Substring()` 등의 함수 또는 첨자 연산자([])를 이용해서 구현 가능

### IndexOf()

> <문자열 변수 이름>.IndexOf(char);

```c#
string message = "C# is very very fun!";
int index = message.IndexOf('v'); //6 반환
```

**char의 위치를 찾아서 색인을 반환하는 함수**

- 문자가 문자열에 여러 번 나타나면 가장 처음에 나타난 곳의 색인을 반환한다.
- 찾는 문자가 문자열에 없다면 `-1`을 반환한다.
- LastIndexOf()는 찾고자 하는 문자열이 가장 마지막에서부터 처음 나타난 곳의 색인을 반환하다.

### Substring()

> <문자열 변수 이름>.Substring(<색인>);

```c#
string nameMessage = "name: pokeMon";
string name = namemessage.Substring(6); //pokeMon 반환
```

**지정된 문자 위치(<색인>)에서부터의 문자열을 반환하는 함수**

### 첨자 연산자([])

> <문자열 변수 이름>[<색인>];

for문을 돌린다고 가정하면 각 문자열이 어느 위치에 들어있는 지 알아야 하고, 이럴 때 첨자 연산자를 사용한다.

```c#
string HPMessage = "HP: 100";
char ch = HPMessage[4]; // '1'
```

**<색인> 위치에 있는 문자 하나를 반환한다.**

---

## 문자열 토크나이저

## Split()

> <문자열 변수 이름>.Split(char);

```c#
string text = "pokemon,1,10000";
string[] tokens = text.Split(','); // {"pokemon", "1", "10000"}
```

- char는 문자열을 쪼갤 때 사용할 구분 문자
- **원본 문자열은 변경 없이 그대로 유지**
- 쪼갠 문자열을 문자열 배열로 반환
- 여러 버전의 Split() 함수가 존재

### 여러 개의 구분 문자가 문자열에 있을 때

> <문자열 변수 이름>.Split(char[]);

문자형 배열(char[])에 여러 개의 구분 문자를 대입한다.

```c#
string text = "pokemon,1:10000";

char[] delimiters = {',', ':'};
string[] tokens = text.Split(delimiters); // {"pokemon", "1", "10000"}
```

### 구분 문자 사이가 비어 있을 때

```c#
string text = "pokemon, 1, 10000:, 10";

char[] delimiters = {',', ':'};
string[] tokens = text.Split(delimiters); // {"pokemon", "1", "10000", "", "10"}
```

',' 또는 ':'를 기준으로 문자열을 쪼개고 있기 때문에 '10000:,'과 같은 케이스에서 `""`가 나온다. 이럴 때 `String.IsNullOrEmpty(String)`나 for문을 사용하여 빈 문자열을 걸러줄 수 있다. 또는 `StringSplitOptions.RemoveEmptyEntries`를 사용하여 걸러줄 수 있다.

```c#
string text = "pokemon, 1, 10000:, 10";

char[] delimiters = {',', ':'};
string[] tokens = text.Split(delimiters, StringSplitOptions.RemoveEmptyEntries); // {"pokemon", "1", "10000", "10"}
```

---

## Trim()

> <문자열 변수 이름>.Trim();

```c#
string firstName = "              Leon";
string lastName = "kim                ";

//문자열 앞뒤 공백 제거
string trimmedFirstName = firstName.Trim(); //"Leon"
string trimmedLastName = lastName.Trim(); //"kim"

//문자열 앞 공백 제거
string trimmedFirstName = firstName.TrimStart(); //"Leon"
string trimmedLastName = lastName.TrimStart(); //"kim

//문자열 뒤 공백 제거
string trimmedFirstName = firstName.TrimEnd(); //"              Leon"
string trimmedLastName = lastName.TrimEnd(); //"kim"
```

**<u>Trim()</u>**

- `문자열 앞뒤`로 있는 공백을 없앤 후 문자열을 반환
- **원본 문자열은 변경 없이 그대로 유지**

**<u>TrimStart()</u>**

- `문자열 시작`에서 공백을 제거 후 문자열을 반환
- **원본 문자열은 변경 없이 그대로 유지**

**<u>TrimEnd()</u>**

- `문자열 뒤`에서 공백을 제거 후 문자열을 반환
- **원본 문자열은 변경 없이 그대로 유지**

---

_References_
[실무 프로그래밍 입문(C#)](https://www.udemy.com/share/101tfkAEYTcVxXTXQJ/)
