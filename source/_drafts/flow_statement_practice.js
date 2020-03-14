//1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라

let x = 15;

if (x < 10 || x < 20) {
  console.log(x);
}

//for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
let num = 10;
for (let i = 0; i < num; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

//for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.
let str = "";

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    str += i;
  }
}
console.log(str);

//왜 빈 문자열 더하기 숫자를 하면 '3'이렇게 되지?

//for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
let num = 0;

for (let i = 10; i > num; i--) {
  if (i % 2 !== 0) {
    console.log(i);
  }
}

//while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
let num = 0;

while (num < 10) {
  if (num % 2 === 0) console.log(num);
  num++;
}

//while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
let num = 10;

while (num > 0) {
  if (num % 2 !== 0) console.log(num);
  num--;
}

//for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.
let num = 0;

for (let i = 0; i < 10; i++) {
  num += i;
}

console.log(num);

// 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.
let num = 0;
for (let i = 1; i < 20; i++) {
  if (i % 2 !== 0 && i % 3 !== 0) {
    num += i;
  }
}
console.log(num);

//1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.
let num = 0;
for (let i = 1; i < 20; i++) {
  if (i % 2 === 0 || i % 3 === 0) {
    num += i;
  }
}
console.log(num);
//||왜 이걸로 해야되나?

//두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.
let num = 6;
for (let i = 0; i < num; i++) {
  for (let j = 0; j < num; j++) {
    if (i + j === 6) {
      console.log("[" + i + "," + j + "]");
    }
  }
}

/*다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 
완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.*/
let str = "";

for (let i = 0; i < 5; i++) {
  str += "*";
  console.log(str);
}

/* 다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 
완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.*/
for (let i = 5; i > 0; i--) {
  let blank = 5 - i;
  console.log(" ".repeat(blank) + "*".repeat(i));
}

/*다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 
완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.*/
for (let i = 5; i > 0; i--) {
  let blank = 5 - i;
  console.log("*".repeat(i) + " ".repeat(blank));
}

/*다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 
개행문자(‘\n’)를 사용하여 개행한다. 
완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.*/
for (let i = 1; i <= 5; i++) {
  let blank = 5 - i;
  console.log(" ".repeat(blank) + "*".repeat(i));
}

//정삼각형 출력하기
for (let i = 0; i < 5; i++) {
  let blank = 5 - i;
  console.log(" ".repeat(blank) + "*".repeat(2 * i + 1) + " ".repeat(blank));
}
