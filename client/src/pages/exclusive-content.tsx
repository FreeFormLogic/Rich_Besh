import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Crown, Eye, TrendingUp, Calendar, Clock, Lock, Star } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';
import { getInstagramPostsByCategory } from '@shared/instagram-data';

// Кеш для превью
const thumbnailCache = new Map<string, string>();

// Улучшенный компонент для создания превью из конкретного видео
const VideoThumbnail = ({ videoUrl, title, className }: { videoUrl: string; title: string; className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [thumbnailGenerated, setThumbnailGenerated] = useState(false);
  const [cachedDataUrl, setCachedDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // Проверяем кеш для конкретного видео
    const cached = thumbnailCache.get(videoUrl);
    if (cached) {
      setCachedDataUrl(cached);
      setThumbnailGenerated(true);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    let currentAttempt = 0;
    let isGenerating = false;
    // Разные точки времени для разных видео
    const timePoints = [3, 5, 2, 7, 1, 4, 6, 8];
    
    const generateThumbnail = () => {
      if (isGenerating) return;
      isGenerating = true;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        isGenerating = false;
        return;
      }
      
      if (video.videoWidth === 0 || video.videoHeight === 0 || video.readyState < 2) {
        isGenerating = false;
        setTimeout(() => tryNextTimePoint(), 300);
        return;
      }
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      try {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Проверяем качество кадра
        const imageData = ctx.getImageData(0, 0, Math.min(canvas.width, 100), Math.min(canvas.height, 100));
        const data = imageData.data;
        let totalBrightness = 0;
        let pixelCount = 0;
        
        for (let i = 0; i < data.length; i += 4) {
          const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
          totalBrightness += brightness;
          pixelCount++;
        }
        
        const avgBrightness = totalBrightness / pixelCount;
        
        // Если кадр слишком темный или слишком светлый, пробуем другое время
        if ((avgBrightness < 20 || avgBrightness > 240) && currentAttempt < timePoints.length - 1) {
          isGenerating = false;
          setTimeout(() => tryNextTimePoint(), 300);
          return;
        }
        
        // Сохраняем в кеш
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        thumbnailCache.set(videoUrl, dataUrl);
        setCachedDataUrl(dataUrl);
        
        setThumbnailGenerated(true);
        isGenerating = false;
      } catch (error) {
        isGenerating = false;
        setTimeout(() => tryNextTimePoint(), 200);
      }
    };

    const tryNextTimePoint = () => {
      if (currentAttempt < timePoints.length && video.duration > 0 && !thumbnailGenerated) {
        const timePoint = Math.min(timePoints[currentAttempt], video.duration - 0.1);
        video.currentTime = timePoint;
        currentAttempt++;
      }
    };

    const handleLoadedData = () => {
      if (video.duration > 0 && !thumbnailGenerated) {
        setTimeout(() => tryNextTimePoint(), 100);
      }
    };

    const handleSeeked = () => {
      if (!thumbnailGenerated && !isGenerating) {
        setTimeout(() => generateThumbnail(), 50);
      }
    };

    const handleError = () => {
      if (!thumbnailGenerated) {
        setTimeout(() => tryNextTimePoint(), 200);
      }
    };

    const handleCanPlay = () => {
      if (!thumbnailGenerated && video.duration > 0) {
        setTimeout(() => tryNextTimePoint(), 100);
      }
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    // Fallback timeout - если через 5 секунд превью не сгенерировалось
    const fallbackTimeout = setTimeout(() => {
      if (!thumbnailGenerated) {
        console.log('VideoThumbnail timeout for:', videoUrl);
        setThumbnailGenerated(false); // Оставляем false, чтобы показать fallback изображение
      }
    }, 5000);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
      clearTimeout(fallbackTimeout);
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
      {cachedDataUrl ? (
        <img 
          src={cachedDataUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover ${!thumbnailGenerated ? 'hidden' : ''}`}
        />
      )}
      {!thumbnailGenerated && (
        <div className="relative w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-500/5 to-purple-600/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center mb-3 mx-auto backdrop-blur-sm border border-yellow-400/30">
                <Play className="w-8 h-8 text-yellow-400" />
              </div>
              <div className="text-white/60 text-xs font-medium px-3 leading-tight">
                {title}
              </div>
            </div>
          </div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
};

const ExclusiveContent = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Используем ТОЛЬКО видео контент для эксклюзивного контента
  const baseInstagramPosts = getInstagramPostsByCategory('all').filter(post => post.type === 'video');
  
  const exclusiveVideos = baseInstagramPosts.map((post, index) => {
    // ОЧЕНЬ короткие заголовки для решения проблемы отображения
    let shortTitle = 'Контент';
    
    if (post.description.includes('Honored to be Invited')) {
      shortTitle = 'VIP встреча';
    } else if (post.description.toLowerCase().includes('мотоцикл')) {
      shortTitle = 'Мотоцикл';
    } else if (post.description.toLowerCase().includes('aqua')) {
      shortTitle = 'Aqua';
    } else if (post.description.toLowerCase().includes('remember')) {
      shortTitle = 'Память';
    } else if (post.description.toLowerCase().includes('tesla') || post.description.toLowerCase().includes('car')) {
      shortTitle = 'Авто';
    } else if (post.description.toLowerCase().includes('дом') || post.description.toLowerCase().includes('house')) {
      shortTitle = 'Дом';
    } else if (post.description.toLowerCase().includes('trade') || post.description.toLowerCase().includes('торг')) {
      shortTitle = 'Трейдинг';
    } else if (post.description.toLowerCase().includes('дубай') || post.description.toLowerCase().includes('dubai')) {
      shortTitle = 'Дубай';
    } else {
      // Берем только ПЕРВОЕ короткое слово из описания
      const words = post.description.split(' ').filter(word => word.length > 2 && word.length < 8);
      if (words.length > 0) {
        shortTitle = words[0];
      } else {
        shortTitle = `#${index + 1}`;
      }
    }
    
    return {
      id: post.id,
      title: shortTitle,
      description: post.description.length > 40 ? `${post.description.substring(0, 40)}...` : post.description,
      thumbnail: post.thumbnail, // Превью из видео кадра
      videoUrl: post.videoUrl || null,
      isVideo: true, // Все элементы теперь видео
      duration: `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`, // Все видео имеют длительность
      views: `${Math.floor(post.likes / 1000)}K`,
      premium: index % 2 === 0,
      category: post.category,
      uploadDate: `${Math.floor(Math.random() * 7) + 1}д назад`,
      profit: index % 3 === 0 ? `+${Math.floor(Math.random() * 500) + 100}K₽` : 'VIP'
    };
  });

  const categories = [
    { id: 'all', name: 'Все', icon: '🔥', count: exclusiveVideos.length },
    { id: 'luxury', name: 'Роскошь', icon: '💎', count: exclusiveVideos.filter(v => v.category === 'luxury').length },
    { id: 'cars', name: 'Авто', icon: '🏎️', count: exclusiveVideos.filter(v => v.category === 'cars').length },
    { id: 'daily', name: 'Трейдинг', icon: '📊', count: exclusiveVideos.filter(v => v.category === 'daily').length },
    { id: 'education', name: 'Обучение', icon: '🎓', count: exclusiveVideos.filter(v => v.category === 'education').length },
    { id: 'lifestyle', name: 'Лайфстайл', icon: '✨', count: exclusiveVideos.filter(v => v.category === 'lifestyle').length }
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
            onClick={() => navigate('/')}
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

        {/* Videos Grid - ИСПРАВЛЕНО: компактный дизайн */}
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <div 
              key={video.id}
              className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
              onClick={() => {
                navigate(`/exclusive-content/${video.id}`);
              }}
            >
              <div className="flex">
                {/* Video Thumbnail - извлекаем кадр из видео */}
                <div className="relative w-36 h-24 flex-shrink-0">
                  <VideoThumbnail 
                    videoUrl={video.videoUrl || ''}
                    title={video.title}
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 bg-yellow-400/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="w-6 h-6 text-black ml-0.5" />
                    </div>
                  </div>
                  
                  {/* Duration - все элементы видео */}
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>

                  {/* Premium Badge */}
                  {video.premium && (
                    <div className="absolute top-1 left-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-1.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      VIP
                    </div>
                  )}
                </div>
                
                {/* Video Info - ИСПРАВЛЕНО: компактный текст */}
                <div className="flex-1 p-3">
                  <h3 className="text-white font-bold text-sm mb-1 group-hover:text-yellow-400 transition-colors truncate">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-300 text-xs mb-2 leading-relaxed line-clamp-2 overflow-hidden">
                    {video.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-400">
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
                      <div className={`font-bold text-sm ${getProfitColor(video.profit)}`}>
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
                    <Lock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <h4 className="text-white font-bold text-sm mb-1">VIP контент</h4>
                    <p className="text-gray-300 text-xs mb-2">Доступен только подписчикам</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate('/courses');
                      }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg font-bold text-xs hover:scale-105 transition-transform"
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