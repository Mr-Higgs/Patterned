'use client'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import ActiveShifts from '../components/ActiveShifts'
import BulletinMessages from '../components/BulletinMessages'
import FavoriteEmployers from '../components/FavoriteEmployers'
import UserMetrics from '../components/UserMetrics'

export default function EmployeeDashboard() {
    return (
        <DashboardLayout>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
            >
               <div className="space-y-6 p-6">
                <h1 className="text-3xl font-bold text-gray-900">Employee Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ActiveShifts />
                  <BulletinMessages />
                </div>
                <UserMetrics />
                <FavoriteEmployers />
              </div>
            </motion.div>
        </DashboardLayout>
    )
}

