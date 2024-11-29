'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getSupabase, isSupabaseConfigured } from '../../lib/supabase'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleLogin = useCallback(async (e) => {
    e.preventDefault()
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Please check your environment variables.')
      return
    }
    try {
      const supabase = getSupabase()
      const { data: { user }, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) throw signInError

      // Fetch user profile to get the role
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)

      if (profileError) throw profileError

      if (!profiles || profiles.length === 0) {
        throw new Error('User profile not found')
      }

      const profile = profiles[0] // Take the first profile if multiple exist

      // Redirect based on user role
      switch (profile.role) {
        case 'admin':
          router.push('/dashboard/admin')
          break
        case 'employer':
          router.push('/dashboard/employer')
          break
        case 'employee':
          router.push('/dashboard/employee')
          break
        default:
          throw new Error('Invalid user role')
      }
    } catch (error) {
      setError(error.message)
    }
  }, [email, password, router])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-text">Log in to your account</h2>
            </div>
            {!isSupabaseConfigured && (
              <div className="bg-accent border border-secondary text-text px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Error:</strong>
                <span className="block sm:inline"> Supabase is not configured. Please check your environment variables.</span>
              </div>
            )}
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-text rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-text rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {error && <div className="text-background bg-secondary px-4 py-2 rounded-md text-sm">{error}</div>}

              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-background bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary" disabled={!isSupabaseConfigured}>
                  Log In
                </button>
              </div>
            </form>
            <div className="text-sm text-center">
              <Link href="/signup" className="font-medium text-text hover:text-primary">
                Don't have an account? Sign up
              </Link>
            </div>
            <div className="text-sm text-center">
              <Link href="/reset-password" className="font-medium text-text hover:text-primary">
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

