const checkvc = (s1) => {
  let vCount = 0;
  let cCount = 0;
  for (let i = 0; i < s1.length; i++) {
    if (
      s1[i] == "a" ||
      s1[i] == "e" ||
      s1[i] == "i" ||
      s1[i] == "o" ||
      s1[i] == "u"
    ) {
      vCount += 1;
    } else {
      cCount += 1;
    }
  }
  return `vowel:${vCount}, consonent:${cCount}`;
};

console.log(checkvc("abhay"));
