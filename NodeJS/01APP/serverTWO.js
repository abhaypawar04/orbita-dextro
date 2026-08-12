const express = require("express");
const app = express();

// ==========================================
// View Engine (EJS)
// ==========================================

app.set("view engine", "ejs");

// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.send("Welcome to Express.js");
});

// ==========================================
// res.send()
// ==========================================

app.get("/send-text", (req, res) => {
  res.send("Hello Express");
});

app.get("/send-html", (req, res) => {
  res.send("<h1>Hello HTML</h1>");
});

app.get("/send-object", (req, res) => {
  res.send({
    name: "Yahobaba",
    age: 25,
  });
});

app.get("/send-array", (req, res) => {
  res.send(["Apple", "Banana", "Orange"]);
});

// ==========================================
// res.json()
// ==========================================

app.get("/json", (req, res) => {
  res.json({
    name: "Salman",
    age: 23,
    city: "Pune",
  });
});

app.get("/users", (req, res) => {
  const users = [
    { id: 1, name: "Salman" },
    { id: 2, name: "John" },
    { id: 3, name: "Rahul" },
    { id: 4, name: "Ali" },
  ];

  res.json(users);
});

// ==========================================
// res.redirect()
// ==========================================

app.get("/about", (req, res) => {
  res.redirect("/user");
});

app.get("/user", (req, res) => {
  res.send("Welcome User");
});

app.get("/google", (req, res) => {
  res.redirect("https://www.google.com");
});

// ==========================================
// res.render()
// ==========================================

app.get("/profile", (req, res) => {
  res.render("profile");
});

// ==========================================
// res.download()
// ==========================================

app.get("/download", (req, res) => {
  res.download("./print.pdf");
});

// ==========================================
// res.set() & res.get()
// ==========================================

app.get("/header", (req, res) => {
  res.set("Course", "Express JS");

  console.log(res.get("Course"));

  res.send("Header Set Successfully");
});

// ==========================================
// res.status()
// ==========================================

app.get("/success", (req, res) => {
  res.status(200).send("Success");
});

app.get("/notfound", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.get("/server-error", (req, res) => {
  res.status(500).send("Internal Server Error");
});

// ==========================================
// SERVER
// ==========================================

app.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
