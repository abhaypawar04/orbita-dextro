//Count occurrence of a given digit
let N = 1223344555;
let D = 4;
let count = 0;

while (N != 0) {
  let digit = N % 10;
  if (digit == D) {
    count++;
  }
  N = Math.floor(N / 10);
}

console.log(count);
