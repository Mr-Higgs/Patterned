'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '../components/ui/Button'
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center md:hidden">
            <Link href="/" className="text-xl font-bold mr-4">
              Patterned
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-background hover:text-accent focus:outline-none focus:text-accent"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <nav className="hidden md:flex md:items-center md:justify-between md:flex-1">
            <Link href="/" className="text-xl font-bold">
              Patterned
            </Link>
            <ul className="flex space-x-4">
              <li>
                <Link href="/landing" className="hover:text-accent">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-accent">
                  App
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent">
                  Contact
                </Link>
                <Link href="/auth/signup" className="p-2 hover:text-accent">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* Mobile menu, toggle classes based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="block hover:text-accent">
            Home
          </Link>
          <Link href="/about" className="block hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="block hover:text-accent">
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}

