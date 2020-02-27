// function another() {
//   let x = 1;
// }

// let x = 5;

// function outer() {
//   let x = 3;
//   // 중첩 함수
//   function inner() {
//     let y = 2;
//     // 외부 함수의 변수를 참조할 수 있다.
//     console.log(x + y); // 3
//   }

//   return inner;
// }

// const content = outer();
// another();
// content();

function another() {
  let x = 1;
}
function outer() {
  let x = 1;
  // 중첩 함수
  function inner() {
    let y = 2;
    // 외부 함수의 변수를 참조할 수 있다.
    console.log(x + y); // 3
  }

  return inner;
}

const content = outer();
another();
content();
