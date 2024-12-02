'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'
import { Briefcase, Calendar, DollarSign, User, LogOut, Menu, X, HomeIcon } from 'lucide-react'

const navItems = [
  { href: '/dashboard/employer', icon: HomeIcon, label: 'Dashboard' },
  { href: '/dashboard/employer/jobs', icon: Briefcase, label: 'Jobs' },
  { href: '/dashboard/employer/availability', icon: Calendar, label: 'Availability' },
  { href: '/dashboard/employer/earnings', icon: DollarSign, label: 'Earnings' },
  { href: '/dashboard/employer/profile', icon: User, label: 'Profile' },
]

export default function DashboardLayout({ children }) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
          <div className="text-xl font-semibold text-gray-800 md:hidden">Employee Dashboard</div>
          <div className="flex items-center">
            {/* Add any header content here, e.g., notifications, user menu, etc. */}
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

