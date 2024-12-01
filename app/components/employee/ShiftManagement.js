'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'

export default function ShiftManagement() {
  const [shifts, setShifts] = useState([])

  useEffect(() => {
    fetchShifts()
  }, [])

  const fetchShifts = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('shifts')
      .select('*, jobs(*)')
      .eq('user_id', user.id)
      .order('start_time', { ascending: true })

    if (error) console.error('Error fetching shifts:', error)
    else setShifts(data)
  }

  const getShiftStatus = (shift) => {
    const now = new Date()
    const startTime = new Date(shift.start_time)
    const endTime = new Date(shift.end_time)

    if (now < startTime) return 'Upcoming'
    if (now >= startTime && now <= endTime) return 'Ongoing'
    return 'Completed'
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Shift Management</h2>
      <div className="space-y-4">
        {shifts.map((shift) => (
          <div key={shift.id} className="border rounded p-4 space-y-2">
            <h3 className="text-xl font-semibold">{shift.jobs.title}</h3>
            <p>Date: {new Date(shift.start_time).toLocaleDateString()}</p>
            <p>Time: {new Date(shift.start_time).toLocaleTimeString()} - {new Date(shift.end_time).toLocaleTimeString()}</p>
            <p>Status: {getShiftStatus(shift)}</p>
            <p>Location: {shift.jobs.location}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

