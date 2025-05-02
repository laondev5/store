import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  to: string,
  otp: string
) {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject: 'Reset Your Password - Furniro',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #B88E2F;">Reset Your Password</h2>
        <p>You have requested to reset your password. Please use the following OTP code to proceed:</p>
        <div style="background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; margin: 20px 0;">
          <strong>${otp}</strong>
        </div>
        <p>This code will expire in 15 minutes.</p>
        <p>If you didn't request this password reset, please ignore this email.</p>
        <p style="margin-top: 30px; font-size: 12px; color: #666;">
          This is an automated email, please do not reply.
        </p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}