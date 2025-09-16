'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data for the activity chart
const data = [
  { name: 'Mon', minutes: 10 },
  { name: 'Tue', minutes: 25 },
  { name: 'Wed', minutes: 15 },
  { name: 'Thu', minutes: 30 },
  { name: 'Fri', minutes: 20 },
  { name: 'Sat', minutes: 45 },
  { name: 'Sun', minutes: 35 },
];

export default function ActivityChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
        <XAxis dataKey="name" stroke="rgba(255, 255, 255, 0.5)" />
        <YAxis stroke="rgba(255, 255, 255, 0.5)" />
        <Tooltip contentStyle={{ backgroundColor: '#1E293B', border: '1px solid rgba(255, 255, 255, 0.2)' }} />
        <Line type="monotone" dataKey="minutes" stroke="#6EE7B7" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
