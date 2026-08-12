import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/contactsCrud2");
    console.log("db connection success");
  } catch (err) {
    console.log(err);
  }
};
