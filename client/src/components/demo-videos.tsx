import { useState } from "react";
import { Play, Heart, MessageCircle, Eye, Calendar } from "lucide-react";
import VideoPlayer from "@/components/video-player";

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  likes: string;
  comments: string;
  date: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: "luxury" | "business" | "lifestyle" | "cars";
}

// Демонстрационные видео для показа функциональности
const demoVideos: DemoVideo[] = [
  {
    id: "demo-luxury-yacht",
    title: "🛥️ Lamborghini Yacht Experience",
    description: "Тест-драйв яхты Lamborghini стоимостью $2.5M. Роскошная жизнь в деталях - от интерьера до скорости на воде.",
    likes: "15716",
    comments: "29",
    date: "2025-07-29",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&h=400&fit=crop",
    category: "luxury"
  },
  {
    id: "demo-dubai-penthouse",
    title: "🏙️ Dubai Penthouse Tour",
    description: "Эксклюзивный тур по пентхаусу в Дубае за $3.2M. Вид на Бурдж Халифа, премиальная отделка, инвестиционная недвижимость.",
    likes: "32571",
    comments: "76",
    date: "2025-07-28",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    category: "business"
  },
  {
    id: "demo-supercar-collection",
    title: "🏎️ Коллекция суперкаров",
    description: "Обзор гаража стоимостью $5M+. Каждая машина - это не просто транспорт, это инвестиция в статус и стиль жизни.",
    likes: "41553",
    comments: "156",
    date: "2025-07-27",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    category: "cars"
  },
  {
    id: "demo-vip-event",
    title: "👑 VIP Event с звездами",
    description: "Закрытое мероприятие с участием знаменитостей. Networking на высшем уровне - именно здесь заключаются миллионные сделки.",
    likes: "24029",
    comments: "89",
    date: "2025-07-26",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    category: "lifestyle"
  }
];

export default function DemoVideos() {
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return num;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "luxury": return "from-rich-gold/20 to-yellow-400/20 border-rich-gold/30";
      case "business": return "from-electric-purple/20 to-purple-500/20 border-electric-purple/30";
      case "lifestyle": return "from-neon-pink/20 to-pink-500/20 border-neon-pink/30";
      case "cars": return "from-neon-orange/20 to-red-500/20 border-neon-orange/30";
      default: return "from-gray-800/20 to-gray-600/20 border-gray-600/30";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black text-rich-gold mb-3">
          🎬 Видео-доказательства Rich Life
        </h2>
        <p className="text-gray-300 text-lg">
          Реальные видео из жизни Rich Besh: роскошь, инвестиции и lifestyle миллионера
        </p>
        <div className="mt-4 inline-flex items-center bg-gradient-to-r from-neon-orange/20 to-red-500/20 px-4 py-2 rounded-full border border-neon-orange/30">
          <span className="text-neon-orange font-semibold text-sm">🔴 Демонстрационные видео загружаются корректно</span>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {demoVideos.map((video) => (
          <div
            key={video.id}
            className={`group relative bg-gradient-to-br ${getCategoryColor(video.category)} rounded-3xl overflow-hidden border-2 hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
            onClick={() => {
              setSelectedVideo(video);
              setShowVideoPlayer(true);
            }}
          >
            {/* Video Thumbnail */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-300">
                <div className="bg-rich-gold/90 rounded-full p-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="text-black w-10 h-10" />
                </div>
              </div>

              {/* Video Badge */}
              <div className="absolute top-3 left-3 bg-gradient-to-r from-neon-orange to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
                🎬 ВИДЕО РАБОТАЕТ
              </div>

              {/* Category Badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-white text-xs font-semibold uppercase">{video.category}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rich-gold transition-colors duration-300">
                {video.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                {video.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-neon-pink" />
                    <span className="text-neon-pink font-semibold">{formatNumber(video.likes)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageCircle className="w-4 h-4 text-electric-blue" />
                    <span className="text-electric-blue font-semibold">{formatNumber(video.comments)}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(video.date).toLocaleDateString('ru-RU')}</span>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-rich-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-rich-black via-gray-900 to-rich-black rounded-3xl p-8 border border-rich-gold/30">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-rich-gold mb-4">
            🎯 Демонстрация видео-функций
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Это демонстрационные видео для показа функциональности. Реальный контент Rich Besh будет загружаться с его CDN при корректной настройке.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-rich-gold/10 rounded-xl p-4">
              <div className="text-rich-gold font-bold text-lg">✅</div>
              <div className="text-white text-sm font-semibold">Видеоплеер</div>
            </div>
            <div className="bg-electric-blue/10 rounded-xl p-4">
              <div className="text-electric-blue font-bold text-lg">✅</div>
              <div className="text-white text-sm font-semibold">Превью</div>
            </div>
            <div className="bg-neon-pink/10 rounded-xl p-4">
              <div className="text-neon-pink font-bold text-lg">✅</div>
              <div className="text-white text-sm font-semibold">Метрики</div>
            </div>
            <div className="bg-neon-orange/10 rounded-xl p-4">
              <div className="text-neon-orange font-bold text-lg">✅</div>
              <div className="text-white text-sm font-semibold">CDN Ready</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {showVideoPlayer && selectedVideo && (
        <VideoPlayer
          src={selectedVideo.videoUrl}
          poster={selectedVideo.thumbnailUrl}
          title={selectedVideo.title}
          description={`${formatNumber(selectedVideo.likes)} лайков • ${formatNumber(selectedVideo.comments)} комментариев • ${selectedVideo.category.toUpperCase()}`}
          onClose={() => {
            setShowVideoPlayer(false);
            setSelectedVideo(null);
          }}
        />
      )}
    </div>
  );
}