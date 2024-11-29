'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
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
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col w-64 bg-white shadow-xl">
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl font-bold text-indigo-600">Dashboard</h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link href="/dashboard" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
              Home
            </Link>
          </li>
          <li>
            <Link href="/dashboard/profile" className="flex items-center px-6 py-2 text-gray-700 hover:bg-gray-100">
              Profile
            </Link>
          </li>
          <li>
            <button onClick={handleSignOut} className="flex items-center w-full px-6 py-2 text-gray-700 hover:bg-gray-100">
              Sign Out
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </div>
    </div>
  )
}

