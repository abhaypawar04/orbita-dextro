const swapw23 = (n1, n2) => {
  let num1 = n1;
  let num2 = n2;

  n1 = n1 - n2;
  n2 = n1 + n2;
  n1 = n2 - n1;

  return { n1, n2 };
};

console.log(swapw23(12, 15));

// n=7
// m=9

// m = m-n = 2
// n = n+m  = 9
// m = n-m  = 7
