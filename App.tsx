
import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, UserRole, Subscription, Transaction, Video, Book } from './types';
import { COLORS, SUBJECTS, MOCK_VIDEOS, MOCK_BOOKS } from './constants';
import AuthView from './views/AuthView';
import StudentDashboard from './views/StudentDashboard';
import SubjectView from './views/SubjectView';
import VideoPlayerView from './views/VideoPlayerView';
import PaymentView from './views/PaymentView';
import TeacherDashboard from './views/TeacherDashboard';
import AdminDashboard from './views/AdminDashboard';
import ProfileView from './views/ProfileView';
import BooksView from './views/BooksView';
import SubjectsCatalogView from './views/SubjectsCatalogView';

// --- CONTEXT & STATE MANAGEMENT ---

interface SmartContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  subscription: Subscription | null;
  setSubscription: (sub: Subscription | null) => void;
  videos: Video[];
  setVideos: React.Dispatch<React.SetStateAction<Video[]>>;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  transactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  isSubscribed: () => boolean;
  logout: () => void;
}

const SmartContext = createContext<SmartContextType | undefined>(undefined);

export const useSmartPlatform = () => {
  const context = useContext(SmartContext);
  if (!context) throw new Error("useSmartPlatform must be used within a SmartProvider");
  return context;
};

const SmartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('users_db');
      return saved ? JSON.parse(saved) : [
        { id: 'admin-1', name: 'Platform Admin', email: 'admin@smartlearn.mw', phone: '2651', role: UserRole.ADMIN, isApproved: true, isLocked: false, balance: 1250000 },
        { id: 't1', name: 'Mr. Banda', email: 'banda@smartlearn.mw', phone: '099654321', role: UserRole.TEACHER, isApproved: true, isLocked: false, balance: 45000 },
        { id: 's1', name: 'Grace Kalua', email: 'grace@example.com', phone: '099123456', role: UserRole.STUDENT, isApproved: true, isLocked: false }
      ];
    } catch (e) {
      return [];
    }
  });

  const [subscription, setSubscription] = useState<Subscription | null>(() => {
    try {
      const saved = localStorage.getItem('subscription');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [videos, setVideos] = useState<Video[]>(() => {
    try {
      const saved = localStorage.getItem('videos_db');
      return saved ? JSON.parse(saved) : MOCK_VIDEOS;
    } catch (e) {
      return MOCK_VIDEOS;
    }
  });

  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('books_db');
      return saved ? JSON.parse(saved) : MOCK_BOOKS;
    } catch (e) {
      return MOCK_BOOKS;
    }
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    try {
      const saved = localStorage.getItem('tx_db');
      return saved ? JSON.parse(saved) : [
        { id: 'tx-1', userId: 's1', userName: 'Grace Kalua', amount: 35000, type: 'subscription', status: 'completed', date: new Date().toISOString(), detail: 'Monthly Plan Access' },
        { id: 'tx-2', userId: 's1', userName: 'Grace Kalua', amount: 2000, type: 'book', status: 'completed', date: new Date(Date.now() - 86400000).toISOString(), detail: 'Purchased: MSCE Mathematics Revision' },
        { id: 'tx-3', userId: 's2', userName: 'Kondwani Phiri', amount: 5000, type: 'video', status: 'completed', date: new Date(Date.now() - 172800000).toISOString(), detail: 'Purchased: Quadratic Equations Masterclass' }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setUsers(prev => {
        const index = prev.findIndex(u => u.id === user.id);
        if (index === -1) return [...prev, user];
        const newUsers = [...prev];
        newUsers[index] = user;
        return newUsers;
      });
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => localStorage.setItem('users_db', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('videos_db', JSON.stringify(videos)), [videos]);
  useEffect(() => localStorage.setItem('books_db', JSON.stringify(books)), [books]);
  useEffect(() => localStorage.setItem('tx_db', JSON.stringify(transactions)), [transactions]);
  useEffect(() => {
    if (subscription) localStorage.setItem('subscription', JSON.stringify(subscription));
    else localStorage.removeItem('subscription');
  }, [subscription]);

  const addTransaction = (tx: Transaction) => setTransactions(prev => [tx, ...prev]);

  const logout = useCallback(() => {
    setUser(null);
    setSubscription(null);
  }, []);

  const isSubscribed = useCallback(() => {
    if (!subscription || !subscription.isActive) return false;
    return new Date(subscription.expiryDate) > new Date();
  }, [subscription]);

  return (
    <SmartContext.Provider value={{
      user, setUser, subscription, setSubscription,
      videos, setVideos, books, setBooks, transactions, addTransaction, users, setUsers, isSubscribed, logout
    }}>
      {children}
    </SmartContext.Provider>
  );
};

const SidebarLink = ({ to, icon, label, badge, onClick }: { to: string, icon: string, label: string, badge?: string | boolean, onClick?: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
        isActive 
          ? 'bg-white text-[#006D44] shadow-xl shadow-black/10' 
          : 'text-white/70 hover:bg-white/10 hover:text-white'
      }`}
    >
      <div className={`w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-110`}>
        <i className={`fas ${icon} ${isActive ? 'text-[#006D44]' : 'text-inherit'}`}></i>
      </div>
      <span className="font-bold text-sm tracking-tight">{label}</span>
      {badge && (
        <span className="ml-auto w-2 h-2 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></span>
      )}
    </Link>
  );
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, logout, isSubscribed } = useSmartPlatform();
  if (!user) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <aside className={`fixed inset-y-0 left-0 bg-[#006D44] w-[280px] flex flex-col transition-transform duration-500 z-[60] shadow-2xl overflow-hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 shrink-0 flex items-center justify-between">
          <Link to="/" onClick={onClose} className="flex items-center space-x-4 active:scale-95 transition-transform group">
            <div className="w-12 h-12 rounded-[1.25rem] bg-white flex items-center justify-center text-[#006D44] font-black text-2xl shadow-2xl transition-transform group-hover:rotate-6">S</div>
            <div>
              <h1 className="text-white font-black text-xl leading-none tracking-tighter">Smartlearn</h1>
              <p className="text-white/50 text-[10px] uppercase font-black tracking-[0.2em] mt-1">Malawi Edition</p>
            </div>
          </Link>
          <button onClick={onClose} className="md:hidden w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto no-scrollbar py-4">
          <div className="px-4 pb-2">
            <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.25em]">Main Menu</p>
          </div>
          
          <SidebarLink to="/" icon="fa-home" label="Dashboard" onClick={onClose} />
          <SidebarLink to="/subjects" icon="fa-graduation-cap" label="Subjects" onClick={onClose} />
          
          {user.role === UserRole.STUDENT && (
            <>
              <SidebarLink to="/books" icon="fa-book-open" label="My Library" onClick={onClose} />
              <SidebarLink to="/payment" icon="fa-wallet" label="Subscriptions" badge={!isSubscribed()} onClick={onClose} />
            </>
          )}

          <div className="px-4 pt-6 pb-2">
            <p className="text-[10px] text-white/30 uppercase font-black tracking-[0.25em]">Personal</p>
          </div>
          
          <SidebarLink to="/profile" icon="fa-user-circle" label="My Profile" onClick={onClose} />
        </nav>

        <div className="p-6 mt-auto border-t border-white/10 bg-black/10">
          <div className="flex items-center space-x-4 mb-6 px-2">
            <img 
              src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=fff&color=006D44`} 
              alt="User" 
              className="w-10 h-10 rounded-2xl border-2 border-white/20 shadow-lg shrink-0" 
            />
            <div className="overflow-hidden">
              <p className="text-white font-black text-sm truncate">{user.name}</p>
              <p className="text-white/40 text-[10px] uppercase font-bold tracking-widest truncate">{user.role}</p>
            </div>
          </div>
          
          <button 
            onClick={() => { onClose(); logout(); }}
            className="w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl text-red-100 hover:bg-red-500 hover:text-white transition-all duration-300 group"
          >
            <div className="w-6 h-6 flex items-center justify-center group-hover:scale-110 transition-transform">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <span className="font-bold text-sm">Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const Header = ({ onOpenSidebar }: { onOpenSidebar: () => void }) => {
  const { user, isSubscribed } = useSmartPlatform();
  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between h-16 shadow-sm">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onOpenSidebar}
          className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#006D44] hover:bg-green-50 transition-colors shadow-sm active:scale-90"
        >
          <i className="fas fa-bars text-lg"></i>
        </button>
        <Link to="/" className="flex items-center space-x-2 active:scale-95 transition-transform group">
          <div className="w-8 h-8 rounded-lg bg-[#006D44] flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:rotate-6 transition-transform">S</div>
          <span className="font-black text-lg tracking-tight text-gray-900 hidden sm:inline">Smartlearn <span className="text-[#C8102E]">Malawi</span></span>
        </Link>
      </div>

      <div className="flex items-center space-x-3">
        {user.role === UserRole.STUDENT && (
          isSubscribed() ? (
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200">
              <i className="fas fa-crown mr-1.5 text-yellow-500"></i> Premium
            </div>
          ) : (
            <Link to="/payment" className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-md active:scale-95">
              Unlock
            </Link>
          )
        )}
        <Link to="/profile">
          <img 
            src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=006D44&color=fff`} 
            alt="Profile" 
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-100" 
          />
        </Link>
      </div>
    </header>
  );
};

const PrivateRoute = ({ children, roles }: React.PropsWithChildren<{ roles?: UserRole[] }>) => {
  const { user, logout } = useSmartPlatform();
  if (!user) return <Navigate to="/auth" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  if (user.isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center bg-gray-50">
        <div className="max-w-md">
           <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
             <i className="fas fa-lock"></i>
           </div>
           <h1 className="text-2xl font-black text-gray-900">Account Locked</h1>
           <p className="mt-2 text-gray-500 font-medium">Your access to Smartlearn Malawi has been suspended. Please contact support@smartlearn.mw.</p>
           <button onClick={logout} className="mt-8 inline-block text-xs font-black uppercase tracking-widest text-green-700 hover:underline">Return to Login</button>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};

const SplashView: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-[#006D44] flex flex-col items-center justify-center z-[100] animate-fade-in">
      <div className="w-24 h-24 bg-white text-[#006D44] rounded-[2.5rem] flex items-center justify-center text-5xl font-black shadow-2xl animate-bounce">S</div>
      <h1 className="text-white text-3xl font-black mt-8 tracking-tight">Smartlearn Malawi</h1>
      <p className="text-white/60 mt-2 font-medium tracking-[0.2em] uppercase text-[10px]">Quality Education for All</p>
      <div className="mt-12 w-48 h-1 bg-black/20 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-[loading_2s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, setUser } = useSmartPlatform();
  const isSubscribed = useSmartPlatform().isSubscribed;

  if (isInitializing) {
    return <SplashView onFinish={() => setIsInitializing(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {user && <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />}
        {user && <Header onOpenSidebar={() => setIsSidebarOpen(true)} />}

        <main className="flex-1 overflow-x-hidden animate-fade-in relative z-0">
          <Routes>
            <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthView onLogin={setUser} />} />
            
            <Route path="/" element={
              <PrivateRoute>
                {user?.role === UserRole.STUDENT && <StudentDashboard user={user} isSubscribed={isSubscribed()} />}
                {user?.role === UserRole.TEACHER && <TeacherDashboard user={user} />}
                {user?.role === UserRole.ADMIN && <AdminDashboard user={user} />}
              </PrivateRoute>
            } />

            <Route path="/subjects" element={
              <PrivateRoute>
                <SubjectsCatalogView />
              </PrivateRoute>
            } />

            <Route path="/subject/:id" element={
              <PrivateRoute roles={[UserRole.STUDENT]}>
                <SubjectView isSubscribed={isSubscribed()} />
              </PrivateRoute>
            } />

            <Route path="/books" element={
              <PrivateRoute roles={[UserRole.STUDENT]}>
                <BooksView />
              </PrivateRoute>
            } />

            <Route path="/video/:id" element={
              <PrivateRoute roles={[UserRole.STUDENT]}>
                <VideoPlayerView isSubscribed={isSubscribed()} />
              </PrivateRoute>
            } />

            <Route path="/payment" element={
              <PrivateRoute roles={[UserRole.STUDENT]}>
                <PaymentView onSubscribe={useSmartPlatform().setSubscription} />
              </PrivateRoute>
            } />

            <Route path="/profile" element={
              <PrivateRoute>
                <ProfileView user={user!} onUpdate={setUser} />
              </PrivateRoute>
            } />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const App: React.FC = () => (
  <SmartProvider>
    <AppContent />
  </SmartProvider>
);

export default App;
