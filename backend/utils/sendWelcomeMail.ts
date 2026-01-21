import mailTransporter from "../config/nodemailer.js";

const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #1F2937; max-width: 600px; margin: auto; padding: 20px;">
        <div style="background-color: #2563EB; padding: 40px; border-radius: 12px 12px 0 0; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Welcome to NoteVault!</h1>
          <p style="margin: 10px 0 0 0; font-size: 16px;">Secure your notes, access anywhere</p>
        </div>

        <div style="background-color: #F9FAFB; padding: 30px; border-radius: 0 0 12px 12px;">
          <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>

          <p style="font-size: 16px; line-height: 1.5;">
            Thank you for joining <strong>NoteVault</strong>! You now have a safe and organized place to store all your important notes and information.
          </p>

          <ul style="margin: 20px 0; padding-left: 20px; font-size: 16px; line-height: 1.5;">
            <li>Secure, encrypted notes</li>
            <li>Access your notes from any device</li>
            <li>Organize notes with tags and folders</li>
          </ul>

          <p style="font-size: 14px; color: #6B7280; text-align: center; margin-top: 20px;">
            If you have any questions, feel free to reply to this email or contact our support team.
          </p>

          <p style="font-size: 14px; color: #6B7280; text-align: center;">
            © ${new Date().getFullYear()} NoteVault. All rights reserved.
          </p>
        </div>
      </div>
    `;

    await mailTransporter.sendMail({
      from: `"NoteVault" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to NoteVault! 🎉",
      html: htmlContent,
    });

    return { success: true };
  } catch (error) {
    console.error("Email Error:", error);
    return { success: false };
  }
};

export default sendWelcomeEmail;
