import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, ExternalLink, Crown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Story {
  id: number;
  type: 'video';
  url: string;
  title: string;
  description: string;
  duration: number;
  ctaText: string;
  ctaLink: string;
  winAmount?: string;
  category: 'trading' | 'lifestyle' | 'course';
}

const Stories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoIndex = parseInt(searchParams.get('video') || '0', 10);
  const [currentStory, setCurrentStory] = useState(videoIndex);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showPartnerAd, setShowPartnerAd] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/9A703ADD-2C56-41CE-BA14-BFF553B28172.MP4',
      title: 'Торговые результаты',
      description: 'Показываю реальные результаты торговли на форекс - миллионы в прибыли!',
      duration: 15,
      ctaText: 'Начать торговлю',
      ctaLink: 'https://iqoption.com/richbesh',
      winAmount: '+1,250,000₽',
      category: 'trading'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%201.mp4',
      title: 'Luxury жизнь',
      description: 'Мой день в Дубае - частный джет, яхты, дорогие рестораны',
      duration: 18,
      ctaText: 'Узнать секреты',
      ctaLink: '/courses',
      category: 'lifestyle'
    },
    {
      id: 3,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%202.mp4',
      title: 'Крипто прогноз',
      description: 'Bitcoin достигнет 150,000$ в 2025. Разбираю почему и как заработать',
      duration: 20,
      ctaText: 'Изучить крипто',
      ctaLink: 'https://forexclub.com/richbesh',
      winAmount: '+850,000₽',
      category: 'trading'
    },
    {
      id: 4,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%203.mp4',
      title: 'Мой офис',
      description: 'Экскурсия по моему трейдинг офису в центре Москвы стоимостью 50 млн',
      duration: 16,
      ctaText: 'Стать успешным',
      ctaLink: '/consultations',
      category: 'lifestyle'
    },
    {
      id: 5,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%204.mp4',
      title: 'Стратегия дня',
      description: 'Разбираю сделки которые принесли мне 500,000₽ за один день',
      duration: 22,
      ctaText: 'Освоить стратегию',
      ctaLink: '/courses',
      winAmount: '+500,000₽',
      category: 'trading'
    },
    {
      id: 6,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%205.mp4',
      title: 'Новый автомобиль',
      description: 'Покупаю новый Lamborghini на деньги от трейдинга - мечта сбылась!',
      duration: 13,
      ctaText: 'Заработать на авто',
      ctaLink: 'https://iqoption.com/richbesh',
      category: 'lifestyle'
    },
    {
      id: 7,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/TG/circle%206.mp4',
      title: 'Обучение учеников',
      description: 'Провожу закрытую сессию для VIP учеников - делюсь секретами прибыли',
      duration: 19,
      ctaText: 'Стать VIP учеником',
      ctaLink: '/courses',
      category: 'course'
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

    video.currentTime = 0;
    setProgress(0);
    setShowPartnerAd(false);
    video.src = currentStoryData.url;
    
    if (isPlaying) {
      video.play().catch(console.error);
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);
        
        // Убираем показ рекламы во время видео
      }
    };

    const handleVideoEnd = () => {
      // Автоматически переходим к следующему Stories без показа рекламы
      setTimeout(() => {
        nextStory();
      }, 1000);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [currentStory, isPlaying, showPartnerAd]);

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setProgress(0);
      setShowPartnerAd(false);
    } else {
      navigate('/');
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
      setProgress(0);
      setShowPartnerAd(false);
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  // Партнерские предложения
  const partnerOffers = [
    {
      id: 1,
      title: 'IQ Option',
      subtitle: 'Начни торговать как Rich Besh',
      description: 'Получи бонус 100% на депозит и торгуй теми же инструментами, что и я',
      bonus: 'Бонус 100%',
      action: 'Получить бонус',
      link: 'https://iqoption.com/richbesh',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 2,
      title: 'ForexClub',
      subtitle: 'Профессиональный трейдинг',
      description: 'Торгуй на Форекс с минимальными спредами и максимальным кредитным плечом',
      bonus: 'Без комиссий',
      action: 'Начать торговлю',
      link: 'https://forexclub.com/richbesh',
      color: 'from-blue-500 to-cyan-600'
    }
  ];

  const randomOffer = partnerOffers[Math.floor(Math.random() * partnerOffers.length)];

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Progress bars */}
      <div className="flex gap-1 p-2">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300"
              style={{ 
                width: index < currentStory ? '100%' : 
                       index === currentStory ? `${progress}%` : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-12 left-0 right-0 z-10 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
            <Crown className="w-6 h-6 text-black" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Rich Besh</h3>
            <p className="text-white/70 text-sm">{currentStoryData.title}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/50 text-white"
          >
            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-black/50 text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          muted={isMuted}
          playsInline
          onClick={handlePlayPause}
        />
        
        {/* Play/Pause overlay */}
        {!isPlaying && !showPartnerAd && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button 
              onClick={handlePlayPause}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </button>
          </div>
        )}

        {/* Navigation areas */}
        <button 
          onClick={prevStory}
          className="absolute left-0 top-0 w-1/3 h-full z-10"
          disabled={currentStory === 0}
        />
        <button 
          onClick={nextStory}
          className="absolute right-0 top-0 w-1/3 h-full z-10"
        />
      </div>

      {/* Story info - Always visible */}
      <div className="absolute bottom-20 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
        <h2 className="text-white text-xl font-bold mb-2">{currentStoryData.title}</h2>
        <p className="text-white/90 mb-4">{currentStoryData.description}</p>
        
        {currentStoryData.winAmount && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 mb-4">
            <div className="text-green-400 font-bold text-lg">{currentStoryData.winAmount}</div>
            <div className="text-green-300 text-sm">Результат за сессию</div>
          </div>
        )}

        <button 
          onClick={() => window.open(currentStoryData.ctaLink, '_blank')}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          {currentStoryData.ctaText}
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>

      {/* Убираем модальную рекламу - реклама теперь всегда внизу */}
    </div>
  );
};

export default Stories;