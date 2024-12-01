'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../../../lib/supabase'

export default function AvailabilityManagement() {
  const [calendar, setCalendar] = useState([])
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    async function fetchCalendarData() {
      const { data, error } = await supabase
        .from('calendar')
        .select('*')
        .order('date', { ascending: true })

      if (error) {
        console.error('Error fetching calendar data:', error)
      } else {
        setCalendar(data)
      }
    }

    fetchCalendarData()
  }, [])

  const handleDateClick = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {calendar.map(({ date, day, isAvailable }) => (
          <button
            key={date}
            onClick={() => handleDateClick(date)}
            className={`p-2 rounded-md transition-colors duration-200 ${
              isAvailable
                ? 'bg-primary text-white hover:bg-primary-dark'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      {selectedDate && (
        <p className="text-gray-600">Selected date: {selectedDate}</p>
      )}
    </div>
  )
}

