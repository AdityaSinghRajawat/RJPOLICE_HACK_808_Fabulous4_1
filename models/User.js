// "use server"

import mongoose, { Schema } from "mongoose"
import { connectToDB } from "@/utils/database"

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
