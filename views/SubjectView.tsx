
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { SUBJECTS, MOCK_VIDEOS, COLORS } from '../constants';

interface SubjectViewProps {
  isSubscribed: boolean;
}

const SubjectView: React.FC<SubjectViewProps> = ({ isSubscribed }) => {
  const { id } = useParams<{ id: string }>();
  const subject = SUBJECTS.find(s => s.id === id);
  const videos = MOCK_VIDEOS.filter(v => v.subjectId === id);

  if (!subject) return <div className="p-8 text-center">Subject not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-8">
        <Link to="/" className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-100 transition">
          <i className="fas fa-chevron-left text-gray-500"></i>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">{subject.name}</h1>
          <p className="text-gray-500">{subject.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length > 0 ? (
          videos.map((video) => (
            <Link 
              key={video.id} 
              to={`/video/${video.id}`}
              className="bg-white rounded-2xl overflow-hidden border shadow-sm group hover:shadow-md transition"
            >
              <div className="relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-green-700 shadow-xl opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition duration-300">
                    <i className="fas fa-play"></i>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-[10px] rounded font-bold">
                  {Math.floor(video.duration / 60)}:00
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-800 line-clamp-1">{video.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{video.description}</p>
                {!isSubscribed && (
                   <div className="mt-4 flex items-center text-red-500 text-xs font-bold bg-red-50 p-2 rounded">
                     <i className="fas fa-lock mr-2"></i> REQUIRES SUBSCRIPTION
                   </div>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-folder-open text-gray-300 text-3xl"></i>
            </div>
            <h3 className="text-lg font-bold text-gray-400">No lessons uploaded yet</h3>
            <p className="text-gray-500">Check back later for new content.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectView;
