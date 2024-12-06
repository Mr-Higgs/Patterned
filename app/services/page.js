'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useState } from 'react'

export default function OurServicesPage() {
    const [viewMode, setViewMode] = useState('talent')
    
    // Colors based on viewMode
    const bgColor = viewMode === 'talent' ? 'bg-black' : 'bg-white'
    const textColor = viewMode === 'talent' ? 'text-white' : 'text-gray-900'
    const accentColor = 'text-orange-500'
    const buttonBgColor = 'bg-orange-500 hover:bg-orange-600'
    const buttonTextColor = 'text-white'

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const serviceCards = [
        {
            icon: "fa-calendar-star",
            title: "Event Staff Placement",
            description: "Connect with verified professionals for your events, from bartenders to security personnel.",
            features: [
                "Instant matching with qualified staff",
                "Verified professionals",
                "Real-time availability",
                "Seamless booking process"
            ],
            gradient: "from-orange-500/20 to-transparent"
        },
        {
            icon: "fa-users-gear",
            title: "Venue Management",
            description: "Comprehensive staffing solutions for venues of all sizes, ensuring smooth operations.",
            features: [
                "Full-service staffing plans",
                "Staff scheduling & management",
                "Performance tracking",
                "Quality assurance"
            ],
            gradient: "from-orange-500/20 to-transparent"
        },
        {
            icon: "fa-star",
            title: "Premium Events",
            description: "Elite staffing solutions for high-profile events requiring exceptional service standards.",
            features: [
                "VIP service professionals",
                "Experienced event coordinators",
                "Luxury event specialists",
                "Dedicated account management"
            ],
            gradient: "from-orange-500/20 to-transparent"
        }
    ]

    return (
        <div className={`min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
            <Header />
            <main className="pb-16">
                {/* Hero Section */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`${bgColor} py-20 px-4`}
                >
                    {/* View Mode Toggle */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-orange-500/10 p-1 rounded-full inline-flex">
                            <button
                                onClick={() => setViewMode('talent')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                    viewMode === 'talent' 
                                        ? 'bg-orange-500 text-white' 
                                        : `${textColor} hover:bg-orange-500/10`
                                }`}
                            >
                                For Talent
                            </button>
                            <button
                                onClick={() => setViewMode('business')}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                                    viewMode === 'business' 
                                        ? 'bg-orange-500 text-white' 
                                        : `${textColor} hover:bg-orange-500/10`
                                }`}
                            >
                                For Businesses
                            </button>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto text-center">
                        <motion.h1 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-5xl font-bold mb-6 ${textColor}`}
                        >
                            Our Services
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className={`text-xl ${textColor}/90 max-w-2xl mx-auto`}
                        >
                            {viewMode === 'talent' 
                                ? 'Find the perfect opportunities to showcase your skills and grow your career' 
                                : 'Elevate your events with our premium staffing solutions tailored to your specific needs'
                            }
                        </motion.p>
                    </div>
                </motion.section>

                {/* Services Grid */}
                <motion.div 
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="max-w-7xl mx-auto px-4 py-16 grid gap-8 md:grid-cols-3"
                >
                    {serviceCards.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg group`}
                        >
                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                            
                            {/* Card Content */}
                            <div className="relative p-8">
                                {/* Icon Container */}
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                                        <i className={`fas ${service.icon} text-3xl text-orange-500`}></i>
                                    </div>
                                </div>

                                {/* Title and Description */}
                                <h3 className={`text-2xl font-bold ${textColor} mb-4 group-hover:text-orange-500 transition-colors`}>
                                    {service.title}
                                </h3>
                                <p className={`${textColor}/80 mb-8`}>
                                    {service.description}
                                </p>

                                {/* Features List */}
                                <ul className="space-y-4">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className={`flex items-center gap-3 ${textColor}/80`}>
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <span className="text-orange-500 text-sm">✓</span>
                                            </span>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 mt-16"
                >
                    <h2 className={`text-3xl font-bold ${textColor} mb-6`}>
                        {viewMode === 'talent' 
                            ? 'Ready to Start Your Journey?' 
                            : 'Ready to Transform Your Events?'
                        }
                    </h2>
                    <p className={`${textColor}/80 mb-8 text-lg`}>
                        {viewMode === 'talent'
                            ? 'Join Patterned today and take your event staffing career to the next level.'
                            : 'Join Patterned today and experience the difference premium staffing can make for your events.'
                        }
                    </p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-8 py-3 ${buttonBgColor} ${buttonTextColor} font-semibold rounded-lg shadow-lg transition-colors`}
                    >
                        Get Started Now
                    </motion.button>
                </motion.section>
            </main>
            <Footer />
        </div>
    )
}