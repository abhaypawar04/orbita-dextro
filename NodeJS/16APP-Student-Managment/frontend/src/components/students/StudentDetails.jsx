import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { studentService } from "../../services/student.service";
import { getImageUrl, formatDate, formatDateTime } from "../../utils/helpers";
import toast from "react-hot-toast";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await studentService.getById(id);
        setStudent(response.data.student);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load student");
        toast.error("Failed to load student details");
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await studentService.delete(id);
        toast.success("Student deleted successfully");
        navigate("/students");
      } catch (err) {
        toast.error("Failed to delete student");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/60 shadow-lg backdrop-blur-xl">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="flex min-h-[calc(100vh-128px)] items-center justify-center px-4">
        <div className="glass-card w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 9v3.75m0 3.75h.008M10.29 3.86l-8.1 14a2 2 0 001.73 3h16.16a2 2 0 001.73-3l-8.1-14a2 2 0 00-3.46 0z" />
            </svg>
          </div>
          <p className="text-lg font-semibold text-gray-900">Student not found</p>
          <p className="mt-1 text-sm text-gray-500">{error || "The requested student could not be found."}</p>
          <Link to="/students" className="btn-primary mt-6">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const imageUrl = student.profilePicture?.url
    ? getImageUrl(student.profilePicture.url)
    : null;

  const details = [
    { label: "Email", value: student.email },
    { label: "Phone", value: student.phone || "-" },
    { label: "Date of Birth", value: formatDate(student.dateOfBirth) },
    { label: "Gender", value: student.gender || "-", capitalize: true },
    { label: "Course", value: student.course },
    { label: "Department", value: student.department },
  ];

  const hasAddress =
    student.address && Object.values(student.address).some((value) => value);

  return (
    <div className="page-wrapper">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="glass-card-lg">
          <div aria-hidden="true" className="glass-reflection-lg" />

          {/* Header */}
          <div className="relative flex flex-col gap-4 border-b border-white/10 bg-gray-900 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">Student Profile</p>
              <h1 className="mt-1 text-xl font-semibold tracking-tight text-white">Student Details</h1>
            </div>

            <div className="flex gap-2">
              <Link to={`/students/${student._id}/edit`} className="rounded-xl border border-white/10 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-all hover:bg-gray-100 active:scale-[0.97]">
                Edit
              </Link>
              <button onClick={handleDelete} className="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-red-500/20 hover:text-red-200 active:scale-[0.97]">
                Delete
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6 md:p-8">
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Profile */}
              <div className="flex shrink-0 flex-col items-center lg:w-56">
                {imageUrl ? (
                  <img src={imageUrl} alt={`${student.firstName} ${student.lastName}`} className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-[0_10px_30px_rgba(0,0,0,0.10)]" />
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded-full border-4 border-white bg-gray-900 text-5xl font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                    {student.firstName?.[0]}{student.lastName?.[0]}
                  </div>
                )}

                <h2 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">
                  {student.firstName} {student.lastName}
                </h2>
                <p className="mt-1 text-sm text-gray-500">{student.studentId}</p>
                <span className="badge-pill mt-3">
                  {student.gender || "Not specified"}
                </span>
              </div>

              {/* Details */}
              <div className="min-w-0 flex-1">
                <div>
                  <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">Information</p>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900">Personal & Academic</h3>
                  </div>

                  <div className="grid overflow-hidden rounded-2xl border border-white/70 bg-white/35 sm:grid-cols-2">
                    {details.map((detail, index) => (
                      <div
                        key={detail.label}
                        className={`p-4 ${index % 2 === 0 ? "sm:border-r sm:border-gray-200/50" : ""} ${index < details.length - 2 ? "border-b border-gray-200/50" : ""}`}
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{detail.label}</p>
                        <p className={`mt-1 truncate text-sm font-medium text-gray-800 ${detail.capitalize ? "capitalize" : ""}`}>
                          {detail.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                {hasAddress && (
                  <div className="mt-7">
                    <div className="mb-4">
                      <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">Location</p>
                      <h3 className="mt-1 text-lg font-semibold text-gray-900">Address</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/70 bg-gray-200/40">
                      {student.address.street && (
                        <div className="bg-white/40 p-4">
                          <p className="text-xs font-medium text-gray-400">Street</p>
                          <p className="mt-1 text-sm font-medium text-gray-800">{student.address.street}</p>
                        </div>
                      )}
                      {student.address.city && (
                        <div className="bg-white/40 p-4">
                          <p className="text-xs font-medium text-gray-400">City</p>
                          <p className="mt-1 text-sm font-medium text-gray-800">{student.address.city}</p>
                        </div>
                      )}
                      {student.address.state && (
                        <div className="bg-white/40 p-4">
                          <p className="text-xs font-medium text-gray-400">State</p>
                          <p className="mt-1 text-sm font-medium text-gray-800">{student.address.state}</p>
                        </div>
                      )}
                      {student.address.country && (
                        <div className="bg-white/40 p-4">
                          <p className="text-xs font-medium text-gray-400">Country</p>
                          <p className="mt-1 text-sm font-medium text-gray-800">{student.address.country}</p>
                        </div>
                      )}
                      {student.address.zipCode && (
                        <div className="bg-white/40 p-4">
                          <p className="text-xs font-medium text-gray-400">Zip Code</p>
                          <p className="mt-1 text-sm font-medium text-gray-800">{student.address.zipCode}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="mt-7 border-t border-gray-200/60 pt-5 text-xs text-gray-400">
                  <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:gap-x-6">
                    <p>Created: <span className="text-gray-500">{formatDateTime(student.createdAt)}</span></p>
                    <p>Updated: <span className="text-gray-500">{formatDateTime(student.updatedAt)}</span></p>
                    {student.createdBy && (
                      <p>Created by: <span className="text-gray-500">{student.createdBy.name}</span></p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="mt-5">
          <Link to="/students" className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-gray-500 transition-all hover:bg-white/50 hover:text-gray-900">
            <span>←</span> Back to Students
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
