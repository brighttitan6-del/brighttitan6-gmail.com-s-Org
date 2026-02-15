
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { COLORS } from '../constants';

interface ProfileViewProps {
  user: User;
  onUpdate: (user: User) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser: User = {
      ...user,
      ...formData
    };
    onUpdate(updatedUser);
    setIsEditing(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        <div className="h-32 bg-green-700 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
              <img 
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&size=256&background=006D44&color=fff`} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pt-16 pb-8 px-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded uppercase tracking-wider">{user.role}</span>
            </div>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          {isSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl flex items-center animate-fade-in">
              <i className="fas fa-check-circle mr-2"></i> Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Full Name</label>
                <input 
                  type="text"
                  disabled={!isEditing}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number</label>
                <input 
                  type="tel"
                  disabled={!isEditing}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                <input 
                  type="email"
                  disabled={!isEditing}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-70"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-4 pt-4 border-t">
                <button 
                  type="button"
                  onClick={() => {
                    setFormData({name: user.name, email: user.email, phone: user.phone});
                    setIsEditing(false);
                  }}
                  className="flex-1 py-4 text-gray-400 font-bold hover:bg-gray-50 transition rounded-xl"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-green-700 text-white rounded-xl font-bold hover:bg-green-800 transition shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>

          {!isEditing && (
             <div className="mt-12 space-y-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Account Security</h3>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition group">
                   <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 group-hover:scale-110 transition">
                        <i className="fas fa-key"></i>
                      </div>
                      <div className="text-left">
                         <p className="font-bold text-sm">Change Password</p>
                         <p className="text-xs text-gray-400">Keep your account secure</p>
                      </div>
                   </div>
                   <i className="fas fa-chevron-right text-gray-300"></i>
                </button>
                
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition group">
                   <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-4 group-hover:scale-110 transition">
                        <i className="fas fa-trash-alt"></i>
                      </div>
                      <div className="text-left">
                         <p className="font-bold text-sm text-red-600">Delete Account</p>
                         <p className="text-xs text-gray-400">Permanently remove all data</p>
                      </div>
                   </div>
                </button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
