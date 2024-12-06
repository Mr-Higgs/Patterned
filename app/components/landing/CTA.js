'use client'
import { useState } from 'react'
import Link from "next/link"
import { Button } from '../ui/Button'
import { Input } from './Input'

export function CTA({ viewMode, buttonBgColor, buttonTextColor }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', message: '' })
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          userType: viewMode
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe')
      }

      setStatus({
        type: 'success',
        message: 'Thanks for subscribing! Check your email for confirmation.'
      })
      setEmail('')
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className={`w-full py-16 sm:py-20 md:py-32 ${viewMode === 'talent' ? 'bg-gradient-to-t from-zinc-900 to-black' : 'bg-gradient-to-t from-gray-100 to-white'}`}>
      <div className="container px-4 sm:px-6 md:px-10 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              Ready to Transform Your {viewMode === 'talent' ? 'Career' : 'Venue'}?
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              {viewMode === 'talent'
                ? "Join thousands of top professionals finding their next big opportunity in the nightlife industry. Your dream gig is just a click away."
                : "Connect with exceptional talent and revolutionize your staffing process. Elevate your venue's performance and create unforgettable experiences for your patrons."}
            </p>
          </div>
          <div className="w-full max-w-2xl space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <Input
                className={`flex-1 ${viewMode === 'talent' ? 'bg-zinc-800/50 border-orange-500/20' : 'bg-white border-orange-500/20'} text-base sm:text-lg placeholder-gray-500 focus:border-orange-500 focus:ring-orange-500 h-12 sm:h-16 rounded-full`}
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <Button 
                type="submit"
                disabled={isLoading}
                className={`${buttonBgColor} ${buttonTextColor} text-base sm:text-xl px-6 sm:px-10 h-12 sm:h-16 rounded-full w-full sm:w-auto ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading ? 'Subscribing...' : 'Get Started'}
              </Button>
            </form>
            
            {status.message && (
              <div className={`text-sm ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                {status.message}
              </div>
            )}
            
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