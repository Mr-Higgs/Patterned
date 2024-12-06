'use client'
import { Menu } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from '../ui/Button'

export function Header({ viewMode, isMenuOpen, setIsMenuOpen, textColor, buttonBgColor, buttonTextColor }) {
  return (
    <header className={`px-4 sm:px-6 lg:px-10 h-20 flex items-center fixed w-full ${viewMode === 'talent' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md z-50 transition-colors duration-300`}>
      <Link className="flex items-center justify-center" href="#">
        <Image src="/Logo Main Orange.png" alt="Patterned Logo" width={40} height={40} />
        <span className={`ml-2 text-2xl font-bold ${textColor}`}>Patterned</span>
      </Link>
      <nav className="ml-auto hidden lg:flex items-center space-x-8">
        {['Features', 'How It Works', 'Testimonials'].map((item) => (
          <Link 
            key={item}
            className={`text-sm font-medium ${textColor} hover:text-orange-500 transition-colors relative group`}
            href={`#${item.toLowerCase().replace(' ', '-')}`}
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
          </Link>
        ))}
        <Link href="/auth/signup">
          <Button className={`${buttonBgColor} ${buttonTextColor} transition-colors text-sm px-6 py-2 rounded-full`}>
            Sign Up
          </Button>
        </Link>
      </nav>
      <button 
        className={`ml-auto lg:hidden ${textColor}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu size={24} />
      </button>
    </header>
  )
} 