'use client';
import React, { useState } from 'react';
import './LoginPage.css';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Mail } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Function to handle user sign-in
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try{
      const res = await fetch('/api/SignIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        }),
      });
      const data = await res.json();
      if(res.ok){
        console.log('User has logIn successfully' , data);
        router.push('/Layouts/dashbord')
      }
      else{
        console.log('LogIn failed' + data.message)
      }
    }catch(error){
      console.log('An error occurred during LogIn:')
    }
  };

  const toggleMode = () => setIsLogin(!isLogin);
  const toggleModeUser = () => setIsUser(!isUser);

  const handleUserTypeChange = (type: 'user' | 'admin') => {
    setIsUser(type === 'user');
  };

  return (
    <div className="login-page bg-gray-300 h-full w-full flex justify-center items-center p-12">
      <div className="flex w-full p-10">
        <div className="hidden md:flex w-1/2 bg-black justify-center items-center">
          <img src="NgoLogo.png" alt="donation" className="w-full h-full object-fill" />
        </div>

        <div className="w-full mx-auto p-10 bg-gray-100 rounded-lg shadow-lg md:w-1/2 flex justify-center pl-15">
          <div className="w-full">
              <div className="w-full max-w-md space-y-8">
                <div className="text-center text-black font-bold text-4xl">
                  <h2 className="mt-6 text-3xl font-bold tracking-tight">
                    {isLogin ? 'Welcome Back' : 'THANK YOU FOR SIGNING UP'}
                  </h2>
                </div>

                <div className="flex items-center justify-center space-x-8">
                  <div className="flex items-center space-x-4">
                    <Checkbox id="user-checkbox" checked={isUser} onCheckedChange={() => handleUserTypeChange('user')} />
                    <Label
                      htmlFor="user-checkbox"
                      className="cursor-pointer text-black font-bold"
                      onClick={() => handleUserTypeChange('user')}
                    >
                      User
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="admin-checkbox" checked={!isUser} onCheckedChange={() => handleUserTypeChange('admin')} />
                    <Label
                      htmlFor="admin-checkbox"
                      className="cursor-pointer text-black font-bold"
                      onClick={() => handleUserTypeChange('admin')}>
                      Admin
                    </Label>
                  </div>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="block text-base font-medium text-black">
                        {isUser ? 'User-Email' : 'Admin-Email'}
                      </Label>
                      <Input
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="password" className="block text-base font-medium text-black">
                        Password
                      </Label>
                      <Input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox id="remember-me" />
                      <Label htmlFor="remember-me" className="ml-2 block text-sm text-black">
                        Remember me
                      </Label>
                    </div>
                      <div className="text-sm">
                        <Link href="#" className="font-medium text-black hover:underline">
                          Forgot your password?
                        </Link>
                      </div>
                  </div>
                  <div>
                    <Button type="submit" className="w-full">
                    Log in
                    </Button>
                  </div>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button onClick={() => signIn('google')} variant="outline" className="w-full text-black">
                      <Mail className="w-5 h-5 mr-2 text-black" />
                      Google
                    </Button>
                    <Button onClick={() => signIn('facebook')} variant="outline" className="w-full text-black">
                      <Facebook className="w-5 h-5 mr-2 text-black" />
                      Facebook
                    </Button>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500">
                    Don't have an account?
                    <Link href='/Layouts/SignUp'>
                    <button className="font-bold text-green-600 hover:underline text-base">
                      Sign Up
                    </button>
                    </Link>
                  </p>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
