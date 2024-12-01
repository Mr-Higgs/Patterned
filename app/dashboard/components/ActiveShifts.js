'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { Calendar, Clock } from 'lucide-react'

export default function ActiveShifts() {
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    fetchActiveShifts()
  }, [])

  const fetchActiveShifts = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('shifts')
      .select('*, jobs(*)')
      .eq('user_id', user.id)
      .gte('end_time', new Date().toISOString())
      .order('start_time', { ascending: true })
      .limit(5)

    if (error) console.error('Error fetching active shifts:', error)
    else setShifts(data)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Active Shifts</h2>
      {shifts.length > 0 ? (
        <ul className="space-y-4">
          {shifts.map((shift) => (
            <li key={shift.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <h3 className="font-medium text-lg">{shift.jobs.title}</h3>
              <div className="flex items-center text-gray-600 mt-1">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(shift.start_time).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600 mt-1">
                <Clock className="w-4 h-4 mr-2" />
                <span>
                  {new Date(shift.start_time).toLocaleTimeString()} - {new Date(shift.end_time).toLocaleTimeString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No active shifts at the moment.</p>
      )}
    </div>
  )
}

