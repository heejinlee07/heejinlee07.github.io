//제어문 연습문제

// 1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라

var x = 15;

if (x > 10 && x < 20) {
  console.log(x);
}

// 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
for (var i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// 3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.
var str = "";

for (var i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    str += i;
  }
}
console.log(str);

// 4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
for (var i = 9; i >= 0; i--) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

// 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
var count = 0;

while (count < 10) {
  if (count % 2 === 0) console.log(count);
  count++;
}

// 6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
var count = 9;
while (count >= 0) {
  if (count % 2 !== 0) console.log(count);
  count--;
}

// 7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.
var num = 0;

for (var i = 0; i < 10; i++) {
  num += i;
}
console.log(num);

// 8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.

/* 
var num = 0;

for (var i = 1; i < 20; i++) {
  if (i % 2 === 0) {
  } else if (i % 3 === 0) {
  } else {
    num += i;
  }
}
console.log(num);
*/

var num = 0;

for (var i = 1; i < 20; i++) {
  if (i % 2 !== 0 && i % 3 !== 0) {
    num += i;
  }
}
console.log(num);

// 9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.
var num = 0;

for (var i = 1; i < 20; i++) {
  if (i % 2 === 0 || i % 3 === 0) {
    num += i;
  }
}
console.log(num);

// 10. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.
for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) {
      console.log("[" + i + "," + j + "]");
    }
  }
}

// 11. 삼각형 출력하기 - pattern 1
/*다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 
완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.*/
var str = "";
var line = 5;

for (var i = 0; i < line; i++) {
  str += "*";
  console.log(str);
}

// 12. 삼각형 출력하기 - pattern 2
/*
다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 
개행문자(‘\n’)로 끝나도 관계없다.*/

var str = "";

for (var i = 5; i > 0; i--) {
  var blank = 5 - i;
  console.log(" ".repeat(blank) + "*".repeat(i));
}

// 13. 삼각형 출력하기 - pattern 3
/*다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 
개행문자(‘\n’)로 끝나도 관계없다.*/

var str = "";

for (var i = 5; i > 0; i--) {
  var blank = 5 - i;
  console.log("*".repeat(i) + " ".repeat(blank));
}

// 14. 삼각형 출력하기 - pattern 4
/*다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 
개행문자(‘\n’)로 끝나도 관계없다.*/

var str = "";

for (var i = 0; i <= 5; i++) {
  var blank = 5 - i;
  console.log(" ".repeat(blank) + "*".repeat(i));
}

// 15. 정삼각형 출력하기

var str = "";

for (var i = 0; i < 5; i++) {
  var blank = 5 - i;
  console.log(" ".repeat(blank) + "*".repeat(2 * i + 1) + " ".repeat(blank));
}

// 16. 역정삼각형 출력하기

var str = "";

for (var i = 5; i > 0; i--) {
  var blank = 5 - i;
  console.log(" ".repeat(blank) + "*".repeat(2 * i - 1) + " ".repeat(blank));
}
