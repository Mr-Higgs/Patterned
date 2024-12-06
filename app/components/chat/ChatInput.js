import { useState } from 'react'
import { Send } from 'lucide-react'

export default function ChatInput({ onSendMessage }) {
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim()) {
            onSendMessage(message)
            setMessage('')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white">
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                    type="submit"
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>
        </form>
    )
} 