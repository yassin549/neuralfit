'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// API fetching function
const fetchStats = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  if (!backendUrl) {
    throw new Error('Backend URL is not configured');
  }
  const res = await fetch(`${backendUrl}/api/stats`);
  if (!res.ok) {
    throw new Error('Failed to fetch stats');
  }
  return res.json();
};

export default function StatsWindow() {
  const { data: session } = useSession();

  const { data: stats, isLoading, error } = useQuery({ 
    queryKey: ['stats'], 
    queryFn: fetchStats,
    enabled: !!session, // Only fetch if the user is logged in
  });

  if (isLoading) return <p className="p-4">Loading stats...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Progress</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard title="Day Streak" value={stats?.currentStreak ?? 0} />
        <StatCard title="Minutes Spoken" value={stats?.minutesSpoken ?? 0} />
        <StatCard title="Sessions" value={stats?.sessionsCount ?? 0} />
      </div>
      <h3 className="font-bold mb-2">Activity Graph</h3>
      <div className="bg-slate-800/50 p-4 rounded-lg h-64">
        <ActivityChart />
      </div>
    </div>
  );
}

// StatCard Component
const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-slate-800/50 p-3 rounded-lg text-center">
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400">{title}</p>
  </div>
);
