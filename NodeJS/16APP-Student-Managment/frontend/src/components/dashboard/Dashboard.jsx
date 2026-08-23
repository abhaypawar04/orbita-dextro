import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { studentService } from "../../services/student.service";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/helpers";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, studentsResponse] = await Promise.all([
          studentService.getStats(),
          studentService.getAll({
            limit: 5,
            sortBy: "createdAt",
            sortOrder: "desc",
          }),
        ]);

        setStats(statsResponse.data.stats);
        setRecentStudents(studentsResponse.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/60 backdrop-blur-xl shadow-lg">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Students",
      value: stats?.total || 0,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      iconClass: "bg-gray-900 text-white",
    },
    {
      title: "Courses",
      value: stats?.byCourse?.length || 0,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      iconClass: "bg-white text-gray-700",
    },
    {
      title: "Departments",
      value: stats?.byDepartment?.length || 0,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      iconClass: "bg-white text-gray-700",
    },
    {
      title: "Recent Activity",
      value: recentStudents.length,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      iconClass: "bg-white text-gray-700",
    },
  ];

  return (
    <div className="page-wrapper">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-white/70 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-[24rem] w-[24rem] rounded-full bg-gray-300/30 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 text-sm font-medium text-gray-500">Overview</p>
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back, <span className="font-medium text-gray-700">{user?.name}</span>. Here's what's happening with your students.
          </p>
        </div>

        {/* Stats */}
        <div id="stats" className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <div key={stat.title} className="glass-card-sm group transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/65 hover:shadow-[0_15px_40px_rgba(0,0,0,0.09)]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/50 to-transparent" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 shadow-sm ${stat.iconClass}`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Students */}
          <div className="glass-card">
            <div aria-hidden="true" className="glass-reflection" />
            <div className="relative">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Students</h3>
                  <p className="mt-0.5 text-sm text-gray-500">Recently added student profiles</p>
                </div>
                <span className="badge-pill">{recentStudents.length} recent</span>
              </div>

              <div className="space-y-2">
                {recentStudents.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-gray-300 bg-white/30 py-10 text-center">
                    <p className="text-sm text-gray-500">No students added yet</p>
                  </div>
                ) : (
                  recentStudents.map((student) => (
                    <div key={student._id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/60 bg-white/35 p-3 transition-all duration-200 hover:bg-white/65">
                      <div className="flex min-w-0 items-center gap-3">
                        {student.profilePicture?.url ? (
                          <img
                            src={`${import.meta.env.VITE_UPLOAD_URL || "http://localhost:5000/uploads"}${student.profilePicture.url}`}
                            alt={student.firstName}
                            className="h-10 w-10 shrink-0 rounded-full border border-white object-cover shadow-sm"
                          />
                        ) : (
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/80 bg-gray-900 text-sm font-medium text-white shadow-sm">
                            {student.firstName?.[0]}{student.lastName?.[0]}
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="truncate font-medium text-gray-800">{student.firstName} {student.lastName}</p>
                          <p className="truncate text-sm text-gray-500">{student.course}</p>
                        </div>
                      </div>
                      <span className="shrink-0 text-xs text-gray-400">{formatDate(student.createdAt)}</span>
                    </div>
                  ))
                )}
              </div>

              <Link to="/students" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
                View all students <span>→</span>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card">
            <div aria-hidden="true" className="glass-reflection" />
            <div className="relative">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
                <p className="mt-0.5 text-sm text-gray-500">Common tasks and shortcuts</p>
              </div>

              <div className="space-y-3">
                <Link to="/students/new" className="quick-action-card">
                  <div className="quick-action-icon">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Add New Student</p>
                    <p className="text-sm text-gray-500">Register a new student profile</p>
                  </div>
                </Link>

                <Link to="/students?focus=search" className="quick-action-card">
                  <div className="quick-action-icon-light">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Search Students</p>
                    <p className="text-sm text-gray-500">Find and manage student records</p>
                  </div>
                </Link>

                <a
                  href="#stats"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="quick-action-card"
                >
                  <div className="quick-action-icon-light">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">View Statistics</p>
                    <p className="text-sm text-gray-500">Analyze student data and trends</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
