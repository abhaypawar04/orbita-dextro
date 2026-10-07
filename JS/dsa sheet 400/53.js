//print prime number from 1 to N

let n = 100;

for (let i = 2; i < n; i++) {
  let flag = false;
  for (let j = 2; j < i; j++) {
    if (i % j == 0) {
      flag = true;
      break;
    }
  }
  if (flag == false) {
    console.log(i);
  }
}
