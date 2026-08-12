import express from "express";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contact.routes.js";

const app = express();
app.use(express.json());
connectDB();
app.use("/api/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.send("backend is running");
});
app.listen(3000, () => {
  console.log(`http://localhost:3000/`);
});
