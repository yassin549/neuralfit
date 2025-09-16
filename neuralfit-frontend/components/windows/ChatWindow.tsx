'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

// API fetching functions
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const fetchSessions = async () => {
  const res = await fetch(`${backendUrl}/api/sessions`);
  if (!res.ok) throw new Error('Failed to fetch sessions');
  return res.json();
};

const createSession = async () => {
  const res = await fetch(`${backendUrl}/api/sessions`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ therapistType: 'AI' }) });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
};

const fetchMessages = async (sessionId) => {
  if (!sessionId) return [];
  const res = await fetch(`${backendUrl}/api/sessions/${sessionId}/messages`);
  if (!res.ok) throw new Error('Failed to fetch messages');
  return res.json();
};

const postMessage = async ({ sessionId, body }) => {
  const res = await fetch(`${backendUrl}/api/sessions/${sessionId}/messages`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ body }) });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
};

export default function ChatWindow() {
  const { data: session } = useSession();
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const queryClient = useQueryClient();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch or create a session
  const { data: sessions = [] } = useQuery({ queryKey: ['sessions'], queryFn: fetchSessions, enabled: !!session });
  const createSessionMutation = useMutation({ mutationFn: createSession, onSuccess: (newSession) => setActiveSessionId(newSession.id) });

  useEffect(() => {
    if (sessions.length > 0) {
      setActiveSessionId(sessions[0].id);
    } else if (session) {
      createSessionMutation.mutate();
    }
  }, [sessions, session]);

  // Fetch messages for the active session
  const { data: messages = [], isLoading } = useQuery({ 
    queryKey: ['messages', activeSessionId], 
    queryFn: () => fetchMessages(activeSessionId), 
    enabled: !!activeSessionId 
  });

  // Mutation for sending a new message
  const sendMessageMutation = useMutation({ 
    mutationFn: postMessage, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', activeSessionId] });
      setNewMessage('');
    }
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() && activeSessionId) {
      sendMessageMutation.mutate({ sessionId: activeSessionId, body: newMessage });
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex-grow overflow-y-auto mb-4 pr-2">
        {isLoading ? <p>Loading chat...</p> : messages.map(msg => (
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
          placeholder="Type your message..." 
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

