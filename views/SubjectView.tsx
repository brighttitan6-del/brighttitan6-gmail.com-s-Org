
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SUBJECTS, COLORS } from '../constants';
import { useSmartPlatform } from '../App';

interface SubjectViewProps {
  isSubscribed: boolean;
}

const SubjectView: React.FC<SubjectViewProps> = ({ isSubscribed }) => {
  const { id } = useParams<{ id: string }>();
  const { videos: allVideos } = useSmartPlatform();
  const subject = SUBJECTS.find(s => s.id === id);
  const videos = allVideos.filter(v => v.subjectId === id);

  if (!subject) return <div className="p-8 text-center">Subject not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-24">
      <div className="flex items-center space-x-4 mb-10">
        <Link to="/" className="w-12 h-12 rounded-2xl border bg-white shadow-sm flex items-center justify-center hover:bg-gray-50 transition active:scale-90">
          <i className="fas fa-chevron-left text-gray-500"></i>
        </Link>
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">{subject.name}</h1>
          <p className="text-gray-500 font-medium">{subject.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.length > 0 ? (
          videos.map((video) => {
            const needsSub = video.isPaid && !isSubscribed;
            return (
              <Link 
                key={video.id} 
                to={needsSub ? '/payment' : `/video/${video.id}`}
                className="bg-white rounded-[2.5rem] overflow-hidden border shadow-sm group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="relative aspect-video">
                  <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-[#006D44] shadow-2xl opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition duration-300">
                      <i className={`fas ${needsSub ? 'fa-lock' : 'fa-play'}`}></i>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 ${video.isPaid ? 'bg-red-500/80 text-white' : 'bg-green-500/80 text-white'}`}>
                      {video.isPaid ? 'Premium' : 'Free'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 text-white text-[10px] rounded font-black tracking-widest">
                    {Math.floor(video.duration / 60)}:00
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-xl text-gray-800 line-clamp-1 group-hover:text-[#006D44] transition">{video.title}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 font-medium">{video.description}</p>
                  {needsSub && (
                    <div className="mt-6 flex items-center text-red-500 text-[10px] font-black tracking-widest bg-red-50 px-3 py-2 rounded-xl">
                      <i className="fas fa-lock mr-2"></i> UNLOCK WITH PREMIUM
                    </div>
                  )}
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full py-24 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-folder-open text-gray-300 text-3xl"></i>
            </div>
            <h3 className="text-2xl font-black text-gray-400">No lessons uploaded yet</h3>
            <p className="text-gray-500 font-medium">Check back later for new content from our teachers.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectView;
