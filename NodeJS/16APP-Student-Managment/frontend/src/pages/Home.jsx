import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="page-wrapper">
      <div className="container mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-3 py-1.5 text-sm font-medium text-gray-600 backdrop-blur-sm">
              Student Management Platform
            </div>

            <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
              Manage your students
              <br />
              <span className="text-gray-600">with ease.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-600">
              A simple and efficient platform to manage student records, organize academic information, and keep everything in one place.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="btn-primary !px-7 !py-3">
                    Get Started
                  </Link>
                  <Link to="/register" className="btn-secondary !px-7 !py-3">
                    Create Account
                  </Link>
                </>
              ) : (
                <Link to="/dashboard" className="btn-primary !px-7 !py-3">
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Statistics */}
          <div className="hidden md:block">
            <div className="glass-card">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
                  <p className="mt-1 text-sm text-gray-500">Platform statistics</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l3-2 3 2v13M5 19V9l3-2m8 12V9l3-2v12M3 19h18" />
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/60 p-5 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <div className="mt-1 text-sm text-gray-500">Students</div>
                </div>
                <div className="rounded-xl bg-white/60 p-5 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">25+</div>
                  <div className="mt-1 text-sm text-gray-500">Courses</div>
                </div>
                <div className="rounded-xl bg-white/60 p-5 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">10+</div>
                  <div className="mt-1 text-sm text-gray-500">Departments</div>
                </div>
                <div className="rounded-xl bg-white/60 p-5 shadow-sm">
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="mt-1 text-sm text-gray-500">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 md:mt-20">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Everything you need</h2>
            <p className="mt-2 text-gray-500">Simple tools to keep your student records organized.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass-card">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-900 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Add Students</h3>
              <p className="mt-2 leading-relaxed text-gray-500">Easily add and manage student profiles with detailed information.</p>
            </div>

            <div className="glass-card">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-900 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Search & Filter</h3>
              <p className="mt-2 leading-relaxed text-gray-500">Quickly find students by name, course, department, or student ID.</p>
            </div>

            <div className="glass-card">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-900 text-white">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Track Progress</h3>
              <p className="mt-2 leading-relaxed text-gray-500">Monitor student information and keep academic records organized.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-2xl bg-gray-900 p-8 text-center md:p-10">
          <h2 className="text-2xl font-bold text-white md:text-3xl">Ready to get started?</h2>
          <p className="mt-2 text-gray-400">Start managing your student records today.</p>
          <div className="mt-6">
            <Link to={isAuthenticated ? "/dashboard" : "/register"} className="btn-secondary !bg-white !text-gray-900 hover:!bg-gray-100">
              {isAuthenticated ? "Open Dashboard" : "Create Account"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
