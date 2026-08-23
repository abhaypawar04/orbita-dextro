import { ApiError } from "../utils/apiError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return next(
        new ApiError(400, "Validation failed", true, JSON.stringify(errors)),
      );
    }

    // Replace request body with validated value
    req.body = value;
    next();
  };
};

export const validateParams = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      }));

      return next(
        new ApiError(400, "Invalid parameters", true, JSON.stringify(errors)),
      );
    }

    req.params = value;
    next();
  };
};
