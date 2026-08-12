const countWord = (s1) => {
  let space = 0;
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] == " ") {
      space += 1;
    }
  }

  return { space, words: space + 1 };
};

console.log(countWord("india is my country"));
