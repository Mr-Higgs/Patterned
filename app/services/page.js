'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function OurServicesPage() {
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
            ]
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
            ]
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
            ]
        }
    ]

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
                            Our Services
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/90 max-w-2xl mx-auto"
                        >
                            Elevate your events with our premium staffing solutions tailored to your specific needs
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
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-neutral-100">
                                <i className={`fas ${service.icon} text-4xl text-primary mb-4`}></i>
                                <h3 className="text-2xl font-semibold text-neutral-stone mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-neutral-stone/70">
                                    {service.description}
                                </p>
                            </div>
                            <div className="p-6 bg-neutral-50">
                                <ul className="space-y-3">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-neutral-stone/80">
                                            <i className="fas fa-check text-primary text-sm"></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Additional Services */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto px-4"
                >
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-semibold text-neutral-stone mb-6">
                            Additional Support Services
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-primary">
                                    For Event Organizers
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check-circle text-primary"></i>
                                        <span className="text-neutral-stone/80">Staff performance analytics</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check-circle text-primary"></i>
                                        <span className="text-neutral-stone/80">Custom staffing plans</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check-circle text-primary"></i>
                                        <span className="text-neutral-stone/80">Event planning consultation</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold text-secondary">
                                    For Event Staff
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check-circle text-secondary"></i>
                                        <span className="text-neutral-stone/80">Professional development</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check-circle text-secondary"></i>
                                        <span className="text-neutral-stone/80">Certification programs</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <i className="fas fa-check-circle text-secondary"></i>
                                        <span className="text-neutral-stone/80">Career advancement support</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* CTA Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center px-4 mt-16"
                >
                    <h2 className="text-3xl font-semibold text-primary mb-6">
                        Ready to Elevate Your Events?
                    </h2>
                    <p className="text-neutral-stone/80 mb-8 text-lg">
                        Join Patterned today and experience the difference premium staffing can make for your events.
                    </p>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
                    >
                        Get Started Now
                    </motion.button>
                </motion.section>
            </main>
            <Footer />
        </div>
    )
}