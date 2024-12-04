'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from './components/Header'
import Footer from './components/Footer'

export default function Home() {
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
    <div className="flex flex-col min-h-screen bg-neutral-cream">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section 
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="relative bg-gradient-to-br from-primary/90 to-primary py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="absolute inset-0 bg-[url('/pattern-bg.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto relative">
            <motion.div 
              variants={fadeIn}
              className="text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Premium Event Staffing
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                Connect with top-tier event professionals and elevate your events to new heights
              </p>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link 
                href="/auth/login"
                className="px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-lg hover:bg-neutral-cream transition-colors"
              >
                Go to Dashboard
              </Link>
              <Link 
                href="/services"
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Explore Services
              </Link>
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
              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-primary">
                <div className="text-primary text-3xl mb-4">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <h3 className="text-xl font-semibold text-neutral-stone mb-3">
                  Upcoming Events
                </h3>
                <p className="text-neutral-stone/80">
                  View and manage your scheduled events. Stay organized and prepared.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-secondary">
                <div className="text-secondary text-3xl mb-4">
                  <i className="fas fa-user-friends"></i>
                </div>
                <h3 className="text-xl font-semibold text-neutral-stone mb-3">
                  Staff Directory
                </h3>
                <p className="text-neutral-stone/80">
                  Browse our curated list of professional event staff and talent.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-accent">
                <div className="text-accent text-3xl mb-4">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="text-xl font-semibold text-neutral-stone mb-3">
                  Analytics
                </h3>
                <p className="text-neutral-stone/80">
                  Track your event performance and staff metrics in real-time.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className="bg-neutral-sand py-16 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-primary mb-6">
              Ready to Transform Your Events?
            </h2>
            <p className="text-neutral-stone/80 text-lg mb-8 max-w-2xl mx-auto">
              Join the community of event organizers and professionals who are 
              revolutionizing the industry with Patterned.
            </p>
            <Link 
              href="/contact"
              className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
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

