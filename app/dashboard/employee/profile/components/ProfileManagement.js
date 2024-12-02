'use client'

import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../../../../../lib/supabase'

export default function ProfileManagement() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formFields, setFormFields] = useState([])
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error('No user found')
        setUser(user)

        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) throw error
        setProfile(data)
        setFormFields([
          { id: 'first_name', label: 'First Name', type: 'text', isArray: false },
          { id: 'last_name', label: 'Last Name', type: 'text', isArray: false },
          { id: 'email', label: 'Email', type: 'email', isArray: false },
          { id: 'bio', label: 'Bio', type: 'textarea', isArray: false },
          { id: 'interests', label: 'Interests', type: 'text', isArray: true },
          { id: 'resume', label: 'Resume', type: 'file', isArray: false },
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
        .eq('id', user.id)

      if (error) throw error
      alert('Profile updated successfully!')
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    try {
      setUploading(true)
      
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select a file to upload.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-resume.${fileExt}`
      const filePath = `resumes/${fileName}`

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath)

      // Update profile with resume URL
      setProfile({ ...profile, resume_url: publicUrl })
      
    } catch (error) {
      setError(error)
    } finally {
      setUploading(false)
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
            {field.type === 'file' ? (
              <div>
                <input
                  type="file"
                  id={field.id}
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
                {profile?.resume_url && (
                  <div className="mt-2">
                    <a 
                      href={profile.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary-dark"
                    >
                      View Current Resume
                    </a>
                  </div>
                )}
              </div>
            ) : field.type === 'textarea' ? (
              <textarea
                id={field.id}
                name={field.id}
                value={field.isArray ? (profile[field.id] || []).join(', ') : profile[field.id] || ''}
                onChange={field.isArray ? (e) => handleArrayInputChange(e, field.id) : handleInputChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
              />
            ) : (
              <input
                type={field.type}
                id={field.id}
                name={field.id}
                value={field.isArray ? (profile[field.id] || []).join(', ') : profile[field.id] || ''}
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

