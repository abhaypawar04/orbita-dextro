import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import Student from "../model/student.model.js";

const router = express.Router();

// Make sure uploads folder exists
const uploadDir = "./uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// --------------------------------------
// Multer storage configuration
// --------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);

    cb(null, newFileName);
  },
});

// --------------------------------------
// File filter
// --------------------------------------

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// --------------------------------------
// Multer upload configuration
// --------------------------------------

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

// ======================================
// GET ALL STUDENTS
// ======================================

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================================
// GET SINGLE STUDENT
// ======================================

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
    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================================
// ADD NEW STUDENT
// ======================================

router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    const student = new Student(req.body);

    // If image was uploaded
    if (req.file) {
      student.profile_pic = req.file.filename;
    }

    const newStudent = await student.save();

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================================
// UPDATE STUDENT
// ======================================

router.put("/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    const existingStudent = await Student.findById(req.params.id);

    if (!existingStudent) {
      // If a new image was uploaded but student doesn't exist,
      // remove the newly uploaded image.
      if (req.file) {
        const newImagePath = path.join(uploadDir, req.file.filename);

        fs.unlink(newImagePath, (err) => {
          if (err) {
            console.log("Failed to delete new image:", err.message);
          }
        });
      }

      return res.status(404).json({
        message: "Student not found",
      });
    }

    const oldImage = existingStudent.profile_pic;

    // If a new image was uploaded
    if (req.file) {
      req.body.profile_pic = req.file.filename;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Delete old image only after successful DB update
    if (req.file && oldImage) {
      const oldImagePath = path.join(uploadDir, oldImage);

      fs.unlink(oldImagePath, (err) => {
        if (err) {
          console.log("Failed to delete old image:", err.message);
        }
      });
    }

    res.status(200).json(updatedStudent);
  } catch (err) {
    // If DB update fails after uploading a new image,
    // remove the newly uploaded image.
    if (req.file) {
      const newImagePath = path.join(uploadDir, req.file.filename);

      fs.unlink(newImagePath, (unlinkErr) => {
        if (unlinkErr) {
          console.log("Failed to delete uploaded image:", unlinkErr.message);
        }
      });
    }

    res.status(500).json({
      message: err.message,
    });
  }
});

// ======================================
// DELETE STUDENT
// ======================================

router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Delete student's profile image
    if (student.profile_pic) {
      const filePath = path.join(uploadDir, student.profile_pic);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Failed to delete image:", err.message);
        }
      });
    }

    res.status(200).json({
      message: "Student deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;
