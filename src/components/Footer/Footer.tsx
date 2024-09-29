import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-400">About Our NGO</h3>
            <p className="text-sm text-white">
              We are dedicated to making a positive impact in our community through various initiatives and programs.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm hover:underline">About Us</Link></li>
              <li><Link href="/programs" className="text-sm hover:underline">Our Programs</Link></li>
              <li><Link href="/donate" className="text-sm hover:underline">Donate</Link></li>
              <li><Link href="/volunteer" className="text-sm hover:underline">Volunteer</Link></li>
              <li><Link href="/contact" className="text-sm hover:underline">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-400">Contact Us</h3>
            <address className="not-italic text-sm">
              <p className="text-white">123 NGO Street, City, Country</p>
              <p className="text-white">Phone: +1 (123) 456-7890</p>
              <p className="text-white">Email: info@ngoemail.org</p>
            </address>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-400">Stay Updated</h3>
            <p className="text-sm mb-2 text-white">Subscribe to our newsletter for updates:</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground text-primary"
              />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-primary-foreground hover:text-secondary">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-primary-foreground hover:text-secondary">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-primary-foreground hover:text-secondary">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-primary-foreground hover:text-secondary">
              <span className="sr-only">YouTube</span>
              <Youtube className="h-6 w-6" />
            </a>
          </div>
          <p className="mt-8 text-center text-xs">
            © {new Date().getFullYear()} Your NGO Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}