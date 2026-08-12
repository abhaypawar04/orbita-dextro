import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()

// Database Connection
export const connectDB = () => {
  mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database Connected."))
}

