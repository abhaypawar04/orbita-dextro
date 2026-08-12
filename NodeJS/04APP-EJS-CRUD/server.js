import express from "express";
import contact from "./models/contacts.model.js";
import contactRoutes from "./routes/contacts.routes.js";
import { connectDB } from "./config/database.js";
//----------------------------------------------------------------
const app = express();
const PORT = process.env.PORT;
//----------------------------------------------------------------
//! Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
//---------------------------------------------------------------
//? db
connectDB();
//?routes
app.use("/", contactRoutes);
//---------------------------------------------------------------
//! Listen Component
app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`);
});
