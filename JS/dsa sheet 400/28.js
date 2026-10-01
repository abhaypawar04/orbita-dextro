//Check whether a character is alphabet, digit, or special character

let c = "@";
if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
  console.log("alphabet");
} else if (c >= "0" && c <= "9") {
  console.log("digit");
} else {
  console.log("Special Character");
}
