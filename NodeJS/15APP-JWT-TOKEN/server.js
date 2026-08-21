import express from "express";
import studentRoutes from "./routes/student.routes.js";
import connectdb from "./config/database.js";
import dotenv from "dotenv";
import path from "path";
import auth from "./middleware/auth.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectdb();
app.use("/api/users", userRoutes);
app.use(auth);
app.use("/api/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("hello server");
});

app.listen(process.env.PORT, () => {
  console.log("backend is running on a port 3000");
});

//all okay all up to date.
//all is good
