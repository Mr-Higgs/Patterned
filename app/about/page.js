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
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-primary hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-primary mb-3">For Event Organizers</h3>
                            <ul className="text-neutral-stone/80 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span> Access to verified event professionals
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span> Streamlined hiring process
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span> Quality-assured staff
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-primary">•</span> Real-time availability
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div 
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-secondary hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-secondary mb-3">For Event Staff</h3>
                            <ul className="text-neutral-stone/80 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-secondary">•</span> Premium event opportunities
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-secondary">•</span> Flexible scheduling
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-secondary">•</span> Industry networking
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-secondary">•</span> Professional growth
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div 
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-accent hover:shadow-xl transition-shadow"
                        >
                            <h3 className="text-xl font-semibold text-accent mb-3">Our Values</h3>
                            <ul className="text-neutral-stone/80 space-y-2">
                                <li className="flex items-center gap-2">
                                    <span className="text-accent">•</span> Excellence in Service
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-accent">•</span> Community Building
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-accent">•</span> Industry Innovation
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="text-accent">•</span> Reliability & Trust
                                </li>
                            </ul>
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