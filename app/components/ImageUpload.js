'use client'

import { useState, useRef } from 'react'
import { supabase } from '../../lib/supabase'
import Image from 'next/image'

export default function ImageUpload({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadAvatar = async () => {
    try {
      setUploading(true)

      if (!fileInputRef.current.files || fileInputRef.current.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = fileInputRef.current.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      await handleAvatarUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  const handleAvatarUpload = async (filePath) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      const { error } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', user.id)

      if (error) throw error
      onUploadComplete(filePath)
    } catch (error) {
      alert('Error updating avatar!')
      console.log(error)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />
      <label htmlFor="single" className="button primary block cursor-pointer bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
        {uploading ? 'Uploading ...' : 'Select Image'}
      </label>
      {preview && (
        <div className="mt-4">
          <Image src={preview} alt="Preview" width={200} height={200} className="rounded-full" />
          <button
            onClick={uploadAvatar}
            disabled={uploading}
            className="mt-2 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </button>
        </div>
      )}
    </div>
  )
}

