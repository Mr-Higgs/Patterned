'use client'
import { DollarSign } from 'lucide-react'
import Image from "next/image"
import { Button } from '../ui/Button'

export function Hero({ viewMode, toggleViewMode, roles, accentColor, buttonBgColor, buttonTextColor }) {
  return (
    <section className="w-full py-12 sm:py-20 md:py-32 lg:py-48 xl:py-64 relative overflow-hidden">
      <div className={`absolute inset-0 ${viewMode === 'talent' ? 'bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]' : 'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)]'}`} />
      <div className="container px-4 sm:px-6 md:px-10 relative">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_700px] items-center">
          {/* Hero Content */}
          <div className="flex flex-col justify-center space-y-6 sm:space-y-8">
            {/* View Mode Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-4 mb-6">
                <Button
                  className={`w-full sm:w-auto ${viewMode === 'talent' ? buttonBgColor : 'bg-gray-200 hover:bg-gray-300'} ${viewMode === 'talent' ? buttonTextColor : 'text-gray-800'} px-6 py-2 sm:px-8 sm:py-3 rounded-full`}
                  onClick={() => toggleViewMode('talent')}
                >
                  For Talent
                </Button>
                <Button
                  variant="outline"
                  className={`w-full sm:w-auto ${viewMode === 'business' ? 'rounded-full text-white hover:bg-orange-600' : 'bg-transparent'} px-6 py-2 sm:px-8 sm:py-3 rounded-full`}
                  onClick={() => toggleViewMode('business')}
                >
                  For Businesses
                </Button>
              </div>
              {/* Hero Text */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tighter leading-tight text-center sm:text-left">
                <span className={accentColor}>Elevate</span> Your
                <br />
                {viewMode === 'talent' ? 'Nightlife Career' : 'Venue Experience'}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-[700px] text-center sm:text-left">
                {viewMode === 'talent' 
                  ? `Patterned is the premier platform connecting exceptional ${roles.join(", ")} with prestigious opportunities in the vibrant world of nightlife and entertainment. Showcase your talents, access exclusive gigs, and take your career to new heights.`
                  : "Patterned empowers nightlife businesses to discover, hire, and manage top-tier talent effortlessly. Elevate your venue's performance, streamline staffing, and create unforgettable experiences for your patrons."}
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button className={`${buttonBgColor} ${buttonTextColor} px-6 py-3 sm:px-10 sm:py-6 rounded-full w-full sm:w-auto`}>
                {viewMode === 'talent' ? 'Create Your Profile' : 'Post a Job'}
              </Button>
              <Button variant="outline" className="px-6 py-3 sm:px-10 sm:py-6 rounded-full w-full sm:w-auto">
                {viewMode === 'talent' ? 'Explore Opportunities' : 'Browse Talent'}
              </Button>
            </div>
            {/* User Count */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-2 border-orange-500 overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt={`Profile ${i + 1}`}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <span className="text-lg text-gray-400">Join 10,000+ {viewMode === 'talent' ? 'professionals' : 'venues'}</span>
            </div>
          </div>
          {/* Hero Image */}
          <div className="relative mt-8 lg:mt-0">
            <div className={`absolute -top-8 -right-8 w-48 h-48 sm:w-64 sm:h-64 bg-orange-500/20 rounded-full blur-3xl`} />
            <div className={`absolute -bottom-8 -left-8 w-48 h-48 sm:w-64 sm:h-64 bg-orange-500/20 rounded-full blur-3xl`} />
            <Image
              alt={viewMode === 'talent' ? "Nightlife Professional" : "Nightlife Venue"}
              className="mx-auto relative z-10 rounded-3xl object-cover w-full h-auto"
              height={800}
              src={viewMode === 'talent' ? "/Red bar-girl bartender.png" : "/Black & White Bar-crowd.png"}
              width={700}
            />
          </div>
        </div>
      </div>
    </section>
  )
} 