
import React, { useState, useMemo } from 'react';
import { User, LiveClass } from '../types';
import { MOCK_LIVE_CLASSES, COLORS } from '../constants';

interface TeacherDashboardProps {
  user: User;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user }) => {
  const [sessions, setSessions] = useState<LiveClass[]>(() => {
    // Filter classes or use default
    return MOCK_LIVE_CLASSES;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  
  const [newSession, setNewSession] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    price: 500
  });

  const teacherEarnings = useMemo(() => 124500, []);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSession.title || !newSession.date || !newSession.time) return;
    
    const mockSession: LiveClass = {
      id: 'L' + Math.random().toString(36).substr(2, 9).toUpperCase(),
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
    alert("Success! Your live class '" + mockSession.title + "' has been scheduled.");
  };

  const handleWithdrawFunds = () => {
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      alert("Withdrawal request for " + teacherEarnings.toLocaleString() + " MWK has been submitted to Admin.");
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Teacher Console</h1>
          <p className="text-gray-500 font-medium">Empowering students across Malawi</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-green-700 text-white px-8 py-3 rounded-2xl font-black uppercase tracking-widest shadow-xl hover:bg-green-800 transition active:scale-95 flex items-center justify-center"
        >
          <i className="fas fa-plus-circle mr-3"></i> Schedule Class
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Engaged Learners</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-gray-900">1,248</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+12%</span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Active students in last 30 days</p>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Earnings</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-gray-900">{teacherEarnings.toLocaleString()}</span>
            <span className="text-sm font-bold text-gray-400 uppercase">MWK</span>
          </div>
          <button 
            disabled={isWithdrawing}
            onClick={handleWithdrawFunds}
            className="mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
          >
            {isWithdrawing ? 'Processing...' : 'Request Payout'}
          </button>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Class Sessions</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-4xl font-black text-gray-900">{sessions.length}</span>
            <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-3 py-1 rounded-full uppercase ml-2">
              {sessions.filter(s => s.status === 'scheduled').length} UPCOMING
            </span>
          </div>
          <p className="text-xs text-gray-400 mt-2">Total live lessons created</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden animate-scale-up">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-black text-xl text-gray-900 tracking-tight uppercase">My Teaching Schedule</h2>
          <i className="fas fa-calendar-check text-gray-200 text-2xl"></i>
        </div>
        <div className="divide-y divide-gray-50">
          {sessions.length > 0 ? sessions.map(session => (
            <div key={session.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start space-x-5">
                <div className="w-14 h-14 rounded-3xl bg-green-50 text-green-700 flex items-center justify-center text-2xl shadow-sm border border-green-100 group-hover:scale-110 transition-transform">
                  <i className="fas fa-video"></i>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-800 transition-colors">{session.title}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center">
                      <i className="far fa-calendar mr-2"></i> {new Date(session.scheduledAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center">
                      <i className="far fa-clock mr-2"></i> {new Date(session.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button className="flex-1 md:flex-none px-6 py-2.5 border border-gray-200 text-gray-500 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-100 transition shadow-sm active:scale-95">Edit</button>
                <button className="flex-1 md:flex-none px-8 py-2.5 bg-green-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-800 transition shadow-lg active:scale-95">Go Live</button>
              </div>
            </div>
          )) : (
            <div className="py-24 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-ghost text-gray-200 text-3xl"></i>
              </div>
              <p className="text-gray-400 font-bold">No sessions scheduled yet</p>
              <button onClick={() => setIsModalOpen(true)} className="mt-4 text-green-700 font-black uppercase tracking-widest text-xs hover:underline">Start Teaching Today</button>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] w-full max-w-xl p-10 shadow-2xl animate-scale-up border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Schedule New Class</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Class Title</label>
                  <input 
                    type="text" 
                    required
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:outline-none transition-all font-bold shadow-inner"
                    placeholder="e.g. MSCE Physics: Electricity & Magnetism"
                    value={newSession.title}
                    onChange={e => setNewSession({...newSession, title: e.target.value})}
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Learning Outcomes</label>
                  <textarea 
                    required
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:outline-none transition-all font-medium h-28 shadow-inner"
                    placeholder="Provide a brief summary for your students..."
                    value={newSession.description}
                    onChange={e => setNewSession({...newSession, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Class Date</label>
                    <input 
                      type="date" 
                      required
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:outline-none transition-all font-bold shadow-inner"
                      value={newSession.date}
                      onChange={e => setNewSession({...newSession, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Start Time (CAT)</label>
                    <input 
                      type="time" 
                      required
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:outline-none transition-all font-bold shadow-inner"
                      value={newSession.time}
                      onChange={e => setNewSession({...newSession, time: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Admission Fee (MWK)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      required
                      className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:outline-none transition-all font-bold shadow-inner"
                      value={newSession.price}
                      onChange={e => setNewSession({...newSession, price: parseInt(e.target.value) || 0})}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-400">MWK</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="flex-1 py-4 border border-gray-200 rounded-2xl font-black uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition shadow-sm active:scale-95"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="flex-1 py-4 bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-800 transition shadow-xl active:scale-95"
                >
                  Create Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
