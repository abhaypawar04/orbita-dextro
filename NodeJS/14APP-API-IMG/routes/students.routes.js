import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import Student from "../model/student.model.js";
const router = express.Router();
//step 2
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});
//step3
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("only images are allowed! "), false);
  }
};
//?------------------------------------
//step 1
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limit: { fileSize: 1024 * 1024 * 5 },
});

//--------------------------------------
// get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a single student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// add new student
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    //const newStudent = await Student.create(req.body);
    const student = new Student(req.body);

    if (req.file) {
      student.profile_pic = req.file.filename;
    }
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update a student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "student not found" });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//delete a  student //also delete a uploaded img
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "student not found" });
    if (student.profile_pic) {
      const filePath = path.join("./uploads,student.profile_pic");
      fs.unlink(filePath, (err) => {
        if (err) console.log("failed to delete", err);
      });
    }

    res.json({ message: "student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
