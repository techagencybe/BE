"use server";

import { db } from "@/lib/db";
import { encrypt, getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sendEmail, adminEmail } from "@/lib/mailer";

export async function checkAdminSetup() {
  const count = await db.admin.count();
  return { needsSetup: count === 0 };
}

// Temporary in-memory store for OTPs (In production, use Redis or DB)
const otpStore = new Map<string, { otp: string, expires: number }>();

export async function sendSetupOTP(email: string) {
  const count = await db.admin.count();
  if (count > 0) return { success: false, error: "Setup already complete" };

  if (email !== adminEmail) {
    return { success: false, error: "Email does not match official admin email" };
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 }); // 10 mins

  await sendEmail({
    to: email,
    subject: "BE. Agency Admin Setup OTP",
    html: `<p>Your one-time password for admin setup is: <strong>${otp}</strong></p><p>It expires in 10 minutes.</p>`,
  });

  return { success: true };
}

export async function verifySetupOTP(email: string, otp: string, password: string) {
  const count = await db.admin.count();
  if (count > 0) return { success: false, error: "Setup already complete" };

  const stored = otpStore.get(email);
  if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
    return { success: false, error: "Invalid or expired OTP" };
  }

  const passwordHash = await bcrypt.hash(password, 10);
  
  const admin = await db.admin.create({
    data: {
      email,
      passwordHash,
      role: "MASTER",
    },
  });

  otpStore.delete(email);

  const sessionData = { id: admin.id, role: admin.role, email: admin.email };
  const sessionToken = await encrypt(sessionData);
  const cookieStore = await cookies();
  cookieStore.set("admin_session", sessionToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

  return { success: true };
}

export async function loginAdmin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const admin = await db.admin.findUnique({ where: { email } });
  if (!admin) return { success: false, error: "Invalid credentials" };

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) return { success: false, error: "Invalid credentials" };

  const sessionData = { id: admin.id, role: admin.role, email: admin.email };
  const sessionToken = await encrypt(sessionData);
  const cookieStore = await cookies();
  cookieStore.set("admin_session", sessionToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

  return { success: true };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export async function scheduleMeeting(leadId: string, meetingLink: string, meetingTime: Date) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const lead = await db.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { success: false, error: "Lead not found" };

    await db.lead.update({
      where: { id: leadId },
      data: {
        status: "SCHEDULED",
        meetingLink,
        meetingTime,
      },
    });

    // Send calendar invite email to user
    await sendEmail({
      to: lead.email,
      subject: "Invitation: Strategy Call with BE. Agency",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2>Strategy Call Scheduled</h2>
          <p>Hi ${lead.name || "there"},</p>
          <p>We're looking forward to speaking with you. Here are the details for our upcoming call:</p>
          <div style="background: #f7f8fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <p><strong>Date & Time:</strong> ${new Date(meetingTime).toLocaleString()}</p>
            <p><strong>Joining Link:</strong> <a href="${meetingLink}">${meetingLink}</a></p>
          </div>
          <p>If you need to reschedule, please reply to this email.</p>
          <br/>
          <p>Best,<br/>Euodia & Bolaji<br/>The BE. Agency Team</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error scheduling meeting:", error);
    return { success: false, error: "Failed to schedule meeting" };
  }
}

export async function getLeads() {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, leads };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}

export async function deleteLead(id: string) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    await db.lead.update({
      where: { id },
      data: { status: "ARCHIVED" },
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting lead:", error);
    return { success: false, error: "Failed to delete lead" };
  }
}

export async function respondToLead(leadId: string, message: string) {
  const session = await getSession();
  if (!session) return { success: false, error: "Unauthorized" };

  try {
    const lead = await db.lead.findUnique({ where: { id: leadId } });
    if (!lead) return { success: false, error: "Lead not found" };

    await sendEmail({
      to: lead.email,
      subject: `Re: Your ${lead.type.toLowerCase()} inquiry with BE. Agency`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111; line-height: 1.6;">
          <h2 style="color: #00BAFF; font-size: 24px; font-weight: 900; letter-spacing: -0.02em;">Response from BE. Agency</h2>
          <p>Hi ${lead.name || "there"},</p>
          <div style="background: #f7f8fa; padding: 30px; border-radius: 20px; margin: 30px 0; border: 1px solid #eee; white-space: pre-wrap; color: #333; font-size: 15px;">${message}</div>
          <p>If you have any further questions, feel free to reply directly to this email.</p>
          <br/>
          <p style="margin: 0; font-weight: bold; color: #000;">Best Regards,</p>
          <p style="margin: 0; color: #666;">Euodia & Bolaji</p>
          <p style="margin: 0; color: #00BAFF; font-weight: bold;">The BE. Agency Team</p>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 40px 0;"/>
          <div style="color: #999; font-size: 12px; background: #fafafa; padding: 20px; border-radius: 10px;">
            <p style="margin-bottom: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #ccc;">Original Inquiry Details</p>
            <p style="margin: 0;"><strong>From:</strong> ${lead.email}</p>
            <p style="margin: 5px 0 0 0;"><strong>Message:</strong></p>
            <p style="margin: 5px 0 0 0; font-style: italic;">${lead.details?.replace(/\n/g, "<br/>") || "No details provided"}</p>
          </div>
        </div>
      `,
    });

    await db.lead.update({
      where: { id: leadId },
      data: { status: "COMPLETED" }
    });

    return { success: true };
  } catch (error) {
    console.error("Error responding to lead:", error);
    return { success: false, error: "Failed to send response" };
  }
}
