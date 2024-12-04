'use client'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'

export default function EmployerDashboard() {
    return (
        <DashboardLayout>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
            >
                <h1 className="text-3xl font-bold text-neutral-stone mb-6">
                    Employer Dashboard
                </h1>
                {/* Add your employer dashboard content here */}
            </motion.div>
        </DashboardLayout>
    )
}
