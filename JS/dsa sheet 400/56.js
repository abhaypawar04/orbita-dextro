let n1 = 12;
let n2 = 18;
let gcd = 1;

for (let i = 1; i <= n1 && i <= n2; i++) {
  if (n1 % i == 0 && n2 % i == 0) {
    gcd = i;
  }
}
console.log(gcd);
