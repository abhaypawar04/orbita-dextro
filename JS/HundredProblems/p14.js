const factors = (number) => {
  let arr1 = [];

  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      arr1.push(i);
    }
  }
  return arr1;
};

console.log(factors(50));
