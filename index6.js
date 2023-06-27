let arr1 = [];
let value = 1;
while (value <= 100) {
  arr1.push(value);
  value += 1;
}
const missedNumberList = arr1.filter((each) => each != 20);

let n = 100;
let sum = (n * (n + 1)) / 2;
const actualSum = missedNumberList.reduce((sum, num) => sum + num);
console.log(sum - actualSum);
