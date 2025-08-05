import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Volume2, VolumeX, MoreHorizontal } from 'lucide-react';

const Stories = () => {
  const navigate = useNavigate();
  const [currentStory, setCurrentStory] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressInterval = useRef<NodeJS.Timeout>();

  const stories = [
    {
      id: 1,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/2025-07-21_3681517492775539740.mp4',
      duration: 15,
      title: 'Утро миллионера',
      description: 'Мой обычный день в Дубае',
      timestamp: '2 часа назад',
      views: '125K'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/2025-07-23_3683192790368544979.mp4',
      duration: 12,
      title: 'Новая Ferrari',
      description: 'Только что забрал из салона',
      timestamp: '5 часов назад',
      views: '89K'
    },
    {
      id: 3,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/2025-04-26_3619375607072811190.mp4',
      duration: 10,
      title: 'Инвестиции работают',
      description: 'Как я заработал $500K сегодня',
      timestamp: '8 часов назад',
      views: '203K'
    },
    {
      id: 4,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/2025-07-21_3681517492775539740.mp4',
      duration: 18,
      title: 'Закрытая вечеринка',
      description: 'Только для VIP клиентов',
      timestamp: '12 часов назад',
      views: '67K'
    },
    {
      id: 5,
      type: 'video',
      url: 'https://richbesh.b-cdn.net/IG/2025-07-23_3683192790368544979.mp4',
      duration: 14,
      title: 'Секрет успеха',
      description: 'Главное правило богатых',
      timestamp: '1 день назад',
      views: '156K'
    }
  ];

  useEffect(() => {
    if (isPlaying && videoRef.current) {
      const duration = stories[currentStory].duration * 1000;
      const updateInterval = 50;
      
      progressInterval.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + (updateInterval / duration) * 100;
          if (newProgress >= 100) {
            nextStory();
            return 0;
          }
          return newProgress;
        });
      }, updateInterval);
    } else {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [isPlaying, currentStory]);

  const nextStory = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(prev => prev + 1);
      setProgress(0);
    } else {
      navigate('/');
    }
  };

  const prevStory = () => {
    if (currentStory > 0) {
      setCurrentStory(prev => prev - 1);
      setProgress(0);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    
    if (x < width / 2) {
      prevStory();
    } else {
      nextStory();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Progress Bars */}
      <div className="flex gap-1 p-4 pb-2">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-100 ease-linear"
              style={{
                width: index < currentStory ? '100%' : 
                       index === currentStory ? `${progress}%` : '0%'
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-0">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">RB</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">richbesh</h3>
              <p className="text-white/70 text-xs">{stories[currentStory].timestamp}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={togglePlay}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
          >
            {isPlaying ? 
              <Pause className="w-5 h-5 text-white" /> : 
              <Play className="w-5 h-5 text-white" />
            }
          </button>
          
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full bg-black/30 backdrop-blur-sm"
          >
            {isMuted ? 
              <VolumeX className="w-5 h-5 text-white" /> : 
              <Volume2 className="w-5 h-5 text-white" />
            }
          </button>
          
          <button className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Video Content */}
      <div className="flex-1 relative overflow-hidden" onClick={handleVideoClick}>
        <video
          ref={videoRef}
          src={stories[currentStory].url}
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          playsInline
          loop={false}
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        
        {/* Story Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h2 className="text-white text-2xl font-bold mb-2">
            {stories[currentStory].title}
          </h2>
          <p className="text-white/90 text-lg mb-4">
            {stories[currentStory].description}
          </p>
          
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <span>👀 {stories[currentStory].views} просмотров</span>
            <span>⏱️ {stories[currentStory].duration}с</span>
          </div>
        </div>

        {/* Navigation Areas (invisible) */}
        <div className="absolute inset-0 flex">
          <div className="flex-1" onClick={(e) => e.stopPropagation()}></div>
          <div className="flex-1" onClick={(e) => e.stopPropagation()}></div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/predictions')}
            className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-2xl font-bold text-center"
          >
            Получить прогнозы
          </button>
          
          <button 
            onClick={() => navigate('/courses')}
            className="flex-1 bg-white/20 backdrop-blur-sm text-white py-4 rounded-2xl font-bold text-center border border-white/30"
          >
            VIP курсы
          </button>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-white/70 text-sm">
            Пролистай вправо для следующей истории
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stories;