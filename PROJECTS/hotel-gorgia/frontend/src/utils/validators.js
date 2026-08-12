export const validateEmail = (email) => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email);
};

export const validatePhone = (phone) => {
  const re = /^[0-9+\-\s()]{10,20}$/;
  return re.test(phone);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateName = (name) => {
  return name && name.length >= 2 && name.length <= 100;
};

export const validatePrice = (price) => {
  return !isNaN(price) && Number(price) >= 0;
};

export const validateQuantity = (quantity) => {
  return Number.isInteger(quantity) && quantity > 0;
};

export const validateZipCode = (zipCode) => {
  const re = /^[0-9]{5}(-[0-9]{4})?$/;
  return re.test(zipCode);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const formValidators = {
  required: (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },
  minLength: (value, min) => {
    if (typeof value === "string") return value.length >= min;
    return true;
  },
  maxLength: (value, max) => {
    if (typeof value === "string") return value.length <= max;
    return true;
  },
  min: (value, min) => {
    return Number(value) >= min;
  },
  max: (value, max) => {
    return Number(value) <= max;
  },
  pattern: (value, pattern) => {
    return pattern.test(value);
  },
  email: (value) => {
    return validateEmail(value);
  },
  phone: (value) => {
    return validatePhone(value);
  },
  password: (value) => {
    return validatePassword(value);
  },
};
