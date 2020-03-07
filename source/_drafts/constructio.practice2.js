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
  //return this;
}

const circle = new Circle(1);
// 1. new 생성자가 빈 자바스크립트 객체를 만든다. (ex. const x = {};)
// 2. this는 빈 객체를 가리킨다. this는 빈 객체를 새로 생성된 가리키고, 이 this로 빈 객체에 접근한다.
//  프로퍼티와 메소드는 새로운 객체 안에 있다.
//  3. new 생성자가 위의 객체로부터 새로 생성된 객체를 반환한다. (return this;처럼)
