'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { StickyScrollRevealDemo } from '@/components/StickeyCard/StickeyCard'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

export default function DonationForm() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDateSelected, setIsDateSelected] = useState(false);
  const {data: session} = useSession()
  
  const handleBackClick = () => {
     // Navigate to the home page
  }
  return (
    <div>
      <div className="flex w-full p-10">
        {/* Black background div with image */}
        <div className="w-1/2 bg-black  justify-center items-center hidden md:block">
          <img src="DonateImg.jpeg" alt="donation" className="w-full h-full object-fill" />
        </div>
        {/* Donation form div */}
        <div className="w-full mx-auto p-8 bg-card rounded-lg shadow-lg md:w-1/2">
          <div className="flex items-center mb-6">
            <Link href= "/Layouts/dashbord">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="mr-2"
              aria-label="Go back"
            >
              <ArrowLeft className="h-8 w-8 text-black" strokeWidth={3} />
            </Button>
            </Link>
            <h2 className="text-4xl font-bold text-center flex-grow text-black">Thank You For Your Support</h2>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-black font-semibold text-lg">Full Name</Label>
              {session?.user?.name ? (<Input value={session.user.name}  />) : (<Input id="fullName" placeholder="Enter your full name" required />)}
              {/* <Input id="fullName" placeholder="Enter your full name" required /> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNo" className="text-black font-semibold text-lg">Phone Number</Label>
              <Input id="phoneNo" type="tel" placeholder="Enter your phone number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="donationDate" className="text-black font-semibold text-lg">Date of Donation</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                      isDateSelected && "text-black"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 black" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => { 
                      setDate(date); 
                      setIsDateSelected(true);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Link href="/Layouts/donate">
              <button className="w-full mt-8 inline-block px-4 py-2 text-sm font-bold text-center text-white bg-[#338b71] border-2 border-black rounded-lg shadow-[5px_5px_0px_#000] transition-all duration-300 ease-in-out hover:bg-white hover:text-green-700 hover:border-[#338b71] hover:shadow-[5px_5px_0px_#338b71] active:bg-yellow-400 active:shadow-none active:translate-y-1">
                Donate
              </button>
            </Link>
          </form>
        </div>
      </div>
      <div className="hidden md:block">
        <StickyScrollRevealDemo />
      </div>
      <section className="px-4 py-10 max-w-7xl mx-auto md:hidden">
        <h1 className="text-center text-3xl font-bold mb-10 text-gray-700">
          Our Feeding Initiatives And Their Impact
        </h1>

        {/* First Initiative - Bal Shiksha Ahara */}
        <div className="flex flex-col md:flex-row items-start mb-10 gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 underline">Bal Shiksha Ahara</h2>
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Municipal School Meals Programme
            </h3>
            <p className="text-black font-thin">
              48,04,484 meals across 102 municipal schools improved classroom
              attendance by up to 22% in 2021-23. You can help us improve more
              such children's education and healthcare by donating online.
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/path-to-image1.jpg"
              alt="Children in School Meals Programme"
              className="rounded-lg w-full max-w-xs"
            />
          </div>
        </div>
        {/* Second Initiative - Swasthya Ahara */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800 underline">Swasthya Ahara</h2>
            <h3 className="text-xl font-medium text-gray-700 mb-4">
              Government Hospital Feeding Programme
            </h3>
            <p className="text-gray-800 font-thin">
              Served 3,94,957 vulnerable families of patients across 29 Govt.
              Hospitals and Cancer Center to help save over 47 Cr. towards
              treatment. Every penny counts, your smallest donations on this
              website can make the largest impact. Help us in our cause and get
              the highest form of blessings through this charity!
            </p>
          </div>
          <div className="flex-shrink-0">
            <img
              src="/path-to-image2.jpg"
              alt="People in Government Hospital Feeding Programme"
              className="rounded-lg w-full max-w-xs"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
