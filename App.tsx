
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
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

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [subscription, setSubscription] = useState<Subscription | null>(() => {
    const saved = localStorage.getItem('subscription');
    return saved ? JSON.parse(saved) : null;
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

  const handleLogout = () => {
    setUser(null);
    setSubscription(null);
    localStorage.clear();
  };

  const isSubscribed = () => {
    if (!subscription) return false;
    return new Date(subscription.expiryDate) > new Date();
  };

  // Fixed PrivateRoute props to include optional children to resolve TypeScript errors where 'children' might be inferred as missing
  const PrivateRoute = ({ children, roles }: { children?: React.ReactNode, roles?: UserRole[] }) => {
    if (!user) return <Navigate to="/auth" />;
    if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
    return <>{children}</>;
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {user && (
          <nav className="bg-white border-b sticky top-0 z-50 px-4 py-3 flex justify-between items-center shadow-sm">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: COLORS.primary }}>S</div>
              <span className="font-bold text-xl hidden sm:inline">Smartlearn <span style={{ color: COLORS.secondary }}>Malawi</span></span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {isSubscribed() ? (
                <div className="hidden md:flex items-center text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full border border-green-200">
                  <i className="fas fa-check-circle mr-1"></i> Active Plan
                </div>
              ) : (
                user.role === UserRole.STUDENT && (
                  <Link to="/payment" className="text-xs px-3 py-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition">
                    Unlock Premium
                  </Link>
                )
              )}
              
              <div className="group relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} alt="Profile" className="w-8 h-8 rounded-full border" />
                  <span className="text-sm font-medium hidden sm:inline">{user.name}</span>
                  <i className="fas fa-chevron-down text-xs text-gray-400"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60]">
                  <div className="p-3 border-b">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Account</p>
                    <p className="text-sm truncate">{user.email}</p>
                  </div>
                  <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100"><i className="fas fa-user mr-2 text-gray-400"></i> Profile</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 text-red-600"><i className="fas fa-sign-out-alt mr-2 text-red-400"></i> Logout</button>
                </div>
              </div>
            </div>
          </nav>
        )}

        <main className="flex-1 overflow-x-hidden">
          <Routes>
            <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthView onLogin={setUser} />} />
            
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

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {user && (
          <footer className="md:hidden bg-white border-t sticky bottom-0 z-50 flex justify-around items-center py-2 shadow-inner">
            <Link to="/" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
              <i className="fas fa-home text-lg"></i>
              <span className="text-[10px]">Home</span>
            </Link>
            <Link to="/live" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
              <i className="fas fa-broadcast-tower text-lg"></i>
              <span className="text-[10px]">Live</span>
            </Link>
            <Link to="/payment" className="flex flex-col items-center p-2 text-gray-500 hover:text-green-600">
              <i className="fas fa-credit-card text-lg"></i>
              <span className="text-[10px]">Plans</span>
            </Link>
            <button onClick={handleLogout} className="flex flex-col items-center p-2 text-gray-500 hover:text-red-600">
              <i className="fas fa-power-off text-lg"></i>
              <span className="text-[10px]">Exit</span>
            </button>
          </footer>
        )}
      </div>
    </Router>
  );
};

export default App;
