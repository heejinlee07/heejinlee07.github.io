function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      return i;
    }
  }
  return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 1));
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3));
console.log(linearSearch([1, 2, 3, 4, 5, 6], 5));
console.log(linearSearch([1, 2, 3, 4, 5, 6], 6));
console.log(linearSearch([1, 2, 3, 4, 5, 6], -1));
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0));
console.log(linearSearch([1, 2, 3, 4, 5, 6], 7));

//이진검색 - while
//버블정렬- 이중for문
