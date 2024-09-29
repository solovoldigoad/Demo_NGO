'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Calendar, DollarSign, Users, Home, Settings, HelpCircle, Menu, X } from "lucide-react"
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'

export default function AdminPanel() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [messages, setMessages] = useState("")
  const {data: session} = useSession()
  const router = useRouter()
  

  // Mock data
  const donations = [
    { id: 1, date: "2023-06-01", donor: "John Doe", amount: 100, campaign: "Clean Water" },
    { id: 2, date: "2023-06-02", donor: "Jane Smith", amount: 250, campaign: "Education" },
    { id: 3, date: "2023-06-03", donor: "Bob Johnson", amount: 500, campaign: "Healthcare" },
  ]

  const volunteers = [
    { id: 1, name: "Alice Brown", email: "alice@example.com", skills: "Teaching" },
    { id: 2, name: "Charlie Davis", email: "charlie@example.com", skills: "Medical" },
    { id: 3, name: "Eva White", email: "eva@example.com", skills: "Construction" },
  ]
  const projectCount = 5
  const handleMessageUpdate = async () => {
    if(!messages.trim()) return;
    
    try {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: messages }),
      });
  
      if (response.ok) {
        // Clear input after successful submission
        setMessages("");
        // Optionally, fetch the updated list of messages
        const updatedMessages = await response.json();
        router.push("/Layouts/dashboard")
        setMessages(updatedMessages.messages);
      } else {
        console.error("Failed to update message");
      }
    } catch (error) {
      console.error("Error updating message:", error);
    }
    

    console.log("Updating message:", messages)
    // Here you would typically send this data to your backend
  }
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard()
      case 'donations':
        return renderDonations()
      case 'volunteers':
        return renderVolunteers()
      case 'content':
        return renderContentUpdate()
      default:
        return <div>Page not found</div>
    }
  }
  const renderDashboard = () => (
    <>
      <h1 className="text-3xl font-bold mb-6 text-black">Dashboard</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold ">$850</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered Volunteers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteers.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Donation</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">June 3, 2023</div>
          </CardContent>
        </Card>
      </div>
    </>
  )
  const renderDonations = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-black">Donation Details</h2>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full flex flex-wrap">
          <TabsTrigger value="all" className="flex-grow text-black">All Donations</TabsTrigger>
          <TabsTrigger value="byDate" className="flex-grow text-black">By Date</TabsTrigger>
          <TabsTrigger value="byDonor" className="flex-grow text-black">By Donor</TabsTrigger>
          <TabsTrigger value="byCampaign" className="flex-grow text-black">By Campaign</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className='text-black'>Date</TableHead>
                  <TableHead className='text-black'>Donor</TableHead>
                  <TableHead className='text-black'>Amount</TableHead>
                  <TableHead className='text-black'>Campaign</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className='text-black'>{donation.date}</TableCell>
                    <TableCell className='text-black'>{donation.donor}</TableCell>
                    <TableCell className='text-black'>${donation.amount}</TableCell>
                    <TableCell className='text-black'>{donation.campaign}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        <TabsContent value="byDate">
          <p>Donations by date view not implemented in this example.</p>
        </TabsContent>
        <TabsContent value="byDonor">
          <p>Donations by donor view not implemented in this example.</p>
        </TabsContent>
        <TabsContent value="byCampaign">
          <p>Donations by campaign view not implemented in this example.</p>
        </TabsContent>
      </Tabs>
    </>
  )

  const renderVolunteers = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-black">Registered Volunteers</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='text-black'>Name</TableHead>
              <TableHead className='text-black'>Email</TableHead>
              <TableHead className='text-black'>Skills</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {volunteers.map((volunteer) => (
              <TableRow key={volunteer.id}>
                <TableCell className='text-black'>{volunteer.name}</TableCell>
                <TableCell className='text-black'>{volunteer.email}</TableCell>
                <TableCell className='text-black'>{volunteer.skills}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )

  const renderContentUpdate = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-black ">Update Website Content</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-black">Update Message</label>
          <Textarea
            id="message"
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
            className="mt-1 w-full bg-slate-100 text-black font-semibold text-lg"
            rows={4}
          />
          <Button onClick={handleMessageUpdate} className="mt-2">Update Message</Button>
        </div>
      </div>
    </>
  )

  return (
    <div className="flex flex-col h-screen bg-white-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#005c86] to-[#002c42] shadow-sm z-2">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex  items-center">
          <h1 className="text-lg font-bold text-white  "> Admin Panel Of Aryavart Tarunodaya Sewa Samiti</h1>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0 lg:flex
            fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-r from-[#005c86] to-[#002c42] shadow-lg              
            transform transition-transform duration-300 ease-in-out  lg:relative lg:transform-none   
          `}
        >
          <div className="flex flex-col h-full p-1 pt-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src= {session?.user?.image ?? "https://github.com/shadcn.png"} alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{session?.user?.name}</h2>
                  <p className="text-sm text-white">{session?.user?.email}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="space-y-2 flex-grow">
              <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('dashboard'); setIsSidebarOpen(false); }}>
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('donations'); setIsSidebarOpen(false); }}>
                <DollarSign className="mr-2 h-4 w-4" />
                Donations
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('volunteers'); setIsSidebarOpen(false); }}>
                <Users className="mr-2 h-4 w-4" />
                Volunteers
              </Button>
              <Button variant="ghost" className="w-full justify-start" onClick={() => { setActiveTab('content'); setIsSidebarOpen(false); }}>
                <Settings className="mr-2 h-4 w-4" />
                Update Content
              </Button>
            </nav>
            <Button variant="ghost" className="w-full justify-start mt-auto">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#cbd6dd] p-4">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  )
}