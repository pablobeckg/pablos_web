// src/routes/contact/+page.server.ts
import type { Actions } from './$types';
import sgMail from '@sendgrid/mail';
import 'dotenv/config';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;
    const website = formData.get('website'); // Honeypot

    // Anti-bot
    if (website) return { success: true };

    // Validación
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) 
      return { success: false, error: 'Invalid email' };
    if (!subject || subject.length < 3) 
      return { success: false, error: 'Subject too short' };
    if (!message || message.length < 10) 
      return { success: false, error: 'Message too short' };

    try {
      await sgMail.send({
        to: 'beckgarreaud@gmail.com',  // tu correo
        from: 'beckgarreaud@gmail.com', // remitente verificado
        subject: `[Website] ${subject}`,
        text: `Nuevo mensaje desde tu web\n\nEmail: ${email}\nMensaje:\n${message}`
      });
      return { success: true };
    } catch (err: any) {
      console.error('SendGrid error:', err);
      return { success: false, error: err.message };
    }
  }
};