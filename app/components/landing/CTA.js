'use client'
import Link from "next/link"
import { Button } from '../ui/Button'
import { Input } from './Input'

export function CTA({ viewMode, email, setEmail, buttonBgColor, buttonTextColor }) {
  return (
    <section className={`w-full py-16 sm:py-20 md:py-32 ${viewMode === 'talent' ? 'bg-gradient-to-t from-zinc-900 to-black' : 'bg-gradient-to-t from-gray-100 to-white'}`}>
      <div className="container px-4 sm:px-6 md:px-10 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Ready to Transform Your {viewMode === 'talent' ? 'Career' : 'Venue'}?</h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {viewMode === 'talent'
                ? "Join thousands of top professionals finding their next big opportunity in the nightlife industry. Your dream gig is just a click away."
                : "Connect with exceptional talent and revolutionize your staffing process. Elevate your venue's performance and create unforgettable experiences for your patrons."}
            </p>
          </div>
          <div className="w-full max-w-2xl space-y-4">
            <form className="flex flex-col sm:flex-row gap-4">
              <Input
                className={`flex-1 ${viewMode === 'talent' ? 'bg-zinc-800/50 border-orange-500/20' : 'bg-white border-orange-500/20'} text-base sm:text-lg placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500 h-12 sm:h-16 rounded-full`}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className={`${buttonBgColor} ${buttonTextColor} text-base sm:text-xl px-6 sm:px-10 h-12 sm:h-16 rounded-full w-full sm:w-auto`}>
                Get Started
              </Button>
            </form>
            <p className="text-sm text-gray-400">
              By signing up, you agree to our{" "}
              <Link className="underline underline-offset-2 hover:text-orange-500 transition-colors" href="#">
                Terms & Conditions
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 