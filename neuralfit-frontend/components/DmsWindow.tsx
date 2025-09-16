'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import ConversationList from './windows/dm/ConversationList';
import MessageArea from './windows/dm/MessageArea';

// API fetching function
const fetchConversations = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error('Backend URL is not configured');
  }
  const res = await fetch(`${backendUrl}/api/conversations`);
  if (!res.ok) {
    throw new Error('Failed to fetch conversations');
  }
  return res.json();
};

export default function DmsWindow() {
  const { data: session } = useSession();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const { data: conversations = [], isLoading, error } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    enabled: !!session,
  });

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);

  return (
    <div className="h-full flex bg-slate-800/80">
      <div className="w-1/3 border-r border-slate-700 overflow-y-auto">
        <ConversationList 
          conversations={conversations} 
          selectedConversationId={selectedConversationId} 
          onSelectConversation={setSelectedConversationId} 
          isLoading={isLoading}
          error={error}
        />
      </div>
      <div className="w-2/3 flex flex-col">
        {selectedConversation ? (
          <MessageArea conversation={selectedConversation} />
        ) : (
          <div className="flex-grow flex items-center justify-center text-slate-400">
            <p>Select a conversation to start chatting.</p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-2 border-t border-slate-700">
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full p-2 bg-background-dark/50 rounded-card border border-white/10 focus:outline-none focus:ring-2 focus:ring-accent-primary" 
            disabled={!session}
          />
        </form>
      </div>
    </div>
  );
}
