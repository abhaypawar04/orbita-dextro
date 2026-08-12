const maxFromArray = (arr1) => {
  let max = -Infinity;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > max) {
      max = arr1[i];
    }
  }
  return max;
};

let arrd = [1, 2, 3, 4, 5, 6, 7];
console.log(maxFromArray(arrd));
