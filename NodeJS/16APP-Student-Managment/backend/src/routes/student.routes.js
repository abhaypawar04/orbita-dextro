import express from "express";
import { StudentController } from "../controllers/student.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { uploadSingle } from "../middleware/upload.middleware.js";

const router = express.Router();

// All student routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/students
 * @desc    Create a new student
 * @access  Private
 */
router.post(
  "/",
  uploadSingle("profilePicture"),
  StudentController.createStudent,
);

/**
 * @route   GET /api/v1/students
 * @desc    Get all students with pagination, search, filter, sort
 * @access  Private
 */
router.get("/", StudentController.getAllStudents);

/**
 * @route   GET /api/v1/students/stats
 * @desc    Get student statistics
 * @access  Private
 */
router.get("/stats", StudentController.getStudentStats);

/**
 * @route   GET /api/v1/students/:id
 * @desc    Get student by ID
 * @access  Private
 */
router.get("/:id", StudentController.getStudentById);

/**
 * @route   PUT /api/v1/students/:id
 * @desc    Update student
 * @access  Private
 */
router.put(
  "/:id",
  uploadSingle("profilePicture"),
  StudentController.updateStudent,
);

/**
 * @route   DELETE /api/v1/students/:id
 * @desc    Delete student
 * @access  Private
 */
router.delete("/:id", StudentController.deleteStudent);

export default router;
