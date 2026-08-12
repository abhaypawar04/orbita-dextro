const sumDigit = (n1) => {
  let sum = 0;
  while (n1 > 0) {
    let digit = n1 % 10;
    sum += digit;
    n1 = Math.floor(n1 / 10);
  }
  return sum;
};

console.log(sumDigit(123));
