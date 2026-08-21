import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader != "undefined") {
      const token = bearerHeader.split(" ")[1];
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log(user);
      req.token = user;
      next();
    } else {
      res.status(401).json({ message: "no token provided" });
    }
  } catch (err) {
    res.status(403).json({ message: "invalid token" });
  }
};

export default auth;
