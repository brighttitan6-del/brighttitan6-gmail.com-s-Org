
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionPlan, Subscription } from '../types';
import { PRICING, COLORS } from '../constants';

interface PaymentViewProps {
  onSubscribe: (sub: Subscription) => void;
}

const PaymentView: React.FC<PaymentViewProps> = ({ onSubscribe }) => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(SubscriptionPlan.MONTHLY);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Plan, 2: Payment Details, 3: Processing

  const handleInitiate = () => {
    if (!phoneNumber) return alert("Please enter your phone number");
    setStep(3);
    setIsProcessing(true);
    
    // Simulate mobile money USSD prompt and callback
    setTimeout(() => {
      const days = selectedPlan === SubscriptionPlan.DAILY ? 1 : selectedPlan === SubscriptionPlan.WEEKLY ? 7 : 30;
      const expiry = new Date();
      expiry.setDate(expiry.getDate() + days);

      const newSub: Subscription = {
        userId: 'temp',
        plan: selectedPlan,
        expiryDate: expiry.toISOString(),
        isActive: true
      };
      
      onSubscribe(newSub);
      setIsProcessing(false);
      setStep(4); // Success
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Choose Your Learning Plan</h1>
        <p className="text-gray-500 mt-2">Affordable education for every Malawian student.</p>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(Object.keys(PRICING) as SubscriptionPlan[]).filter(k => k !== 'LIVE_CLASS' as any).map((plan) => (
            <div 
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`relative cursor-pointer p-8 rounded-3xl border-2 transition-all duration-300 ${selectedPlan === plan ? 'border-green-600 bg-green-50 shadow-xl' : 'border-gray-200 bg-white hover:border-green-200'}`}
            >
              {selectedPlan === plan && (
                <div className="absolute -top-3 right-8 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-bold">SELECTED</div>
              )}
              <h3 className="text-lg font-bold text-gray-500 uppercase tracking-widest">{plan}</h3>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-black text-gray-900">{PRICING[plan].price.toLocaleString()}</span>
                <span className="ml-1 text-gray-500 font-bold">MWK</span>
              </div>
              <p className="mt-1 text-sm text-gray-400">Valid for {PRICING[plan].duration}</p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-center text-sm text-gray-600"><i className="fas fa-check-circle text-green-500 mr-2"></i> All Video Lessons</li>
                <li className="flex items-center text-sm text-gray-600"><i className="fas fa-check-circle text-green-500 mr-2"></i> All Subjects</li>
                <li className="flex items-center text-sm text-gray-600"><i className="fas fa-check-circle text-green-500 mr-2"></i> Past Paper Access</li>
              </ul>
            </div>
          ))}
          <div className="col-span-full mt-8">
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-green-700 text-white py-4 rounded-2xl font-bold text-lg hover:bg-green-800 transition shadow-lg"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 border">
          <button onClick={() => setStep(1)} className="text-gray-400 hover:text-gray-600 mb-6 flex items-center text-sm">
            <i className="fas fa-arrow-left mr-2"></i> Back to Plans
          </button>
          <h3 className="text-xl font-bold mb-6">Payment Method</h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center p-4 border rounded-xl bg-blue-50 border-blue-200">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-4">
                <i className="fas fa-mobile-screen text-blue-600"></i>
              </div>
              <div>
                <p className="font-bold text-sm">Airtel Money / TNM Mpamba</p>
                <p className="text-xs text-blue-600">Mobile Money Transfer</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">+265</span>
                <input 
                  type="tel" 
                  className="w-full pl-16 pr-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="99 123 4567"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Plan: {selectedPlan}</span>
                <span className="font-bold">{PRICING[selectedPlan].price} MWK</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Processing Fee</span>
                <span className="font-bold">0 MWK</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-green-700">
                <span>Total</span>
                <span>{PRICING[selectedPlan].price} MWK</span>
              </div>
            </div>

            <button 
              onClick={handleInitiate}
              className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition"
            >
              Pay via USSD Prompt
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-md mx-auto text-center py-20">
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 border-8 border-green-100 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-green-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold">Waiting for PIN...</h2>
          <p className="text-gray-500 mt-2 px-8">Please check your phone for the USSD prompt and enter your Mobile Money PIN to complete the transaction.</p>
          <p className="text-xs text-gray-400 mt-6 font-mono">TxID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
      )}

      {step === 4 && (
        <div className="max-w-md mx-auto text-center py-20 bg-white rounded-3xl shadow-xl border p-12 animate-fade-in">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            <i className="fas fa-check"></i>
          </div>
          <h2 className="text-2xl font-bold">Payment Successful!</h2>
          <p className="text-gray-500 mt-2 mb-8">Your {selectedPlan} subscription is now active. You have full access to all materials.</p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-green-700 text-white py-4 rounded-xl font-bold hover:bg-green-800 transition"
          >
            Start Learning
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentView;
