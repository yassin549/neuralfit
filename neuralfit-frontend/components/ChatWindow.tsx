'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface Message {
  role: 'user' | 'assistant'
  text: string
}

export default function ChatWindow() {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessages: Message[] = [...messages, { role: 'user', text: input }]
    setMessages(newMessages)
    setInput('')

    // Call the backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: newMessages }),
    })

    const data = await response.json()

    if (data.assistant) {
      setMessages([...newMessages, { role: 'assistant', text: data.assistant.generated_text || 'Sorry, I could not process that.' }])
    }
  }

  if (!session) {
    return <p>Please sign in to chat.</p>
  }

  return (
    <div className="p-4 border rounded-lg max-w-2xl mx-auto">
      <div className="h-96 overflow-y-auto mb-4 p-2 bg-gray-100 rounded">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 rounded ${msg.role === 'user' ? 'bg-blue-200 text-right' : 'bg-green-200'}`}>
            <strong>{msg.role}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  )
}
