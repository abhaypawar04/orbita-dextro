import express from "express";
const app = express();

// middleware
app.use((req, res, next) => {
  console.log("hello from middleware");
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}`);
  next();
});

//--
app.listen(3000, () => {
  console.log("backend running on a port 3000");
});

app.get("/", (req, res) => {
  res.send("hello backend learner how are you ");
});

app.get("/about", (req, res) => {
  res.send("hello backend learner about page ");
});
