const checkan = (n1) => {
  let init = n1;
  let count = n1.toString().length;
  let sum = 0;

  while (n1 > 0) {
    let digit = n1 % 10;
    sum += digit ** count;
    n1 = Math.floor(n1 / 10);
  }
  return init === sum ? "armstrong number " : "not armstrong number";
};

console.log(checkan(1634));
