import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Crown, Eye, TrendingUp, Calendar, Clock, Lock, Star } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';
import { getInstagramPostsByCategory } from '@shared/instagram-data';

const ExclusiveContent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Используем реальные Instagram данные для эксклюзивного контента
  const baseInstagramPosts = getInstagramPostsByCategory('all');
  
  const exclusiveVideos = baseInstagramPosts.slice(0, 12).map((post, index) => {
    // Создаем короткий заголовок из первых слов
    const titleWords = post.description.split(' ').slice(0, 4).join(' ');
    const shortTitle = titleWords.length > 35 ? `${titleWords.substring(0, 35)}...` : titleWords;
    
    return {
      id: post.id,
      title: shortTitle || `Эксклюзивный контент #${index + 1}`,
      description: post.description.length > 60 ? `${post.description.substring(0, 60)}...` : post.description,
      thumbnail: post.thumbnail,
      videoUrl: post.videoUrl || `https://richbesh.b-cdn.net/TG/circle%20${index + 1}.mp4`,
      duration: `${Math.floor(Math.random() * 20) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      views: `${Math.floor(post.likes / 1000)}K`,
      premium: index % 2 === 0,
      category: post.category,
      uploadDate: `${Math.floor(Math.random() * 7) + 1} ${Math.random() > 0.5 ? 'дней' : 'недель'} назад`,
      profit: index % 3 === 0 ? `+${Math.floor(Math.random() * 500) + 100}K₽` : 'Премиум'
    };
  });

  const categories = [
    { id: 'all', name: 'Все', icon: '🔥', count: exclusiveVideos.length },
    { id: 'strategy', name: 'Стратегии', icon: '🎯', count: exclusiveVideos.filter(v => v.category === 'strategy').length },
    { id: 'crypto', name: 'Крипто', icon: '₿', count: exclusiveVideos.filter(v => v.category === 'crypto').length },
    { id: 'daily', name: 'Торговля', icon: '📊', count: exclusiveVideos.filter(v => v.category === 'daily').length },
    { id: 'education', name: 'Обучение', icon: '🎓', count: exclusiveVideos.filter(v => v.category === 'education').length },
    { id: 'mindset', name: 'Мышление', icon: '🧠', count: exclusiveVideos.filter(v => v.category === 'mindset').length },
    { id: 'investment', name: 'Инвестиции', icon: '🏢', count: exclusiveVideos.filter(v => v.category === 'investment').length }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? exclusiveVideos 
    : exclusiveVideos.filter(v => v.category === selectedCategory);

  const getProfitColor = (profit: string) => {
    if (profit.includes('+')) return 'text-green-400';
    if (profit.includes('-')) return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-yellow-400/20">
        <div className="flex items-center gap-4 p-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-400" />
          </button>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Эксклюзивный контент</h1>
            <p className="text-gray-400 text-sm">Закрытые материалы от Rich Besh</p>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
            VIP
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-black scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id ? 'bg-black/20' : 'bg-yellow-400/20'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="space-y-6">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
              onClick={() => {
                navigate(`/exclusive-content/${video.id}`);
              }}
            >
              <div className="flex">
                {/* Video Thumbnail */}
                <div className="relative w-48 h-32 flex-shrink-0">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 bg-yellow-400/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>

                  {/* Premium Badge */}
                  {video.premium && (
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      VIP
                    </div>
                  )}
                </div>
                
                {/* Video Info */}
                <div className="flex-1 p-6">
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-yellow-400 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views}</span>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{video.uploadDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`font-bold text-lg ${getProfitColor(video.profit)}`}>
                        {video.profit}
                      </div>
                      <div className="text-xs text-gray-400">
                        {video.profit.includes('₽') ? 'Результат' : 'Тип'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Locked Overlay for Premium Content */}
              {video.premium && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center">
                    <Lock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-white font-bold text-lg mb-2">VIP контент</h4>
                    <p className="text-gray-300 mb-4">Доступен только подписчикам</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/courses');
                      }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
                    >
                      Получить доступ
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Premium Subscription Banner */}
        <div className="mt-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4">
              Станьте VIP участником
            </h2>
            <p className="text-purple-200 text-lg mb-8">
              Получите доступ ко всем эксклюзивным материалам и персональному менторству
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/courses')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
              >
                Оформить подписку
              </button>
              
              <button 
                onClick={() => navigate('/consultations')}
                className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 hover:text-black transition-colors"
              >
                Персональная консультация
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ExclusiveContent;