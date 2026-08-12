const factorial = (n1) => {
  let fact = 1;
  for (let i = 1; i <= n1; i++) {
    fact *= i;
  }
  return fact;
};

console.log(factorial(5));
