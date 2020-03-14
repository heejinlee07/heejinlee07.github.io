function add(x, y) {
  return x + y;
}

add(2, 5);

console.log(add(2, 5)); //7

function add(x, y) {
  return x + y;
}

var result = add(2, 5);

console.log(add(2, 5)); //7
console.log(result); //7

var add = function add(x, y) {
  return x + y;
};
//함수 리터럴을 변수에 할당

//함수 선언문
function add(x, y) {
  return x + y;
}

console.dir(add); //f add(x,y); 함수참조
console.log(add(2, 5)); //7. 함수호출

/*function (x,y) {
  return x + y;
} */
//함수 선언문에서 함수 이름은 생략 불가라서 에러가 뜬다.

//함수 표현식 보통 익명함수
var add = function foo(x, y) {
  return x + y;
};

console.log(add(2, 5));
console.log(foo(2, 5)); //함수 이름은 함수 몸체 내부에서만 유효하므로 호출불가

//생성자 함수
var add = new Function("x", "y", "return x + y");

//화살표 함수
var add = (x, y) => x + y;
