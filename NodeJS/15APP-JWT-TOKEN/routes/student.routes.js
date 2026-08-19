import express from "express";
const router = express.Router();
import Student from "../model/student.model";
import multer from "multer";
import fs from "fs";
import path from "path";
import { json } from "stream/consumers";

// get all records
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//get a single record
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// multer config -------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./upload");
  },
  filename: (req, file, cb) => {
    const newFilename = Date.now() + path.extname(file.originalname);
    cb(null, newFilename);
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
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

//------------------------------------------------------------------------------------------

//add a new student
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
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

// update student
router.put("/:id", async (req, res) => {
  try {
    const existingStudent = await Student.findById(req.params.id);
  } catch (err) {}
});
