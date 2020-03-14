console.log(Person); //함수 호이스팅 [function: prototype]
console.log(Person.prototype); //프로토타입도 런타임 이전에 생성 Person{}

function Person(name, age) {
  this.name = name; //객체를 생성할 때마다 외부에서 값을 전달해준다. 만약 'lee'이런식으로 작성하면 고정값을 주는 것.
  this.age = age;
  this.sayHi = function() {
    console.log("hi! " + `${this.name}`);
  };
  //메소드는 프로퍼티 값이 함수인 것의 통칭
}

const me = new Person("lee", 20); //{}
//여기 있는 me는 나중에 생성되기 떄문에 함수 내부에 쓰기 애매함.
const you = new Person("kim", 60);
me.sayHi();
you.sayHi();
