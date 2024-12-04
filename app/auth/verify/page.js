'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function VerifyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md"
                >
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Check your email
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            We've sent you a verification link. Please check your email and click the link to verify your account.
                        </p>
                    </div>
                    <div className="text-center">
                        <Link 
                            href="/auth/login"
                            className="text-primary hover:text-primary-dark transition-colors font-semibold"
                        >
                            Return to login
                        </Link>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </div>
    )
} 