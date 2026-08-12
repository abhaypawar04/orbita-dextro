const leapYear = (y1) => {
  if ((y1 % 4 == 0 && y1 % 100 != 0) || y1 % 400 == 0) {
    return "leap";
  } else {
    return "not a leap";
  }
};

console.log(leapYear(2002));
