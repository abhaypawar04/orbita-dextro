//Find product of digits
let N = 12345;
let product = 1;

while (N != 0) {
  let digit = N % 10;
  product *= digit;
  N = Math.floor(N / 10);
}
console.log(product);
