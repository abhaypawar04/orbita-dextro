const pyramid = (n1) => {
  let row = "";
  for (let i = 1; i < n1; i++) {
    row += i;

    for (let j = 1; j < i; j++) {
      row += j;
    }
    console.log(row);
  }
};

pyramid(5);
