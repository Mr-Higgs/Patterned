'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { Briefcase, Calendar, DollarSign, User, LogOut, Menu, X, Settings, HelpCircle, HomeIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { UserProvider, useUser } from '../../context/useContext'

const navItems = [
  { href: '/dashboard/employee', icon: HomeIcon, label: 'Dashboard' },
  { href: '/dashboard/employee/jobs', icon: Briefcase, label: 'Jobs' },
  { href: '/dashboard/employee/availability', icon: Calendar, label: 'Availability' },
  { href: '/dashboard/employee/earnings', icon: DollarSign, label: 'Earnings' },
  { href: '/dashboard/employee/profile', icon: User, label: 'Profile' },
]

function DashboardContent({ children }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { userAvatar } = useUser()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setLoading(false)
      if (!user) {
        router.push('/login')
      }
    }
    getUser()
  }, [router])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-2xl font-bold text-gray-800">Loading...</div>
    </div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className={`bg-white w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 md:relative md:translate-x-0`}>
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <h1 className="text-xl font-bold text-gray-800">Employee Dashboard</h1>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-4 py-4 border-t">
            <button onClick={handleSignOut} className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full">
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 md:px-6">
            <div className="flex items-center">
              <button onClick={() => setIsSidebarOpen(true)} className="md:hidden mr-4">
                <Menu className="h-6 w-6 text-gray-600" />
              </button>
              <div className="text-xl font-semibold text-gray-800">Employee Dashboard</div>
            </div>
            <div className="flex items-center">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center focus:outline-none"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userAvatar} alt="User Avatar" />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link href="/dashboard/employee/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="inline-block w-4 h-4 mr-2" />
                      Settings
                    </Link>
                    <Link href="/dashboard/employee/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="inline-block w-4 h-4 mr-2" />
                      My Account
                    </Link>
                    <Link href="/dashboard/employee/support" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <HelpCircle className="inline-block w-4 h-4 mr-2" />
                      Support & Resources
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
      </div>
  )
}

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  )
}

