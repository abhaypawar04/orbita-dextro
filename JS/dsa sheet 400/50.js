//Find power of a number without Math.pow

let n = 5;
let p = 3;
let r = 1;

for (let i = 1; i <= p; i++) {
  r = r * n;
}

console.log(r);
