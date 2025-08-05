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
  const [showPartnerAd, setShowPartnerAd] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout>();

  const stories: Story[] = [
    {
      id: 1,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/9A703ADD-2C56-41CE-BA14-BFF553B28172.MP4',
      title: 'Заработок на форексе',
      description: 'Показываю реальную сделку с прибылью. Смотри как я зарабатываю деньги прямо сейчас!',
      duration: 20,
      ctaText: 'Начать торговать на Forex',
      ctaLink: 'https://forexclub.com/richbesh',
      winAmount: '+125,000₽',
      category: 'trading'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%201.mp4',
      title: 'Бинарные опционы',
      description: 'Быстрый заработок на бинарных опционах. Показываю точки входа и стратегию.',
      duration: 15,
      ctaText: 'Попробовать IQ Option',
      ctaLink: 'https://iqoption.com/richbesh',
      winAmount: '+85,000₽',
      category: 'trading'
    },
    {
      id: 3,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%202.mp4',
      title: 'Роскошная жизнь',
      description: 'Результаты моего трейдинга - новая машина и квартира в Дубае',
      duration: 18,
      ctaText: 'Изучить мой курс',
      ctaLink: '/courses',
      category: 'lifestyle'
    },
    {
      id: 4,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%203.mp4',
      title: 'Криптовалюты',
      description: 'Торгую криптой и показываю свои позиции. Большие возможности для заработка!',
      duration: 22,
      ctaText: 'Торговать криптой',
      ctaLink: 'https://binance.com/richbesh',
      winAmount: '+200,000₽',
      category: 'trading'
    },
    {
      id: 5,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%204.mp4',
      title: 'Успех в трейдинге',
      description: 'Делюсь секретами прибыльной торговли и психологией успешного трейдера',
      duration: 25,
      ctaText: 'Записаться на консультацию',
      ctaLink: '/consultations',
      category: 'course'
    },
    {
      id: 6,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%205.mp4',
      title: 'Личный брендинг',
      description: 'Как я построил свой бренд в трейдинге и стал зарабатывать миллионы',
      duration: 16,
      ctaText: 'Получить VIP доступ',
      ctaLink: '/courses',
      category: 'lifestyle'
    },
    {
      id: 7,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%206.mp4',
      title: 'Инвестиции',
      description: 'Показываю свой инвестиционный портфель и стратегии долгосрочного заработка',
      duration: 19,
      ctaText: 'Начать инвестировать',
      ctaLink: 'https://tinkoff.com/richbesh',
      winAmount: '+350,000₽',
      category: 'trading'
    },
    {
      id: 8,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%207.mp4',
      title: 'Мотивация',
      description: 'От нуля до миллионов - моя история успеха в трейдинге',
      duration: 14,
      ctaText: 'Начать свой путь',
      ctaLink: '/courses',
      category: 'lifestyle'
    },
    {
      id: 9,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%208.mp4',
      title: 'Скальпинг',
      description: 'Быстрые сделки с большой прибылью. Учу скальпингу на реальных примерах',
      duration: 12,
      ctaText: 'Освоить скальпинг',
      ctaLink: 'https://forexclub.com/richbesh',
      winAmount: '+95,000₽',
      category: 'trading'
    },
    {
      id: 10,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/E97D113E-0D7D-4268-B08B-CB647C4EAA65.MOV',
      title: 'Результаты учеников',
      description: 'Показываю результаты моих учеников - они тоже начали зарабатывать!',
      duration: 21,
      ctaText: 'Стать учеником',
      ctaLink: '/consultations',
      category: 'course'
    },
    {
      id: 11,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/IMG_6817.MP4',
      title: 'Дневной заработок',
      description: 'Обычный торговый день - показываю все сделки от начала до конца',
      duration: 17,
      ctaText: 'Начать торговать',
      ctaLink: 'https://iqoption.com/richbesh',
      winAmount: '+115,000₽',
      category: 'trading'
    },
    {
      id: 12,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/IMG_8764.MOV',
      title: 'Финансовая свобода',
      description: 'Что значит быть финансово свободным и как этого достичь через трейдинг',
      duration: 23,
      ctaText: 'Достичь свободы',
      ctaLink: '/consultations',
      category: 'lifestyle'
    }
  ];

  const currentStoryData = stories[currentStory];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset video when story changes
    video.currentTime = 0;
    setProgress(0);
    video.src = currentStoryData.url; // Set new video source
    
    if (isPlaying) {
      video.play().catch(console.error);
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);
        
        if (video.currentTime >= video.duration) {
          setShowPartnerAd(true);
          setIsPlaying(false);
        }
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentStory, isPlaying]);

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
    setShowPartnerAd(false);
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setProgress(0);
      setIsPlaying(true);
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

        {/* Partner Offers - Show only when ad should show */}
        {showPartnerAd && (
          <div className="absolute bottom-32 left-4 right-4 z-20">
            <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-4">
              <h3 className="text-white text-lg font-bold mb-4 text-center">
                Начни зарабатывать как Rich Besh!
              </h3>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-black">IQ</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">IQ Option</h4>
                      <p className="text-blue-100 text-xs">Депозит от 10$</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open('https://iqoption.com/richbesh')}
                    className="w-full bg-white text-blue-600 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all"
                  >
                    Начать торговать
                  </button>
                </div>

                <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-orange-600 text-sm font-black">FX</span>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">ForexClub</h4>
                      <p className="text-orange-100 text-xs">Бонус $100</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open('https://forexclub.com/richbesh')}
                    className="w-full bg-white text-orange-600 py-2 rounded-lg font-bold text-sm hover:scale-105 transition-all"
                  >
                    Получить бонус
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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