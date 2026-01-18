import mailTransporter from "../config/nodemailer.js";

interface ContactMailProps {
  subject: string;
  message: string;
  userEmail: string;
  userName: string;
  type: string;
}

const sendContactMail = async ({ subject, message, userEmail, userName, type }: ContactMailProps) => {
  try {
    const devEmail = process.env.DEV_EMAIL;
    if (!devEmail) throw new Error("Developer email not configured in env");

    await mailTransporter.sendMail({
      from: `"NoteVault Support" <${process.env.SMTP_USER}>`,
      to: devEmail,
      subject: `New Support Request: ${subject} [${type}]`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; padding: 30px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);">
            
            <!-- Header -->
            <div style="background-color: #0d6efd; color: #fff; padding: 20px 25px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 600;">New Support Message</h1>
              <p style="margin: 5px 0 0; font-size: 14px;">Type: <strong>${type}</strong></p>
            </div>
            
            <!-- Content -->
            <div style="padding: 25px; color: #1f2937;">
              <p style="margin: 0 0 10px;"><strong>From:</strong> ${userName} (${userEmail})</p>
              <p style="margin: 0 0 10px;"><strong>Subject:</strong> ${subject || "No Subject"}</p>
              <p style="margin: 0 0 20px; line-height: 1.6; color: #374151;">${message}</p>

              <!-- Reply Button -->
              <a href="mailto:${userEmail}?subject=Re: ${encodeURIComponent(subject || "Support")}" 
                 style="display: inline-block; text-decoration: none; background-color: #0d6efd; color: #fff; padding: 10px 20px; border-radius: 8px; font-weight: 500; font-size: 14px;">
                Reply to User
              </a>
            </div>

            <!-- Footer -->
            <div style="background-color: #f9fafb; padding: 15px 25px; font-size: 12px; color: #6b7280; text-align: center;">
              This is an automated notification from NoteVault. Please do not reply to this email directly.
            </div>

          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact Mail Error:", error);
    return { success: false };
  }
};

export default sendContactMail;