import React, { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useStudents } from "../../hooks/useStudents";
import StudentCard from "./StudentCard";
import toast from "react-hot-toast";

const StudentList = () => {
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef(null);

  const { students, loading, error, pagination, fetchStudents, deleteStudent } =
    useStudents();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [filters, setFilters] = useState({
    course: "",
    department: "",
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    fetchStudents({ search: searchTerm, page: 1, limit: 10 });
    if (searchParams.get("focus") === "search" && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      fetchStudents({
        search: searchTerm,
        page: 1,
        ...filters,
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStudents({
      search: searchTerm,
      page: 1,
      ...filters,
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchStudents({
      ...updatedFilters,
      page: 1,
      search: searchTerm,
    });
  };

  const handlePageChange = (newPage) => {
    fetchStudents({
      page: newPage,
      search: searchTerm,
      ...filters,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id, {
          page: pagination.page,
          search: searchTerm,
          ...filters,
        });
        toast.success("Student deleted successfully");
      } catch (error) {
        toast.error("Failed to delete student");
      }
    }
  };

  if (loading && students.length === 0) {
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-gray-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center bg-gray-50">
        <div className="glass-card text-center p-8">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
            <svg className="h-6 w-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M5.07 19h13.86a2 2 0 001.73-3L13.73 4a2 2 0 00-3.46 0L3.34 16a2 2 0 001.73 3z" />
            </svg>
          </div>
          <p className="text-lg font-medium text-red-500">Error: {error}</p>
          <button onClick={() => fetchStudents()} className="btn-primary mt-4">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-7 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Students</h1>
            <p className="mt-1 text-gray-500">Manage and view all student records</p>
          </div>

          <Link to="/students/new" className="btn-primary">
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Student
          </Link>
        </div>

        {/* Search & Filters */}
        <div className="glass-card mb-7 p-5">
          <form onSubmit={handleSearch} className="flex flex-col gap-3 lg:flex-row">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search by name, email, or student ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            <div className="w-full lg:w-52">
              <select name="course" value={filters.course} onChange={handleFilterChange} className="form-input">
                <option value="">All Courses</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>

            <div className="w-full lg:w-52">
              <select name="department" value={filters.department} onChange={handleFilterChange} className="form-input">
                <option value="">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Business">Business</option>
              </select>
            </div>

            <button type="submit" className="btn-primary">Search</button>

            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setFilters({ course: "", department: "" });
                fetchStudents({ page: 1 });
              }}
              className="btn-secondary"
            >
              Clear
            </button>
          </form>
        </div>

        {/* Student Count */}
        {students.length > 0 && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium text-gray-800">{students.length}</span> students
            </p>
          </div>
        )}

        {/* Grid */}
        {students.length === 0 ? (
          <div className="glass-card text-center py-16">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-lg font-medium text-gray-700">No students found</p>
            <p className="mt-1 text-gray-400">Try adjusting your search or filters</p>
            <Link to="/students/new" className="btn-primary mt-5">
              Add Student
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student._id} student={student} onDelete={handleDelete} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="btn-secondary"
            >
              ← Previous
            </button>
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
              Page <span className="font-semibold text-gray-900">{pagination.page}</span> of{" "}
              <span className="font-semibold text-gray-900">{pagination.totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className="btn-secondary"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
