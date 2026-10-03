// FIND SUM OF DIGIT

let N = 12344;
let sum = 0;

while (N != 0) {
  let digit = N % 10;
  sum += digit;
  N = Math.floor(N / 10);
}

console.log(sum);
