---
title: 삼항조건연산자 실습
date: 2020-02-22
tags:
---

> 삼항조건연산자-> 조건식 ? 조건식이 true일때 반환할 값 : 조건식이 false일때 반환할 값

1. 양수 또는 음수를 출력하는 if문

```javascript
var num = 2;
var kind = "";

if (num > 0) {
  kind = "양수";
} else {
  kind = "음수";
}
console.log(kind); //양수
```

2. if문을 삼항조건연산자로 써보기

```javascript
var num = 2;
var kind = "";

kind = num > 0 ? "양수" : "음수";
console.log(kind);
```

_양수, 음수 외에 '0'이라는 숫자가 출력되는 조건도 추가하고 싶다면? (0은 음수도 양수도 아니다.)_

3. 양수, 음수 또는 '0'을 출력하는 if문

```javascript
var num = 2;
var kind = "";

if (num > 0) {
  kind = "양수";
} else if (num < 0) {
  kind = "음수";
} else {
  kind = "영";
}
console.log(kind); //양수
```

4. if문을 삼항조건연산자로 써보기

```javascript
var num = 2;
var kind = "";

kind = num > 0 ? "양수" : num < 0 ? "음수" : "영";
console.log(kind); //양수
```

```javascript
var num = 2;
var kind = "";

kind = num ? (num > 0 ? "양수" : "음수") : "영";
console.log(kind); //양수
```

5. 술 구매 가능 여부를 출력하는 if문

```javascript
var age = 19;
var canDrinkAlcohol = "";

if (age > 19) {
  canDrinkAlcohol = "OK. You can buy alcohol.";
} else {
  canDrinkAlcohol = "No. You can't buy alcohol.";
}
console.log(canDrinkAlcohol);
```

6. if문을 삼항조건연산자로 써보기

```javascript
var age = 19;
var canDrinkAlcohol = "";

canDrinkAlcohol =
  age > 19 ? "OK. You can buy alcohol." : "No. You can't buy alcohol.";
console.log(canDrinkAlcohol);
```

7. 신장을 출력하는 if문

```javascript
var height = 169;
var result = "";

var result =
  height > 169
    ? "wow, you are taller than me"
    : height < 169
    ? "You are little bit shorter than me."
    : "You and me are the same height.";
console.log(result);
```

8. if문을 삼항조건연산자로 써보기

```javascript
var height = 169;
var result = "";

if (height > 169) {
  console.log("wow, you are taller than me");
} else if (height < 169) {
  console.log("You are little bit shorter than me.");
} else {
  console.log("You and me are the same height.");
}
```
