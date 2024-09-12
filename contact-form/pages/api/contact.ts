import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { Email } from '@react-email/components';

// Initialize Resend client with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// The email structure using React Email components
const ContactEmail = ({ email, message }: { email: string; message: string }) => (
  <Email>
    <h1>New Contact Message</h1>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Message:</strong></p>
    <p>{message}</p>
  </Email>
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ error: 'Email and message are required' });
  }

  try {
    // Send the email using Resend API
    await resend.emails.send({
      from: 'noreply@yourdomain.com', // You must have this verified in Resend
      to: 'recipient@example.com', // Where you want to receive the contact messages
      subject: 'New contact message',
      react: ContactEmail({ email, message }), // Use React Email component
    });

    res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to send message' });
  }
}
