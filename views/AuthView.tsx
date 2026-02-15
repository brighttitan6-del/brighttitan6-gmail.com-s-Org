
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { COLORS } from '../constants';

interface AuthViewProps {
  onLogin: (user: User) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || (isLogin ? 'John Student' : formData.name),
      email: formData.emailOrPhone,
      phone: formData.emailOrPhone,
      role: role,
      isApproved: role === UserRole.STUDENT,
      isLocked: false
    };
    onLogin(mockUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 to-white">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-green-700 p-8 text-center text-white">
          <div className="w-16 h-16 bg-white text-green-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-lg">S</div>
          <h1 className="text-2xl font-bold">Smartlearn Malawi</h1>
          <p className="text-green-100 text-sm mt-1">Empowering the next generation</p>
        </div>

        <div className="p-8">
          <div className="flex border-b mb-6">
            <button 
              className={`flex-1 pb-2 text-sm font-semibold transition ${isLogin ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-400'}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`flex-1 pb-2 text-sm font-semibold transition ${!isLogin ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-400'}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    placeholder="e.g. Kondwani Phiri"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Account Type</label>
                  <div className="flex space-x-2">
                    {Object.values(UserRole).map(r => (
                      <button
                        key={r}
                        type="button"
                        className={`flex-1 py-2 rounded-lg text-xs font-bold transition ${role === r ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => setRole(r)}
                      >
                        {r.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email or Phone</label>
              <input 
                type="text" 
                className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="265 99 123 456"
                required
                value={formData.emailOrPhone}
                onChange={e => setFormData({...formData, emailOrPhone: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-green-700 text-white p-3 rounded-lg font-bold hover:bg-green-800 transition transform active:scale-95 shadow-md mt-4"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-green-600 hover:underline">Forgot password?</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthView;
