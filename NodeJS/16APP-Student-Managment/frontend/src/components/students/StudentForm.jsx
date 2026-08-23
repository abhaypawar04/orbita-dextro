import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStudents } from "../../hooks/useStudents";
import { studentService } from "../../services/student.service";
import { studentValidationSchema } from "../../utils/validation";
import toast from "react-hot-toast";

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createStudent, updateStudent } = useStudents();

  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    address: { street: "", city: "", state: "", country: "", zipCode: "" },
    course: "",
    department: "",
    profilePicture: null,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const loadStudent = async () => {
        try {
          const response = await studentService.getById(id);
          const foundStudent = response.data?.student;

          if (foundStudent) {
            setStudent(foundStudent);
            setFormData({
              firstName: foundStudent.firstName || "",
              lastName: foundStudent.lastName || "",
              email: foundStudent.email || "",
              phone: foundStudent.phone || "",
              dateOfBirth: foundStudent.dateOfBirth?.split("T")[0] || "",
              gender: foundStudent.gender || "",
              address: {
                street: foundStudent.address?.street || "",
                city: foundStudent.address?.city || "",
                state: foundStudent.address?.state || "",
                country: foundStudent.address?.country || "",
                zipCode: foundStudent.address?.zipCode || "",
              },
              course: foundStudent.course || "",
              department: foundStudent.department || "",
              profilePicture: null,
            });
          }
        } catch (error) {
          toast.error("Failed to load student data");
        }
      };

      loadStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await studentValidationSchema.validate(formData, { abortEarly: false });
      const dataToSubmit = { ...formData };
      if (dataToSubmit.profilePicture === null) {
        delete dataToSubmit.profilePicture;
      }

      if (id) {
        await updateStudent(id, dataToSubmit);
        toast.success("Student updated successfully");
      } else {
        await createStudent(dataToSubmit);
        toast.success("Student created successfully");
      }

      navigate("/students");
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      } else {
        toast.error(err.response?.data?.message || "Failed to save student");
      }
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field) => `form-input ${errors[field] ? "form-input-error" : ""}`;

  return (
    <div className="page-wrapper">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="glass-card-lg">
          <div aria-hidden="true" className="glass-reflection-lg" />

          {/* Header */}
          <div className="relative border-b border-gray-200/50 px-6 py-6 md:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-white shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
                {id ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 5v14m-7-7h14" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-400">Student Management</p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900">
                  {id ? "Edit Student" : "Add New Student"}
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  {id ? "Update the student's information below." : "Create a new student profile and add their information."}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="relative p-6 md:p-8">
            {/* Personal Information */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">01</p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="form-label">First Name *</label>
                  <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" className={fieldClass("firstName")} />
                  {errors.firstName && <p className="form-error-msg">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="form-label">Last Name *</label>
                  <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" className={fieldClass("lastName")} />
                  {errors.lastName && <p className="form-error-msg">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="form-label">Email *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className={fieldClass("email")} />
                  {errors.email && <p className="form-error-msg">{errors.email}</p>}
                </div>

                <div>
                  <label className="form-label">Phone *</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" className={fieldClass("phone")} />
                  {errors.phone && <p className="form-error-msg">{errors.phone}</p>}
                </div>

                <div>
                  <label className="form-label">Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={fieldClass("dateOfBirth")} />
                  {errors.dateOfBirth && <p className="form-error-msg">{errors.dateOfBirth}</p>}
                </div>

                <div>
                  <label className="form-label">Gender *</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className={fieldClass("gender")}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="form-error-msg">{errors.gender}</p>}
                </div>
              </div>
            </section>

            <div className="my-8 border-t border-gray-200/60" />

            {/* Academic Information */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">02</p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">Academic Information</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="form-label">Course *</label>
                  <select name="course" value={formData.course} onChange={handleChange} className={fieldClass("course")}>
                    <option value="">Select course</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Engineering">Engineering</option>
                  </select>
                  {errors.course && <p className="form-error-msg">{errors.course}</p>}
                </div>

                <div>
                  <label className="form-label">Department *</label>
                  <select name="department" value={formData.department} onChange={handleChange} className={fieldClass("department")}>
                    <option value="">Select department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Business">Business</option>
                  </select>
                  {errors.department && <p className="form-error-msg">{errors.department}</p>}
                </div>
              </div>
            </section>

            <div className="my-8 border-t border-gray-200/60" />

            {/* Address */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">03</p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">Address</h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="form-label">Street</label>
                  <input type="text" name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street address" className={fieldClass("address.street")} />
                </div>

                <div>
                  <label className="form-label">City</label>
                  <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" className={fieldClass("address.city")} />
                </div>

                <div>
                  <label className="form-label">State</label>
                  <input type="text" name="address.state" value={formData.address.state} onChange={handleChange} placeholder="State" className={fieldClass("address.state")} />
                </div>

                <div>
                  <label className="form-label">Country</label>
                  <input type="text" name="address.country" value={formData.address.country} onChange={handleChange} placeholder="Country" className={fieldClass("address.country")} />
                </div>

                <div>
                  <label className="form-label">Zip Code</label>
                  <input type="text" name="address.zipCode" value={formData.address.zipCode} onChange={handleChange} placeholder="Zip code" className={fieldClass("address.zipCode")} />
                </div>
              </div>
            </section>

            <div className="my-8 border-t border-gray-200/60" />

            {/* Profile Picture */}
            <section>
              <div className="mb-5">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-gray-400">04</p>
                <h2 className="mt-1 text-lg font-semibold text-gray-900">Profile Picture</h2>
              </div>

              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white/35 px-6 py-8 text-center transition-all hover:border-gray-400 hover:bg-white/60">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-all group-hover:bg-gray-900 group-hover:text-white">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-8h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">
                  {formData.profilePicture ? formData.profilePicture.name : "Choose a profile picture"}
                </p>
                <p className="mt-1 text-xs text-gray-400">JPEG, PNG, GIF or WEBP · Maximum 5MB</p>
                <input type="file" accept="image/jpeg,image/png,image/gif,image/webp" onChange={handleFileChange} className="hidden" />
              </label>
            </section>

            {/* Actions */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200/60 pt-6 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => navigate("/students")} className="btn-secondary sm:min-w-[130px]">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-primary sm:min-w-[180px]">
                {loading && (
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                )}
                {loading ? "Saving..." : id ? "Update Student" : "Create Student"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
