import express from "express";
import multer from "multer";
const app = express();
import path from "path";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

//-----
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4 },
  fileFilter: fileFilter,
});
//-----

app.listen(3000, () => {
  console.log("server running on port 3000");
});

app.get("/a", (req, res) => {
  res.send("myform");
});

app.get("/", (req, res) => {
  res.render("myform");
});

//! single file
// app.post("/submitform", upload.single("userfile"), (req, res) => {
//   res.send(req.file.filename);
// });

//! multiple file upload code works here
// app.post("/submitform", upload.array("userfile", 3), (req, res) => {
//   res.send(req.files);
// });

//!upload single
// app.post("/submitform", upload.single("userfile2"), (req, res) => {
//   res.send(req.file.filename);
// });

// ! upload single and multiple
app.post(
  "/submitform",
  upload.fields([
    {
      name: "userfile",
      maxCount: 3,
    },
    {
      name: "userfile2",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    res.send(req.files);
  },
);
