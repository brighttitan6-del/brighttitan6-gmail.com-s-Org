
import React, { useState } from 'react';
import { User, LiveClass } from '../types';
import { MOCK_LIVE_CLASSES, COLORS } from '../constants';

interface TeacherDashboardProps {
  user: User;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  const [sessions, setSessions] = useState<LiveClass[]>(MOCK_LIVE_CLASSES.filter(s => s.teacherId === 't1' || s.teacherId === user.id));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    price: 500
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const mockSession: LiveClass = {
      id: Math.random().toString(36).substr(2, 9),
      teacherId: user.id,
      teacherName: user.name,
      title: newSession.title,
      description: newSession.description,
      scheduledAt: new Date(`${newSession.date}T${newSession.time}`).toISOString(),
      duration: 60,
      price: newSession.price,
      status: 'scheduled'
    };
    
    setSessions(prev => [mockSession, ...prev]);
    setIsModalOpen(false);
    setNewSession({ title: '', description: '', date: '', time: '', price: 500 });
    alert("Live class scheduled successfully!");
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Teacher Portal</h1>
          <p className="text-gray-500">Welcome back, {user.name}.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-700 text-white px-6 py-2 rounded-xl font-bold shadow-lg hover:bg-green-800 transition flex items-center"
        >
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
          <p className="text-4xl font-black text-gray-900 mt-2">{sessions.length}</p>
          <div className="mt-4 text-xs text-orange-600 font-bold bg-orange-50 w-fit px-2 py-1 rounded">
            {sessions.filter(s => s.status === 'scheduled').length} scheduled
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="font-bold text-xl">My Sessions</h2>
          <button className="text-sm text-green-600 font-bold hover:underline">View All</button>
        </div>
        <div className="divide-y">
          {sessions.length > 0 ? sessions.map(session => (
            <div key={session.id} className="p-6 flex items-center justify-between group hover:bg-gray-50 transition">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center text-xl">
                  <i className="fas fa-calendar-day"></i>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{session.title}</h3>
                  <p className="text-xs text-gray-500">
                    Scheduled for {new Date(session.scheduledAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg text-sm font-bold hover:bg-green-600 hover:text-white transition">Manage</button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition">Start Class</button>
              </div>
            </div>
          )) : (
            <div className="p-12 text-center text-gray-400">You haven't scheduled any classes yet.</div>
          )}
        </div>
      </div>

      {/* Create Session Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-scale-up">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Schedule Live Class</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Class Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                  placeholder="e.g. Advanced Chemistry: Organic Compounds"
                  value={newSession.title}
                  onChange={e => setNewSession({...newSession, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Description</label>
                <textarea 
                  required
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none h-24"
                  placeholder="What will students learn?"
                  value={newSession.description}
                  onChange={e => setNewSession({...newSession, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Date</label>
                  <input 
                    type="date" 
                    required
                    className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                    value={newSession.date}
                    onChange={e => setNewSession({...newSession, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Time</label>
                  <input 
                    type="time" 
                    required
                    className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                    value={newSession.time}
                    onChange={e => setNewSession({...newSession, time: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Join Price (MWK)</label>
                <input 
                  type="number" 
                  required
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                  value={newSession.price}
                  onChange={e => setNewSession({...newSession, price: parseInt(e.target.value)})}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 border rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition shadow-lg">Schedule Now</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
