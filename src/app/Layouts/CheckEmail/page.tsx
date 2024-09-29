"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail } from "lucide-react"
import Link from 'next/link'

export default function EmailVerification() {
  const [email, setEmail] = useState("user@example.com") // Replace with actual user's email

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
          <CardDescription className="text-center">
            We've sent a verification email with OTP to your inbox
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Mail className="h-16 w-16 text-primary" />
          </div>
          <p className="text-center">
            We've sent a verification email to:
            <br />
            <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted-foreground text-center">
            Please check your email and enter the OTP provided to verify your account.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <p className="text-sm text-muted-foreground text-center">
            Didn't receive the email? Check your spam folder or try resending.
          </p>
          <Link href="/Layouts/verifyemail"><button  
          className="bg-black text-white p-3 rounded-lg">Enter OTP</button></Link>
        </CardFooter>
      </Card>
    </div>
  )
}