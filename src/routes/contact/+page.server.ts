// src/routes/contact/+page.server.ts
import type { Actions } from './$types';
import 'dotenv/config';
import nodemailer from 'nodemailer'; // o SendGrid si quieres

export const actions: Actions = {
  default: async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const website = formData.get('website'); // Honeypot

  if (website) return { success: true };

  // Validación básica
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
    return { success: false, error: 'Invalid email' };
  if (!subject || subject.length < 3) 
    return { success: false, error: 'Subject too short' };
  if (!message || message.length < 10) 
    return { success: false, error: 'Message too short' };

  try {
    // Configura tu SMTP o SendGrid aquí
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App password de Gmail
      }
    });

    await transporter.sendMail({
      from: `Web Form <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `[Website] ${subject}`,
      text: `Nuevo mensaje desde tu web\nEmail: ${email}\nMensaje:\n${message}`
    });

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}};