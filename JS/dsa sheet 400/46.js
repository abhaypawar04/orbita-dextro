//Find first and last digit
let N = 12345;
let last = N % 10;
let first = 0;

while (N != 0) {
  let digit = N % 10;
  first = digit;
  N = Math.floor(N / 10);
}
console.log(last);
console.log(first);
