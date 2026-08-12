const checkPrime = (n1) => {
  let flag = false;
  for (let i = 2; i < n1; i++) {
    if (n1 % i == 0) {
      flag = true;
    }
  }
  return flag ? "not a prime" : "prime";
};

console.log(checkPrime(47));
