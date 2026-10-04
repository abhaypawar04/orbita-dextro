//check number is palindrome or not

let N = 121;
let M = N;
let reverse = 0;

while (N != 0) {
  let digit = N % 10;
  reverse = reverse * 10 + digit;
  N = Math.floor(N / 10);
}

if (M == reverse) {
  console.log("palindrome");
} else {
  console.log("not a palindrome number");
}
