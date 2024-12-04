'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function SignUpPage() {
    const [userType, setUserType] = useState('employee')
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false
    })
    const [error, setError] = useState(null)
    const router = useRouter()
    const supabase = createClientComponentClient()

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match")
            return
        }
        if (!formData.acceptTerms) {
            setError("Please accept the terms and conditions")
            return
        }

        try {
            console.log('Signing up with user type:', userType)
            
            const { data, error: signUpError } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        business_name: formData.businessName,
                        phone: formData.phone,
                        user_type: userType,
                        role: userType
                    },
                    emailRedirectTo: `${location.origin}/auth/callback`,
                }
            })

            if (signUpError) throw signUpError
            
            console.log('Sign up successful:', data)
            await router.push('/auth/verify')
        } catch (error) {
            console.error('Sign up error:', error)
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
                            Join Patterned
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/90 max-w-2xl mx-auto"
                        >
                            Create your account and start connecting with event opportunities
                        </motion.p>
                    </div>
                </motion.section>

                {/* Signup Form Card */}
                <div className="max-w-2xl mx-auto px-4 py-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold text-neutral-stone mb-6 text-center">
                                Create Your Account
                            </h2>

                            {/* User Type Toggle */}
                            <div className="flex justify-center mb-8">
                                <div className="bg-neutral-100 p-1 rounded-lg inline-flex">
                                    <button
                                        onClick={() => setUserType('employee')}
                                        className={`px-4 py-2 rounded-md transition-all ${
                                            userType === 'employee' 
                                            ? 'bg-primary text-white' 
                                            : 'text-neutral-600 hover:bg-neutral-200'
                                        }`}
                                    >
                                        Employee
                                    </button>
                                    <button
                                        onClick={() => setUserType('employer')}
                                        className={`px-4 py-2 rounded-md transition-all ${
                                            userType === 'employer' 
                                            ? 'bg-primary text-white' 
                                            : 'text-neutral-600 hover:bg-neutral-200'
                                        }`}
                                    >
                                        Employer
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {userType === 'employee' ? (
                                    // Employee Form Fields
                                    <>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-neutral-stone/80 mb-2">First Name</label>
                                                <input 
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-neutral-stone/80 mb-2">Last Name</label>
                                                <input 
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-neutral-stone/80 mb-2">Phone Number</label>
                                            <input 
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    // Employer Form Fields
                                    <div>
                                        <label className="block text-neutral-stone/80 mb-2">Business Name</label>
                                        <input 
                                            type="text"
                                            name="businessName"
                                            value={formData.businessName}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        />
                                    </div>
                                )}

                                {/* Common Fields */}
                                <div>
                                    <label className="block text-neutral-stone/80 mb-2">Email Address</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-stone/80 mb-2">Password</label>
                                    <input 
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-stone/80 mb-2">Confirm Password</label>
                                    <input 
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>

                                {/* Terms and Conditions */}
                                <div className="flex items-center">
                                    <input 
                                        type="checkbox"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-neutral-300 rounded focus:ring-primary"
                                    />
                                    <label className="ml-2 block text-sm text-neutral-stone/80">
                                        I agree to the{' '}
                                        <Link href="/terms" className="text-primary hover:text-primary-dark">
                                            Terms and Conditions
                                        </Link>
                                    </label>
                                </div>

                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
                                >
                                    Create Account
                                </motion.button>
                            </form>
                        </div>
                        <div className="bg-neutral-50 p-6 text-center border-t border-neutral-100">
                            <p className="text-neutral-stone/80">
                                Already have an account?{' '}
                                <Link 
                                    href="/auth/login"
                                    className="text-primary hover:text-primary-dark transition-colors font-semibold"
                                >
                                    Sign in
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

