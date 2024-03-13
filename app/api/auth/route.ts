import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";


function generateOTP() {
    let digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

export async function POST(request: NextRequest) {
    const otp = generateOTP();
    try {
        const requestBody = await request.json();
        const email = requestBody.email;
        
        const finalOtp = otp;
        const info = await transporter.sendMail({
            from: '"@noots" <noots@gmail.com>',
            to: email,
            subject: "OTP from noots ✔",
            text: "Just verify and Start making notes",
            html: `
            <html>
            <body>
                <h1>OTP Verification</h1>
                <p>Please use the following OTP to verify your account:</p>
                <p><strong>${finalOtp}</strong></p>
                <p>Enter this OTP on the website to complete the verification process.</p>
            </body>
            </html>
        `,
        });
        console.log("Message sent: %s", info.messageId, finalOtp);
        return NextResponse.json({ info: info, otp: finalOtp });
    } catch (error) {
        console.error(error, { message: 'otp not sent' });
        return NextResponse.error();
    }
}

