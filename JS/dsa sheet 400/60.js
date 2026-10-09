// generate a fiboicci series

let first = 0;
let second = 1;
let n = 10;

for (let i = 0; i < n; i++) {
  console.log(first);
  let next = first + second;
  first = second;
  second = next;
}
