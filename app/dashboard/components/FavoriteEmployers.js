'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { Star } from 'lucide-react'

export default function FavoriteEmployers() {
  const [employers, setEmployers] = useState([])

  useEffect(() => {
    fetchFavoriteEmployers()
  }, [])

  const fetchFavoriteEmployers = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('favorite_employers')
      .select('*, employers(*)')
      .eq('employee_id', user.id)
      .order('last_worked_date', { ascending: false })
      .limit(5)

    if (error) console.error('Error fetching favorite employers:', error)
    else setEmployers(data)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Favorite Employers</h2>
      {employers.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employers.map((favorite) => (
            <li key={favorite.id} className="border rounded-lg p-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-2" />
                <h3 className="font-medium">{favorite.employers.name}</h3>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Last worked: {new Date(favorite.last_worked_date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No favorite employers yet.</p>
      )}
    </div>
  )
}

