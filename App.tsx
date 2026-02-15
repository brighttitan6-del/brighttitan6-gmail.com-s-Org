
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { User, UserRole, Subscription, SubscriptionPlan } from './types';
import { SUBJECTS, COLORS, PRICING } from './constants';
import AuthView from './views/AuthView';
import StudentDashboard from './views/StudentDashboard';
import SubjectView from './views/SubjectView';
import VideoPlayerView from './views/VideoPlayerView';
import PaymentView from './views/PaymentView';
import LiveClassesView from './views/LiveClassesView';
import TeacherDashboard from './views/TeacherDashboard';
import AdminDashboard from './views/AdminDashboard';
import LiveClassRoom from './views/LiveClassRoom';
import ProfileView from './views/ProfileView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
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

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    if (subscription) {
      localStorage.setItem('subscription', JSON.stringify(subscription));
    } else {
      localStorage.removeItem('subscription');
    }
  }, [subscription]);

  const handleLogout = useCallback(() => {
    setUser(null);
    setSubscription(null);
    localStorage.clear();
  }, []);

  const isSubscribed = useCallback(() => {
    if (!subscription || !subscription.isActive) return false;
    return new Date(subscription.expiryDate) > new Date();
  }, [subscription]);

  // PrivateRoute as a component for better stability
  const PrivateRoute = ({ children, roles }: { children: React.ReactNode, roles?: UserRole[] }) => {
    if (!user) return <Navigate to="/auth" replace />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans selection:bg-green-100 selection:text-green-900">
        {user && (
          <nav className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex justify-between items-center shadow-sm h-16">
            <Link to="/" className="flex items-center space-x-2 active:scale-95 transition-transform">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md" style={{ backgroundColor: COLORS.primary }}>S</div>
              <span className="font-bold text-xl tracking-tight hidden sm:inline">Smartlearn <span style={{ color: COLORS.secondary }}>Malawi</span></span>
            </Link>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {isSubscribed() ? (
                <div className="hidden md:flex items-center text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100">
                  <i className="fas fa-crown mr-1.5"></i> Premium
                </div>
              ) : (
                user.role === UserRole.STUDENT && (
                  <Link to="/payment" className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-sm hover:shadow-md">
                    Unlock All
                  </Link>
                )
              )}
              
              <div className="group relative">
                <button className="flex items-center space-x-2 focus:outline-none p-1 hover:bg-gray-50 rounded-lg transition-colors">
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=006D44&color=fff`} alt="Profile" className="w-8 h-8 rounded-full border border-gray-100" />
                  <span className="text-sm font-semibold hidden sm:inline max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
                  <i className="fas fa-chevron-down text-[10px] text-gray-400"></i>
                </button>
                <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] origin-top-right overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b">
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Account Role</p>
                    <p className="text-sm font-bold text-gray-800 capitalize">{user.role}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <Link to="/profile" className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors">
                      <i className="fas fa-user-circle text-gray-400"></i> <span>My Profile</span>
                    </Link>
                    {user.role === UserRole.ADMIN && (
                      <Link to="/" className="flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 rounded-xl transition-colors">
                        <i className="fas fa-chart-line text-gray-400"></i> <span>Admin Panel</span>
                      </Link>
                    )}
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-1">
                      <i className="fas fa-sign-out-alt"></i> <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}

        <main className="flex-1 overflow-x-hidden animate-fade-in">
          <Routes>
            <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthView onLogin={setUser} />} />
            
            <Route path="/" element={
              <PrivateRoute>
                {user?.role === UserRole.STUDENT && <StudentDashboard user={user} isSubscribed={isSubscribed()} />}
                {user?.role === UserRole.TEACHER && <TeacherDashboard user={user} />}
                {user?.role === UserRole.ADMIN && <AdminDashboard user={user} />}
              </PrivateRoute>
            } />

            <Route path="/subject/:id" element={
              <PrivateRoute roles={[UserRole.STUDENT]}>
                <SubjectView isSubscribed={isSubscribed()} />
              </PrivateRoute>
            } />

            <Route path="/video/:id" element={
              <PrivateRoute roles={[UserRole.STUDENT]}>
                <VideoPlayerView isSubscribed={isSubscribed()} />
              </PrivateRoute>
            } />

            <Route path="/payment" element={
              <PrivateRoute roles={[UserRole.STUDENT]}>
                <PaymentView onSubscribe={setSubscription} />
              </PrivateRoute>
            } />

            <Route path="/live" element={
              <PrivateRoute>
                <LiveClassesView user={user!} />
              </PrivateRoute>
            } />

            <Route path="/live-room/:id" element={
              <PrivateRoute>
                <LiveClassRoom user={user!} />
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

        {user && (
          <footer className="md:hidden bg-white/80 backdrop-blur-md border-t sticky bottom-0 z-50 flex justify-around items-center py-2.5 shadow-[0_-4px_10px_-1px_rgba(0,0,0,0.05)]">
            <Link to="/" className="flex flex-col items-center px-4 py-1 text-gray-400 hover:text-green-700 transition-colors">
              <i className="fas fa-home text-lg"></i>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Home</span>
            </Link>
            <Link to="/live" className="flex flex-col items-center px-4 py-1 text-gray-400 hover:text-green-700 transition-colors">
              <i className="fas fa-broadcast-tower text-lg"></i>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Live</span>
            </Link>
            {user.role === UserRole.STUDENT && (
              <Link to="/payment" className="flex flex-col items-center px-4 py-1 text-gray-400 hover:text-green-700 transition-colors">
                <i className="fas fa-credit-card text-lg"></i>
                <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Plans</span>
              </Link>
            )}
            <Link to="/profile" className="flex flex-col items-center px-4 py-1 text-gray-400 hover:text-green-700 transition-colors">
              <i className="fas fa-user text-lg"></i>
              <span className="text-[10px] font-bold mt-1 uppercase tracking-tighter">Me</span>
            </Link>
          </footer>
        )}
      </div>
    </Router>
  );
};

export default App;
