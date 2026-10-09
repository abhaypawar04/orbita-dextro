// generate a fibonicci series

let first = 0;
let second = 1;
let N = 10;

for (let i = 0; i < N; i++) {
  console.log(first);
  let next = first + second;
  first = second;
  second = next;
}
