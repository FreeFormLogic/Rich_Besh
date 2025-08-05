import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, ExternalLink } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  description?: string;
  onClose?: () => void;
}

export default function VideoPlayer({ src, poster, title, description, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const openInNewTab = () => {
    window.open(src, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-rich-black rounded-2xl overflow-hidden border border-rich-gold/30">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <div>
            {title && <h3 className="text-white font-bold text-lg">{title}</h3>}
            {description && <p className="text-gray-400 text-sm mt-1">{description}</p>}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={openInNewTab}
              className="p-2 rounded-full bg-electric-blue/20 hover:bg-electric-blue/30 text-electric-blue transition-colors duration-200"
              title="Открыть в новой вкладке"
            >
              <ExternalLink className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Container */}
        <div 
          className="relative group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full max-h-[70vh] object-contain bg-black"
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => {
              // Показываем сообщение об ошибке
              console.log("Video failed to load, opening in new tab");
              openInNewTab();
            }}
          />

          {/* Controls Overlay */}
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="bg-rich-gold/90 rounded-full p-4 hover:scale-110 transition-transform duration-300 shadow-lg"
            >
              {isPlaying ? (
                <Pause className="text-black w-8 h-8" />
              ) : (
                <Play className="text-black w-8 h-8" />
              )}
            </button>
          </div>

          {/* Bottom Controls */}
          <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'opacity-0'
          }`}>
            
            <div className="flex items-center space-x-3">
              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="bg-black/70 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/90 transition-colors duration-200"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>

              {/* Quality Badge */}
              <div className="bg-rich-gold/20 px-3 py-1 rounded-full">
                <span className="text-rich-gold text-sm font-semibold">Rich Besh Original</span>
              </div>
            </div>

            {/* External Link */}
            <button
              onClick={openInNewTab}
              className="bg-black/70 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/90 transition-colors duration-200"
              title="Смотреть в полном размере"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 bg-gradient-to-r from-rich-gold/10 to-transparent border-t border-gray-800">
          <p className="text-rich-gold text-sm font-semibold mb-1">
            💎 Эксклюзивный контент Rich Besh
          </p>
          <p className="text-gray-400 text-xs">
            Если видео не воспроизводится, нажмите кнопку "Открыть в новой вкладке" для просмотра оригинала
          </p>
        </div>
      </div>
    </div>
  );
}