import express from "express";
import mongoose from "mongoose";
import connectdb from "./config/databse.js";
const app = express();
import router from "./routes/students.routes.js";
const studentRoutes = router;

connectdb();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("hello response");
});

app.listen(3000, () => {
  console.log("running on a port 3000");
});
