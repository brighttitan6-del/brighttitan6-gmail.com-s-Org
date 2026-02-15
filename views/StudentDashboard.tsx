
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Subject } from '../types';
import { SUBJECTS, COLORS } from '../constants';

interface StudentDashboardProps {
  user: User;
  isSubscribed: boolean;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, isSubscribed }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Muli bwanji, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Ready to ace your exams today?</p>
        </div>
        
        <div className="flex gap-4">
          <div className="text-center p-3 rounded-xl bg-orange-50 border border-orange-100 min-w-[100px]">
            <p className="text-[10px] text-orange-600 uppercase font-bold">Watch Time</p>
            <p className="text-xl font-bold text-orange-700">12.5h</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-blue-50 border border-blue-100 min-w-[100px]">
            <p className="text-[10px] text-blue-600 uppercase font-bold">Completed</p>
            <p className="text-xl font-bold text-blue-700">24</p>
          </div>
        </div>
      </section>

      {!isSubscribed && (
        <section className="bg-red-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-bold">Subscription Expired</h2>
              <p className="text-red-100">Unlock all subjects and video lessons starting from just 2,000 MWK.</p>
            </div>
            <Link to="/payment" className="bg-white text-red-600 px-6 py-2 rounded-full font-bold shadow-lg hover:bg-gray-100 transition whitespace-nowrap">
              Renew Now
            </Link>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white opacity-10 rounded-full"></div>
        </section>
      )}

      {/* Subjects Grid */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Subjects</h2>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{SUBJECTS.length} Subjects Total</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SUBJECTS.map((subject) => (
            <Link 
              key={subject.id} 
              to={`/subject/${subject.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={subject.thumbnail} alt={subject.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <i className={`fas ${subject.icon}`}></i>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{subject.name}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{subject.description}</p>
                <div className="mt-4 flex items-center text-xs font-bold" style={{ color: COLORS.primary }}>
                  VIEW LESSONS <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Stats/Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/live" className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-green-300 transition group">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl mr-4 group-hover:scale-110 transition">
            <i className="fas fa-video"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg">Live Classes</h3>
            <p className="text-sm text-gray-500">Join real-time sessions with teachers for only 500 MWK.</p>
          </div>
        </Link>
        <div className="flex items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-blue-300 transition group cursor-pointer">
          <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl mr-4 group-hover:scale-110 transition">
            <i className="fas fa-file-pdf"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg">Exam Past Papers</h3>
            <p className="text-sm text-gray-500">Practice with MSCE past papers from 2015 to 2024.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentDashboard;
