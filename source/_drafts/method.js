// 메소드 사용
const person = {
  firstName: "Ungmo",
  lastName: "Lee",
  getFullname() {
    return `${this.firstName} ${this.lastName}`;
  },
  setFullname(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};
console.log(person.getFullname());
person.setFullname("foo bar"); // 로 바뀌어서 나뉘어서 할당 > 출력
console.log(person); // foo bar 로 바뀌어있음
console.log(person.getFullname());

// 접근자 프로퍼티 사용
const person2 = {
  firstName: "Ungmo",
  lastName: "Lee",
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" ");
  }
};
console.log(person2.fullName); // 똑같이 동작, 참조만 가능.
console.log(person2); // foo bar 로 바뀌어있음
console.log(person2.fullName);

function add(x, y) {
  return x + y;
}
var result = add(1, 2);
