import { useState } from "react";
import { Heart, MessageCircle, Share, Play, ExternalLink } from "lucide-react";

interface VideoProof {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  winAmount: string;
  sport: string;
  likes: number;
  comments: number;
  shares: number;
  createdAt: string;
  isLiked?: boolean;
}

interface AdContent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ctaText: string;
  referralUrl: string;
  partner: string;
}

const sampleProofs: VideoProof[] = [
  {
    id: "1",
    title: "🔥 ЭКСПРЕСС x3.4 ПРОШЕЛ!",
    description: "Реал Мадрид, Бавария и ПСЖ - все прогнозы зашли! Чистая прибыль 127,000₽",
    videoUrl: "/videos/proof1.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600",
    winAmount: "127,000₽",
    sport: "Футбол",
    likes: 2341,
    comments: 156,
    shares: 89,
    createdAt: "2 часа назад",
    isLiked: false
  },
  {
    id: "2", 
    title: "💎 UFC МАСТЕР-КЛАСС",
    description: "Джонс нокаутировал в 3 раунде как и предсказывал! Кф 4.2 = 89,600₽ чистыми",
    videoUrl: "/videos/proof2.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600",
    winAmount: "89,600₽",
    sport: "UFC",
    likes: 1876,
    comments: 98,
    shares: 67,
    createdAt: "5 часов назад",
    isLiked: true
  },
  {
    id: "3",
    title: "🏀 НБА СИСТЕМА РАБОТАЕТ",
    description: "Лейкерс + Селтикс тотал больше - легкие деньги! Система Rich Besh не подводит",
    videoUrl: "/videos/proof3.mp4", 
    thumbnailUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600",
    winAmount: "65,400₽",
    sport: "Баскетбол",
    likes: 1523,
    comments: 74,
    shares: 45,
    createdAt: "1 день назад",
    isLiked: false
  }
];

const sampleAds: AdContent[] = [
  {
    id: "ad1",
    title: "Где я поставил эту ставку?",
    description: "Кстати, весь этот экспресс я делал в 1xBet - там самые высокие коэффициенты на топ матчи. Плюс дали бонус 25,000₽ на первый депозит 🔥",
    imageUrl: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600",
    ctaText: "ПЕРЕЙТИ НА 1XBET",
    referralUrl: "https://1xbet.com/rich-besh",
    partner: "1xBet"
  },
  {
    id: "ad2", 
    title: "На чем играю в лайве",
    description: "Для лайв-ставок использую Parimatch - линия обновляется мгновенно, а кэшбэк 10% каждую неделю спасает в минусовых сериях 💰",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    ctaText: "ЗАРЕГИСТРИРОВАТЬСЯ",
    referralUrl: "https://parimatch.com/rich-besh",
    partner: "Parimatch"
  }
];

export default function VideoProofFeed() {
  const [likedProofs, setLikedProofs] = useState<Set<string>>(new Set(["2"]));

  const toggleLike = (proofId: string) => {
    setLikedProofs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(proofId)) {
        newSet.delete(proofId);
      } else {
        newSet.add(proofId);
      }
      return newSet;
    });
  };

  const mixedContent = [];
  sampleProofs.forEach((proof, index) => {
    mixedContent.push({ type: 'proof', content: proof });
    if (index === 1) {
      mixedContent.push({ type: 'ad', content: sampleAds[0] });
    }
    if (index === 2) {
      mixedContent.push({ type: 'ad', content: sampleAds[1] });
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-rich-gold flex items-center">
          <Play className="mr-2 animate-pulse" size={24} />
          Пруфы Выигрышей
        </h2>
        <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm font-bold">
          🔥 LIVE
        </span>
      </div>

      {mixedContent.map((item, index) => 
        item.type === 'proof' ? (
          <VideoProofCard 
            key={item.content.id}
            proof={item.content as VideoProof}
            isLiked={likedProofs.has(item.content.id)}
            onToggleLike={() => toggleLike(item.content.id)}
          />
        ) : (
          <AdCard key={item.content.id} ad={item.content as AdContent} />
        )
      )}
    </div>
  );
}

function VideoProofCard({ proof, isLiked, onToggleLike }: { 
  proof: VideoProof; 
  isLiked: boolean; 
  onToggleLike: () => void; 
}) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 rounded-2xl overflow-hidden animate-slide-up">
      {/* Video Section */}
      <div className="relative group cursor-pointer">
        <img 
          src={proof.thumbnailUrl} 
          alt={proof.title}
          className="w-full h-64 object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-rich-gold/90 rounded-full p-4 animate-pulse-glow">
            <Play className="text-black" size={32} />
          </div>
        </div>
        
        {/* Win Amount Badge */}
        <div className="absolute top-4 right-4 bg-neon-green text-black px-3 py-1 rounded-full font-bold text-sm animate-bounce">
          +{proof.winAmount}
        </div>
        
        {/* Sport Badge */}
        <div className="absolute top-4 left-4 bg-rich-gold/90 text-black px-3 py-1 rounded-full font-bold text-sm">
          {proof.sport}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 animate-glow">
          {proof.title}
        </h3>
        
        <p className="text-gray-300 mb-4 line-clamp-2">
          {proof.description}
        </p>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <button 
              onClick={onToggleLike}
              className={`flex items-center space-x-2 transition-all hover:scale-110 ${
                isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-400'
              }`}
            >
              <Heart 
                size={20} 
                className={isLiked ? 'fill-current animate-pulse' : ''} 
              />
              <span className="font-semibold">{proof.likes}</span>
            </button>
            
            <button 
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-400 hover:text-rich-gold transition-all hover:scale-110"
            >
              <MessageCircle size={20} />
              <span className="font-semibold">{proof.comments}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-400 hover:text-neon-green transition-all hover:scale-110">
              <Share size={20} />
              <span className="font-semibold">{proof.shares}</span>
            </button>
          </div>
          
          <span className="text-sm text-gray-500">{proof.createdAt}</span>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-700 pt-4 animate-slide-down">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <span className="text-rich-gold font-semibold text-sm">@crypto_king</span>
                  <p className="text-gray-300 text-sm">Безумие! Как ты это делаешь? 🔥</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32" 
                  alt="User" 
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <span className="text-neon-green font-semibold text-sm">@bet_master</span>
                  <p className="text-gray-300 text-sm">Опять в плюсе! Научи 💰</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AdCard({ ad }: { ad: AdContent }) {
  return (
    <div className="neubrutalism-card bg-gradient-to-br from-rich-gold/10 to-rich-black rounded-2xl overflow-hidden border border-rich-gold/30 animate-slide-up">
      <div className="relative">
        <img 
          src={ad.imageUrl} 
          alt={ad.title}
          className="w-full h-48 object-cover"
        />
        {/* Убираем маркер рекламы для нативности */}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-rich-gold mb-2">
          {ad.title}
        </h3>
        
        <p className="text-gray-300 mb-4">
          {ad.description}
        </p>
        
        <button 
          onClick={() => window.open(ad.referralUrl, '_blank')}
          className="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 animate-pulse-glow"
        >
          <span>{ad.ctaText}</span>
          <ExternalLink size={16} />
        </button>
        
        <p className="text-center text-xs text-gray-500 mt-2">
          Партнер: {ad.partner}
        </p>
      </div>
    </div>
  );
}