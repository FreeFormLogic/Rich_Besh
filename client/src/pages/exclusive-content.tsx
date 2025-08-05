import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Crown, Eye, TrendingUp, Calendar, Clock, Lock, Star } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';

const ExclusiveContent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const exclusiveVideos = [
    {
      id: 1,
      title: 'Секретная стратегия форекс',
      description: 'Раскрываю свою закрытую стратегию, которая принесла мне 15 миллионов рублей за год',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/9A703ADD-2C56-41CE-BA14-BFF553B28172.MP4',
      duration: '28:45',
      views: '45.2K',
      premium: true,
      category: 'strategy',
      uploadDate: '2 дня назад',
      profit: '+2.8M₽'
    },
    {
      id: 2,
      title: 'Анализ крипторынка на 2025',
      description: 'Прогноз движения Bitcoin, Ethereum и альткоинов. Где будут деньги в следующем году',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-03-14.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/circle%201.mp4',
      duration: '42:15',
      views: '89.7K',
      premium: true,
      category: 'crypto',
      uploadDate: '1 неделя назад',
      profit: '+5.1M₽'
    },
    {
      id: 3,
      title: 'Психология миллионера',
      description: 'Как я изменил свое мышление и начал зарабатывать миллионы. Личный опыт',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/circle%202.mp4',
      duration: '35:20',
      views: '124K',
      premium: false,
      category: 'mindset',
      uploadDate: '3 дня назад',
      profit: 'Безценно'
    },
    {
      id: 4,
      title: 'Разбор убыточных сделок',
      description: 'Показываю свои ошибки и убытки. Учимся на моих промахах, чтобы не повторять их',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-03-14.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/circle%203.mp4',
      duration: '19:33',
      views: '67.8K',
      premium: true,
      category: 'education',
      uploadDate: '5 дней назад',
      profit: '-450K₽'
    },
    {
      id: 5,
      title: 'Мой торговый день',
      description: 'Полный день торговли от пробуждения до закрытия позиций. Все сделки в реальном времени',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/circle%204.mp4',
      duration: '1:15:22',
      views: '156K',
      premium: true,
      category: 'daily',
      uploadDate: '1 день назад',
      profit: '+780K₽'
    },
    {
      id: 6,
      title: 'Как выбрать брокера',
      description: 'Критерии выбора надежного брокера. Сравниваю топ-10 площадок для торговли',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-03-14.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/circle%205.mp4',
      duration: '24:17',
      views: '78.3K',
      premium: false,
      category: 'education',
      uploadDate: '1 неделя назад',
      profit: 'Обучение'
    },
    {
      id: 7,
      title: 'Инвестиции в недвижимость',
      description: 'Мои инвестиции в недвижимость Дубая. Показываю объекты и доходность',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/circle%206.mp4',
      duration: '31:45',
      views: '92.1K',
      premium: true,
      category: 'investment',
      uploadDate: '4 дня назад',
      profit: '+12M₽'
    },
    {
      id: 8,
      title: 'Ошибки начинающих трейдеров',
      description: 'Топ-15 ошибок, которые делают 99% новичков. Как их избежать с самого начала',
      thumbnail: 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-03-14.jpg',
      videoUrl: 'https://richbesh.b-cdn.net/TG/circle%207.mp4',
      duration: '26:33',
      views: '203K',
      premium: false,
      category: 'education',
      uploadDate: '2 недели назад',
      profit: 'Обучение'
    }
  ];

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
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-yellow-400/20">
        <div className="flex items-center gap-4 p-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-400" />
          </button>
          
          <div>
            <h1 className="text-2xl font-black text-white">Эксклюзивный контент</h1>
            <p className="text-gray-400">Закрытые материалы от Rich Besh</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Premium Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <Crown className="w-12 h-12 text-black" />
            <div>
              <h2 className="text-black text-xl font-black mb-2">VIP контент</h2>
              <p className="text-black/80">Эксклюзивные материалы, которых нет в открытом доступе</p>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap font-bold transition-all ${
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
              onClick={() => navigate('/stories')}
            >
              <div className="flex">
                {/* Video Thumbnail */}
                <div className="relative w-48 h-32 flex-shrink-0">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
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
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-yellow-400 transition-colors">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
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
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all"
                    >
                      Получить доступ
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8">
            <h2 className="text-white text-2xl font-black mb-4">
              Хочешь доступ ко всем материалам?
            </h2>
            <p className="text-white/90 mb-6">
              Получи неограниченный доступ к закрытому контенту
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/courses')}
                className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                VIP подписка - 9,999₽/месяц
              </button>
              
              <p className="text-white/70 text-sm">
                Все эксклюзивные материалы + личная поддержка
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default ExclusiveContent;