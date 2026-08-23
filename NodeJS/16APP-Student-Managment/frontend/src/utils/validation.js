import * as yup from "yup";

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const registerValidationSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

export const studentValidationSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  email: yup
    .string()
    .email("Please provide a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .matches(/^\+?[\d\s-]{10,15}$/, "Please provide a valid phone number")
    .required("Phone number is required"),
  dateOfBirth: yup
    .date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Please select a valid gender")
    .required("Gender is required"),
  address: yup.object({
    street: yup.string().max(100, "Street cannot exceed 100 characters"),
    city: yup.string().max(50, "City cannot exceed 50 characters"),
    state: yup.string().max(50, "State cannot exceed 50 characters"),
    country: yup.string().max(50, "Country cannot exceed 50 characters"),
    zipCode: yup.string().max(20, "Zip code cannot exceed 20 characters"),
  }),
  course: yup.string().required("Course is required"),
  department: yup.string().required("Department is required"),
});
