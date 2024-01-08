import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required!'],
    },
    email: {
      type: String,
      unique: [true, 'Email already exists!'],
      required: [true, 'Email is required!']
    },
    password: {
      type: String
    },
    role: {
      type: String,
      default: "citizen",
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User;
