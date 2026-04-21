"use server";

import { db } from "@/lib/db";
import { sendEmail, adminEmail } from "@/lib/mailer";

// Email Templates
const userConfirmationTemplate = (name: string, subject: string) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
    <h2>${subject}</h2>
    <p>Hi ${name || "there"},</p>
    <p>Thanks for reaching out! We've received your request and our founders, Euodia and Bolaji, will review it shortly.</p>
    <p>If you have any urgent questions, feel free to reply directly to this email.</p>
    <br/>
    <p>Best,<br/>The BE. Agency Team</p>
  </div>
`;

const adminNotificationTemplate = (type: string, data: any) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
    <h2>New Lead: ${type}</h2>
    <table style="width: 100%; border-collapse: collapse; text-align: left;">
      ${Object.entries(data).map(([key, value]) => `
        <tr style="border-bottom: 1px solid #eee;">
          <th style="padding: 10px 0; text-transform: capitalize;">${key}</th>
          <td style="padding: 10px 0;">${value}</td>
        </tr>
      `).join("")}
    </table>
  </div>
`;

export async function bookCall(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const company = formData.get("company") as string;

  try {
    const lead = await db.lead.create({
      data: {
        type: "BOOKING",
        name,
        email,
        details: `Company: ${company}`,
      },
    });

    // Send confirmation to User
    await sendEmail({
      to: email,
      subject: "Your BE. Agency Call Request",
      html: userConfirmationTemplate(name, "We've received your call request!"),
    });

    // Send alert to Admin
    await sendEmail({
      to: adminEmail,
      subject: `New Booking Request from ${name}`,
      html: adminNotificationTemplate("Call Booking", { name, email, company }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error booking call:", error);
    return { success: false, error: "Failed to book call" };
  }
}

export async function startProject(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const type = formData.get("projectType") as string;
  const details = formData.get("details") as string;

  try {
    const lead = await db.lead.create({
      data: {
        type: "PROJECT",
        name,
        email,
        details: `Type: ${type}\n\nDetails: ${details}`,
      },
    });

    // Send confirmation to User
    await sendEmail({
      to: email,
      subject: "Your BE. Agency Project Inquiry",
      html: userConfirmationTemplate(name, "We've received your project details!"),
    });

    // Send alert to Admin
    await sendEmail({
      to: adminEmail,
      subject: `New Project Inquiry from ${name}`,
      html: adminNotificationTemplate("Project Inquiry", { name, email, type, details }),
    });

    return { success: true };
  } catch (error) {
    console.error("Error starting project:", error);
    return { success: false, error: "Failed to submit project inquiry" };
  }
}

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  try {
    const existing = await db.lead.findFirst({
      where: { email, type: "NEWSLETTER" }
    });

    if (existing) {
      return { success: true, message: "Already subscribed!" };
    }

    await db.lead.create({
      data: {
        type: "NEWSLETTER",
        email,
      },
    });

    // Confirmation to user
    await sendEmail({
      to: email,
      subject: "Welcome to BE. Labs Newsletter",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
          <h2>Welcome to BE. Labs</h2>
          <p>Thanks for subscribing. We'll send you our latest insights on engineering, design, and growth.</p>
        </div>
      `,
    });

    // Notification to admin
    await sendEmail({
      to: adminEmail,
      subject: `New Newsletter Subscriber`,
      html: `<p>New subscriber: ${email}</p>`,
    });

    return { success: true };
  } catch (error) {
    console.error("Error subscribing:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}
