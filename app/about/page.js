'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function AboutUsPage() {
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

    const cardVariants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.5 }
    }

    return (
        <>
            <Header />
            <div className="bg-neutral-cream min-h-screen">
                <motion.div 
                    initial="initial"
                    animate="animate"
                    variants={staggerContainer}
                    className="max-w-4xl mx-auto space-y-8 p-6"
                >
                    <motion.h1 
                        variants={fadeIn}
                        className="text-5xl font-bold text-primary"
                    >
                        About Patterned
                    </motion.h1>
                    
                    <motion.section 
                        variants={fadeIn}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl font-semibold text-neutral-stone">Elevating Events Through Expert Staffing</h2>
                        <p className="text-neutral-stone/80 leading-relaxed text-lg">
                            Patterned is revolutionizing the events and nightlife industry by connecting venues 
                            and event organizers with exceptional talent. Our platform makes it effortless to 
                            find and hire top-tier professionals who can transform any event into an unforgettable experience.
                        </p>
                    </motion.section>

                    <motion.section 
                        variants={fadeIn}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl font-semibold text-neutral-stone">Our Mission</h2>
                        <p className="text-neutral-stone/80 leading-relaxed text-lg">
                            We're dedicated to empowering the events and nightlife industry through innovative 
                            staffing solutions. By creating a dynamic platform that connects businesses with 
                            skilled professionals, we're building a community that elevates the standard of 
                            event experiences across the industry.
                        </p>
                    </motion.section>

                    <motion.section 
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="grid md:grid-cols-3 gap-6 py-8"
                    >
                        <motion.div 
                            variants={cardVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`relative overflow-hidden bg-white rounded-2xl shadow-lg group`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative p-8">
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                                        <i className="fas fa-building-user text-3xl text-orange-500"></i>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                                    For Event Organizers
                                </h3>
                                <ul className="space-y-4">
                                    {['Access to verified event professionals', 'Streamlined hiring process', 'Quality-assured staff', 'Real-time availability'].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <span className="text-orange-500 text-sm">✓</span>
                                            </span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={cardVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`relative overflow-hidden bg-white rounded-2xl shadow-lg group`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative p-8">
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                                        <i className="fas fa-user-tie text-3xl text-orange-500"></i>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                                    For Event Staff
                                </h3>
                                <ul className="space-y-4">
                                    {['Premium event opportunities', 'Flexible scheduling', 'Industry networking', 'Professional growth'].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <span className="text-orange-500 text-sm">✓</span>
                                            </span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        </motion.div>

                        <motion.div 
                            variants={cardVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className={`relative overflow-hidden bg-white rounded-2xl shadow-lg group`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative p-8">
                                <div className="mb-6 relative">
                                    <div className="absolute inset-0 bg-orange-500/10 rounded-full w-16 h-16 animate-pulse" />
                                    <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20">
                                        <i className="fas fa-star text-3xl text-orange-500"></i>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                                    Our Values
                                </h3>
                                <ul className="space-y-4">
                                    {['Excellence in Service', 'Community Building', 'Industry Innovation', 'Reliability & Trust'].map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-600">
                                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                                                <span className="text-orange-500 text-sm">✓</span>
                                            </span>
                                            <span className="text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        </motion.div>
                    </motion.section>

                    <motion.section 
                        variants={fadeIn}
                        className="space-y-4"
                    >
                        <h2 className="text-3xl font-semibold text-neutral-stone">The Patterned Difference</h2>
                        <p className="text-neutral-stone/80 leading-relaxed text-lg">
                            Our platform goes beyond simple staffing solutions. We create meaningful connections 
                            between venues and professionals, foster a vibrant community of industry experts, 
                            and provide valuable resources to help your events succeed. With our intuitive 
                            platform, finding the perfect staff for your event has never been easier.
                        </p>
                    </motion.section>

                    <motion.section 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-primary/5 p-8 rounded-xl mt-8 border border-primary/10"
                    >
                        <h2 className="text-3xl font-semibold text-primary mb-4">Join Our Community</h2>
                        <p className="text-neutral-stone/80 leading-relaxed text-lg">
                            Whether you're an event organizer looking for exceptional staff or a skilled 
                            professional seeking exciting opportunities in the events industry, Patterned 
                            is your gateway to success. Join our thriving community and be part of the 
                            future of event staffing.
                        </p>
                    </motion.section>
                </motion.div>
            </div>
            <Footer />
        </>
    )
}