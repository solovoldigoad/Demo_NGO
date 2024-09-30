import { NextResponse } from 'next/server';
import { SendVerificationEmail } from '@/lib/emailService'; // Assuming this is the right path

export async function POST(request: Request) {
  try {
    const { username, email, otp } = await request.json();

    if (!username || !email || !otp) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    // Call the email sending function
    await SendVerificationEmail(username, email, otp);

    return NextResponse.json({ message: 'Verification email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in sending verification email:', error);
    return NextResponse.json({ message: 'Error sending email' }, { status: 500 });
  }
}
export { SendVerificationEmail };

