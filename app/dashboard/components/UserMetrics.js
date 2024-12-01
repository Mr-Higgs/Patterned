'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { Briefcase, Clock, DollarSign } from 'lucide-react'

export default function UserMetrics() {
  const [metrics, setMetrics] = useState({
    totalShifts: 0,
    totalHours: 0,
    totalEarnings: 0,
  })

  useEffect(() => {
    fetchUserMetrics()
  }, [])

  const fetchUserMetrics = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('shifts')
      .select('start_time, end_time, pay_rate')
      .eq('user_id', user.id)
      .lt('end_time', new Date().toISOString())

    if (error) {
      console.error('Error fetching user metrics:', error)
    } else {
      const totalShifts = data.length
      const totalHours = data.reduce((acc, shift) => {
        const duration = new Date(shift.end_time) - new Date(shift.start_time)
        return acc + (duration / (1000 * 60 * 60))
      }, 0)
      const totalEarnings = data.reduce((acc, shift) => {
        const duration = new Date(shift.end_time) - new Date(shift.start_time)
        const hours = duration / (1000 * 60 * 60)
        return acc + (hours * shift.pay_rate)
      }, 0)

      setMetrics({
        totalShifts,
        totalHours: totalHours.toFixed(2),
        totalEarnings: totalEarnings.toFixed(2),
      })
    }
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Your Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Briefcase className="w-8 h-8 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Shifts</p>
            <p className="text-2xl font-semibold">{metrics.totalShifts}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <Clock className="w-8 h-8 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Hours</p>
            <p className="text-2xl font-semibold">{metrics.totalHours}</p>
          </div>
        </div>
        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
          <DollarSign className="w-8 h-8 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-2xl font-semibold">${metrics.totalEarnings}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

