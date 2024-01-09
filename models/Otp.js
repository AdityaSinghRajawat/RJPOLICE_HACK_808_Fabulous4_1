import mongoose, { Schema } from "mongoose"

const otpSchema = new Schema(
  {
    email : {
      type: String,
      required: [true, 'email is required!'],
    },
    otp : {
      type: String,
      required: [true, 'otp is required!']
    },
    expiryTime : {
        type: Date,
        required: true,
    },
    
  },
  {
    timestamps: true,
  }
)

const Otp = mongoose.models.Otpp || mongoose.model("Otpp", otpSchema)

export default Otp;
