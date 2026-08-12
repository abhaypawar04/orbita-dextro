const exCompute = (number, expo) => {
  let result = 1;
  for (let i = 0; i < expo; i++) {
    result = result * number;
  }
  return result;
};

console.log(exCompute(5, 4));
