
import React, { useState, useMemo } from 'react';
import { User, UserRole } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface AdminDashboardProps {
  user: User;
}

interface Withdrawal {
  id: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  destination: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const [availableBalance, setAvailableBalance] = useState(1250000);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'users'>('analytics');
  
  const [teachersQueue, setTeachersQueue] = useState([
    { id: 'u1', name: 'Dr. Chibambo', subject: 'Biology', date: '2h ago' },
    { id: 'u2', name: 'Prof. Mbeki', subject: 'History', date: '5h ago' },
    { id: 'u3', name: 'Mrs. Nkhoma', subject: 'Mathematics', date: 'Yesterday' }
  ]);

  const [usersList, setUsersList] = useState([
    { id: 's1', name: 'Grace Kalua', role: 'student', phone: '099123456', status: 'active', email: 'grace@example.com' },
    { id: 's2', name: 'Samuel Banda', role: 'student', phone: '088123456', status: 'locked', email: 'sam@example.com' },
    { id: 't1', name: 'Mr. Banda', role: 'teacher', phone: '099654321', status: 'active', email: 'banda@smartlearn.mw' },
    { id: 't2', name: 'Mrs. Phiri', role: 'teacher', phone: '088765432', status: 'active', email: 'phiri@smartlearn.mw' },
  ]);

  const [withdrawalHistory, setWithdrawalHistory] = useState<Withdrawal[]>([
    { id: 'W1', amount: 500000, date: '2024-05-10', status: 'completed', destination: 'Standard Bank - ****1234' },
    { id: 'W2', amount: 250000, date: '2024-05-01', status: 'completed', destination: 'Airtel Money - 099123456' },
  ]);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum < 2000) return alert("Minimum withdrawal is 2,000 MWK");
    if (amountNum > availableBalance) return alert("Insufficient balance");

    setIsProcessing(true);
    setTimeout(() => {
      const newWithdrawal: Withdrawal = {
        id: 'W' + (withdrawalHistory.length + 1),
        amount: amountNum,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        destination: destination
      };
      setAvailableBalance(prev => prev - amountNum);
      setWithdrawalHistory(prev => [newWithdrawal, ...prev]);
      setIsProcessing(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      setDestination('');
      alert("Withdrawal of " + amountNum.toLocaleString() + " MWK processed successfully!");
    }, 2000);
  };

  const approveTeacher = (id: string) => {
    const teacher = teachersQueue.find(t => t.id === id);
    if (!teacher) return;
    
    setTeachersQueue(prev => prev.filter(t => t.id !== id));
    setUsersList(prev => [...prev, {
      id: teacher.id,
      name: teacher.name,
      role: 'teacher',
      phone: 'N/A',
      status: 'active',
      email: teacher.name.split(' ')[1].toLowerCase() + '@smartlearn.mw'
    }]);
    alert(`${teacher.name} has been approved as a Teacher!`);
  };

  const toggleUserLock = (id: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'locked' : 'active';
        return {...u, status: nextStatus};
      }
      return u;
    }));
  };

  const revenueData = useMemo(() => [
    { name: 'Mon', rev: 45000 },
    { name: 'Tue', rev: 52000 },
    { name: 'Wed', rev: 38000 },
    { name: 'Thu', rev: 61000 },
    { name: 'Fri', rev: 55000 },
    { name: 'Sat', rev: 89000 },
    { name: 'Sun', rev: 72000 },
  ], []);

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Console</h1>
          <p className="text-gray-500 font-medium">Monitoring platform health & user activity</p>
        </div>
        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto shadow-inner">
           <button 
             onClick={() => setActiveTab('analytics')}
             className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'analytics' ? 'bg-white shadow-md text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
           >
             <i className="fas fa-chart-pie mr-2"></i> Analytics
           </button>
           <button 
             onClick={() => setActiveTab('users')}
             className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'users' ? 'bg-white shadow-md text-green-700' : 'text-gray-500 hover:text-gray-700'}`}
           >
             <i className="fas fa-users-cog mr-2"></i> Users
           </button>
        </div>
      </div>

      {activeTab === 'analytics' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Available Balance</p>
                <p className="text-3xl font-black text-gray-900 mb-4">{availableBalance.toLocaleString()} <span className="text-sm font-medium text-gray-400">MWK</span></p>
                <button 
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="w-full bg-green-700 text-white py-2.5 rounded-xl text-xs font-bold hover:bg-green-800 transition shadow-md active:scale-95"
                >
                  <i className="fas fa-paper-plane mr-2"></i> Withdraw Funds
                </button>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -translate-y-12 translate-x-12 opacity-50"></div>
            </div>
            
            {[
              { label: 'Total Revenue', value: '4.2M', sub: 'MWK', icon: 'fa-sack-dollar', color: 'text-green-600', bg: 'bg-green-50' },
              { label: 'Total Students', value: '14,205', sub: 'Active', icon: 'fa-user-graduate', color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Teachers', value: '158', sub: 'Verified', icon: 'fa-chalkboard-user', color: 'text-orange-600', bg: 'bg-orange-50' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-2xl ${stat.bg} flex items-center justify-center mb-4 ${stat.color}`}>
                  <i className={`fas ${stat.icon} text-lg`}></i>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{stat.value} <span className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">{stat.sub}</span></p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-lg text-gray-800">Weekly Performance</h3>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-bold">REVENUE (MWK)</span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 600 }} />
                    <Tooltip 
                      cursor={{ fill: '#f9fafb', radius: [8, 8, 0, 0] }} 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="rev" radius={[8, 8, 0, 0]} barSize={36}>
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? '#006D44' : '#e5e7eb'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">Pending Teacher Approvals</h3>
                <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-bold">{teachersQueue.length} WAITING</span>
              </div>
              <div className="flex-1 overflow-auto divide-y divide-gray-50 max-h-[300px]">
                {teachersQueue.length > 0 ? teachersQueue.map((t) => (
                  <div key={t.id} className="p-5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                    <div className="flex items-center space-x-4">
                       <div className="w-11 h-11 rounded-2xl bg-gray-100 flex items-center justify-center font-bold text-gray-500 shadow-sm">
                         {t.name[0]}
                       </div>
                       <div>
                         <p className="text-sm font-bold text-gray-800">{t.name}</p>
                         <p className="text-[11px] text-gray-400 font-medium">{t.subject} • {t.date}</p>
                       </div>
                    </div>
                    <div className="flex space-x-2">
                       <button 
                         onClick={() => setTeachersQueue(prev => prev.filter(x => x.id !== t.id))}
                         className="w-9 h-9 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
                       >
                         <i className="fas fa-times"></i>
                       </button>
                       <button 
                         onClick={() => approveTeacher(t.id)}
                         className="w-9 h-9 flex items-center justify-center text-green-400 hover:bg-green-50 hover:text-green-600 rounded-xl transition-all"
                       >
                         <i className="fas fa-check"></i>
                       </button>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-check-double text-gray-300"></i>
                    </div>
                    <p className="text-sm font-bold text-gray-400">All caught up!</p>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50/50 text-center border-t border-gray-100">
                <button className="text-xs font-bold text-green-700 hover:underline uppercase tracking-widest">Global Teacher Directory</button>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Recent Platform Activity</h3>
              <i className="fas fa-history text-gray-300"></i>
            </div>
            <div className="p-0">
               {withdrawalHistory.slice(0, 3).map(w => (
                 <div key={w.id} className="p-4 border-b last:border-0 flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                         <i className="fas fa-arrow-down text-xs"></i>
                       </div>
                       <div>
                          <p className="font-bold">Withdrawal of {w.amount.toLocaleString()} MWK</p>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{w.destination}</p>
                       </div>
                    </div>
                    <span className="text-[10px] font-black uppercase text-gray-400">{w.date}</span>
                 </div>
               ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-scale-up">
           <div className="p-6 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="font-bold text-lg text-gray-800">User Management</h3>
              <div className="relative w-full sm:w-72">
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                <input type="text" placeholder="Search users..." className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-sm focus:bg-white focus:border-green-500 focus:outline-none transition-all shadow-inner" />
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4">Full Name / Email</th>
                    <th className="px-6 py-4">Account Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800">{u.name}</span>
                          <span className="text-[11px] text-gray-400 font-medium">{u.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                          u.role === 'admin' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                          u.role === 'teacher' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                          'bg-gray-50 text-gray-600 border border-gray-100'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center w-fit px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          u.status === 'active' ? 'text-green-600' : 'text-red-500'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${u.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => toggleUserLock(u.id)} 
                          className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${
                            u.status === 'active' ? 'text-red-600 bg-red-50 hover:bg-red-600 hover:text-white' : 'text-green-700 bg-green-50 hover:bg-green-700 hover:text-white'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspend Access' : 'Restore Access'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}

      {isWithdrawModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl animate-scale-up border border-white/20">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">Withdraw Funds</h2>
              <button onClick={() => !isProcessing && setIsWithdrawModalOpen(false)} className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-6">
              <div className="bg-gradient-to-br from-green-700 to-green-900 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Available for Payout</p>
                <p className="text-3xl font-black">{availableBalance.toLocaleString()} <span className="text-sm font-medium opacity-60">MWK</span></p>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-12 -translate-y-12"></div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Payout Amount</label>
                <div className="relative">
                  <input 
                    type="number" 
                    required
                    placeholder="Enter amount (min. 2,000)"
                    className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:outline-none transition-all font-bold text-lg shadow-inner"
                    value={withdrawAmount}
                    onChange={e => setWithdrawAmount(e.target.value)}
                    disabled={isProcessing}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">MWK</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Withdrawal Channel</label>
                <select 
                  required
                  className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-green-500 focus:outline-none transition-all font-bold shadow-inner"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  disabled={isProcessing}
                >
                  <option value="">Select Destination Account</option>
                  <option value="Standard Bank - ****1234">Standard Bank (Acc: ****1234)</option>
                  <option value="Airtel Money - 099123456">Airtel Money (099 123 456)</option>
                  <option value="TNM Mpamba - 088123456">TNM Mpamba (088 123 456)</option>
                </select>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <button 
                  type="submit"
                  disabled={isProcessing || !withdrawAmount || !destination}
                  className="w-full py-4 bg-green-700 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-green-800 transition shadow-xl active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <i className="fas fa-circle-notch fa-spin mr-3"></i> Processing Request...
                    </span>
                  ) : (
                    'Finalize Withdrawal'
                  )}
                </button>
                <p className="text-[10px] text-center text-gray-400 font-bold uppercase tracking-tight">Funds typically arrive within 12 hours</p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
