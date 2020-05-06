class Base {
  constructor(x, y) {
    console.log(this); //Derived {}
    console.log(this instanceof Derived); //true
    console.log(this instanceof Base); //true

    this.x = x;
    this.y = y;
    console.log(this); //Derived {x:1, y:2}
    //return this 가 숨겨져있음.
  }
  sayHi() {
    return `x: ${this.x}, y: ${this.y}`;
  }


  /*static sayHi() {
    console.log('x');
  }
}
static 쓰면 this 안써도 됨.
*/


class Derived extends Base {
  //constructor(...args) 매개변수에 ...을 쓰면 푸는게 아니라 뭉치는 것.
  constructor(x, y, z) {
    console.log(this); //  referenceerror발생. this는 super 호출 이전에 허락되지 않음.this
    super(x, y); //사실은 this = super(x,y)로 되어있는데 암묵적으로 처리하는 것.
    console.log(this); //Derived {x:1, y:2}
    this.z = z;
  }

  sayHi() {
    return `${super.sayHi()} + z: ${this.z}`//super.base메소드의 이름을 하면 부모를 부르게됨.
  }
}

const d = new Derived(1, 2, 3);
console.log(d); //Derived { x: 1, y: 2, z: 3 }
d.sayHi(); //Derived { x: 1, y: 2, z: 3 }

const arr = [1,2];
arr[-1] = 100;
arr.foo = 100;
arr['bar'] = 100;
console.log(arr); //(2) [1, 2, -1: 100, foo: 100, bar: 100]
