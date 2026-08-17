import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectdb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("successfully connected to mongodb ");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectdb;
