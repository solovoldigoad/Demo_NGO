import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';

// Initialize Resend service
const resend = new Resend(process.env.RESEND_API_KEY);

// SendVerificationEmail function
export async function SendVerificationEmail(username: string, email: string, otp: string) {
  try {
    // Use the resend API to send an email with the OTP
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Update this with your actual sender email
      to: [email], // Send to the user's email
      subject: 'Verify Your Account - NGO', // Customize your email subject
      react: EmailTemplate({ username, email, userOtp: otp, emailType: 'VERIFY' }), // Pass OTP to template
    });
    if (error) {
      console.log('Error sending email:', error);
      return;
    }

    console.log('Verification email sent:', data);
  } catch (error) {
    console.log('Error:', error);
  }
}

