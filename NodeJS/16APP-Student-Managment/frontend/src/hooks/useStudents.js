import { useState, useCallback } from "react";
import { studentService } from "../services/student.service";

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchStudents = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await studentService.getAll(params);
      setStudents(response.data.data);
      setPagination(response.data.pagination);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch students");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const createStudent = async (data) => {
    try {
      setLoading(true);
      const response = await studentService.create(data);
      await fetchStudents();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create student");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id, data) => {
    try {
      setLoading(true);
      const response = await studentService.update(id, data);
      await fetchStudents();
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id, currentParams = {}) => {
    try {
      setLoading(true);
      const response = await studentService.delete(id);
      await fetchStudents(currentParams);
      return response;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete student");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    students,
    loading,
    error,
    pagination,
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
  };
};
