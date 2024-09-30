import { NextResponse , NextRequest} from 'next/server';
import bcrypt from 'bcryptjs';
import { User } from '@/models/User';
import dbConnect from '@/lib/mongodb';

import crypto from 'crypto'
import { SendVerificationEmail } from '../send/route';

export async function POST(request: NextRequest) {
try {
  await dbConnect();
    const reqBody = await request.json()
    const {username , email , password} = reqBody

    console.log(reqBody);

    const user = await User.findOne({email})

    if(user){
      return NextResponse.json({error: "User alredy exists"} , {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const otp = crypto.randomInt(100000 , 999999).toString();
    const otpExpires = new Date(Date.now() + 10*60*1000)

    const newUser = new User({
      username,
      email,
      password : hashedPassword,
      otp,
      otpExpires
    })

    const saveUser = await newUser.save()
    console.log(saveUser);

    await SendVerificationEmail(username, email, otp);

  // await sendEmail({email , emailType: "VERIFY" , userOtp: otp })

  return NextResponse.json({
    message: "User created successfully",
    success: true,
    saveUser
  })

} catch (error) {
    return NextResponse.json({error}, {status: 500})
}
}
