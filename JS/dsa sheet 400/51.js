// find a power of a number using a recurrsion

let n = 5;
let p = 3;

function powerp(n, p) {
  if (p == 1) {
    return n;
  }

  return n * powerp(n, p - 1);
}

console.log(powerp(n, p));
