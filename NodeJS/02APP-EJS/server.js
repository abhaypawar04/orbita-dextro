const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.listen(3000, () => {
  console.log("backend running on a port 3000");
});

app.get("/", (req, res) => {
  res.send("backend server is here");
});

app.get("/about", (req, res) => {
  let items = ["apple", "banana", "cherry"];
  let users = [
    { name: "abhay", age: 20 },
    { name: "abhijeet", age: 21 },
    { name: "abhishekh", age: 22 },
    { name: "abhilash", age: 23 },
    { name: "abhilasha", age: 24 },
    { name: "abhirana", age: 25 },
  ];
  res.render("about", {
    title: "about page",
    message: "welcome",
    items: items,
    usersdata: users,
  });
});
