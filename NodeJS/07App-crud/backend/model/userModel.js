import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please add name"],
      maxlength: [50, "Name cannot be more than 50 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "please add email"],
      maxlength: [50, "email cannot be more than 50 characters"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "please add age"],
      max: [120, "age cannot be more than 120"],
      min: [1, "age must be atleast 1"],
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;

// use this way of export this leads to easy import of a model in a another file so better is create a User variable for here and then assign them mongoose.model("User",userSchema) after that export the variable that we made during this process as a export default User.
