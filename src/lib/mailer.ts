import nodemailer from "nodemailer";

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

export const adminEmail = process.env.ADMIN_EMAIL || "techagency.be@gmail.com";

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 5000, // 5 seconds
  greetingTimeout: 5000,
  socketTimeout: 5000,
});

interface SendMailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendMailOptions) {
  if (!smtpUser || !smtpPass) {
    console.warn("⚠️ SMTP credentials not fully configured in .env. Email intercepted:");
    console.warn(`To: ${to}`);
    console.warn(`Subject: ${subject}`);
    console.log(`HTML: ${html}`);
    return;
  }

  try {
    await transporter.sendMail({
      from: `"BE. Agency" <${smtpUser}>`,
      to,
      subject,
      html,
    });
    console.log(`Email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
