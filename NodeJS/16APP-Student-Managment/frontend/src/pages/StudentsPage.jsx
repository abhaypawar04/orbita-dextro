import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentList from "../components/students/StudentList";
import StudentForm from "../components/students/StudentForm";
import StudentDetails from "../components/students/StudentDetails";

const StudentsPage = () => {
  return (
    <Routes>
      <Route index element={<StudentList />} />
      <Route path="new" element={<StudentForm />} />
      <Route path=":id" element={<StudentDetails />} />
      <Route path=":id/edit" element={<StudentForm />} />
    </Routes>
  );
};

export default StudentsPage;
