import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, ExternalLink, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Story {
  id: number;
  type: 'video' | 'image';
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  duration?: number;
  ctaText: string;
  ctaLink: string;
  winAmount?: string;
  category: 'trading' | 'lifestyle' | 'course';
}

const Stories = () => {
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  const stories: Story[] = [
    {
      id: 1,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/videos/trading_win_1.mp4',
      thumbnail: 'https://richbesh.b-cdn.net/IG/thumbnails/trading_1.jpg',
      title: 'Выигрыш +180,000₽ за день',
      description: 'Показываю как я заработал за один день на Форекс больше чем многие за месяц',
      duration: 15,
      ctaText: 'Попробовать трейдинг',
      ctaLink: 'https://broker-link.com/richbesh',
      winAmount: '+180,000₽',
      category: 'trading'
    },
    {
      id: 2,
      type: 'video', 
      url: 'https://richbesh.b-cdn.net/IG/videos/lifestyle_1.mp4',
      thumbnail: 'https://richbesh.b-cdn.net/IG/thumbnails/lifestyle_1.jpg',
      title: 'Новый Lamborghini Aventador',
      description: 'Купил новую тачку за свои торговые прибыли. Результат упорной работы!',
      duration: 12,
      ctaText: 'Изучить курс трейдинга',
      ctaLink: '/courses',
      category: 'lifestyle'
    },
    {
      id: 3,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/videos/trading_win_2.mp4', 
      thumbnail: 'https://richbesh.b-cdn.net/IG/thumbnails/trading_2.jpg',
      title: 'Бинарные опционы: +95,000₽',
      description: 'Разбираю свою стратегию на бинарных опционах. Показываю все сделки в реальном времени',
      duration: 18,
      ctaText: 'Начать торговать',
      ctaLink: 'https://iqoption.com/richbesh',
      winAmount: '+95,000₽',
      category: 'trading'
    },
    {
      id: 4,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/videos/course_promo.mp4',
      thumbnail: 'https://richbesh.b-cdn.net/IG/thumbnails/course_1.jpg', 
      title: 'Мой новый курс по трейдингу',
      description: 'Обучаю всем секретам профитного трейдинга. Уже 500+ учеников получили прибыль!',
      duration: 20,
      ctaText: 'Купить курс со скидкой',
      ctaLink: '/courses',
      category: 'course'
    },
    {
      id: 5,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/videos/luxury_life.mp4',
      thumbnail: 'https://richbesh.b-cdn.net/IG/thumbnails/luxury_1.jpg',
      title: 'Жизнь в Дубае',
      description: 'Показываю как живу в Дубае благодаря финансовой свободе от трейдинга',
      duration: 14,
      ctaText: 'Достичь финансовой свободы',
      ctaLink: '/consultations',
      category: 'lifestyle'
    }
  ];

  const currentStoryData = stories[currentStory];

  useEffect(() => {
    if (isPlaying && currentStoryData) {
      const duration = currentStoryData.duration || 15;
      const interval = 100; // Update every 100ms
      const increment = (interval / (duration * 1000)) * 100;

      progressIntervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + increment;
        });
      }, interval);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, currentStory]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, currentStory]);

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setProgress(0);
    } else {
      navigate('/');
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
      setProgress(0);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trading': return 'from-green-500 to-emerald-600';
      case 'lifestyle': return 'from-yellow-400 to-orange-500';
      case 'course': return 'from-purple-500 to-pink-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trading': return '📈';
      case 'lifestyle': return '💎';
      case 'course': return '🎓';
      default: return '⭐';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-4">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-100 ease-linear"
              style={{ 
                width: index < currentStory ? '100%' : 
                       index === currentStory ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 z-20 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
            <span className="text-lg font-bold text-black">RB</span>
          </div>
          <div>
            <h3 className="text-white font-bold">Rich Besh</h3>
            <p className="text-white/70 text-sm">Только что</p>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Areas */}
      <button 
        onClick={prevStory}
        className="absolute left-0 top-0 w-1/3 h-full z-10 flex items-center justify-start pl-4"
        disabled={currentStory === 0}
      >
        {currentStory > 0 && (
          <ChevronLeft className="w-8 h-8 text-white/70" />
        )}
      </button>

      <button 
        onClick={nextStory}
        className="absolute right-0 top-0 w-1/3 h-full z-10 flex items-center justify-end pr-4"
      >
        <ChevronRight className="w-8 h-8 text-white/70" />
      </button>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center justify-center">
        {currentStoryData.type === 'video' ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            loop
            playsInline
            muted={isMuted}
            onLoadedData={() => setProgress(0)}
          >
            <source src={currentStoryData.url} type="video/mp4" />
          </video>
        ) : (
          <img 
            src={currentStoryData.url} 
            alt={currentStoryData.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Video Controls */}
        <div className="absolute bottom-32 left-4 right-4 z-20">
          <div className={`bg-gradient-to-r ${getCategoryColor(currentStoryData.category)} rounded-2xl p-4 backdrop-blur-xl`}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{getCategoryIcon(currentStoryData.category)}</span>
              {currentStoryData.winAmount && (
                <span className="text-white font-black text-xl">{currentStoryData.winAmount}</span>
              )}
            </div>
            
            <h2 className="text-white text-xl font-bold mb-2">
              {currentStoryData.title}
            </h2>
            
            <p className="text-white/90 text-sm mb-4 leading-relaxed">
              {currentStoryData.description}
            </p>

            {/* CTA Button */}
            <button
              onClick={() => {
                if (currentStoryData.ctaLink.startsWith('http')) {
                  window.open(currentStoryData.ctaLink, '_blank');
                } else {
                  navigate(currentStoryData.ctaLink);
                }
              }}
              className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors shadow-xl"
            >
              <ExternalLink className="w-5 h-5" />
              {currentStoryData.ctaText}
            </button>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="absolute bottom-8 left-4 right-4 z-20 flex justify-center gap-4">
          <button
            onClick={togglePlayPause}
            className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            {isPlaying ? (
              <div className="w-4 h-4 flex gap-1">
                <div className="w-1 h-4 bg-white rounded"></div>
                <div className="w-1 h-4 bg-white rounded"></div>
              </div>
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

          {currentStoryData.type === 'video' && (
            <button
              onClick={toggleMute}
              className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stories;