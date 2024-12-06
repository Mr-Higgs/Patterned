'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'

export default function Home() {
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

  return (
    <div className={`flex flex-col min-h-screen ${bgColor} ${textColor} transition-colors duration-300`}>
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className={`relative ${viewMode === 'talent' ? 'bg-black' : 'bg-white'} py-20 px-4 sm:px-6 lg:px-8`}
        >
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto relative">
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

            <motion.div variants={fadeIn} className="text-center">
              <h1 className={`text-5xl md:text-6xl font-bold ${textColor} mb-6`}>
                Premium Event Staffing
              </h1>
              <p className={`text-xl ${textColor}/90 max-w-2xl mx-auto mb-8`}>
                {viewMode === 'talent' 
                  ? 'Find exciting opportunities and grow your career in the event industry'
                  : 'Connect with top-tier event professionals and elevate your events to new heights'
                }
              </p>
              <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href={viewMode === 'talent' ? "/auth/signup?type=talent" : "/auth/signup?type=business"}
                  className={`px-8 py-3 ${buttonBgColor} ${buttonTextColor} font-semibold rounded-lg shadow-lg transition-colors`}
                >
                  {viewMode === 'talent' ? 'Join as Talent' : 'Start Hiring'}
                </Link>
                <Link 
                  href="/services"
                  className={`px-8 py-3 bg-transparent border-2 border-orange-500 ${textColor} font-semibold rounded-lg hover:bg-orange-500/10 transition-colors`}
                >
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {viewMode === 'talent' ? (
                <>
                  {/* Flexible Schedule Card */}
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                          <i className="fas fa-calendar-check text-3xl text-orange-500"></i>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${textColor} mb-4 group-hover:text-orange-500 transition-colors`}>
                        Flexible Schedule
                      </h3>
                      <p className={`${textColor}/80 mb-8`}>
                        Choose when and where you want to work. Take control of your career.
                      </p>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Competitive Pay Card */}
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                          <i className="fas fa-dollar-sign text-3xl text-orange-500"></i>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${textColor} mb-4 group-hover:text-orange-500 transition-colors`}>
                        Competitive Pay
                      </h3>
                      <p className={`${textColor}/80 mb-8`}>
                        Set your own rates and get paid quickly for your expertise.
                      </p>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Profile Building Card */}
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                          <i className="fas fa-user-circle text-3xl text-orange-500"></i>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${textColor} mb-4 group-hover:text-orange-500 transition-colors`}>
                        Build Your Profile
                      </h3>
                      <p className={`${textColor}/80 mb-8`}>
                        Showcase your experience and get noticed by top employers.
                      </p>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Verified Talent Card */}
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                          <i className="fas fa-user-check text-3xl text-orange-500"></i>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${textColor} mb-4 group-hover:text-orange-500 transition-colors`}>
                        Verified Talent
                      </h3>
                      <p className={`${textColor}/80 mb-8`}>
                        Access our pre-vetted pool of experienced event professionals.
                      </p>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Quick Booking Card */}
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                          <i className="fas fa-bolt text-3xl text-orange-500"></i>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${textColor} mb-4 group-hover:text-orange-500 transition-colors`}>
                        Quick Booking
                      </h3>
                      <p className={`${textColor}/80 mb-8`}>
                        Find and book the right staff for your events in minutes.
                      </p>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </motion.div>

                  {/* Analytics Card */}
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative overflow-hidden ${bgColor} rounded-2xl shadow-lg group`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-8">
                      <div className="mb-6 relative">
                        <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                          <i className="fas fa-chart-line text-3xl text-orange-500"></i>
                        </div>
                      </div>
                      <h3 className={`text-2xl font-bold ${textColor} mb-4 group-hover:text-orange-500 transition-colors`}>
                        Analytics
                      </h3>
                      <p className={`${textColor}/80 mb-8`}>
                        Track performance and manage your event staff efficiently.
                      </p>
                      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className={`${bgColor} py-16 px-4 sm:px-6 lg:px-8`}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className={`text-3xl font-bold ${textColor} mb-6`}>
              {viewMode === 'talent' 
                ? 'Ready to Start Your Journey?' 
                : 'Ready to Transform Your Events?'
              }
            </h2>
            <p className={`${textColor}/80 text-lg mb-8 max-w-2xl mx-auto`}>
              {viewMode === 'talent'
                ? 'Join the community of event professionals and start finding exciting opportunities today.'
                : 'Join the community of event organizers who are revolutionizing the industry with Patterned.'
              }
            </p>
            <Link 
              href={viewMode === 'talent' ? "/auth/signup?type=talent" : "/auth/signup?type=business"}
              className={`inline-block px-8 py-3 ${buttonBgColor} ${buttonTextColor} font-semibold rounded-lg shadow-lg transition-colors`}
            >
              Get Started Today
            </Link>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

