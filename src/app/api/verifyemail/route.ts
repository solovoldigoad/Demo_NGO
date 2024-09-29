
import { NextResponse } from 'next/server'; // Importing NextResponse
import { User } from '@/models/User';
import dbConnect from '@/lib/mongodb';

export async function POST(req: Request) {
  const { otp } = await req.json(); // Make sure this extracts the 'otp' from the request body
  console.log(otp);
  await dbConnect(); // Ensure connection to the database
  if (!otp) {
    return NextResponse.json({ message: 'OTP is required.' }, { status: 400 });
  }
  try {
    const user = await User.findOne({otp});
    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }
    // If the OTP is valid, update the user's verification status
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save(); // Save the updated user in the database

    return NextResponse.json({ message: 'Email verified successfully', success: true });
  } catch (error: any) {
    console.error('Error verifying email:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
