import express from "express";
import router from "./routes/student.routes.js";
import connectdb from "./config/database.js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const studentRoutes = router;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectdb();
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("hello server");
});

app.listen(process.env.PORT, () => {
  console.log("backend is running on a port 3000");
});
