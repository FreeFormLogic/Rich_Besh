import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, ExternalLink, Crown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Stories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoIndex = parseInt(searchParams.get('video') || '0', 10);
  const [currentStory, setCurrentStory] = useState(videoIndex);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stories = [
    {
      id: 1,
      url: 'https://richbesh.b-cdn.net/TG/9A703ADD-2C56-41CE-BA14-BFF553B28172.MP4',
      title: 'Торговые результаты',
      description: 'Показываю реальные результаты торговли на форекс - миллионы в прибыли!',
      ctaText: 'Начать торговлю',
      ctaLink: 'https://iqoption.com/richbesh',
      winAmount: '+1,250,000₽'
    },
    {
      id: 2,
      url: 'https://richbesh.b-cdn.net/TG/circle%201.mp4',
      title: 'Luxury жизнь',
      description: 'Мой день в Дубае - частный джет, яхты, дорогие рестораны',
      ctaText: 'Узнать секреты',
      ctaLink: '/courses'
    },
    {
      id: 3,
      url: 'https://richbesh.b-cdn.net/TG/circle%202.mp4',
      title: 'Крипто прогноз',
      description: 'Bitcoin достигнет 150,000$ в 2025. Разбираю почему и как заработать',
      ctaText: 'Изучить крипто',
      ctaLink: 'https://forexclub.com/richbesh',
      winAmount: '+850,000₽'
    }
  ];

  const currentStoryData = stories[currentStory];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    setProgress(0);
    video.src = currentStoryData.url;
    
    if (isPlaying) {
      video.play().catch(console.error);
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress(progressPercent);
      }
    };

    const handleVideoEnd = () => {
      setTimeout(() => {
        if (currentStory < stories.length - 1) {
          setCurrentStory(currentStory + 1);
        } else {
          navigate('/');
        }
      }, 1000);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [currentStory, isPlaying]);

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Progress bars */}
      <div className="flex gap-1 p-2 z-50">
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

      {/* Header with WORKING close button */}
      <div className="absolute top-12 left-0 right-0 z-50 flex items-center justify-between p-4">
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
          
          {/* ИСПРАВЛЕНО: Большая рабочая кнопка закрыть */}
          <button 
            onClick={handleClose}
            className="w-14 h-14 rounded-full bg-black/90 text-white hover:bg-black transition-all duration-200 flex items-center justify-center shadow-2xl border-2 border-white/30 hover:border-white/50 hover:scale-105"
          >
            <X className="w-8 h-8" />
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
          onClick={() => {
            const video = videoRef.current;
            if (!video) return;
            if (isPlaying) {
              video.pause();
              setIsPlaying(false);
            } else {
              video.play();
              setIsPlaying(true);
            }
          }}
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <button 
              onClick={() => {
                const video = videoRef.current;
                if (video) {
                  video.play();
                  setIsPlaying(true);
                }
              }}
              className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Play className="w-10 h-10 text-white ml-1" />
            </button>
          </div>
        )}

        {/* Navigation areas */}
        <button 
          onClick={() => {
            if (currentStory > 0) {
              setCurrentStory(currentStory - 1);
              setProgress(0);
            }
          }}
          className="absolute left-0 top-0 w-1/3 h-full z-10"
          disabled={currentStory === 0}
        />
        <button 
          onClick={() => {
            if (currentStory < stories.length - 1) {
              setCurrentStory(currentStory + 1);
              setProgress(0);
            } else {
              navigate('/');
            }
          }}
          className="absolute right-0 top-0 w-1/3 h-full z-10"
        />
      </div>

      {/* ИСПРАВЛЕНО: Реклама СТРОГО внизу экрана */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black via-black/98 to-transparent p-6 pb-8">
        <h2 className="text-white text-lg font-bold mb-2">{currentStoryData.title}</h2>
        <p className="text-white/90 text-sm mb-3 leading-relaxed">{currentStoryData.description}</p>
        
        {currentStoryData.winAmount && (
          <div className="bg-green-500/20 border border-green-500 rounded-lg p-2 mb-4">
            <div className="text-green-400 font-bold text-sm">{currentStoryData.winAmount}</div>
            <div className="text-green-300 text-xs">Результат за сессию</div>
          </div>
        )}

        <button 
          onClick={() => {
            if (currentStoryData.ctaLink.startsWith('http')) {
              window.open(currentStoryData.ctaLink, '_blank');
            } else {
              navigate(currentStoryData.ctaLink);
            }
          }}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform text-sm shadow-2xl"
        >
          {currentStoryData.ctaText}
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Stories;