import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Crown, Zap, TrendingUp, Sparkles, ChevronRight, Star } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';
import { instagramData } from '@shared/instagram-data';
import avatarImage from '@assets/Avatar_1754480043650.jpg';

// Компонент для создания превью из видео
const VideoThumbnail = ({ videoUrl, title, className }: { videoUrl: string; title: string; className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailGenerated, setThumbnailGenerated] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    let currentAttempt = 0;
    // Попробуем разные моменты времени для разных типов видео
    const timePoints = [3, 5, 7, 2, 10, 1, 0.5, 4, 6, 8];
    
    const generateThumbnail = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Проверяем, что видео загружено и имеет размеры
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        setTimeout(() => tryNextTimePoint(), 100);
        return;
      }
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Проверяем, что кадр не черный (пустой)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let brightness = 0;
        for (let i = 0; i < data.length; i += 4) {
          brightness += (data[i] + data[i + 1] + data[i + 2]) / 3;
        }
        brightness = brightness / (data.length / 4);
        
        // Если кадр слишком темный, пробуем следующую временную точку
        if (brightness < 10 && currentAttempt < timePoints.length - 1) {
          setTimeout(() => tryNextTimePoint(), 100);
          return;
        }
        
        setThumbnailGenerated(true);
      } catch (error) {
        setTimeout(() => tryNextTimePoint(), 100);
      }
    };

    const tryNextTimePoint = () => {
      if (currentAttempt < timePoints.length && video.duration > 0) {
        const timePoint = Math.min(timePoints[currentAttempt], video.duration - 0.1);
        video.currentTime = timePoint;
        currentAttempt++;
      }
    };

    const handleLoadedData = () => {
      if (video.duration > 0) {
        tryNextTimePoint();
      }
    };

    const handleSeeked = () => {
      if (!thumbnailGenerated) {
        generateThumbnail();
      }
    };

    const handleError = () => {
      tryNextTimePoint();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
    };
  }, [videoUrl, thumbnailGenerated]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        playsInline
        preload="metadata"
        className="hidden"
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-cover ${!thumbnailGenerated ? 'hidden' : ''}`}
      />
      {!thumbnailGenerated && (
        <div className="w-full h-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 flex items-center justify-center">
          <div className="text-white/60 text-sm font-medium text-center px-4">
            {title}
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  // Используем только видео контент из Instagram
  const featuredVideos = instagramData.filter(post => post.type === 'video').slice(0, 3).map(post => ({
    id: post.id,
    title: post.description.split(' - ')[0] || post.description.split('.')[0] || 'Эксклюзивный контент',
    videoUrl: post.videoUrl,
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

        {/* Header с профилем и Stories */}
        <div className="relative z-20 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-1">
                  <img 
                    src={avatarImage}
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

          {/* Stories Section - С градиентом по краям */}
          <div className="relative -mx-6">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pl-6 pr-6">
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
            
            {/* Градиентная маска по краям - от самых краев экрана */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10"></div>
          </div>
        </div>

        {/* Main Content - Основной заголовок ниже Stories */}
        <div className="absolute top-48 left-0 right-0 p-6 z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight">
              ПУТЬ К
              <br/>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                БОГАТСТВУ
              </span>
            </h1>
            
            <p className="text-white/90 text-lg sm:text-xl mb-8 font-medium leading-relaxed">
              Узнай секреты luxury lifestyle и научись зарабатывать 
              <span className="text-yellow-400 font-bold"> миллионы</span> как я
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/predictions')}
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-400/25"
              >
                <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                Начать зарабатывать
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/courses')}
                className="group bg-black/60 backdrop-blur-md text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 border border-yellow-400/50 hover:border-yellow-400 transition-all duration-300"
              >
                <Crown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                VIP курсы
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats */}
      <div className="relative mt-16 mx-2 sm:mx-4 z-30">
        <div className="bg-black/90 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-3 sm:p-6 shadow-2xl">
          <div className="grid grid-cols-3 gap-1 sm:gap-4">
            <div className="text-center px-1">
              <div className="text-xl sm:text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-1">
                25K+
              </div>
              <div className="text-gray-300 text-xs sm:text-sm font-medium leading-tight">Учеников в элите</div>
            </div>
            <div className="text-center border-x border-gray-700/50 px-1">
              <div className="text-xl sm:text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-1">
                94%
              </div>
              <div className="text-gray-300 text-xs sm:text-sm font-medium leading-tight">Успешных результатов</div>
            </div>
            <div className="text-center px-1">
              <div className="text-xl sm:text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">
                $5M+
              </div>
              <div className="text-gray-300 text-xs sm:text-sm font-medium leading-tight">Заработано учениками</div>
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
      <div className="py-12">
        <div className="px-4 sm:px-6 mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-white flex-1">
              Эксклюзивный
              <span className="text-yellow-400"> контент</span>
            </h2>
            <button 
              onClick={() => {
                navigate('/exclusive-content');
                setTimeout(() => window.scrollTo(0, 0), 100);
              }}
              className="text-yellow-400 hover:text-white transition-colors font-semibold flex items-center gap-1 text-xs sm:text-sm ml-2 flex-shrink-0"
            >
              Смотреть все
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 px-6 pb-2" style={{ width: 'max-content' }}>
            {featuredVideos.slice(0, 5).map((video, index) => (
              <div 
                key={video.id}
                className="group relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer w-80 flex-shrink-0"
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.closest('.video-play-area')) {
                    window.open(video.videoUrl, '_blank');
                  } else {
                    navigate(`/exclusive-content/${video.id}`);
                  }
                }}
              >
                <div className="relative w-full h-44 bg-gray-800">
                  {video.videoUrl ? (
                    <VideoThumbnail 
                      videoUrl={video.videoUrl}
                      title={video.title}
                      className="w-full h-full"
                    />
                  ) : (
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://richbesh.b-cdn.net/TG/photo_2025-08-06_00-02-59.jpg';
                      }}
                    />
                  )}
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
                  
                  <div className="absolute top-2 right-2">
                    <span className="text-yellow-400 text-xs font-semibold bg-yellow-400/10 backdrop-blur-sm px-2 py-1 rounded-full">
                      Премиум
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-white font-bold text-lg group-hover:text-yellow-400 transition-colors leading-tight mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 mb-3">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center text-xs text-gray-400">
                    <span className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      {video.views} просмотров
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6 sm:p-12 text-center">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-black text-black mb-4 sm:mb-6 leading-tight px-2">
              Готов стать следующим?
            </h2>
            <p className="text-black/80 text-lg sm:text-xl mb-8 sm:mb-12 font-semibold max-w-2xl mx-auto px-4">
              Присоединяйся к элитному сообществу миллионеров
            </p>
            
            <div className="space-y-4 max-w-md mx-auto px-4">
              <button 
                onClick={() => navigate('/predictions')}
                className="w-full bg-black text-yellow-400 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center hover:bg-gray-900 transition-colors shadow-2xl relative pl-12 pr-12"
              >
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 absolute left-4" />
                <span className="text-center flex-1">Начать зарабатывать сейчас</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 absolute right-4" />
              </button>
              
              <button 
                onClick={() => navigate('/courses')}
                className="w-full bg-black/20 backdrop-blur-sm text-black py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg hover:bg-black/30 transition-colors"
              >
                Посмотреть обучение
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="h-32"></div>
      <BottomNavigation />
    </div>
  );
};

export default Home;