import { connectToDB } from "@/utils/database";
import Otp from '@/models/Otp';
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { sendMail } from "@/utils/sendMail";
import bcrypt from 'bcryptjs';

export async function POST(req) {
    try {
        await connectToDB();
        const emailData = await req.json();
        const { email } = emailData;

        // Generate OTP
        const otp = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        const hashedOTP = await bcrypt.hash(otp, 8);

        // Send OTP via email using sendMail function
        

        await sendMail(email,otp);

        // Store OTP associated with the email in the database
        const otpReport = await Otp.findOne({ email });

        if (otpReport) {
            otpReport.otp = hashedOTP;
            otpReport.expiryTime = Date.now() + 600000; // 10 minutes expiry
            await otpReport.save();
        } else {
            const createdReport = await Otp.create({
                email,
                otp: hashedOTP,
                expiryTime: Date.now() + 600000, // 10 minutes expiry
            });
        }


        return NextResponse.json({ message: 'OTP sent successfully', otp });
    } catch (error) {
        // Handle errors
        console.error('Error sending OTP:', error);
        return NextResponse.json({ message: 'Error sending OTP', error });
    }
}
