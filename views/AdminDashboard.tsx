
import React, { useState } from 'react';
import { User, UserRole, Video, Book, Transaction } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useSmartPlatform } from '../App';
import { SUBJECTS } from '../constants';

interface AdminDashboardProps {
  user: User;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  const { setUsers, users, videos, setVideos, books, setBooks, transactions } = useSmartPlatform() as any;
  
  const [localBalance, setLocalBalance] = useState(1250000);
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'content' | 'financials'>('analytics');
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [destination, setDestination] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter specific sales for the audit view
  const contentSales = transactions.filter((t: Transaction) => t.type === 'book' || t.type === 'video');
  const subscriptionSales = transactions.filter((t: Transaction) => t.type === 'subscription');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(withdrawAmount);
    if (isNaN(amountNum) || amountNum <= 0) return alert("Please enter a valid amount");
    if (amountNum > localBalance) return alert("Insufficient balance");

    setIsProcessing(true);
    setTimeout(() => {
      setLocalBalance(prev => prev - amountNum);
      setIsProcessing(false);
      setIsWithdrawModalOpen(false);
      setWithdrawAmount('');
      setDestination('');
      alert("Withdrawal initiated successfully!");
    }, 2000);
  };

  const data = [
    { name: 'Mon', rev: 45000 },
    { name: 'Tue', rev: 52000 },
    { name: 'Wed', rev: 38000 },
    { name: 'Thu', rev: 61000 },
    { name: 'Fri', rev: 55000 },
    { name: 'Sat', rev: 89000 },
    { name: 'Sun', rev: 72000 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Admin Console</h1>
          <p className="text-gray-500 font-medium">Platform control and financial auditing.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-2xl shadow-inner overflow-x-auto no-scrollbar max-w-full">
           <button 
             onClick={() => setActiveTab('analytics')}
             className={`px-6 py-2 rounded-xl text-sm font-black transition-all duration-300 whitespace-nowrap ${activeTab === 'analytics' ? 'bg-white shadow-xl text-[#006D44]' : 'text-gray-500'}`}
           >
             Analytics
           </button>
           <button 
             onClick={() => setActiveTab('users')}
             className={`px-6 py-2 rounded-xl text-sm font-black transition-all duration-300 whitespace-nowrap ${activeTab === 'users' ? 'bg-white shadow-xl text-[#006D44]' : 'text-gray-500'}`}
           >
             Users
           </button>
           <button 
             onClick={() => setActiveTab('content')}
             className={`px-6 py-2 rounded-xl text-sm font-black transition-all duration-300 whitespace-nowrap ${activeTab === 'content' ? 'bg-white shadow-xl text-[#006D44]' : 'text-gray-500'}`}
           >
             Content
           </button>
           <button 
             onClick={() => setActiveTab('financials')}
             className={`px-6 py-2 rounded-xl text-sm font-black transition-all duration-300 whitespace-nowrap ${activeTab === 'financials' ? 'bg-white shadow-xl text-[#006D44]' : 'text-gray-500'}`}
           >
             Financials
           </button>
        </div>
      </div>

      {activeTab === 'analytics' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-green-100 shadow-sm bg-gradient-to-br from-white to-green-50 overflow-hidden relative">
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-green-100 flex items-center justify-center mb-4 text-green-600">
                  <i className="fas fa-wallet"></i>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Platform Balance</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{localBalance.toLocaleString()} MWK</p>
                <button 
                  onClick={() => setIsWithdrawModalOpen(true)}
                  className="mt-4 w-full bg-[#006D44] text-white py-3 rounded-xl text-xs font-black hover:bg-green-800 transition shadow-lg active:scale-95"
                >
                  Withdraw Funds
                </button>
              </div>
            </div>
            {[
              { label: 'Total Revenue', value: '4.2M MWK', icon: 'fa-sack-dollar', color: 'text-green-600' },
              { label: 'Subscribers', value: '14,205', icon: 'fa-user-graduate', color: 'text-blue-600' },
              { label: 'Item Sales', value: '2,840', icon: 'fa-cart-shopping', color: 'text-orange-600' },
              { label: 'Active Teachers', value: '158', icon: 'fa-chalkboard-user', color: 'text-purple-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border shadow-sm">
                <div className={`w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center mb-4 ${stat.color}`}>
                  <i className={`fas ${stat.icon}`}></i>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
                <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm">
              <h3 className="font-black text-lg mb-8 tracking-tight uppercase tracking-widest text-gray-400">Revenue Trends</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#999' }} />
                    <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '15px' }} />
                    <Bar dataKey="rev" radius={[10, 10, 0, 0]}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? '#006D44' : '#E5E7EB'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'financials' && (
        <div className="space-y-8 animate-fade-in">
          {/* Audit Section: Item Sales */}
          <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
             <div className="p-8 border-b bg-gray-50/50 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <h3 className="font-black text-xl tracking-tight">Content Sales Audit</h3>
                  <p className="text-sm text-gray-400 font-medium">Tracking who paid for individual books and videos.</p>
                </div>
                <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition flex items-center">
                  <i className="fas fa-download mr-2"></i> EXPORT CSV
                </button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] border-b">
                    <tr>
                      <th className="px-8 py-6">Payer Name</th>
                      <th className="px-8 py-6">Content Title</th>
                      <th className="px-8 py-6">Type</th>
                      <th className="px-8 py-6">Amount</th>
                      <th className="px-8 py-6">Date</th>
                      <th className="px-8 py-6 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {contentSales.length > 0 ? contentSales.map((tx: Transaction) => (
                      <tr key={tx.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-8 py-6">
                          <span className="font-bold text-gray-900">{tx.userName}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm text-gray-500 font-medium">{tx.detail.replace('Purchased: ', '')}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${tx.type === 'book' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                            {tx.type}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="font-black text-gray-900">{tx.amount.toLocaleString()} MWK</span>
                        </td>
                        <td className="px-8 py-6 text-xs text-gray-400 font-bold">
                          {new Date(tx.date).toLocaleDateString([], { dateStyle: 'medium' })}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-[10px] font-black uppercase">PAID</span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-gray-400 font-bold">No individual content sales recorded yet.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
             </div>
          </div>

          {/* Audit Section: Subscriptions */}
          <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
             <div className="p-8 border-b bg-gray-50/50">
                <h3 className="font-black text-xl tracking-tight">Subscription Revenue</h3>
                <p className="text-sm text-gray-400 font-medium">Tracking platform-wide access payments.</p>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] border-b">
                    <tr>
                      <th className="px-8 py-6">Student</th>
                      <th className="px-8 py-6">Plan</th>
                      <th className="px-8 py-6">Price Paid</th>
                      <th className="px-8 py-6">Transaction ID</th>
                      <th className="px-8 py-6 text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {subscriptionSales.map((tx: Transaction) => (
                      <tr key={tx.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-8 py-6 font-bold text-gray-900">{tx.userName}</td>
                        <td className="px-8 py-6">
                           <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[9px] font-black uppercase">{tx.detail}</span>
                        </td>
                        <td className="px-8 py-6 font-black text-gray-900">{tx.amount.toLocaleString()} MWK</td>
                        <td className="px-8 py-6 text-xs font-mono text-gray-400">{tx.id}</td>
                        <td className="px-8 py-6 text-right text-xs text-gray-400 font-bold">
                          {new Date(tx.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>
          </div>
        </div>
      )}

      {/* Other tabs remain unchanged but use the refined state logic */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-[2.5rem] border shadow-sm overflow-hidden">
           <div className="p-8 border-b flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="font-black text-xl tracking-tight">Registered Users</h3>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] border-b">
                  <tr>
                    <th className="px-8 py-6">User</th>
                    <th className="px-8 py-6">Role</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u: User) => (
                    <tr key={u.id} className="hover:bg-gray-50 transition">
                      <td className="px-8 py-6 flex items-center space-x-3">
                        <img src={u.avatar || `https://ui-avatars.com/api/?name=${u.name}&background=006D44&color=fff`} className="w-8 h-8 rounded-full" alt="" />
                        <span className="font-bold text-gray-900">{u.name}</span>
                      </td>
                      <td className="px-8 py-6"><span className="text-[10px] font-black uppercase px-3 py-1 rounded-full bg-gray-100">{u.role}</span></td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${u.isLocked ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                          {u.isLocked ? 'Locked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => setUsers(users.map((x: User) => x.id === u.id ? { ...x, isLocked: !x.isLocked } : x))}
                          className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl transition-all ${u.isLocked ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                        >
                          {u.isLocked ? 'Unlock' : 'Lock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
