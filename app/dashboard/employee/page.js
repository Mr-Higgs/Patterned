'use client'
import { motion } from 'framer-motion'
import DashboardLayout from '../../components/DashboardLayout'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import ActiveShifts from '../components/ActiveShifts'
import BulletinMessages from '../components/BulletinMessages'
import FavoriteEmployers from '../components/FavoriteEmployers'
import UserMetrics from '../components/UserMetrics'

export default function EmployeeDashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClientComponentClient()
    const router = useRouter()

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            
            if (!session) {
                router.push('/auth/login')
                return
            }

            const userType = session.user?.user_metadata?.user_type || session.user?.user_metadata?.role
            if (userType !== 'employee') {
                router.push('/dashboard/employer')
                return
            }

            setIsLoading(false)
        }

        checkSession()
    }, [router, supabase])

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    }

    return (
        <DashboardLayout>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6"
            >
               <div className="space-y-6 p-6">
                <h1 className="text-3xl font-bold text-gray-900">Employee!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ActiveShifts />
                  <BulletinMessages />
                </div>
                <UserMetrics />
                <FavoriteEmployers />
              </div>
                {/* Add your employee dashboard content here */}
            </motion.div>
        </DashboardLayout>
    )
}

