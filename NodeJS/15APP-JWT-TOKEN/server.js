import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

app.get("/", (req, res) => {
  res.send("hello server");
});

app.listen(process.env.PORT, () => {
  console.log("backend is running on a port 3000");
});
