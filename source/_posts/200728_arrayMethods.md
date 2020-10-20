---
title: algorithm에 필요한 method 정리
date: 2020-07-28
tags:
---

## reverseString Pseudocode

1. string를 배열로 만든다.
2. 배열 method를 사용하면 array 내부의 요소의 순서를 뒤집는다.
3. 순서가 뒤집힌 배열을 다시 string로 변환한다.

> example
> "hello" -> ['h', 'e', 'l', 'l', 'o'] -> ['o', 'l', 'l', 'e', 'h'] -> 'olleh'

```javascript
function reverse(str) {
  console.log(str); //hello

  const splits = str.split("");
  console.log(splits); // ["h", "e", "l", "l", "o"]

  const reversed = splits.reverse();
  console.log(reversed); // ["o", "l", "l", "e", "h"]

  const result = reversed.join("");
  console.log(result); //olleh

  return result;
}

reverse("hello");
```

## split()

> str.split([separator[, limit]])

string을 구분자를 이용하여 여러 개의 문자열로 나눈다.

- 매개변수: separator, limit 두 가지를 전달할 수 있다.
  - separator: 끊어야 할 부분을 나타내는 문자열로 실제 문자열이나 정규표현식을 받을 수 있다.
  - limit: 끊어진 문자열의 최대 개수를 나타낸다. limit이 존재하면, 배열의 원소가 limit개가 되었을 때 split메소드가 중지된다.
- 반환값: 원본 문자열을 separator마다 끊은 `문자열의 결과를 담은 배열을 반환`한다.

  - separator가 빈문자열('')일 때: 원본 문자열을 한 글자씩 분리한 배열이 반환됨.
  - separator가 공백이 있는 문자열(' ')일 때: 원본 문자열을 공백으로 구분한 배열이 반환됨.
  - separator로 아무것도 주어지지 않았을 때: 원본 문자열 전체를 담은 배열이 반환됨.

```javascript
const hi = "hello there";
hi.split(); // ['hello there']
hi.split(""); // ['h', 'e', 'l', 'o', 'o', 't', 'h', 'e', 'r', 'e']
const result = hi.split(" "); // ['hello', 'there']
console.log(result[1]); // there
hi.split(" ", 3); // ['h', 'e', 'l']

// 정규 표현식 사용
var myString = "Hello 1 word. Sentence number 2.";
var splits = myString.split(/(\d)/);

console.log(splits); // [ "Hello ", "1", " word. Sentence number ", "2", "." ]
```

---

## reverse()

> a.reverse()

배열의 순서를 반전하고, `반환값은 순서가 반전된 배열`이다.

## join()

배열의 모든 요소를 하나의 문자열로 만든다.

> arr.join([separator])

- 매개변수: separator. 배열의 각 요소를 구분할 문자열을 지정한다.
  - separator가 빈문자열('')일 때: 공백이 구분되지 않은 문자열이 반환됨.
  - separator가 공백이 있는 문자열(' ')일 때: 단어 간 공백이 있는 문자열이 반환됨.
  - separator로 아무것도 주어지지 않았을 때: 쉼표(,)로 구분된 문자열이 반환됨.
  - separator로 특정 문자가 주어졌을 때: 특정 문자가 삽입된 문자열이 반환됨.
- 반환값: 배열의 모든 요소를 연결한 하나의 문자열 반환. arr.length가 0이면 빈 문자열 반환되고, 요소가 undefined나 null이면 빈 문자열로 변환됨.

```javascript
const elements = ["Fire", "Air", "Water"];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(""));
// expected output: "FireAirWater"

console.log(elements.join(" "));
// expected output: "Fire Air Water"

console.log(elements.join("-"));
// expected output: "Fire-Air-Water"

const emptyArray = [];
emptyArray.join(); //''

const nullInArray = [null];
nullInArray.join(); //''

const undefinedInArray = [undefined];
undefinedInArray.join(); //''
```

## method chaining

return str.split("").reverse().join("");

이렇게 method를 연결하여 한줄로 구현할 수도 있지만, 문자열에 grapheme clusters가 있을 경우, 유니코드 플래그를 설정해도 오류를 일으킬 수 있어서 esrever 등의 라이브러리를 쓰는 것이 권장된다.

---

## 만약 reverse()를 쓰지 않고 reverseString를 구현해야 한다면?

1. for문을 이용

```javascript
function reverse(str) {
  let res = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    res = char + res;
  }
  return res;
}
reverse("hello");
```

argument로 전달된 'hello'의 length는 5이고, 총 5번 반복문을 돈다. 원리는 다음과 같다. 'hello'가 있다면, h를 캐치하여 res의 첫번째 요소로 보내고, 그 다음 e를 캐치하여 res의 첫 번째 요소로 보낸다. 이를 구현하기 위해 `res = char + res;`로 코드를 구현한다. 이 코드에 따라 hello가 'olleh'가 될 때까지 반복문을 돈다.

> 'hello' + ''
> 'ello' + 'h'
> 'llo' + 'eh'
> 'lo' + 'leh'
> 'o' + 'lleh'
> '' + 'olleh'

- 1회차
  char = h;
  res = h + '' -> h가 된다.
- 2회차
  char = e;
  res = e + h -> eh가 된다.
- 3회차
  char = l;
  res = l + eh -> leh가 된다.
- 4회차
  char = l;
  res = l + leh -> lleh가 된다.
- 5회차
  char = o;
  res = lleh + 0 -> olleh가 된다.

2. reduce method 이용하기

```javascript
function reverse(str) {
  return str.split("").reduce((output, char) => {
    output = char + output;
    return output;
  }, "");
}
```

## reduce()

> arr.reduce(callback[, initialvalue])
> [0,1,2,3,4].reduce(function(accumulator, currentValue, currentIndex, array) {
> return accumulator + currentValue;
> });

배열의 각 요소에 대해 주어진 reduce 함수를 실행하고, 결과값을 반환한다. reduce함수는 아래와 같이 네 개의 인자를 가지는데, 함수의 반환 값은 누산기에 할당되고, 누산기는 순회 중 유지되고, 최종 결과는 하나의 값이 된다. 이때 원본 배열은 변경되지 않는다. accumulator, currentValue를 제외한 나머지 매개변수는 option이다.

> 1. 누산기 accumulator (acc)
>    콜백의 반환값을 누적한다.
> 2. 현재 값 currentValue (cur)
>    처리가 필요한 현재 요소
> 3. 현재 인덱스 currentIndex (idx)
>    처리할 현재 요소의 인덱스. initialValue가 있으면 0 혹은 1로 시작.
> 4. 원본 배열 array (src)
>    reduce()를 호출한 배열.

- initialValue

callback의 최초 호출에서 첫 번째 인수에 제공하는 값. _빈 배열에서 초기값 없이 reduce()를 호출하면 오류가 발생한다._

- initialValue가 _있는_ 경우: `인덱스 0`에서 시작. accumulator = initialValue(콜백의 최초 호출 시)
- initialValue가 _없는_ 경우: `인덱스 1`에서 시작, 첫 번째 인덱스는 건너뛴다.

  - accumulator !== initialValue
  - accumulator = array[1]
  - accumulator = currentValue의 두 번째 값

- 반환 값: 누적 계산의 결과 값이다.
  - initialValue가 _없는_ 경우 반환값
    - 빈 배열에서 reduce()를 사용하면 TypeError 발생
    - 배열의 요소가 1개: 위치와 상관없이 단독 값을 callback 호출 없이 반환
  - initialValue가 _있는_ 경우 반환값
    - initialValue가 있는데 빈 배열이 주어졌을 때 단독 값을 callback 호출 없이 반환

```javascript
var maxCallback = (acc, cur) => Math.max(acc.x, cur.x);

// initialValue 없이 reduce()
[].reduce(maxCallback); // TypeError
[{ x: 22 }].reduce(maxCallback); // { x: 22 }
[{ x: 22 }, { x: 42 }].reduce(maxCallback); // 42
```

### reduce() 작동 방식

```javascript
[0, 1, 2, 3, 4].reduce(function (
  accumulator,
  currentValue,
  currentIndex,
  array
) {
  return accumulator + currentValue;
});

// 화살표 함수를 사용
[0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr);
```

```javascript
function reverse(str) {
  return str.split("").reduce((output, char) => {
    output = char + output;
    return output;
  }, "");
}

reverse("hello");
```

위의 함수는 아래의 구조와 같고, 아래와 같이 작동한다.

```javascript
function reverse(str) {
  const array = str.split(""); // ["h", "e", "l", "l", "o"]
  return array.reduce((output, char) => {
    // return ["h", "e", "l", "l", "o"].reduce((output, char) => {
    output = char + output;
    return output;
  }, "");
}
```

구체적인 작동방식을 살펴보면 아래와 같다.

1. initialValue:""가 주어져 있으므로, index 0에서 시작한다.
2. 주어진 array는 ["h", "e", "l", "l", "o"]이다.
3. callback은 주어진 array의 length만큼 호출된다. 예제인 ["h", "e", "l", "l", "o"]의 경우 length는 5이다.
4. 반환값은 accumulator에 할당 되고 순회하면서 `accumulator + currentValue`의 연산이 이루어진 최종값이 반환된다. 예제의 경우 최종적으로 반환되는 값은 `olleh`이다.

| callback | accumulator | currentValue | currentIndex | return |
| -------- | :---------: | :----------: | :----------: | :----: |
| 1번 째   |     ""      |      h       |      0       |   h    |
| 2번 째   |      h      |      e       |      1       |   eh   |
| 3번 째   |     eh      |      l       |      2       |  leh   |
| 4번 째   |     leh     |      l       |      3       |  lleh  |
| 5번 째   |    lleh     |      o       |      4       | olleh  |

---

_Preferences_
[Array.protorype.split()/MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/split)
[Array.prototype.reverse()/MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)
[Array.prototype.join()/MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/join)
[Array.prototype.reduce()/MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
[KodingKevin](https://youtu.be/LmHHip-RpGw)
