import { Student } from "../models/student.model.js";
import { generateStudentId } from "../utils/helper.js";
import { ApiError } from "../utils/apiError.js";
import { FileService } from "./file.service.js";

export class StudentService {
  static async createStudent(data, file, userId) {
    // Check if student with same email exists
    const existingStudent = await Student.findOne({ email: data.email });
    if (existingStudent) {
      throw new ApiError(409, "Student with this email already exists");
    }

    // Generate student ID
    const studentId = generateStudentId();

    // Save profile picture if provided
    let profilePicture = null;
    if (file) {
      profilePicture = await FileService.saveProfilePicture(file);
    }

    // Create student
    const student = await Student.create({
      ...data,
      studentId,
      profilePicture,
      createdBy: userId,
    });

    return student;
  }

  static async getAllStudents(query = {}) {
    const {
      page = 1,
      limit = 10,
      search = "",
      course,
      department,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = query;

    // Build filter
    const filter = {};

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { studentId: { $regex: search, $options: "i" } },
      ];
    }

    if (course) filter.course = course;
    if (department) filter.department = department;

    // Calculate pagination
    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    // Execute query
    const [students, total] = await Promise.all([
      Student.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("createdBy", "name email"),
      Student.countDocuments(filter),
    ]);

    return {
      data: students,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getStudentById(studentId) {
    const student = await Student.findById(studentId).populate(
      "createdBy",
      "name email",
    );

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    return student;
  }

  static async getStudentByStudentId(studentId) {
    const student = await Student.findOne({ studentId }).populate(
      "createdBy",
      "name email",
    );

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    return student;
  }

  static async updateStudent(studentId, data, file) {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    // Check if email is being changed and if it's already taken
    if (data.email && data.email !== student.email) {
      const existingStudent = await Student.findOne({
        email: data.email,
        _id: { $ne: studentId },
      });
      if (existingStudent) {
        throw new ApiError(409, "Email already in use by another student");
      }
    }

    // Handle profile picture update
    if (file) {
      const newProfilePicture = await FileService.replaceProfilePicture(
        student.profilePicture?.publicId,
        file,
      );
      data.profilePicture = newProfilePicture;
    }

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(studentId, data, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "name email");

    return updatedStudent;
  }

  static async deleteStudent(studentId) {
    const student = await Student.findById(studentId);
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    // Delete profile picture if exists
    if (student.profilePicture?.publicId) {
      await FileService.deleteProfilePicture(student.profilePicture.publicId);
    }

    await student.deleteOne();
    return student;
  }

  static async getStudentStats() {
    const [total, byCourse, byDepartment] = await Promise.all([
      Student.countDocuments(),
      Student.aggregate([
        { $group: { _id: "$course", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Student.aggregate([
        { $group: { _id: "$department", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    return {
      total,
      byCourse,
      byDepartment,
    };
  }
}
