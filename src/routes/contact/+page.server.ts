import type { Actions } from './$types';
import { Resend } from 'resend';
import 'dotenv/config';

export const prerender = false;

const resend = new Resend(process.env.RESEND_API_KEY!);

export const actions: Actions = {
  default: async ({ request }) => {
    try {
      const formData = await request.formData();

      const email = formData.get('email') as string;
      const subject = formData.get('subject') as string;
      const message = formData.get('message') as string;
      const website = formData.get('website'); // honeypot

      // Honeypot anti-bot
      if (website) {
        return { success: true };
      }

      // Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !emailRegex.test(email)) {
        return { success: false, error: 'Invalid email' };
      }

      if (!subject || subject.length < 3) {
        return { success: false, error: 'Subject too short' };
      }

      if (!message || message.length < 10) {
        return { success: false, error: 'Message too short' };
      }

      // Send email
      await resend.emails.send({
        from: 'Website Contact <youremail@zito.pages.dev>',
        to: ['beckgarreaud@gmail.com'],
        subject: `[Website] ${subject}`,
        text: `
New message from your website

Email: ${email}

Message:
${message}
`
      });

      return { success: true };

    } catch (err) {
      console.error('Server error:', err);
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Server error'
      };
    }
  }
};