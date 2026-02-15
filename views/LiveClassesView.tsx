
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LiveClass } from '../types';
import { MOCK_LIVE_CLASSES, COLORS } from '../constants';

interface LiveClassesViewProps {
  user: User;
}

const LiveClassesView: React.FC<LiveClassesViewProps> = ({ user }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [joiningClass, setJoiningClass] = useState<LiveClass | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmJoin = () => {
    if (!joiningClass) return;
    setIsProcessing(true);
    
    // Simulate payment flow
    setTimeout(() => {
      setIsProcessing(false);
      const classId = joiningClass.id;
      setJoiningClass(null);
      navigate(`/live-room/${classId}`);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Live Classes</h1>
          <p className="text-gray-500">Real-time learning with top instructors in Malawi.</p>
        </div>
        
        <div className="bg-white border rounded-lg p-1 flex">
          <button 
            className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === 'upcoming' ? 'bg-green-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Sessions
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-sm font-bold transition ${activeTab === 'past' ? 'bg-green-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setActiveTab('past')}
          >
            Watch Recordings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_LIVE_CLASSES.map((session) => (
          <div key={session.id} className="bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all">
            <div className="relative h-40 bg-gray-900 overflow-hidden">
               <img src={`https://picsum.photos/400/200?random=${session.id}`} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition" alt="" />
               <div className="absolute top-4 left-4 flex gap-2">
                 <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">500 MWK</span>
                 {new Date(session.scheduledAt).getTime() < Date.now() + 86400000 && (
                   <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded animate-pulse">UPCOMING</span>
                 )}
               </div>
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xl">
                    <i className="fas fa-video"></i>
                  </div>
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold line-clamp-2 min-h-[3.5rem]">{session.title}</h3>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <img src={`https://ui-avatars.com/api/?name=${session.teacherName}`} className="w-6 h-6 rounded-full mr-2" alt="" />
                <span>{session.teacherName}</span>
              </div>
              
              <div className="mt-auto pt-6 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">Starts At</span>
                  <span className="font-bold text-gray-800">{new Date(session.scheduledAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                </div>
                <button 
                  onClick={() => setJoiningClass(session)}
                  className="w-full bg-green-700 text-white py-3 rounded-xl font-bold hover:bg-green-800 transition shadow-md active:scale-95"
                >
                  Pay & Join Session
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {joiningClass && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-8 animate-scale-up">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">Confirm Enrollment</h2>
              <button onClick={() => !isProcessing && setJoiningClass(null)} className="text-gray-400 hover:text-gray-600"><i className="fas fa-times text-xl"></i></button>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-2xl mb-8">
              <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Class Title</p>
              <p className="font-bold text-lg mb-4">{joiningClass.title}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Price</p>
                  <p className="font-bold text-green-700">500 MWK</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Duration</p>
                  <p className="font-bold">{joiningClass.duration} Minutes</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
              Upon clicking "Confirm", a USSD prompt will be sent to your registered mobile number <b>{user.phone}</b> for the payment of 500 MWK.
            </p>

            <div className="flex gap-4">
              <button disabled={isProcessing} onClick={() => setJoiningClass(null)} className="flex-1 py-4 border rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition">Cancel</button>
              <button 
                disabled={isProcessing}
                onClick={handleConfirmJoin} 
                className="flex-1 py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition shadow-lg flex items-center justify-center"
              >
                {isProcessing ? 'Processing...' : 'Confirm Payment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveClassesView;
