'use client'
import Image from "next/image"
import Link from "next/link"

export function Footer({ viewMode, textColor }) {
  return (
    <footer className={`${viewMode === 'talent' ? 'bg-zinc-900' : 'bg-gray-100'} py-8 sm:py-12 px-4 sm:px-6 md:px-10 border-t ${viewMode === 'talent' ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="flex items-center mb-6 lg:mb-0">
          <Image src="/Logo Main Orange.png" alt="Patterned Logo" width={32} height={32} className="sm:w-10 sm:h-10" />
          <span className={`text-2xl sm:text-3xl font-bold ml-2 ${textColor}`}>Patterned</span>
        </div>
        <nav className="flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-8">
          <Link href="#" className={`${textColor} hover:text-orange-500 transition-colors`}>About Us</Link>
          <Link href="#" className={`${textColor} hover:text-orange-500 transition-colors`}>Careers</Link>
          <Link href="#" className={`${textColor} hover:text-orange-500 transition-colors`}>Contact</Link>
          <Link href="#" className={`${textColor} hover:text-orange-500 transition-colors`}>Privacy Policy</Link>
          <Link href="#" className={`${textColor} hover:text-orange-500 transition-colors`}>Terms of Service</Link>
        </nav>
      </div>
    </footer>
  )
} 