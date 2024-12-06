import { useState } from 'react'
import { User, Search } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function ChatList({ chats, activeChat, onChatSelect }) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredChats = chats.filter(chat => 
        chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="w-full md:w-80 border-r border-gray-200 bg-white">
            <div className="p-4 border-b border-gray-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-10rem)]">
                {filteredChats.map((chat) => (
                    <button
                        key={chat.id}
                        onClick={() => onChatSelect(chat)}
                        className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                            activeChat?.id === chat.id ? 'bg-gray-50' : ''
                        }`}
                    >
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={chat.avatar} alt={chat.name} />
                            <AvatarFallback>
                                <User className="h-6 w-6" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 text-left">
                            <h3 className="font-semibold text-gray-900">{chat.name}</h3>
                            <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                        </div>
                        {chat.unread > 0 && (
                            <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {chat.unread}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
} 