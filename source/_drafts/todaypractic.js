/*const args = {
  0: 1,
  1: 2,
  2: 3,
  length: 3
};

for (var i = 0; i < args; i++) {
  console.log(args);
}*/

function sum() {
  console.log(arguments);
  // {0:1, 1:2......length:5}

  for (var i = 0; i < sum; i++) {
    console.log(i);
  }
}

sum(1, 2, 3, 4, 5);

//선생님 버전
function sum() {
  console.log(arguments);

  let sum = 0;
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i];
  }
  return sum;
}

console.log(sum(1, 2, 3, 4, 5));

const arr = ["apple", "banana", "orange"];

for (var i = 0; i < arr.length; i++) {
  console.log(i);
}
console.log(i);

const brr = ["apple", "banana", "orange"];

for (var i = 0; i < brr.length; i++) {
  console.log(brr[i]);
}
