import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "session",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use("/", authRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mdb connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("home");
});
app.listen(3000, () => {
  console.log("server is on at port : 3000");
});
