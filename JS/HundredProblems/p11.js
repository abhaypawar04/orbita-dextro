const palindrome = (n1) => {
  let flag = n1;
  let rev = 0;
  let intNo = n1;
  while (n1 > 0) {
    let digit = n1 % 10;
    rev = rev * 10 + digit;
    n1 = Math.floor(n1 / 10);
  }

  return flag === rev ? "palindrome" : "not a palindrome";
};
console.log(palindrome(121));
