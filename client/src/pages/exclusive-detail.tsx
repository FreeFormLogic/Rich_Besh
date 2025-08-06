import React, { useEffect, useState } from 'react';
import { ArrowLeft, Play, Heart, MessageCircle, Share, Eye, Calendar } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInstagramPostById } from '@shared/instagram-data';
import BottomNavigation from '@/components/bottom-navigation';

const ExclusiveDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (id) {
      const foundPost = getInstagramPostById(id);
      setPost(foundPost);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Контент не найден</h2>
          <button 
            onClick={() => navigate('/exclusive-content')}
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold"
          >
            Вернуться к контенту
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate('/exclusive-content')}
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Назад</span>
          </button>
          
          <h1 className="text-lg font-bold">Эксклюзивный контент</h1>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Share className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Video/Image Section */}
        <div className="relative rounded-2xl overflow-hidden mb-6 bg-gray-900">
          {post.type === 'video' ? (
            <div className="relative aspect-video">
              <video
                src={post.videoUrl}
                poster={post.thumbnail}
                controls
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onError={(e) => {
                  console.log('Video error:', post.videoUrl);
                  // Используем fallback видео
                  const video = e.target as HTMLVideoElement;
                  video.src = 'https://richbesh.b-cdn.net/IG/2025-07-23_3683192790368544979.mp4';
                }}
                crossOrigin="anonymous"
                preload="metadata"
              />
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Play className="w-10 h-10 text-black ml-1" />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <img 
              src={(post as any).imageUrl || post.thumbnail}
              alt={post.description}
              className="w-full aspect-square object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg';
              }}
            />
          )}
        </div>

        {/* Content Info */}
        <div className="space-y-6">
          {/* Title and Description */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              {post.description.split(' - ')[0] || post.description.split('.')[0] || 'Эксклюзивный контент'}
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {post.description}
            </p>
          </div>

          {/* Stats */}
          <div className="bg-gray-900/50 rounded-xl p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5 text-red-500 mr-1" />
                </div>
                <div className="text-xl font-bold text-white">{post.likes.toLocaleString()}</div>
                <div className="text-sm text-gray-400">лайков</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <MessageCircle className="w-5 h-5 text-blue-500 mr-1" />
                </div>
                <div className="text-xl font-bold text-white">{post.comments}</div>
                <div className="text-sm text-gray-400">комментариев</div>
              </div>
              <div>
                <div className="flex items-center justify-center mb-2">
                  <Eye className="w-5 h-5 text-green-500 mr-1" />
                </div>
                <div className="text-xl font-bold text-white">{Math.floor(post.likes * 3.2).toLocaleString()}</div>
                <div className="text-sm text-gray-400">просмотров</div>
              </div>
            </div>
          </div>

          {/* Category and Date */}
          <div className="flex items-center justify-between bg-gray-900/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">RB</span>
              </div>
              <div>
                <div className="font-semibold text-white">Rich Besh</div>
                <div className="text-sm text-gray-400">Создатель</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-yellow-400 font-medium capitalize">{post.category}</div>
              <div className="text-xs text-gray-400 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Эксклюзивно
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform">
              <Heart className="w-5 h-5" />
              Сохранить в избранное
            </button>
            
            <button 
              onClick={() => navigate('/predictions')}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
            >
              Получить VIP прогнозы
            </button>
            
            <button 
              onClick={() => navigate('/courses')}
              className="w-full border-2 border-yellow-400 text-yellow-400 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Смотреть курсы обучения
            </button>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
      <BottomNavigation />
    </div>
  );
};

export default ExclusiveDetail;