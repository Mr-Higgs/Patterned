'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../lib/supabase'

export default function ProfileManagement() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    skills: [],
    certifications: [],
    workHistory: [],
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
    } else {
      setProfile({
        ...data,
        skills: data.skills || [],
        certifications: data.certifications || [],
        workHistory: data.workHistory || [],
      })
    }
  }

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleArrayInputChange = (e, field) => {
    const values = e.target.value.split(',').map(item => item.trim()).filter(Boolean)
    setProfile(prev => ({ ...prev, [field]: values }))
  }

  const formFields = useMemo(() => [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'skills', label: 'Skills (comma-separated)', type: 'text', isArray: true },
    { id: 'certifications', label: 'Certifications (comma-separated)', type: 'text', isArray: true },
    { id: 'workHistory', label: 'Work History (comma-separated)', type: 'textarea', isArray: true },
  ], [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', profile.id)

    if (error) console.error('Error updating profile:', error)
    else console.log('Profile updated successfully')
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Profile Management</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {formFields.map(field => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={field.isArray ? profile[field.id].join(', ') : profile[field.id]}
                onChange={field.isArray ? (e) => handleArrayInputChange(e, field.id) : handleInputChange}
                className="w-full border rounded p-2"
                rows="4"
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={field.isArray ? profile[field.id].join(', ') : profile[field.id]}
                onChange={field.isArray ? (e) => handleArrayInputChange(e, field.id) : handleInputChange}
                className="w-full border rounded p-2"
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-primary text-background px-4 py-2 rounded hover:bg-primary-dark">
          Update Profile
        </button>
      </form>
    </div>
  )
}

