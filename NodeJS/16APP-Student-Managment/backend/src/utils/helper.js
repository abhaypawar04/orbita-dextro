export const omitFields = (obj, fields) => {
  const result = { ...obj };

  fields.forEach((field) => delete result[field]);

  return result;
};

export const generateStudentId = () => {
  const year = new Date().getFullYear();

  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `STU${year}${random}`;
};

export const sanitizeUser = (user) => {
  const userObj = user.toObject ? user.toObject() : user;

  return omitFields(userObj, ["password", "__v"]);
};
