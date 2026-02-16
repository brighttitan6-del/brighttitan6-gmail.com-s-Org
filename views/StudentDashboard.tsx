
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      {/* Header Section */}
      <section className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Muli bwanji, {user.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1 font-medium">Ready to master your subjects today?</p>
        </div>
        
        <div className="flex gap-4">
          <div className="text-center p-4 rounded-3xl bg-orange-50 border border-orange-100 min-w-[120px] shadow-sm">
            <p className="text-[10px] text-orange-600 uppercase font-black tracking-widest">Watch Time</p>
            <p className="text-2xl font-black text-orange-700">12.5h</p>
          </div>
          <div className="text-center p-4 rounded-3xl bg-green-50 border border-green-100 min-w-[120px] shadow-sm">
            <p className="text-[10px] text-[#006D44] uppercase font-black tracking-widest">Modules</p>
            <p className="text-2xl font-black text-[#006D44]">24</p>
          </div>
        </div>
      </section>

      {!isSubscribed && (
        <section className="bg-[#C8102E] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
            <div>
              <h2 className="text-2xl font-black tracking-tight">Unlock Premium Learning</h2>
              <p className="text-red-100 font-medium mt-1">Get full access to all video lessons and our digital textbook library for just 2,000 MWK.</p>
            </div>
            <Link to="/payment" className="bg-white text-[#C8102E] px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-red-50 transition active:scale-95 whitespace-nowrap">
              UPGRADE NOW
            </Link>
          </div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-48 h-48 bg-black opacity-10 rounded-full"></div>
        </section>
      )}

      {/* Subjects Grid */}
      <section>
        <div className="flex justify-between items-center mb-8 px-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Browse Subjects</h2>
          <Link to="/subjects" className="text-xs font-black text-[#006D44] uppercase tracking-widest hover:underline">View Catalog</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {SUBJECTS.slice(0, 4).map((subject) => (
            <Link 
              key={subject.id} 
              to={`/subject/${subject.id}`}
              className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="h-44 overflow-hidden relative">
                <img src={subject.thumbnail} alt={subject.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white border border-white/20">
                    <i className={`fas ${subject.icon}`}></i>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-xl text-gray-900">{subject.name}</h3>
                <p className="text-sm text-gray-500 mt-2 font-medium line-clamp-2">{subject.description}</p>
                <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-[#006D44]">
                  EXPLORE LESSONS <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/books" className="flex items-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-[#006D44] hover:shadow-xl transition-all duration-500 group">
          <div className="w-16 h-16 rounded-[1.5rem] bg-green-50 flex items-center justify-center text-[#006D44] text-2xl mr-6 group-hover:scale-110 transition duration-500 shadow-sm">
            <i className="fas fa-book-reader"></i>
          </div>
          <div>
            <h3 className="font-black text-xl text-gray-900">Digital Library</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Access and study MSCE textbooks and past papers instantly.</p>
          </div>
        </Link>
        <Link to="/profile" className="flex items-center p-8 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-500 group">
          <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600 text-2xl mr-6 group-hover:scale-110 transition duration-500 shadow-sm">
            <i className="fas fa-user-circle"></i>
          </div>
          <div>
            <h3 className="font-black text-xl text-gray-900">My Progress</h3>
            <p className="text-sm text-gray-500 font-medium mt-1">Track your course completions and academic performance.</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default StudentDashboard;
