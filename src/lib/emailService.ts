// lib/emailService.ts
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function SendVerificationEmail(username: string, email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: [email],
      subject: 'Verify Your Account - NGO',
      react: EmailTemplate({ username, email, userOtp: otp, emailType: 'VERIFY' }),
    });

    if (error) {
      console.error('Error sending email:', error);
      return;
    }

    console.log('Verification email sent:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
