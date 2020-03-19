function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  console.log(`hi! my name is ${this.name}`);
};

Person.sayHello = function() {
  console.log(`hello!`);
};

const me = new Person("mingu");
me.sayHi();

function Particle() {
  this.x = 100;
  this.y = 99;
  /*this.show = function() {
    Point(this.x, this.y);
  };*/
}

Particle.prototype.show = function() {
  point(this.x, this.y);
};

var p;
var v;
//새로운 객체를 만들고 this를 통해 연결.

function setup() {
  createCanvas(600, 300);
  p = new Particle();

  v = createVector(3, 4);
}
