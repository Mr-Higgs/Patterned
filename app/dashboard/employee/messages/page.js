'use client'
import { useState } from 'react'
import { User } from 'lucide-react'
import ChatList from '../../../components/chat/ChatList'
import ChatMessage from '../../../components/chat/ChatMessage'
import ChatInput from '../../../components/chat/ChatInput'

// Dummy data - replace with real data from your backend
const dummyChats = [
    {
        id: 1,
        name: "Club XYZ",
        lastMessage: "Great work last night!",
        unread: 2,
        avatar: null
    },
    {
        id: 2,
        name: "Restaurant ABC",
        lastMessage: "Are you available this weekend?",
        unread: 0,
        avatar: null
    }
]

const dummyMessages = [
    {
        id: 1,
        content: "Hi, are you available for a shift this Saturday?",
        timestamp: "2024-01-20T10:00:00",
        senderId: "employer1"
    },
    {
        id: 2,
        content: "Yes, I'm available. What time is the shift?",
        timestamp: "2024-01-20T10:05:00",
        senderId: "currentUser"
    }
]

export default function MessagesPage() {
    const [activeChat, setActiveChat] = useState(null)
    const [messages, setMessages] = useState(dummyMessages)

    const handleSendMessage = (content) => {
        const newMessage = {
            id: messages.length + 1,
            content,
            timestamp: new Date().toISOString(),
            senderId: "currentUser"
        }
        setMessages([...messages, newMessage])
    }

    return (
        <div className="flex h-[calc(100vh-4rem)]">
            <ChatList 
                chats={dummyChats}
                activeChat={activeChat}
                onChatSelect={setActiveChat}
            />
            
            {activeChat ? (
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-gray-200 bg-white">
                        <div className="flex items-center gap-3">
                            <User className="h-6 w-6" />
                            <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 bg-white">
                        {messages.map((message) => (
                            <ChatMessage
                                key={message.id}
                                message={message}
                                isOwn={message.senderId === "currentUser"}
                            />
                        ))}
                    </div>

                    {/* Input */}
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center bg-white">
                    <p className="text-gray-500">Select a conversation to start messaging</p>
                </div>
            )}
        </div>
    )
} 