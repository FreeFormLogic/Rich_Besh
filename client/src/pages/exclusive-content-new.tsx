import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Crown, Eye, Calendar, Lock } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';
import { getInstagramPostsByCategory } from '@shared/instagram-data';

const ExclusiveContent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const baseInstagramPosts = getInstagramPostsByCategory('all');
  
  // ИСПРАВЛЕНО: ОЧЕНЬ короткие заголовки для решения проблемы макета
  const exclusiveVideos = baseInstagramPosts.slice(0, 16).map((post, index) => {
    let title = 'Контент';
    
    // Максимально короткие заголовки
    if (post.description.includes('Honored')) title = 'VIP встреча';
    else if (post.description.toLowerCase().includes('мотоцикл')) title = 'Мото';
    else if (post.description.toLowerCase().includes('aqua')) title = 'Aqua';
    else if (post.description.toLowerCase().includes('tesla')) title = 'Tesla';
    else if (post.description.toLowerCase().includes('дом')) title = 'Дом';
    else if (post.description.toLowerCase().includes('trade')) title = 'Трейд';
    else if (post.description.toLowerCase().includes('дубай')) title = 'Дубай';
    else title = `Видео ${index + 1}`;
    
    return {
      id: post.id,
      title: title, // МАКСИМУМ 10 символов
      description: post.description.length > 30 ? `${post.description.substring(0, 30)}...` : post.description,
      thumbnail: post.thumbnail,
      videoUrl: `https://richbesh.b-cdn.net/TG/circle%20${(index % 8) + 1}.mp4`, // ИСПРАВЛЕНО: используем реальные видео
      duration: `${Math.floor(Math.random() * 15) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      views: `${Math.floor(post.likes / 1000)}K`,
      premium: index % 2 === 0,
      category: post.category,
      uploadDate: `${Math.floor(Math.random() * 7) + 1}д`,
      profit: index % 3 === 0 ? `+${Math.floor(Math.random() * 500) + 100}K₽` : 'VIP'
    };
  });

  const categories = [
    { id: 'all', name: 'Все', count: exclusiveVideos.length },
    { id: 'luxury', name: 'Роскошь', count: 8 },
    { id: 'trading', name: 'Трейдинг', count: 6 },
    { id: 'lifestyle', name: 'Жизнь', count: 10 }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? exclusiveVideos 
    : exclusiveVideos.filter(v => v.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-yellow-400/20">
        <div className="flex items-center gap-4 p-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-400" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white">Эксклюзивный контент</h1>
            <p className="text-gray-400 text-xs">Закрытые материалы от Rich Besh</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
            VIP
          </div>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full whitespace-nowrap font-medium transition-all text-sm ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span>{category.name}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-black/20">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* ИСПРАВЛЕНО: Компактные карточки с коротким текстом */}
        <div className="space-y-3">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/exclusive-content/${video.id}`)}
            >
              <div className="flex">
                {/* Thumbnail - компактный размер */}
                <div className="relative w-32 h-20 flex-shrink-0">
                  <video 
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-10 h-10 bg-yellow-400/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-black ml-0.5" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                    {video.duration}
                  </div>

                  {video.premium && (
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5" />
                      VIP
                    </div>
                  )}
                </div>
                
                {/* ИСПРАВЛЕНО: Компактная информация */}
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-white font-bold text-sm mb-1 truncate">
                      {video.title}
                    </h3>
                    
                    <p className="text-gray-300 text-xs leading-tight line-clamp-2 mb-2">
                      {video.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{video.views}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-xs text-green-400">
                        {video.profit}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Banner */}
        <div className="mt-8 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30">
          <div className="text-center">
            <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-black text-white mb-2">Станьте VIP участником</h2>
            <p className="text-purple-200 text-sm mb-4">
              Получите доступ ко всем эксклюзивным материалам
            </p>
            
            <button 
              onClick={() => navigate('/courses')}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
            >
              Оформить подписку
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ExclusiveContent;