import express from "express";
import Student from "../models/student.model.js";
const router = express.Router();

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
router.post("/", async (req, res) => {
  try {
    const newStudent = await Student.create(req.body);
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

//delete a  student
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "student not found" });

    res.json({ message: "student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
