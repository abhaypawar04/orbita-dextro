const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false })); // form value submitted needed value
app.use(express.static("public"));
app.listen(3000, () => {
  console.log("backend running on port 3000");
});

app.get("/", (req, res) => {
  res.send("hello backend learner");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/submit", (req, res) => {
  const name = req.body.myname;
  const message = `welcome ${name}`;
  res.send(message);
});
