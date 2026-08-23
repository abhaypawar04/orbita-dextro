import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl, formatDate } from "../../utils/helpers";

const StudentCard = ({ student, onDelete }) => {
  const imageUrl = student.profilePicture?.url
    ? getImageUrl(student.profilePicture.url)
    : null;

  return (
    <div className="glass-card glass-card-hover group p-5">
      <div aria-hidden="true" className="glass-reflection" />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${student.firstName} ${student.lastName}`}
              className="h-16 w-16 shrink-0 rounded-full border-2 border-white object-cover shadow-[0_4px_14px_rgba(0,0,0,0.08)]"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white bg-gray-900 text-xl font-semibold text-white shadow-[0_4px_14px_rgba(0,0,0,0.10)]">
              {student.firstName?.[0]}
              {student.lastName?.[0]}
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold tracking-tight text-gray-900">
              {student.firstName} {student.lastName}
            </h3>
            <p className="mt-0.5 text-sm text-gray-500">{student.studentId}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <Link
            to={`/students/${student._id}`}
            title="View student"
            className="btn-icon"
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </Link>

          <Link
            to={`/students/${student._id}/edit`}
            title="Edit student"
            className="btn-icon"
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>

          <button
            onClick={() => onDelete(student._id)}
            title="Delete student"
            className="btn-icon-danger"
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info Grid */}
      <div className="relative mt-5 grid grid-cols-2 gap-x-5 gap-y-4">
        <div className="min-w-0">
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">Email</p>
          <p className="truncate text-sm font-medium text-gray-700">{student.email}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">Phone</p>
          <p className="text-sm font-medium text-gray-700">{student.phone || "-"}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">Course</p>
          <p className="truncate text-sm font-medium text-gray-700">{student.course}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">Department</p>
          <p className="truncate text-sm font-medium text-gray-700">{student.department}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative mt-5 flex items-center justify-between border-t border-gray-200/60 pt-4">
        <div className="text-xs text-gray-400">
          Joined {formatDate(student.createdAt)}
        </div>
        <span className="badge-pill">
          {student.gender || "Not specified"}
        </span>
      </div>
    </div>
  );
};

export default StudentCard;
