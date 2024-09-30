

"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation'; // Import for client-side navigation and params
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const OTPVerification = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(['','', '', '', '', '']); // OTP state
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // Ref for input elements
  const { toast } = useToast();
  // Get token from query params

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join(''); // Joining all OTP digits
  
    if (enteredOtp.length === 6) {
      try {
        if (enteredOtp) {
          // Verify OTP via backend with the token
          await axios.post("/api/verifyemail", { otp: enteredOtp }); // Correct POST request
          router.push('/Layouts/Login'); // Redirect on success
        }
      } catch (error) {
        console.log("invaid otp" , error)
      }
    } else {
      toast({
        title: "Incomplete OTP",
        description: "Please enter a complete 6-digit OTP.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>OTP Verification</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your device</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-2 mb-4">
              {otp.map((digit, index) => (
                <div key={index}>
                  <Label htmlFor={`otp-${index}`} className="sr-only">Digit {index + 1}</Label>
                  <Input
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    className="text-center text-lg"
                  />
                </div>
              ))}
            </div>
            <Button type="submit" className="w-full">Verify OTP</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OTPVerification;
