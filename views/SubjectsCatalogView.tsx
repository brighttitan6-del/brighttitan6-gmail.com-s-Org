
import React from 'react';
import { Link } from 'react-router-dom';
import { SUBJECTS, COLORS } from '../constants';

const SubjectsCatalogView: React.FC = () => {
  const categories = Array.from(new Set(SUBJECTS.map(s => s.category || 'Other')));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-12 pb-24">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">Academic Subjects</h1>
        <p className="text-gray-500 font-medium text-lg leading-relaxed">
          Comprehensive curriculum aligned with the Malawi School Certificate of Education (MSCE). 
          Select a subject to browse recorded video lessons and resources.
        </p>
      </div>

      {categories.map(category => (
        <section key={category} className="space-y-6">
          <div className="flex items-center space-x-4 px-2">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">{category}</h2>
            <div className="h-[2px] flex-1 bg-gray-100 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SUBJECTS.filter(s => (s.category || 'Other') === category).map((subject) => (
              <Link 
                key={subject.id} 
                to={`/subject/${subject.id}`}
                className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={subject.thumbnail} alt={subject.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center text-white text-xl mb-3 border border-white/20 group-hover:bg-white group-hover:text-[#006D44] transition-colors duration-500">
                      <i className={`fas ${subject.icon}`}></i>
                    </div>
                    <h3 className="font-black text-2xl text-white tracking-tight">{subject.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 font-medium leading-relaxed line-clamp-2">{subject.description}</p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#006D44]">Explore Lessons</span>
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#006D44] group-hover:text-white transition-all">
                      <i className="fas fa-chevron-right text-xs"></i>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <div className="bg-[#006D44] rounded-[3rem] p-12 text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight mb-4">Request a Subject</h2>
            <p className="text-white/70 font-medium">Can't find what you're looking for? Our teachers are constantly producing new content. Let us know which subject you need help with next!</p>
          </div>
          <button className="bg-white text-[#006D44] px-10 py-5 rounded-3xl font-black shadow-2xl hover:bg-green-50 active:scale-95 transition-all whitespace-nowrap tracking-tight">
            SUBMIT REQUEST
          </button>
        </div>
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-black/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default SubjectsCatalogView;
