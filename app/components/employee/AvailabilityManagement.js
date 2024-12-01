'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../lib/supabase'

export default function AvailabilityManagement() {
  const [availability, setAvailability] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    fetchAvailability()
  }, [])

  const fetchAvailability = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('availability')
      .select('*')
      .eq('user_id', user.id)

    if (error) console.error('Error fetching availability:', error)
    else setAvailability(data)
  }

  const handleDateClick = async (date) => {
    setSelectedDate(date)
    const { data: { user } } = await supabase.auth.getUser()
    const existingIndex = availability.findIndex(a => a.date === date)

    if (existingIndex !== -1) {
      const { error } = await supabase
        .from('availability')
        .delete()
        .eq('id', availability[existingIndex].id)

      if (error) console.error('Error removing availability:', error)
      else {
        setAvailability(availability.filter((_, index) => index !== existingIndex))
      }
    } else {
      const { data, error } = await supabase
        .from('availability')
        .insert({ user_id: user.id, date })

      if (error) console.error('Error adding availability:', error)
      else if (data) {
        setAvailability([...availability, data[0]])
      }
    }
  }

  const calendar = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      const isAvailable = availability.some(a => a.date === dateString)
      return { date: dateString, day: date.getDate(), isAvailable }
    })
  }, [availability])

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Availability Management</h2>
      <div className="grid grid-cols-7 gap-1">
        {calendar.map(({ date, day, isAvailable }) => (
          <button
            key={date}
            onClick={() => handleDateClick(date)}
            className={`p-2 m-1 rounded ${isAvailable ? 'bg-primary text-background' : 'bg-gray-200'}`}
          >
            {day}
          </button>
        ))}
      </div>
      {selectedDate && (
        <p>Selected date: {selectedDate}</p>
      )}
    </div>
  )
}

