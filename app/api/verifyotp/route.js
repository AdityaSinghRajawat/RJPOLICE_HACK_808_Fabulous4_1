import { connectToDB } from "@/utils/database";
import Otp from '@/models/Otp';
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from "@/utils/sendMail";
import bcrypt from 'bcryptjs';
export async function POST(req, res) {
    try {
        await connectToDB();
        const postData = await req.json();
        const { email, otp } = postData;

        const storedOTP = await Otp.findOne({ email });

        if (!storedOTP) {
            NextResponse.json({ message: 'No OTP found for this email' }, {status: 404,});
        }

        // Compare the provided OTP with the stored hashed OTP in the database
        const isMatch = await bcrypt.compare(otp, storedOTP.otp);

        if (isMatch) {
            // Check if the OTP is expired
            if (storedOTP.expiryTime < Date.now()) {
                return NextResponse.json({message: "OTP has expired"}, {status: 400,})
            }
            return NextResponse.json({message: "OTP verified successfully"}, {status: 200,})
        } else {
            return NextResponse.json({message: "Invalid OTP"}, {status: 400,})
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json({message: "Error verifying OTP",error}, {status: 500,})
    }
}
