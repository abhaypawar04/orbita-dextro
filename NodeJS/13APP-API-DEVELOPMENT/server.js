import express from "express";
import mongoose from "mongoose";
const app = express();

mongoose
  .connect("mongodb://localhost:27017/api-crud")
  .then(() => {
    console.log("successfully connected to mongodb ");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello response");
});

app.listen(3000, () => {
  console.log("running on a port 3000");
});
