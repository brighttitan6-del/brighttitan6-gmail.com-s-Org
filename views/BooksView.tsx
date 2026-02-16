
import React, { useState } from 'react';
import { SUBJECTS, COLORS } from '../constants';
import { Book } from '../types';
import { useSmartPlatform } from '../App';
import { Link } from 'react-router-dom';

const BooksView: React.FC = () => {
  const { books: allBooks, isSubscribed } = useSmartPlatform();
  const subscribed = isSubscribed();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [readingBook, setReadingBook] = useState<Book | null>(null);
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');

  const filteredBooks = allBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || book.subjectId === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleReadRequest = (book: Book) => {
    if (book.isPaid && !subscribed) {
      // Navigate to payment logic or show alert
      alert("This is a premium book. Please upgrade your subscription to read.");
      return;
    }
    setReadingBook(book);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Digital Library</h1>
          <p className="text-gray-500 mt-1 font-medium">Access MSCE textbooks and study guides directly in your browser.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex bg-gray-100 p-1.5 rounded-2xl mr-2">
            <button 
              onClick={() => setViewMode('grid')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${viewMode === 'grid' ? 'bg-white text-[#006D44] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              title="Grid View"
            >
              <i className="fas fa-th-large"></i>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${viewMode === 'list' ? 'bg-white text-[#006D44] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
              title="List View"
            >
              <i className="fas fa-list"></i>
            </button>
          </div>

          <div className="relative flex-1 sm:flex-none">
            <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="Search library..." 
              className="pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#006D44] transition shadow-sm font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select 
            className="px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#006D44] transition shadow-sm font-bold text-gray-700 cursor-pointer min-w-[160px]"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {SUBJECTS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => {
              const needsSub = book.isPaid && !subscribed;
              return (
                <div key={book.id} className="group bg-white rounded-[2.5rem] p-4 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col">
                  <div className="relative aspect-[3/4] rounded-3xl overflow-hidden mb-6 shadow-lg">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 flex items-center justify-center backdrop-blur-sm">
                      <button 
                        onClick={() => handleReadRequest(book)}
                        className="bg-white text-[#006D44] px-6 py-3 rounded-2xl font-black shadow-2xl active:scale-95 transition flex items-center space-x-2"
                      >
                        <i className={`fas ${needsSub ? 'fa-lock' : 'fa-book-open'}`}></i>
                        <span>{needsSub ? 'UNLOCK' : 'READ NOW'}</span>
                      </button>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                       <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 ${book.isPaid ? 'bg-red-500/80 text-white' : 'bg-green-500/80 text-white'}`}>
                        {book.isPaid ? 'Premium' : 'Free'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col px-2">
                    <h3 className="font-black text-lg text-gray-900 leading-tight mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">By {book.author}</p>
                    
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <i className="far fa-file-alt text-xs"></i>
                        <span className="text-[10px] font-black uppercase tracking-tighter">{book.pages} Pages</span>
                      </div>
                      <button 
                        onClick={() => handleReadRequest(book)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${needsSub ? 'bg-red-50 text-red-500' : 'bg-green-50 text-[#006D44]'}`}
                      >
                        <i className={`fas ${needsSub ? 'fa-lock' : 'fa-eye'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBooks.map((book) => {
              const needsSub = book.isPaid && !subscribed;
              return (
                <div key={book.id} className="group bg-white rounded-3xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300 flex items-center gap-6">
                  <div className="w-20 h-28 sm:w-24 sm:h-32 flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                    <img src={book.coverUrl} alt={book.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[9px] font-black px-2 py-0.5 bg-green-50 text-[#006D44] rounded-full uppercase tracking-widest">
                        {SUBJECTS.find(s => s.id === book.subjectId)?.name || 'General'}
                      </span>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${book.isPaid ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                        {book.isPaid ? 'Premium' : 'Free'}
                      </span>
                    </div>
                    <h3 className="font-black text-lg text-gray-900 truncate">{book.title}</h3>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">By {book.author}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleReadRequest(book)}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-black text-xs transition shadow-md active:scale-95 ${needsSub ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-[#006D44] text-white hover:bg-green-800'}`}
                    >
                      <i className={`fas ${needsSub ? 'fa-lock' : 'fa-book-open'}`}></i>
                      <span>{needsSub ? 'Upgrade' : 'Read Now'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="py-24 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 text-4xl">
            <i className="fas fa-search"></i>
          </div>
          <h3 className="text-2xl font-black text-gray-900">No books found</h3>
          <p className="text-gray-500 font-medium">Try adjusting your filters or search term.</p>
        </div>
      )}

      {/* Internal Reader Modal */}
      {readingBook && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col animate-fade-in">
          {/* Reader Toolbar */}
          <div className="h-16 bg-white flex items-center justify-between px-6 shadow-xl relative z-10">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setReadingBook(null)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 text-gray-500 flex items-center justify-center transition"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
              <div className="hidden sm:block">
                <h2 className="font-black text-gray-900 leading-none">{readingBook.title}</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Reader Mode • Page 1 of {readingBook.pages}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setReaderTheme('light')}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${readerTheme === 'light' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
                >
                  <i className="fas fa-sun text-xs"></i>
                </button>
                <button 
                  onClick={() => setReaderTheme('sepia')}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${readerTheme === 'sepia' ? 'bg-[#F4ECD8] shadow-sm text-[#5B4636]' : 'text-gray-400'}`}
                >
                  <i className="fas fa-coffee text-xs"></i>
                </button>
                <button 
                  onClick={() => setReaderTheme('dark')}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${readerTheme === 'dark' ? 'bg-gray-900 shadow-sm text-white' : 'text-gray-400'}`}
                >
                  <i className="fas fa-moon text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center transition-colors duration-500 ${
            readerTheme === 'light' ? 'bg-gray-200' : readerTheme === 'sepia' ? 'bg-[#F1E4D0]' : 'bg-gray-900'
          }`}>
            <div className={`w-full max-w-4xl rounded-xl shadow-2xl min-h-[120vh] p-8 sm:p-16 transition-colors duration-500 relative group ${
              readerTheme === 'light' ? 'bg-white text-gray-800' : readerTheme === 'sepia' ? 'bg-[#FDF6E3] text-[#5B4636]' : 'bg-gray-800 text-gray-100'
            }`}>
              <div className="absolute top-8 left-8 text-[10px] font-bold uppercase tracking-widest opacity-30">Malawi Education Board Official Material</div>
              <div className="absolute top-8 right-8 text-[10px] font-bold uppercase tracking-widest opacity-30">Smartlearn Edition</div>
              
              <div className="mt-20 space-y-8 animate-fade-in-up">
                <div className="text-center space-y-4">
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-tight">{readingBook.title}</h1>
                  <p className="text-xl opacity-60 font-medium">Prepared by {readingBook.author}</p>
                </div>
                
                <div className="h-px w-32 bg-current opacity-10 mx-auto my-12"></div>
                
                <div className="space-y-6 text-lg sm:text-xl leading-relaxed font-medium">
                  <p>Welcome to your digital learning experience. This material is provided exclusively for students of Smartlearn Malawi. Please ensure you are logged into your account to maintain progress tracking across devices.</p>
                  
                  <div className="py-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="p-6 rounded-2xl border border-current border-opacity-10 bg-current bg-opacity-5">
                      <h4 className="font-bold mb-2 uppercase tracking-widest text-sm">Learning Objective 1</h4>
                      <p className="text-base opacity-70">Master the foundational concepts required for the MSCE examinations through structured learning and practice.</p>
                    </div>
                    <div className="p-6 rounded-2xl border border-current border-opacity-10 bg-current bg-opacity-5">
                      <h4 className="font-bold mb-2 uppercase tracking-widest text-sm">Learning Objective 2</h4>
                      <p className="text-base opacity-70">Apply theoretical knowledge to practical problem-solving scenarios common in Malawian national assessments.</p>
                    </div>
                  </div>

                  <div className="aspect-video bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden border border-current border-opacity-10">
                     <img src={readingBook.coverUrl} className="w-full h-full object-cover opacity-20 blur-sm" alt="Placeholder" />
                     <div className="absolute flex flex-col items-center">
                        <i className="fas fa-file-pdf text-5xl opacity-20 mb-4"></i>
                        <p className="font-black text-sm uppercase tracking-[0.3em] opacity-40">Section Preview Content</p>
                     </div>
                  </div>

                  <p>Smartlearn Malawi is committed to providing high-quality educational resources to every student. Our digital library is updated regularly with the latest curriculum changes and examination tips from top teachers across the country.</p>
                </div>
              </div>

              <div className="sticky bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-black/80 backdrop-blur-md text-white rounded-full text-xs font-black shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-4">
                <button className="hover:text-green-400"><i className="fas fa-chevron-left"></i></button>
                <span>PAGE 1 OF {readingBook.pages}</span>
                <button className="hover:text-green-400"><i className="fas fa-chevron-right"></i></button>
              </div>
            </div>

            <div className="py-12 text-center text-gray-500 font-bold uppercase tracking-widest text-xs">
              Scroll down for more pages
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksView;
