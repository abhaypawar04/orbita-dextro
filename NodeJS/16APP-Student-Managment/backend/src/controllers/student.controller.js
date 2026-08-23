import { StudentService } from "../services/student.service.js";
import { ApiResponse } from "../utils/apiResponse.js";
import {
  createStudentSchema,
  updateStudentSchema,
} from "../validators/student.validator.js";

export class StudentController {
  static async createStudent(req, res, next) {
    try {
      // Validate request body
      const validatedData = await createStudentSchema.validateAsync(req.body);

      const student = await StudentService.createStudent(
        validatedData,
        req.file,
        req.user._id,
      );

      res
        .status(201)
        .json(
          ApiResponse.success({ student }, "Student created successfully", 201),
        );
    } catch (error) {
      next(error);
    }
  }

  static async getAllStudents(req, res, next) {
    try {
      const result = await StudentService.getAllStudents(req.query);

      res
        .status(200)
        .json(ApiResponse.success(result, "Students retrieved successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async getStudentById(req, res, next) {
    try {
      const student = await StudentService.getStudentById(req.params.id);

      res
        .status(200)
        .json(
          ApiResponse.success({ student }, "Student retrieved successfully"),
        );
    } catch (error) {
      next(error);
    }
  }

  static async updateStudent(req, res, next) {
    try {
      // Validate request body
      const validatedData = await updateStudentSchema.validateAsync(req.body);

      const student = await StudentService.updateStudent(
        req.params.id,
        validatedData,
        req.file,
      );

      res
        .status(200)
        .json(ApiResponse.success({ student }, "Student updated successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async deleteStudent(req, res, next) {
    try {
      const student = await StudentService.deleteStudent(req.params.id);

      res
        .status(200)
        .json(ApiResponse.success({ student }, "Student deleted successfully"));
    } catch (error) {
      next(error);
    }
  }

  static async getStudentStats(req, res, next) {
    try {
      const stats = await StudentService.getStudentStats();

      res
        .status(200)
        .json(
          ApiResponse.success(
            { stats },
            "Student statistics retrieved successfully",
          ),
        );
    } catch (error) {
      next(error);
    }
  }
}
