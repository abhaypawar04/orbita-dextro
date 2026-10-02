//Find sum of even numbers from 1 to N

let N = 10;
let sum = 0;

for (let i = 0; i <= N; i++) {
  if (i % 2 == 0) {
    sum += i;
  }
}
console.log(sum);
