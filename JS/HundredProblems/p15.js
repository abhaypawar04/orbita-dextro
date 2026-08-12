const avgSet = (nset) => {
  let sum = 0;
  let count = nset.length;

  for (let i = 0; i < nset.length; i++) {
    sum += nset[i];
  }
  return sum / count;
};

console.log(avgSet([10, 20, 30, 40, 50]));
