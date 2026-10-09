// find nth fibonicci number ;

let n = 10;

let f = 0;
let s = 1;

for (let i = 0; i < n; i++) {
  let n = f + s;
  f = s;
  s = n;
}

console.log(f);
