// ===========================================
// EXPRESS.JS REVISION
// ===========================================

// Import Express
const express = require("express");

// Create Express App
const app = express();

// ===========================================
// BASIC ROUTES
// ===========================================

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Started");
});

// About Route
app.get("/about", (req, res) => {
  res.send("Welcome to About Page");
});

// Contact Route
app.get("/contact", (req, res) => {
  res.send("Welcome to Contact Page");
});

// Yahoo Route (HTML Response)
app.get("/yahoo", (req, res) => {
  res.send("<h1>Hello Yahoo!</h1>");
});

// ===========================================
// SUB ROUTES
// ===========================================

// Gallery Route
app.get("/gallery", (req, res) => {
  res.send("Gallery Page");
});

// Nested Route
app.get("/about/user", (req, res) => {
  res.send("User Component");
});

// ===========================================
// SPECIAL CHARACTER ROUTES
// ===========================================

app.get("/about.txt", (req, res) => {
  res.send("This is a special character route.");
});

// ===========================================
// ROUTE PARAMETERS
// ===========================================

// Single Parameter
// Example:
// http://localhost:3000/about/101

app.get("/about/:id", (req, res) => {
  res.send(req.params);
});

// Access Individual Parameter

app.get("/student/:id", (req, res) => {
  res.send("Student ID : " + req.params.id);
});

// ===========================================
// MULTIPLE ROUTE PARAMETERS
// ===========================================

// Example:
// http://localhost:3000/user/12/book/55

app.get("/user/:userid/book/:bookid", (req, res) => {
  res.send(req.params);
});

// Individual Values

app.get("/book/:userid/book/:bookid", (req, res) => {
  res.send(
    "User ID : " + req.params.userid + " | Book ID : " + req.params.bookid,
  );
});

// ===========================================
// MULTIPLE PARAMETERS IN ONE URL
// ===========================================

// Example:
// http://localhost:3000/profile/10-500

app.get("/profile/:userid-:bookid", (req, res) => {
  res.send(req.params);
});

// ===========================================
// QUERY PARAMETERS
// ===========================================

// Example:
// http://localhost:3000/search?size=xl&color=black

app.get("/search", (req, res) => {
  const size = req.query.size;
  const color = req.query.color;

  res.send(`Size : ${size}, Color : ${color}`);
});

// Multiple Query Parameters

// Example:
// http://localhost:3000/product?name=laptop&price=50000&brand=HP

app.get("/product", (req, res) => {
  res.send(req.query);
});

// ===========================================
// JSON RESPONSE
// ===========================================

app.get("/json", (req, res) => {
  res.json({
    name: "Rahul",
    age: 22,
    city: "Pune",
  });
});

// ===========================================
// STATUS CODE
// ===========================================

app.get("/error", (req, res) => {
  res.status(404).send("Page Not Found");
});

// ===========================================
// START SERVER
// ===========================================

app.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
