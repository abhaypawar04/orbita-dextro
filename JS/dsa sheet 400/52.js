// check number is prime number or not a prime number

let n = 172;
let flag = false;

for (let i = 2; i <= n / 2; i++) {
  if (n % i == 0) {
    flag = true;
    break;
  }
}

if (flag) {
  console.log("not a prime number ");
} else {
  console.log("it is a prime number ");
}
