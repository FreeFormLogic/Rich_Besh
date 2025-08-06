import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Crown, Zap, TrendingUp, Sparkles, ChevronRight, Star } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';
import { instagramData } from '@shared/instagram-data';

const Home = () => {
  const navigate = useNavigate();

  // Используем реальные данные Instagram
  const featuredVideos = instagramData.slice(0, 3).map(post => ({
    id: post.id,
    title: post.description.split(' - ')[0] || post.description.split('.')[0] || 'Эксклюзивный контент',
    videoUrl: post.type === 'video' ? post.videoUrl : '',
    thumbnail: post.thumbnail,
    description: post.description,
    views: `${Math.floor(post.likes / 1000)}K`,
    duration: '02:15'
  }));

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'VIP Прогнозы',
      description: 'Точные торговые сигналы с вероятностью успеха 94%',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: 'Курсы от Rich Besh',
      description: 'Эксклюзивное обучение трейдингу и инвестициям',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Lifestyle контент',
      description: 'Роскошная жизнь миллионера в Дубае',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Торговые результаты',
      description: 'Реальные сделки и доходы в прямом эфире',
      color: 'from-blue-500 to-cyan-600'
    }
  ];

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://richbesh.b-cdn.net/IG/2025-07-21_3681517492775539740.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
        </div>

        {/* Header с профилем */}
        <div className="relative z-20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                  <img 
                    src="https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg"
                    alt="Rich Besh"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 flex items-center space-x-1 bg-green-500 px-2 py-1 rounded-full">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Rich Besh</h2>
                <p className="text-yellow-400 text-sm font-medium">Миллионер • Ментор • Lifestyle</p>
                <div className="flex items-center text-xs text-gray-300 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  <span>4.9 • 25K подписчиков</span>
                </div>
              </div>
            </div>
            
            <div className="bg-red-500 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse">
              <span className="text-white font-bold text-sm flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                LIVE
              </span>
            </div>
          </div>
        </div>

        {/* Stories Section - Между профилем и заголовком */}
        <div className="absolute top-28 left-6 right-6 z-40">
          <div className="flex gap-3 overflow-x-auto py-1 scrollbar-hide">
            {[
              'https://richbesh.b-cdn.net/TG/9A703ADD-2C56-41CE-BA14-BFF553B28172.MP4',
              'https://richbesh.b-cdn.net/TG/circle%201.mp4',
              'https://richbesh.b-cdn.net/TG/circle%202.mp4',
              'https://richbesh.b-cdn.net/TG/circle%203.mp4',
              'https://richbesh.b-cdn.net/TG/circle%204.mp4',
              'https://richbesh.b-cdn.net/TG/circle%205.mp4',
              'https://richbesh.b-cdn.net/TG/circle%206.mp4',
              'https://richbesh.b-cdn.net/TG/circle%207.mp4',
              'https://richbesh.b-cdn.net/TG/circle%208.mp4',
              'https://richbesh.b-cdn.net/TG/E97D113E-0D7D-4268-B08B-CB647C4EAA65.MOV',
              'https://richbesh.b-cdn.net/TG/IMG_6817.MP4',
              'https://richbesh.b-cdn.net/TG/IMG_8764.MOV'
            ].filter(url => url.endsWith('.MP4') || url.endsWith('.MOV') || url.endsWith('.mp4')).slice(0, 6).map((videoUrl, index) => (
              <button
                key={`story-${index}-${videoUrl.slice(-20)}`}
                type="button"
                onClick={() => {
                  console.log(`Stories click #${index} -> /stories?video=${index}`);
                  navigate(`/stories?video=${index}`);
                }}
                className="story-ring hover:scale-[1.03] transition-transform cursor-pointer shrink-0"
              >
                <video
                  src={videoUrl}
                  className="w-full h-full object-cover rounded-full"
                  muted
                  playsInline
                  preload="metadata"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Основной заголовок в нижней части */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black text-white mb-6 leading-none tracking-tight">
              ПУТЬ К
              <br/>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                БОГАТСТВУ
              </span>
            </h1>
            
            <p className="text-white/90 text-xl mb-8 font-medium leading-relaxed">
              Узнай секреты luxury lifestyle и научись зарабатывать 
              <span className="text-yellow-400 font-bold"> миллионы</span> как я
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/predictions')}
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-400/25"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Начать зарабатывать
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/courses')}
                className="group bg-black/60 backdrop-blur-md text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 border border-yellow-400/50 hover:border-yellow-400 transition-all duration-300"
              >
                <Crown className="w-6 h-6 text-yellow-400" />
                VIP курсы
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats */}
      <div className="relative -mt-24 mx-6 z-30">
        <div className="bg-black/90 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-8 shadow-2xl">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                25K+
              </div>
              <div className="text-gray-300 text-sm font-medium">Учеников в элите</div>
            </div>
            <div className="text-center border-x border-gray-700/50">
              <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                94%
              </div>
              <div className="text-gray-300 text-sm font-medium">Успешных результатов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                $5M+
              </div>
              <div className="text-gray-300 text-sm font-medium">Заработано учениками</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16">
        <h2 className="text-4xl font-black text-white mb-4 text-center">
          Почему выбирают
          <span className="text-yellow-400"> Rich Besh</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 text-lg">
          Эксклюзивные возможности для избранных
        </p>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative flex items-center gap-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                <ChevronRight className="w-8 h-8 text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Mentorship Block */}
        <div className="mt-16 mb-8">
          <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white mb-4">
                Персональное менторство
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Индивидуальная работа с Rich Besh. Стратегии, которые превратят тебя в миллионера
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => navigate('/consultations')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-bold rounded-full hover:scale-105 transform transition-all duration-300"
                >
                  Записаться на менторство
                </button>
                <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 text-lg font-bold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-300">
                  Узнать больше
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Videos */}
      <div className="px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black text-white">
            Эксклюзивный контент
          </h2>
          <button 
            onClick={() => navigate('/exclusive-content')}
            className="text-yellow-400 hover:text-white transition-colors font-semibold flex items-center gap-2"
          >
            Смотреть все
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-6">
          {featuredVideos.slice(0, 3).map((video, index) => (
            <div 
              key={video.id}
              className="group relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
              onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.closest('.video-play-area')) {
                  window.open(video.videoUrl, '_blank');
                } else {
                  navigate(`/exclusive-content/${video.id}`);
                }
              }}
            >
              <div className="flex">
                <div className="relative w-40 h-28 flex-shrink-0">
                  <img 
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/attached_assets/image_1754412229756.png';
                    }}
                  />
                  <div 
                    className="video-play-area absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(video.videoUrl, '_blank');
                    }}
                  >
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white font-bold text-xl group-hover:text-yellow-400 transition-colors leading-tight">
                      {video.title}
                    </h3>
                    <span className="text-yellow-400 text-sm font-semibold bg-yellow-400/10 px-3 py-1 rounded-full whitespace-nowrap ml-4">
                      Премиум контент
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-base mb-4 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center text-sm text-gray-400">
                    <span className="flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {video.views} просмотров
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-12 text-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-5xl font-black text-black mb-6 leading-tight">
              Готов стать следующим?
            </h2>
            <p className="text-black/80 text-xl mb-12 font-semibold max-w-2xl mx-auto">
              Присоединяйся к элитному сообществу миллионеров
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <button 
                onClick={() => navigate('/predictions')}
                className="w-full bg-black text-yellow-400 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors shadow-2xl"
              >
                <Zap className="w-6 h-6" />
                Начать зарабатывать сейчас
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => navigate('/courses')}
                className="w-full bg-black/20 backdrop-blur-sm text-black py-5 rounded-2xl font-bold text-lg hover:bg-black/30 transition-colors"
              >
                Посмотреть обучение
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-24"></div>
      <BottomNavigation />
    </div>
  );
};

export default Home;