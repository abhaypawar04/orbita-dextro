import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());

app.listen(3000, () => {
  console.log("server started");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/set-cookie", (req, res) => {
  res.cookie("username", "rahul");
  res.send("cookie created");
});

app.get("/get-cookie", (req, res) => {
  res.send(req.cookies);
});

app.get("/update-cookie", (req, res) => {
  res.cookie("username", "amol");
});

app.get("/delete-cookie", (req, res) => {
  res.clearCookie("username");
  res.send("deleted");
});

//~~~~~~~
