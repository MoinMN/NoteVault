import mailTransporter from "../config/nodemailer.js";

const sendOTPEmail = async (email: string, otp: string) => {
  try {
    await mailTransporter.sendMail({
      from: `"NoteVault" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🔒 Your OTP Code for NoteVault",
      html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f6f8; padding: 40px 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <div style="background-color: #2563EB; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">NoteVault</h1>
          </div>

          <!-- Body -->
          <div style="padding: 30px; text-align: center;">
            <h2 style="color: #111827; font-size: 20px; margin-bottom: 10px;">Verify Your Email</h2>
            <p style="color: #6B7280; font-size: 16px; margin-bottom: 30px;">
              Use the OTP below to complete your verification. This code is valid for <strong>5 minutes</strong>.
            </p>

            <!-- OTP Box -->
            <div style="display: inline-block; background-color: #F3F4F6; border-radius: 8px; padding: 15px 25px; margin-bottom: 30px;">
              <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #111827;">${otp}</span>
            </div>

            <p style="color: #6B7280; font-size: 14px; margin-bottom: 0;">
              If you didn't request this OTP, you can safely ignore this email.
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #F9FAFB; padding: 15px; text-align: center; font-size: 12px; color: #9CA3AF;">
            &copy; ${new Date().getFullYear()} NoteVault. All rights reserved.
          </div>

        </div>
      </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false };
  }
};

export default sendOTPEmail;
