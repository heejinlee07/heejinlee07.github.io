// 함수 참조
console.dir(add);
console.dir(sub);

// 함수 호출
console.log(add(2, 5));
console.log(sub(2, 5));

// 함수 선언문
function add(x, y) {
  return x + y;
}

// 함수 표현식
var sub = function(x, y) {
  return x - y;
};

function sum(x, y) {
  return x + y; //반환문
  console.log(sum(2, 3));
}
console.log(sum(2, 3));
