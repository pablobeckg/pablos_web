import type { Actions } from './$types';
import nodemailer from 'nodemailer';
import 'dotenv/config';

export const prerender = false;

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();
      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const message = formData.get('message') as string;
      const website = formData.get('website'); // honeypot

      // Honeypot anti-bot
      if (website) return { success: true };

      // Validación
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) return { success: false, error: 'Invalid email' };
      if (!subject || subject.length < 3) return { success: false, error: 'Subject too short' };
      if (!message || message.length < 10) return { success: false, error: 'Message too short' };

      // Configuración SMTP Gmail
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // SSL
        auth: {
          user: process.env.EMAIL_USER!,
          pass: process.env.EMAIL_PASS! // App Password de Gmail
        }
      });

      await transporter.sendMail({
        from: `Web Form <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `[Website] ${subject}`,
        text: `New message from your website\n\nEmail: ${email}\nMessage:\n${message}`
      });

      return { success: true };
    } catch (err: any) {
      console.error('Server error:', err);
      return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
  }
};