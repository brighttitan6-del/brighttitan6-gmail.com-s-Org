
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, ChatMessage } from '../types';
import { MOCK_LIVE_CLASSES, COLORS } from '../constants';
import { getAITutorHelp } from '../services/geminiService';

interface LiveClassRoomProps {
  user: User;
}

const LiveClassRoom: React.FC<LiveClassRoomProps> = ({ user }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const session = MOCK_LIVE_CLASSES.find(s => s.id === id);
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial welcome message
    if (session) {
      setMessages([{
        id: 'system-1',
        userId: 'system',
        userName: 'System',
        message: `Welcome to ${session.title}! The teacher will start shortly.`,
        timestamp: new Date().toISOString()
      }]);
    }
  }, [session]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!session) return <div className="p-8 text-center">Class session not found</div>;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      message: inputText,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // Simulate teacher response
    if (inputText.toLowerCase().includes('hello') || inputText.toLowerCase().includes('bwanji')) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 't-resp',
          userId: session.teacherId,
          userName: session.teacherName,
          message: `Muli bwanji ${user.name.split(' ')[0]}! Welcome to the class.`,
          timestamp: new Date().toISOString()
        }]);
      }, 1500);
    }
  };

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    const response = await getAITutorHelp(aiQuestion, `Live Class: ${session.title}`);
    setAiResponse(response);
    setIsAiLoading(false);
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col lg:flex-row bg-gray-900 overflow-hidden">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col h-full bg-black relative">
        <div className="absolute top-4 left-4 z-10 flex items-center space-x-3 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
           <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></div>
           <span className="text-white text-xs font-bold uppercase tracking-wider">LIVE</span>
           <span className="text-white/60 text-xs">|</span>
           <span className="text-white text-xs">{session.teacherName}</span>
        </div>
        
        <button 
          onClick={() => navigate('/live')}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full backdrop-blur-md transition"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="flex-1 flex items-center justify-center text-white relative overflow-hidden">
           {/* Simulated Webcam Feed */}
           <img 
              src={`https://picsum.photos/1280/720?random=${session.id}`} 
              className="w-full h-full object-cover opacity-80"
              alt="Live Feed"
           />
           <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-center p-8 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 max-w-sm">
                <i className="fas fa-chalkboard-teacher text-5xl mb-4 text-green-500"></i>
                <h2 className="text-xl font-bold">{session.title}</h2>
                <p className="text-sm text-white/60 mt-2">Class is currently in progress. Ensure your speakers are on.</p>
              </div>
           </div>
        </div>

        {/* Video Controls */}
        <div className="h-16 bg-gray-900 border-t border-white/10 flex items-center justify-center space-x-6">
           <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><i className="fas fa-microphone"></i></button>
           <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><i className="fas fa-video"></i></button>
           <button className="w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white transition shadow-lg"><i className="fas fa-phone-slash"></i></button>
           <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><i className="fas fa-hand"></i></button>
           <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition"><i className="fas fa-desktop"></i></button>
        </div>
      </div>

      {/* Sidebar - Chat & AI Helper */}
      <div className="w-full lg:w-[400px] h-full bg-white flex flex-col shadow-2xl z-20">
        <div className="flex border-b">
           <button className="flex-1 py-4 text-sm font-bold border-b-2 border-green-600 text-green-600">Live Chat</button>
           <button className="flex-1 py-4 text-sm font-bold text-gray-400 hover:bg-gray-50">AI Assistant</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
           {messages.map((msg) => (
             <div key={msg.id} className={`flex flex-col ${msg.userId === user.id ? 'items-end' : 'items-start'}`}>
               <span className="text-[10px] font-bold text-gray-400 mb-1 px-1">
                 {msg.userName} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
               </span>
               <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm shadow-sm ${
                 msg.userId === user.id ? 'bg-green-600 text-white rounded-tr-none' : 
                 msg.userId === 'system' ? 'bg-gray-200 text-gray-600 italic font-medium' :
                 'bg-white text-gray-800 rounded-tl-none border'
               }`}>
                 {msg.message}
               </div>
             </div>
           ))}
           <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t bg-white">
           <form onSubmit={handleSendMessage} className="flex space-x-2">
             <input 
               type="text" 
               className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-green-600 transition"
               placeholder="Type a message..."
               value={inputText}
               onChange={e => setInputText(e.target.value)}
             />
             <button type="submit" className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition active:scale-95">
               <i className="fas fa-paper-plane"></i>
             </button>
           </form>
        </div>

        {/* AI Mini-overlay for live help */}
        <div className="bg-green-700 text-white p-4">
           <h4 className="text-xs font-bold flex items-center mb-2 uppercase tracking-widest">
              <i className="fas fa-robot mr-2"></i> Private AI Tutor
           </h4>
           <div className="flex space-x-2">
             <input 
               type="text" 
               className="flex-1 bg-white/10 border-white/20 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-green-300 focus:outline-none focus:ring-1 focus:ring-white"
               placeholder="Quick question for AI?"
               value={aiQuestion}
               onChange={e => setAiQuestion(e.target.value)}
             />
             <button 
               onClick={handleAskAi}
               disabled={isAiLoading}
               className="bg-white text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-50 transition"
             >
               {isAiLoading ? '...' : 'Ask'}
             </button>
           </div>
           {aiResponse && (
             <div className="mt-2 text-[10px] bg-white/10 p-2 rounded border border-white/10 line-clamp-3 hover:line-clamp-none transition-all cursor-pointer" onClick={() => setAiResponse('')}>
               {aiResponse}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default LiveClassRoom;
