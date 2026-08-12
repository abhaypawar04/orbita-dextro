import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import authRoutes from "./routes/authRoutes.js";

await mongoose.connect("mongodb://127.0.0.1:27017/sessionDB");
console.log("mongo connected");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "sessionsecret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/sessionDB",
    }),
  }),
);
app.use("/", authRoutes);

app.listen(3000, () => {
  console.log("server running on port 3000");
});

//!--------------------------------------------------------------------------
// app.use(
//   session({
//     secret: "sessionkey",
//     resave: false,
//     saveUninitialized: false,
//   }),
// );
//?-------------
app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/sessionDB",
    }),
  }),
);
//?-------------

app.get("/", (req, res) => {
  req.session.username = "abhay";
  req.session.isLoggedIn = true;
  req.session.gf = "nandini lohara";
  res.send(req.session);
});

app.get("/session", (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`you have visited ${req.session.views} times`);
});

app.get("/login", (req, res) => {
  req.session.username = "jonny";
  req.session.isLoggedIn = true;
  res.send(`welcome ${req.session.username}`);
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send("error logging out");
    }
    res.send(` logged out`);
  });
});
//!---------------------------------------------------------------------------
