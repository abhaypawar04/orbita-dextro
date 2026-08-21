import express from "express";
import Student from "../model/student.model.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// ============================================================
// Upload directory
// ============================================================

const uploadDir = path.resolve("./upload");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ============================================================
// Multer configuration
// ============================================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const newFilename =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, newFilename);
  },
});

// Only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// ============================================================
// GET ALL STUDENTS
// ============================================================

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (err) {
    console.error("Error fetching students:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================================================
// GET SINGLE STUDENT
// ============================================================

router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);
  } catch (err) {
    console.error("Error fetching student:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================================================
// ADD NEW STUDENT
// ============================================================

router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    const student = new Student(req.body);

    // Save uploaded image filename
    if (req.file) {
      student.profile_pic = req.file.filename;
    }

    const newStudent = await student.save();

    res.status(201).json({
      message: "Student created successfully",
      student: newStudent,
    });
  } catch (err) {
    console.error("Error creating student:", err);

    // Delete uploaded image if database save fails
    if (req.file) {
      const imagePath = path.join(uploadDir, req.file.filename);

      fs.unlink(imagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Failed to delete uploaded image:", unlinkErr.message);
        }
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================================================
// UPDATE STUDENT
// ============================================================

router.put("/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    // Find existing student
    const existingStudent = await Student.findById(req.params.id);

    // --------------------------------------------------------
    // Student doesn't exist
    // --------------------------------------------------------

    if (!existingStudent) {
      // Delete newly uploaded image because there is no student
      if (req.file) {
        const newImagePath = path.join(uploadDir, req.file.filename);

        fs.unlink(newImagePath, (err) => {
          if (err) {
            console.error("Failed to delete new image:", err.message);
          }
        });
      }

      return res.status(404).json({
        message: "Student not found",
      });
    }

    // --------------------------------------------------------
    // Store old profile picture
    // --------------------------------------------------------

    const oldProfilePic = existingStudent.profile_pic;

    // --------------------------------------------------------
    // Update normal fields
    // --------------------------------------------------------

    Object.keys(req.body).forEach((key) => {
      existingStudent[key] = req.body[key];
    });

    // --------------------------------------------------------
    // Update profile picture if a new one was uploaded
    // --------------------------------------------------------

    if (req.file) {
      existingStudent.profile_pic = req.file.filename;
    }

    // --------------------------------------------------------
    // Save updated student
    // --------------------------------------------------------

    const updatedStudent = await existingStudent.save();

    // --------------------------------------------------------
    // Delete old image after successful database update
    // --------------------------------------------------------

    if (req.file && oldProfilePic) {
      const oldImagePath = path.join(uploadDir, oldProfilePic);

      fs.unlink(oldImagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Failed to delete old profile image:", err.message);
        }
      });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (err) {
    console.error("Error updating student:", err);

    // If database update fails, remove newly uploaded image
    if (req.file) {
      const newImagePath = path.join(uploadDir, req.file.filename);

      fs.unlink(newImagePath, (unlinkErr) => {
        if (unlinkErr && unlinkErr.code !== "ENOENT") {
          console.error("Failed to delete new image:", unlinkErr.message);
        }
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================================================
// DELETE STUDENT
// ============================================================

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Delete profile image
    if (student.profile_pic) {
      const imagePath = path.join(uploadDir, student.profile_pic);

      fs.unlink(imagePath, (err) => {
        if (err && err.code !== "ENOENT") {
          console.error("Failed to delete profile image:", err.message);
        }
      });
    }

    // Delete student
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting student:", err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// ============================================================
// EXPORT ROUTER
// ============================================================

export default router;
