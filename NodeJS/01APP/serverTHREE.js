// ==========================================================
// EXPRESS.JS - SENDING DATA TO THE SERVER (REVISION)
// ==========================================================

// Import Express
const express = require("express");
const app = express();

// ==========================================================
// MIDDLEWARE
// ==========================================================

// Parse JSON data
app.use(express.json());

// Parse Form Data
app.use(express.urlencoded({ extended: false }));

// Set EJS as View Engine
app.set("view engine", "ejs");

// ==========================================================
// HOME ROUTE
// ==========================================================

app.get("/", (req, res) => {
  res.send("Hello Server");
});

// ==========================================================
// REQUEST OBJECT (req)
// ==========================================================

// Get Host Name
app.get("/hostname", (req, res) => {
  res.send(req.hostname);
});

// Get Client IP Address
app.get("/ip", (req, res) => {
  res.send(req.ip);
});

// Get Proxy IPs (if available)
app.get("/ips", (req, res) => {
  res.send(req.ips);
});

// Get HTTP Method
app.get("/method", (req, res) => {
  res.send(req.method);
});

// Get Original URL
app.get("/url", (req, res) => {
  res.send(req.originalUrl);
});

// ==========================================================
// GET REQUEST
// ==========================================================

app.get("/about", (req, res) => {
  res.send("About Page");
});

// ==========================================================
// POST REQUEST
// ==========================================================

// Send JSON using Postman or Thunder Client
app.post("/about", (req, res) => {
  res.send(req.body);
});

// ==========================================================
// HTML FORM
// ==========================================================

app.get("/form", (req, res) => {
  res.render("form");
});

// Receive Form Data
app.post("/form", (req, res) => {
  res.send(req.body);
});

// ==========================================================
// SERVER
// ==========================================================

app.listen(3000, () => {
  console.log("Server Running on http://localhost:3000");
});
