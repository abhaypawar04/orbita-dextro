const reverse = (s1) => {
  let result = "";
  for (let i = 0; i < s1.length; i++) {
    let temp = s1[s1.length - i - 1];
    result += temp;
  }
  return result;
};

console.log(reverse("abhay"));
