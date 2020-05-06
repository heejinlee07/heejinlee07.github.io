class Person {
  constructor() {
    this.name = "lee";
  }
}

const me = new Person();
const you = new Person();
// 이렇게 하면 모든 값이 다 'lee'가 나옴. 고정값이니까.

class Person {
  //name = "lee";
  //sayHi = () => console.log(`hi ${this.name}`);
  constructor() {
    this.name = "lee";
    this.sayHi = () => console.log(`hi ${this.name}`);
  }
}

const me = new Person("lee");
console.log(me);

class Person(){
  constructor() {
  console.log(this); //{}

    this.name = "lee";
    this.sayHi = () => console.log(`hi ${this.name}`);
  }
}

const me = new Person();
console.log(me);
me.sayHi();
