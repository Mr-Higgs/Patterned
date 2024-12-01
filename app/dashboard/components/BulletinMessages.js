'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { MessageSquare } from 'lucide-react'

export default function BulletinMessages() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchBulletinMessages()
  }, [])

  const fetchBulletinMessages = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const { data, error } = await supabase
      .from('bulletin_messages')
      .select('*, employers(*)')
      .eq('employee_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (error) console.error('Error fetching bulletin messages:', error)
    else setMessages(data)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Bulletin Messages</h2>
      {messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((message) => (
            <li key={message.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start">
                <MessageSquare className="w-5 h-5 mr-2 mt-1 text-primary" />
                <div>
                  <p className="font-medium">{message.employers.name}</p>
                  <p className="text-gray-600">{message.content}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(message.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No new messages.</p>
      )}
    </div>
  )
}

