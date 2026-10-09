//find lcm of a two numbers :
let n1 = 21;
let n2 = 14;
let hcf = 1;
let lcm = 1;
let prod = n1 * n2;

for (let i = 1; i <= n1 && i <= n2; i++) {
  if (n1 % i == 0 && n2 % i == 0) {
    hcf = i;
  }
}

lcm = prod / hcf;

console.log(lcm);
