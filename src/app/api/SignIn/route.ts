import { NextResponse , NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User';
import dbConnect from '@/lib/mongodb';

export async function POST(req: NextRequest) {
try {
  await dbConnect();  
    const reqBody = await req.json();
    const { email, password } = reqBody
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }
    console.log("User exists")
    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
    const response = NextResponse.json({ message: "Login successful" , success: true }, { status: 200 });
    return response;
} catch (error : any) {
  return NextResponse.json({error: error.message}, {status: 500})
}
}
