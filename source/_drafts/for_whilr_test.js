var cnt = 0;
var result = 0;

while (cnt < 10) {
  cnt += 1;
  result += cnt < 3 ? 5 : -1;
}
console.log(result);

var result = 0;

for (var i = 0; i < 5; i++) {
  for (var j = 0; j < 5; j++) {
    result += i < 3 ? 1 : 0;
  }
}

console.log(result);

function first() {
  console.log("1");
  function second() {
    console.log("2");
  }
  function third() {
    console.log("3");
  }
  third();
  second();
  function fourth() {
    console.log("4");
  }
  console.log("5");
}

first();

/*const phrase = "hello";

if (true) {
  const user = "lee";

  (function sayHi() {
    console.log(`${phrase}, ${user}`);
  })();
}

sayHi();*/

/*hello, lee는 즉시실행함수여서 바로 실행되고 스코프가 끝이 난다. 따라서 이후에
존재하는 sayHi()를 호출했을 때 sayHi는 이미 실행하여 끝이 났기 때문에 참조할 수 없다는 에러가
발생하는 것이다*/

const num = 1;

function funcNum() {
  console.log(num);
  const num = 2;
}
funcNum();

/*cosnst는 블록 레벨 스코프니까 funcNum호출해서 함수에 진입했더니 곧바로 console.log(num);이라고 
뜨는데 num은 아직 정의되지 않은 상태여서 referenceerror가 발생. 만약
console.log(num);이 const num =2;라고선언한 후에 콘솔에 찍어봤다면 2가 나온다.*/

const a = 5;

function sumNum(num) {
  num++;
  return num;
}

console.log(sumNum((a += 1)));

//sunNum의 인수 자리에 연산자가 들어있기 떄문에 typeError이다.

const a = 1;
var b = 5;

if (a === 1) {
  var b = 3;
  function newNum(x) {
    x += 1;
    return x;
  }
  console.log(newNum(b));
  console.log(b);
}

if (b > 0) {
  const a = 2;
  let c = 3;
  for (let i = 0; i < 5; i++) {
    let c = 1;
    a++;
  }
  console.log(a);
  console.log(c);
}

/*let은 중복선언을 허용하지 않는다. 따라서 for문 안에 있는 let은 무시된다.
그렇기 떄문에 console.log(a)를 하면 전역에 있는 3을 찍는다.?? '4/3/2/3이 정답인데
a가 왜 2인지? const는 중복선언이 안되는데??