//Reverse a number
let N = 12345;
let reverse = 0;

while (N != 0) {
  let digit = N % 10;
  reverse = reverse * 10 + digit;
  N = Math.floor(N / 10);
}
console.log(reverse);
