'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../../../lib/supabase'

export default function ProfileManagement() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formFields, setFormFields] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id) // Replace '1' with the actual user ID
          .single()

        if (error) throw error
        setProfile(data)
        setFormFields([
          { id: 'username', label: 'Username', type: 'text', isArray: false },
          { id: 'email', label: 'Email', type: 'email', isArray: false },
          { id: 'bio', label: 'Bio', type: 'textarea', isArray: false },
          { id: 'interests', label: 'Interests', type: 'text', isArray: true },
        ])
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleArrayInputChange = (e, fieldName) => {
    const updatedInterests = e.target.value.split(',').map(item => item.trim())
    setProfile({ ...profile, [fieldName]: updatedInterests })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const updates = { ...profile }
      // Remove empty strings from array fields
      for (const field in updates) {
        if (Array.isArray(updates[field])) {
          updates[field] = updates[field].filter(item => item !== '');
        }
      }
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id) // Replace '1' with the actual user ID)

      if (error) throw error
      alert('Profile updated successfully!')
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  if (!profile) return <p>No profile found</p>


  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={field.isArray ? profile[field.id].join(', ') : profile[field.id]}
                onChange={field.isArray ? (e) => handleArrayInputChange(e, field.id) : handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={field.isArray ? profile[field.id].join(', ') : profile[field.id]}
                onChange={field.isArray ? (e) => handleArrayInputChange(e, field.id) : handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
        >
          Update Profile
        </button>
      </form>
    </div>
  )
}

