'use client'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Home, UserPlus } from "lucide-react"
import Link from "next/link"

export default function RestrictedAccess() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Restricted Access</CardTitle>
          <CardDescription className="text-center">
            This page is only accessible to administrators.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            If you believe you should have access to this page, please contact the site administrator.
          </p>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-center text-sm font-medium">
              Want to become an admin?
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Visit our Contact Us page to inquire about admin privileges.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button variant="outline" asChild className="w-full">
            <Link href="/contact">
              <UserPlus className="mr-2 h-4 w-4" />
              Contact Us
            </Link>
          </Button>
          <Button asChild className="w-full">
            <Link href="/Layouts/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}