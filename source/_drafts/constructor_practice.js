// // 빈 객체를 만든다
// const person = new Object();

// //생성된 빈 객체에 프로퍼티 또는 메소드를 추가한다.
// person.name = "lee";
// person.sayHello = function() {
//   console.log("hi! my name is " + this.name);
// };

// console.log(person);
// //빈 객체에 프로퍼티와 메소드를 추가해서 호출하면 추가된 값이 나온다.
// person.sayHello();

// const fruits = new Object();

// fruits.name = "banana";
// fruits.price = "10000";
// fruits.introduce = function() {
//   console.log("hello! " + this.name + " is " + this.price + "won");
// };

// console.log(fruits);
// fruits.introduce();

// const fruits = new Object();

// fruits.name = "banana";
// fruits.price = function(x, y) {
//   return x - y;
// };
// fruits.introduce = function() {
//   console.log(
//     "hello! " + this.name + " is " + this.price(10000, 9000) + " won"
//   );
// };

// console.log(fruits);
// fruits.introduce();

// const fruits = new Object();

// fruits.name = "banana";
// fruits.price = 50;
// fruits.getPrice = function() {
//   return this.price;
// };
// fruits.introduce = function() {
//   console.log("hello! " + this.name + " is " + this.getPrice() + " won");
// };

// console.log(fruits);
// fruits.introduce();

//객체 리터럴에 의한 객체 생성
// const car1 = {
//   name: "Mercedes-Benz",
//   price: 5000,
//   salePrice() {
//     return this.price - 1000;
//   }
// };

// console.log("this " + car1.name + " price is " + car1.salePrice() + "won");

// const car2 = {
//   name: "Mercedes-Benz",
//   price: 3000,
//   salePrice() {
//     return this.price - 1000;
//   }
// };

// console.log("this " + car2.name + " price is " + car2.salePrice() + "won");

//생성자 함수로 객체 생성
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function() {
    return 2 * this.radius;
  };
}

// 인스턴스 생성
const circle1 = new Circle(5);
const circle2 = new Circle(10);
const circle3 = new Circle(15);

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());
console.log(circle3.getDiameter());

//Factory Function
function createCircle(radius) {
  return {
    radius,
    draw() {
      console.log("draw");
    }
  };
}

const myCircle = createCircle(1);

//Constructor Function
function Circle(radius) {
  this.radius = radius;
  //   this // this는 실행할 코드를 참조하는 것. 빈 객체를 참조한다.
  // reference to the object that is executing this piece of code.
  this.draw = function() {
    console.log("draw");
  };
  return this;
}

const circle = new Circle(1);
// 1. new 생성자가 빈 자바스크립트 객체를 만든다. (ex. const x = {};)
// 2. this는 빈 객체를 가리킨다. this는 빈 객체를 새로 생성된 가리키고, 이 this로 빈 객체에 접근한다.
//  프로퍼티와 메소드는 새로운 객체 안에 있다.
//  3. new 생성자가 위의 객체로부터 새로 생성된 객체를 반환한다. (return this;처럼)
