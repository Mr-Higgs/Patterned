'use client'

import { useState } from "react"
import { Header } from "../components/landing/Header"
import { Hero } from "../components/landing/Hero"
import { Features } from "../components/landing/Features"
import { JobOpportunities } from "../components/landing/JobOpportunities"
import { Testimonials } from "../components/landing/Testimonials"
import { CTA } from "../components/landing/CTA"
import { Footer } from "../components/landing/Footer"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [viewMode, setViewMode] = useState('talent')

  const roles = ["DJs", "Bartenders", "Event Staff", "Security", "Promoters"]

  const bgColor = viewMode === 'talent' ? 'bg-black' : 'bg-white'
  const textColor = viewMode === 'talent' ? 'text-white' : 'text-gray-900'
  const accentColor = 'text-orange-500'
  const buttonBgColor = viewMode === 'talent' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'
  const buttonTextColor = 'text-white'

  const toggleViewMode = (mode) => {
    if (mode === 'talent' || mode === 'business') {
      setViewMode(mode)
    }
  }

  return (
    <div className={`flex flex-col min-h-screen ${bgColor} ${textColor} font-['Montserrat',sans-serif] transition-colors duration-300`}>
      <Header 
        viewMode={viewMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        textColor={textColor}
        buttonBgColor={buttonBgColor}
        buttonTextColor={buttonTextColor}
      />

      <main className="flex-1 pt-5">
        <Hero 
          viewMode={viewMode}
          toggleViewMode={toggleViewMode}
          roles={roles}
          accentColor={accentColor}
          buttonBgColor={buttonBgColor}
          buttonTextColor={buttonTextColor}
        />

        <Features 
          viewMode={viewMode}
          accentColor={accentColor}
        />

        <JobOpportunities 
          viewMode={viewMode}
          accentColor={accentColor}
          buttonBgColor={buttonBgColor}
          buttonTextColor={buttonTextColor}
        />

        <Testimonials 
          viewMode={viewMode}
          accentColor={accentColor}
        />

        <CTA 
          viewMode={viewMode}
          email={email}
          setEmail={setEmail}
          buttonBgColor={buttonBgColor}
          buttonTextColor={buttonTextColor}
        />
      </main>

      <Footer 
        viewMode={viewMode}
        textColor={textColor}
      />

      {isMenuOpen && (
        <div className={`fixed inset-0 ${viewMode === 'talent' ? 'bg-black' : 'bg-white'} z-40 lg:hidden pt-20`}>
          <nav className="flex flex-col items-center gap-8 p-8">
            {['Features', 'How It Works', 'Testimonials'].map((item) => (
              <a 
                key={item}
                className={`text-xl font-medium ${textColor} hover:text-orange-500 transition-colors`}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className={`${buttonBgColor} ${buttonTextColor} transition-colors text-lg px-8 py-3 rounded-full mt-4`}>
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </div>
  )
}

