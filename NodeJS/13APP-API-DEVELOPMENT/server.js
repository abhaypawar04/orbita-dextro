import express from "express";
import mongoose from "mongoose";
const app = express();
import router from "./routes/students.routes.js";
const studentRoutes = router;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/students", studentRoutes);

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
