'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchMessages = async (conversationId) => {
  if (!conversationId) return [];
  const res = await fetch(`${backendUrl}/api/conversations/${conversationId}/messages`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
};

const postMessage = async ({ conversationId, body }) => {
  const res = await fetch(`${backendUrl}/api/conversations/${conversationId}/messages`, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body: JSON.stringify({ body }) 
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};

export default function MessageArea({ conversation }) {
  const { data: session } = useSession();
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: messages = [], isLoading } = useQuery({ 
    queryKey: ['messages', conversation.id], 
    queryFn: () => fetchMessages(conversation.id), 
    enabled: !!conversation.id 
  });

  const sendMessageMutation = useMutation({ 
    mutationFn: postMessage, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversation.id] });
      queryClient.invalidateQueries({ queryKey: ['conversations'] }); // To update last message
      setNewMessage('');
    }
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessageMutation.mutate({ conversationId: conversation.id, body: newMessage });
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-grow overflow-y-auto mb-4 pr-2">
        {isLoading ? <p>Loading messages...</p> : messages.map(msg => (
          <div key={msg.id} className={`mb-2 flex ${msg.senderId === session?.user?.id ? 'justify-end' : 'justify-start'}`}>
            <span className={`p-2 rounded-lg inline-block ${msg.senderId === session?.user?.id ? 'bg-accent-violet text-white' : 'bg-slate-700'}`}>
              {msg.body}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex">
        <input 
          type="text" 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..." 
          className="w-full p-2 bg-slate-900/80 rounded-l-lg focus:outline-none text-white"
          disabled={sendMessageMutation.isPending}
        />
        <button type="submit" className="bg-accent-violet text-white p-2 rounded-r-lg font-semibold" disabled={sendMessageMutation.isPending}>
          Send
        </button>
      </form>
    </div>
  );
}
