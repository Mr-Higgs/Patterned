'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })
            
            if (error) throw error

            // Get user type to determine redirect path
            const userType = data.user.user_metadata.user_type || data.user.user_metadata.role
            const redirectPath = userType === 'employee' ? '/dashboard/employee' : '/dashboard/employer'
            
            // Use replace instead of push to avoid back button issues
            await router.replace(redirectPath)
            
        } catch (error) {
            console.error('Login error:', error)
            setError(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-neutral-cream">
            <Header />
            <main className="pb-16">
                {/* Hero Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gradient-to-br from-primary to-primary/80 text-white py-20 px-4"
                >
                    <div className="max-w-7xl mx-auto text-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl font-bold mb-6"
                        >
                            Welcome Back
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/90 max-w-2xl mx-auto"
                        >
                            Sign in to access your Patterned account
                        </motion.p>
                    </div>
                </motion.section>

                {/* Login Form Card */}
                <div className="max-w-md mx-auto px-4 py-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold text-neutral-stone mb-6 text-center">
                                Login to Your Account
                            </h2>
                            {error && (
                                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                                    {error}
                                </div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-neutral-stone/80 mb-2">Email Address</label>
                                    <input 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-stone/80 mb-2">Password</label>
                                    <input 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
                                >
                                    Sign In
                                </motion.button>
                            </form>
                            <div className="mt-6 text-center">
                                <Link 
                                    href="/auth/reset-password"
                                    className="text-primary hover:text-primary-dark transition-colors"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                        <div className="bg-neutral-50 p-6 text-center border-t border-neutral-100">
                            <p className="text-neutral-stone/80">
                                Don't have an account?{' '}
                                <Link 
                                    href="/auth/signup"
                                    className="text-primary hover:text-primary-dark transition-colors font-semibold"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

