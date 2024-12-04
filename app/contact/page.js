'use client'
import { motion } from 'framer-motion'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function ContactUsPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    }

    const contactMethods = [
        {
            icon: "fa-message",
            title: "General Inquiries",
            description: "Questions about our services or platform?",
            action: "Send a Message",
            link: "mailto:contact@patterned.com"
        },
        {
            icon: "fa-handshake",
            title: "Business Partnership",
            description: "Interested in partnering with Patterned?",
            action: "Partner With Us",
            link: "mailto:partnerships@patterned.com"
        },
        {
            icon: "fa-headset",
            title: "Support",
            description: "Need technical assistance?",
            action: "Get Help",
            link: "mailto:support@patterned.com"
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
                            Contact Us
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/90 max-w-2xl mx-auto"
                        >
                            We're here to help you succeed in the events industry
                        </motion.p>
                    </div>
                </motion.section>

                {/* Contact Methods Grid */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 * (index + 1) }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <div className="p-6 text-center">
                                    <i className={`fas ${method.icon} text-4xl text-primary mb-4`}></i>
                                    <h3 className="text-2xl font-semibold text-neutral-stone mb-3">
                                        {method.title}
                                    </h3>
                                    <p className="text-neutral-stone/70 mb-6">
                                        {method.description}
                                    </p>
                                    <a 
                                        href={method.link}
                                        className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                                    >
                                        {method.action}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Contact Form Section */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto px-4"
                >
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h2 className="text-3xl font-semibold text-neutral-stone mb-6 text-center">
                            Send Us a Message
                        </h2>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-neutral-stone/80 mb-2">First Name</label>
                                    <input 
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-neutral-stone/80 mb-2">Last Name</label>
                                    <input 
                                        type="text"
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-neutral-stone/80 mb-2">Email</label>
                                <input 
                                    type="email"
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                            </div>
                            <div>
                                <label className="block text-neutral-stone/80 mb-2">Message</label>
                                <textarea 
                                    rows="4"
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                                ></textarea>
                            </div>
                            <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full px-8 py-3 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary-dark transition-colors"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    </div>
                </motion.section>

                {/* Office Location */}
                <motion.section 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-7xl mx-auto text-center px-4 mt-16"
                >
                    <h2 className="text-3xl font-semibold text-primary mb-6">
                        Visit Our Office
                    </h2>
                    <p className="text-neutral-stone/80 mb-4 text-lg">
                        123 Event Street, Suite 100<br />
                        San Francisco, CA 94105
                    </p>
                    <p className="text-neutral-stone/80 text-lg">
                        Monday - Friday: 9:00 AM - 6:00 PM PST
                    </p>
                </motion.section>
            </main>
            <Footer />
        </div>
    )
}