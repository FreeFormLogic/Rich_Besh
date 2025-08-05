import { useState } from "react";
import { Play, Heart, MessageCircle, Eye, Calendar } from "lucide-react";
import { richInstagramContent, formatNumber, getContentUrl, type RichInstagramPost } from "@/lib/rich-content-data";

// Используем реальные данные из Rich Besh Instagram
const richLifestyleContent = richInstagramContent.slice(0, 8);

export default function RichContentGallery() {
  const [selectedContent, setSelectedContent] = useState<RichInstagramPost | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-rich-gold mb-3">
          🏆 Доказательства успеха Rich Besh
        </h2>
        <p className="text-gray-300 text-lg">
          Реальная жизнь миллионера: роскошь, путешествия и встречи со звездами
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {richLifestyleContent.map((content) => (
          <div
            key={content.id}
            className="group relative bg-gradient-to-br from-rich-black to-gray-900 rounded-3xl overflow-hidden border border-rich-gold/30 hover:border-rich-gold/60 transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedContent(content)}
          >
            {/* Video/Image Container */}
            <div className="relative aspect-video bg-gray-800 overflow-hidden">
              {content.type === "video" ? (
                <>
                  {/* Real video thumbnail - try to load from CDN first */}
                  <video 
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop"
                    onError={(e) => {
                      // Fallback to luxury image if video fails
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const img = document.createElement('img');
                      img.src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop';
                      img.className = 'w-full h-full object-cover';
                      target.parentNode?.appendChild(img);
                    }}
                  >
                    <source src={getContentUrl(content.filename)} type="video/mp4" />
                  </video>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-300">
                    <div className="bg-rich-gold/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                      <Play className="text-black w-8 h-8" />
                    </div>
                  </div>

                  {/* Live Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-neon-orange to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                    🔴 REAL RICH
                  </div>
                </>
              ) : (
                <img 
                  src={getContentUrl(content.filename)}
                  alt={content.description}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to luxury image if CDN fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop';
                  }}
                />
              )}
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

      {/* Modal for selected content */}
      {selectedContent && (
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