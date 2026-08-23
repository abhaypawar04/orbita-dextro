import Joi from "joi";

const addressSchema = Joi.object({
  street: Joi.string().trim().max(100),
  city: Joi.string().trim().max(50),
  state: Joi.string().trim().max(50),
  country: Joi.string().trim().max(50),
  zipCode: Joi.string().trim().max(20),
});

export const createStudentSchema = Joi.object({
  firstName: Joi.string().max(50).required().messages({
    "string.max": "First name cannot exceed 50 characters",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().max(50).required().messages({
    "string.max": "Last name cannot exceed 50 characters",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "any.required": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^\+?[\d\s-]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Please provide a valid phone number",
      "any.required": "Phone number is required",
    }),
  dateOfBirth: Joi.date().iso().required().messages({
    "date.base": "Please provide a valid date",
    "any.required": "Date of birth is required",
  }),
  gender: Joi.string()
    .valid("male", "female", "other", "prefer-not-to-say")
    .required()
    .messages({
      "any.only":
        "Gender must be one of: male, female, other, prefer-not-to-say",
      "any.required": "Gender is required",
    }),
  address: addressSchema,
  course: Joi.string().required().messages({
    "any.required": "Course is required",
  }),
  department: Joi.string().required().messages({
    "any.required": "Department is required",
  }),
});

export const updateStudentSchema = Joi.object({
  firstName: Joi.string().max(50),
  lastName: Joi.string().max(50),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+?[\d\s-]{10,15}$/),
  dateOfBirth: Joi.date().iso(),
  gender: Joi.string().valid("male", "female", "other", "prefer-not-to-say"),
  address: addressSchema,
  course: Joi.string(),
  department: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be provided for update",
  });
