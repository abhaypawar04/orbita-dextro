import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true },
);

export const Contact = mongoose.model("Contact", contactSchema);
