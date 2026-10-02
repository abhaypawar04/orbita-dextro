//Count digits in a number
let N = 123532;
let count = 0;

while (N != 0) {
  N = Math.floor(N / 10);
  count++;
}
console.log(count);
