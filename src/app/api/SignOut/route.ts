import { NextResponse , NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '@/models/User';
import dbConnect from '@/lib/mongodb';

export async function GET(req: NextRequest) {
  await dbConnect();  
try {
  const response = NextResponse.json({
    message: "Logout successfully",
    success: true
  })
  response.cookies.set("token" , "",{
    httpOnly: true,
    expires: new Date(0)
  })
  return response;
}catch (error : any) {
    return NextResponse.json({error: error.message}, {status: 500})
}
}