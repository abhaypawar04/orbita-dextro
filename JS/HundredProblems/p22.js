const checkfizz = (arr1) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] % 3 === 0 && arr1[i] % 5 === 0) {
      console.log("fizzbuzz");
    } else if (arr1[i] % 3 === 0) {
      console.log("fizz");
    } else if (arr1[i] % 5 === 0) {
      console.log("buzz");
    } else {
      console.log(arr1[i]);
    }
  }
};

//console.log(checkfizz([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
checkfizz([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
