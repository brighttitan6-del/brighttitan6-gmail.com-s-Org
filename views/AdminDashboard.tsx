
import React from 'react';
import { User } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const data = [
    { name: 'Mon', rev: 45000 },
    { name: 'Tue', rev: 52000 },
    { name: 'Wed', rev: 38000 },
    { name: 'Thu', rev: 61000 },
    { name: 'Fri', rev: 55000 },
    { name: 'Sat', rev: 89000 },
    { name: 'Sun', rev: 72000 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Console</h1>
          <p className="text-gray-500">Global platform health and analytics.</p>
        </div>
        <div className="flex space-x-2">
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition">Download Report</button>
          <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-bold shadow-lg hover:bg-green-800 transition">System Logs</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '4.2M MWK', icon: 'fa-sack-dollar', color: 'text-green-600' },
          { label: 'Total Students', value: '14,205', icon: 'fa-user-graduate', color: 'text-blue-600' },
          { label: 'Teachers', value: '158', icon: 'fa-chalkboard-user', color: 'text-orange-600' },
          { label: 'Uptime', value: '99.9%', icon: 'fa-server', color: 'text-purple-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm">
            <div className={`w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <h3 className="font-bold text-lg mb-6">Weekly Revenue Growth</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="rev" radius={[6, 6, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#006D44' : '#E5E7EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b">
            <h3 className="font-bold text-lg">Teacher Approval Queue</h3>
          </div>
          <div className="flex-1 overflow-auto divide-y max-h-64">
            {[
              { name: 'Dr. Chibambo', subject: 'Biology', date: '2h ago' },
              { name: 'Prof. Mbeki', subject: 'History', date: '5h ago' },
              { name: 'Mrs. Nkhoma', subject: 'Mathematics', date: 'Yesterday' }
            ].map((t, i) => (
              <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">{t.name[0]}</div>
                   <div>
                     <p className="text-sm font-bold text-gray-800">{t.name}</p>
                     <p className="text-xs text-gray-400">{t.subject} • {t.date}</p>
                   </div>
                </div>
                <div className="flex space-x-2">
                   <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><i className="fas fa-times"></i></button>
                   <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg"><i className="fas fa-check"></i></button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50 text-center border-t">
            <button className="text-sm font-bold text-green-700 hover:underline">Manage All Teachers</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
