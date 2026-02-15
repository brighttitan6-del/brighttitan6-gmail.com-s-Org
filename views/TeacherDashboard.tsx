
import React from 'react';
import { User } from '../types';

interface TeacherDashboardProps {
  user: User;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teacher Portal</h1>
          <p className="text-gray-500">Welcome back, {user.name}.</p>
        </div>
        <button className="bg-green-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-green-800 transition flex items-center">
          <i className="fas fa-plus mr-2"></i> Create Live Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Students</p>
          <p className="text-4xl font-black text-gray-900 mt-2">1,248</p>
          <div className="mt-4 text-xs text-green-600 font-bold bg-green-50 w-fit px-2 py-1 rounded">+12% this month</div>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Earnings (MWK)</p>
          <p className="text-4xl font-black text-gray-900 mt-2">124,500</p>
          <button className="mt-4 text-xs text-blue-600 font-bold hover:underline">Withdraw Funds</button>
        </div>
        <div className="bg-white p-6 rounded-2xl border shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Classes</p>
          <p className="text-4xl font-black text-gray-900 mt-2">8</p>
          <div className="mt-4 text-xs text-orange-600 font-bold bg-orange-50 w-fit px-2 py-1 rounded">2 scheduled</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-bold text-xl">Upcoming Sessions</h2>
          <button className="text-sm text-green-600 font-bold hover:underline">View All</button>
        </div>
        <div className="divide-y">
          {[1, 2].map(i => (
            <div key={i} className="p-6 flex items-center justify-between group hover:bg-gray-50 transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-xl">
                  <i className="fas fa-calendar-day"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Mathematics: Advanced Calculus Part {i}</h3>
                  <p className="text-xs text-gray-500">Scheduled for Tomorrow at 14:00 CAT</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-bold hover:bg-green-600 hover:text-white transition">Manage</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
