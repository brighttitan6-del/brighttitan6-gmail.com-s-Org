
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_VIDEOS, SUBJECTS, COLORS } from '../constants';
import { getAITutorHelp } from '../services/geminiService';

interface VideoPlayerViewProps {
  isSubscribed: boolean;
}

const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({ isSubscribed }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const video = MOCK_VIDEOS.find(v => v.id === id);
  const subject = SUBJECTS.find(s => s.id === video?.subjectId);
  
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  useEffect(() => {
    if (!isSubscribed) {
      navigate('/payment');
    }
  }, [isSubscribed, navigate]);

  if (!video) return <div className="p-8 text-center">Video not found</div>;

  const handleAskAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    const response = await getAITutorHelp(aiQuestion, subject?.name || 'General Studies');
    setAiResponse(response);
    setIsAiLoading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Video Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-black rounded-2xl overflow-hidden aspect-video relative group">
          <video 
            controls 
            className="w-full h-full"
            poster={video.thumbnail}
            controlsList="nodownload"
            onContextMenu={e => e.preventDefault()}
          >
            <source src={video.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">{video.title}</h1>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase">{subject?.name}</span>
            <span><i className="far fa-clock mr-1"></i> {Math.floor(video.duration / 60)} Minutes</span>
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed">
            {video.description}. This lesson covers foundational principles essential for MSCE examination performance. Take notes as you watch!
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center">
            <i className="fas fa-list-check mr-2 text-green-600"></i> Lesson Takeaways
          </h3>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <li key={i} className="flex items-start space-x-3 text-sm text-gray-600">
                <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-[10px] mt-0.5">{i}</span>
                <span>Important point about the topic covered in this section of the video lesson.</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* AI Tutor Sidebar */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-2xl p-6 text-white shadow-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3 className="font-bold">AI Tutor Helper</h3>
              <p className="text-[10px] text-green-200 uppercase tracking-widest">Always Online</p>
            </div>
          </div>
          
          <form onSubmit={handleAskAi} className="space-y-3">
            <p className="text-xs text-green-100 mb-2">Confused about something? Ask the AI Tutor for clarification.</p>
            <textarea 
              className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-sm placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[100px]"
              placeholder="e.g. How do I solve for x in the quadratic formula?"
              value={aiQuestion}
              onChange={e => setAiQuestion(e.target.value)}
            />
            <button 
              type="submit"
              disabled={isAiLoading || !aiQuestion}
              className="w-full bg-white text-green-800 font-bold py-2 rounded-lg hover:bg-green-50 transition disabled:opacity-50"
            >
              {isAiLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Ask Tutor'}
            </button>
          </form>

          {aiResponse && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/10 text-sm animate-fade-in">
              <p className="font-bold text-xs uppercase mb-2 text-green-300">Response:</p>
              <div className="leading-relaxed whitespace-pre-wrap">{aiResponse}</div>
            </div>
          )}
        </div>

        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold mb-4">Other Lessons</h3>
          <div className="space-y-4">
            {MOCK_VIDEOS.filter(v => v.id !== id).slice(0, 3).map(v => (
              <Link key={v.id} to={`/video/${v.id}`} className="flex space-x-3 group">
                <div className="w-20 h-12 rounded overflow-hidden flex-shrink-0">
                  <img src={v.thumbnail} className="w-full h-full object-cover" alt="" />
                </div>
                <div>
                  <h4 className="text-xs font-bold line-clamp-1 group-hover:text-green-600 transition">{v.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">{Math.floor(v.duration/60)} mins</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayerView;
