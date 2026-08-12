import express from "express";
import isAuth from "../middleware/isAuth.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

//!-----
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.redirect("/login");
});
router.get("/register", (req, res) => {
  res.render("register");
});
//!-----
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    req.session.userId = user.id;
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
});
//!-----
router.get("/profile", isAuth, (req, res) => {
  res.render("profile");
});
//!-----
export default router;
