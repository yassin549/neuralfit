'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

// Define the types for our Space data
interface Space {
  id: string;
  title: string;
  state: 'live' | 'upcoming' | 'ended';
  host: {
    name: string;
    image: string;
  };
  // Add other fields as needed, e.g., participant count
}

// API fetching function
const fetchSpaces = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error('Backend URL is not configured');
  }
  const res = await fetch(`${backendUrl}/api/spaces`);
  if (!res.ok) {
    throw new Error('Failed to fetch spaces');
  }
  return res.json();
};

export default function SpacesWindow() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'ended'>('live');

  const { data: spaces = [], isLoading, error } = useQuery<Space[]>({ 
    queryKey: ['spaces'], 
    queryFn: fetchSpaces,
    enabled: !!session, // Only fetch if the user is logged in
  });

  const filteredSpaces = spaces.filter(space => space.state === activeTab);

  return (
    <div className="p-4">
      <div className="flex border-b border-slate-700 mb-4">
        <TabButton title="Live" isActive={activeTab === 'live'} onClick={() => setActiveTab('live')} />
        <TabButton title="Upcoming" isActive={activeTab === 'upcoming'} onClick={() => setActiveTab('upcoming')} />
        <TabButton title="Past" isActive={activeTab === 'ended'} onClick={() => setActiveTab('ended')} />
      </div>

      {isLoading && <p>Loading spaces...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {!isLoading && !error && filteredSpaces.map(space => (
          <SpaceCard key={space.id} space={space} />
        ))}
        {!isLoading && !error && filteredSpaces.length === 0 && (
          <p className="text-slate-400">No {activeTab} spaces found.</p>
        )}
      </div>
    </div>
  );
}

// TabButton Component
const TabButton = ({ title, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`py-2 px-4 font-semibold transition-colors duration-200 ${isActive ? 'border-b-2 border-accent-mint text-white' : 'text-slate-400 hover:text-white'}`}>
    {title}
  </button>
);

// SpaceCard Component
const SpaceCard = ({ space }: { space: Space }) => (
  <div className="bg-slate-800/50 p-4 rounded-lg flex items-center gap-4">
    <img src={space.host.image || '/default-avatar.png'} alt={space.host.name} className="w-10 h-10 rounded-full" />
    <div className="flex-grow">
      <h3 className="font-bold text-white">{space.title}</h3>
      <p className="text-sm text-slate-400">Hosted by {space.host.name}</p>
    </div>
    {space.state === 'live' && (
      <button className="bg-accent-mint text-slate-900 text-xs font-bold py-1 px-3 rounded-full hover:bg-opacity-80 transition-opacity">
        Join
      </button>
    )}
  </div>
);
