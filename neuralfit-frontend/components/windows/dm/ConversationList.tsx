'use client';

export default function ConversationList({ conversations, selectedConversationId, onSelectConversation, isLoading, error }) {
  if (isLoading) return <p className="p-4 text-slate-400">Loading conversations...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div>
      {conversations.map(convo => (
        <div 
          key={convo.id} 
          onClick={() => onSelectConversation(convo.id)}
          className={`p-4 cursor-pointer border-b border-slate-700 hover:bg-slate-700/50 ${
            selectedConversationId === convo.id ? 'bg-slate-700' : ''
          }`}>
          <p className="font-bold text-white">{convo.name || convo.participants.map(p => p.user.name).join(', ')}</p>
          <p className="text-sm text-slate-400 truncate">{convo.messages[0]?.body || 'No messages yet'}</p>
        </div>
      ))}
    </div>
  );
}
