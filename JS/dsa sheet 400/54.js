// Count prime numbers in a range

let range = 100;
let count = 0;

for (let i = 2; i < range; i++) {
  let flag = false;

  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      flag = true;
      break;
    }
  }
  if (flag == false) {
    count++;
  }
}

console.log(count);
