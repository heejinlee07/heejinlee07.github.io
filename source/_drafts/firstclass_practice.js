const increase = function(num) {
  return ++num;
};

// 함수는 무명의 리터럴로 생성할 수 있으며, 변수에 저장할 수 있다.
// 그리고 런타임에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.

const predicates = { increas, decrease };
//함수는 객체에 저장할 수 있다.

// 함수의 매개 변수에게 전달할 수 있다.
// 함수의 결과값으로 반환할 수 있다.
function makeCounter(predicate) {
  let num = 0;

  return function() {
    num = predicate(num);
    return num;
  };
}

//함수는 매개 변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser());
console.log(increaser());
