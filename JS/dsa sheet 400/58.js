// coprime number = hcf is 1
let n1 = 12;
let n2 = 18;

let hcf = 1;

for (let i = 1; i <= n1 && i <= n2; i++) {
  if (n1 % i == 0 && n2 % i == 0) {
    hcf = i;
  }
}

if (hcf == 1) {
  console.log("coprime numbers");
} else {
  console.log("not a co prime numbers");
}
