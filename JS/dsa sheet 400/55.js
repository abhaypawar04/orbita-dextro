//Find sum of prime numbers in a range

let n = 100;
let sum = 0;

for (let i = 2; i <= n; i++) {
  let flag = false;
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      flag = true;
      break;
    }
  }

  if (flag == false) {
    sum += i;
  }
}

console.log(sum);
