import nodemailer from 'nodemailer';

export async function sendMail(email, otp) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: 'Rajasthan Police',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP is: ${otp}`,
    };
  
    console.log('Mail options:', mailOptions); // Log mail options to check recipient's email
  
    await transporter.sendMail(mailOptions);
  }
  