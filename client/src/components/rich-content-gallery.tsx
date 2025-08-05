import { useState } from "react";
import { Play, Heart, MessageCircle, Eye, Calendar } from "lucide-react";
import { richInstagramContent, formatNumber, getContentUrl, type RichInstagramPost } from "@/lib/rich-content-data";
import VideoPlayer from "@/components/video-player";

// Используем реальные данные из Rich Besh Instagram
const richLifestyleContent = richInstagramContent.slice(0, 8);

export default function RichContentGallery() {
  const [selectedContent, setSelectedContent] = useState<RichInstagramPost | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-rich-gold mb-3">
          🏖️ Lifestyle миллионера
        </h2>
        <p className="text-gray-300 text-lg">
          Роскошная жизнь Rich Besh: яхты, машины, встречи с звездами и королевскими особами
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {richLifestyleContent.map((content) => (
          <div
            key={content.post_id}
            className="group relative bg-gradient-to-br from-rich-black to-gray-900 rounded-3xl overflow-hidden border border-rich-gold/30 hover:border-rich-gold/60 transition-all duration-300 cursor-pointer"
            onClick={() => {
              setSelectedContent(content);
              if (content.type === "video") {
                setShowVideoPlayer(true);
              }
            }}
          >
            {/* Video/Image Container */}
            <div className="relative aspect-video bg-gray-800 overflow-hidden">
              {/* Всегда показываем статичное превью с play кнопкой для видео */}
              <div 
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: content.type === "video" 
                    ? `url('https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop')`
                    : `url('${getContentUrl(content.filename)}')`
                }}
              >
                {/* Fallback если изображение не загружается */}
                <img 
                  src={content.type === "image" ? getContentUrl(content.filename) : "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop"}
                  alt={content.description}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop';
                  }}
                />
              </div>
              
              {/* Play Button Overlay для видео */}
              {content.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-300">
                  <div className="bg-rich-gold/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Play className="text-black w-8 h-8" />
                  </div>
                </div>
              )}

              {/* Badge */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-neon-orange to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
                {content.type === "video" ? "🎬 VIDEO" : "📸 PHOTO"}
              </div>

              {/* Link to actual content */}
              <div className="absolute top-3 right-3">
                <a 
                  href={getContentUrl(content.filename)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="bg-black/70 backdrop-blur-sm rounded-full p-2 hover:bg-black/90 transition-all duration-300"
                >
                  <Eye className="w-4 h-4 text-white" />
                </a>
              </div>
            </div>

            {/* Content Info */}
            <div className="p-5">
              <p className="text-white font-medium text-sm leading-relaxed mb-4 line-clamp-2">
                {content.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-neon-pink" />
                    <span className="text-neon-pink font-semibold">{formatNumber(content.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 text-electric-blue" />
                    <span className="text-electric-blue font-semibold">{formatNumber(content.comments)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(content.date).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>

            {/* Premium Badge */}
            <div className="absolute top-3 right-3 bg-gradient-to-r from-rich-gold to-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold">
              PREMIUM
            </div>
          </div>
        ))}
      </div>

      {/* Video Player */}
      {showVideoPlayer && selectedContent && selectedContent.type === "video" && (
        <VideoPlayer
          src={getContentUrl(selectedContent.filename)}
          poster="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop"
          title={`Rich Besh - ${selectedContent.description.slice(0, 50)}...`}
          description={`${formatNumber(selectedContent.likes)} лайков • ${formatNumber(selectedContent.comments)} комментариев`}
          onClose={() => {
            setShowVideoPlayer(false);
            setSelectedContent(null);
          }}
        />
      )}

      {/* Modal for selected content */}
      {selectedContent && !showVideoPlayer && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedContent(null)}
        >
          <div className="bg-rich-black rounded-2xl border border-rich-gold/50 max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-rich-gold">Контент Rich Besh</h3>
                <button 
                  onClick={() => setSelectedContent(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <p className="text-white">{selectedContent.description}</p>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-neon-pink" />
                    <span className="text-neon-pink font-bold">{formatNumber(selectedContent.likes)} лайков</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-5 h-5 text-electric-blue" />
                    <span className="text-electric-blue font-bold">{formatNumber(selectedContent.comments)} комментариев</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-rich-gold/20 to-transparent p-4 rounded-xl border border-rich-gold/30">
                  <p className="text-rich-gold text-sm font-semibold">
                    💎 Эксклюзивный контент из Instagram Rich Besh
                  </p>
                  <p className="text-gray-300 text-xs mt-1">
                    Реальные доказательства роскошной жизни и успеха
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}