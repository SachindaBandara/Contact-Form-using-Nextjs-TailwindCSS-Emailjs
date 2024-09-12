// File: pages/api/sendEmail.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    const { email, message } = req.body;
    try {
      await resend.emails.send({
        from: 'your-email@example.com',
        to: 'recipient@example.com',
        subject: 'New Contact Form Submission',
        html: `<p>Email: ${email}</p><p>Message: ${message}</p>`,
      });
      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send email' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
