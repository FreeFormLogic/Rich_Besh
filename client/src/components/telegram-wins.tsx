import { useState } from "react";
import { Play, TrendingUp, Target, DollarSign, Clock, Award } from "lucide-react";

interface TelegramWin {
  id: string;
  title: string;
  description: string;
  winAmount: string;
  platform: string;
  date: string;
  proofType: "screenshot" | "video" | "live";
  imageUrl: string;
  roi: string;
  featured?: boolean;
}

// Симулированный контент из Telegram канала Rich Besh с доказательствами выигрышей
const telegramWins: TelegramWin[] = [
  {
    id: "win-1xbet-football",
    title: "Экспресс на футбол ⚽️ +2847%",
    description: "Безумный экспресс на 5 матчей. Ставка 1000₽ превратилась в 29,470₽. Анализ был точным на 100%!",
    winAmount: "29,470₽",
    platform: "1xBet",
    date: "2025-08-04",
    proofType: "screenshot",
    imageUrl: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=300&fit=crop",
    roi: "+2847%",
    featured: true
  },
  {
    id: "win-parimatch-tennis",
    title: "Теннис Live ставка 🎾",
    description: "Live ставка на тотал в теннисе. Читал игру как открытую книгу. Коэф 4.85 зашёл легко.",
    winAmount: "48,500₽",
    platform: "Parimatch",
    date: "2025-08-03",
    proofType: "video",
    imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=500&h=300&fit=crop",
    roi: "+385%",
    featured: true
  },
  {
    id: "win-fonbet-hockey",
    title: "НХЛ плей-офф 🏒",
    description: "Ставка на НХЛ в плей-офф. Знание команд и формы игроков дало свои плоды. Чистая прибыль.",
    winAmount: "156,000₽",
    platform: "Fonbet",
    date: "2025-08-02",
    proofType: "screenshot",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    roi: "+1460%",
    featured: true
  },
  {
    id: "win-bet365-basketball",
    title: "НБА финал серия 🏀",
    description: "Ставка на серию НБА финала. Долгосрочная стратегия окупилась. Прогноз был идеальным.",
    winAmount: "87,300₽",
    platform: "Bet365",
    date: "2025-08-01",
    proofType: "live",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop",
    roi: "+773%"
  },
  {
    id: "win-marathon-esports",
    title: "CS2 Major турнир 🎮",
    description: "Киберспорт тоже приносит. Знание мета и формы команд - мой козырь в eSports ставках.",
    winAmount: "34,200₽",
    platform: "Marathon",
    date: "2025-07-31",
    proofType: "screenshot",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&h=300&fit=crop",
    roi: "+242%"
  },
  {
    id: "win-leon-mma",
    title: "UFC главный бой 🥊",
    description: "Главный бой UFC. Анализ физики бойцов и их стилей дал точный прогноз на победителя.",
    winAmount: "67,800₽",
    platform: "Leon",
    date: "2025-07-30",
    proofType: "video",
    imageUrl: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500&h=300&fit=crop",
    roi: "+578%"
  }
];

export default function TelegramWins() {
  const [selectedWin, setSelectedWin] = useState<TelegramWin | null>(null);

  const getProofIcon = (proofType: string) => {
    switch (proofType) {
      case "screenshot": return <Target className="w-5 h-5 text-neon-orange" />;
      case "video": return <Play className="w-5 h-5 text-neon-pink" />;
      case "live": return <Clock className="w-5 h-5 text-electric-blue" />;
      default: return <Award className="w-5 h-5 text-rich-gold" />;
    }
  };

  const getROIColor = (roi: string) => {
    const percent = parseInt(roi.replace('+', '').replace('%', ''));
    if (percent >= 1000) return "text-neon-orange";
    if (percent >= 500) return "text-rich-gold";
    if (percent >= 200) return "text-electric-blue";
    return "text-neon-pink";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-black text-rich-gold mb-4">
          🔥 Реальные выигрыши Rich Besh
        </h2>
        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-2">
          Прямо из Telegram канала: скриншоты и видео реальных выигрышей на букмекерских платформах
        </p>
        <div className="inline-flex items-center bg-gradient-to-r from-rich-gold/20 to-transparent px-4 py-2 rounded-full border border-rich-gold/30">
          <span className="text-rich-gold font-semibold text-sm">📱 Канал: t.me/richbesh_wins</span>
        </div>
      </div>

      {/* Featured Wins */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {telegramWins.map((win) => (
          <div
            key={win.id}
            className={`group relative bg-gradient-to-br from-rich-black to-gray-900 rounded-3xl overflow-hidden border-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl ${
              win.featured 
                ? "border-rich-gold/50 hover:border-rich-gold/80 hover:scale-[1.02]" 
                : "border-gray-700/50 hover:border-gray-600/80 hover:scale-105"
            }`}
            onClick={() => setSelectedWin(win)}
          >
            {/* Featured Badge */}
            {win.featured && (
              <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-rich-gold to-yellow-400 text-black px-3 py-1 rounded-full text-xs font-black shadow-lg">
                🏆 ТОП ВЫИГРЫШ
              </div>
            )}

            {/* Proof Type Badge */}
            <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-sm rounded-full p-2 border border-white/20">
              {getProofIcon(win.proofType)}
            </div>

            {/* Image/Video Preview */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={win.imageUrl}
                alt={win.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              {/* Play Button for Videos */}
              {win.proofType === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <Play className="text-white w-8 h-8" />
                  </div>
                </div>
              )}

              {/* Win Amount Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-rich-gold font-black text-2xl">{win.winAmount}</div>
                      <div className="text-gray-300 text-sm">{win.platform}</div>
                    </div>
                    <div className={`${getROIColor(win.roi)} font-black text-xl`}>
                      {win.roi}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rich-gold transition-colors duration-300">
                {win.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                {win.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">{new Date(win.date).toLocaleDateString('ru-RU')}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-rich-gold" />
                  <span className="text-rich-gold font-bold">ДОКАЗАНО</span>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-rich-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-gradient-to-r from-rich-black via-gray-900 to-rich-black rounded-3xl p-8 border border-rich-gold/30">
        <h3 className="text-2xl font-bold text-rich-gold mb-4">
          💰 Хочешь такие же результаты?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Все эти выигрыши - результат профессионального анализа Rich Besh. Присоединяйся к каналу и получай эксклюзивные прогнозы!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-electric-blue to-blue-500 text-white font-black py-4 px-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg">
            📱 Подписаться на канал
          </button>
          <button className="bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-black py-4 px-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg">
            🎯 Купить прогнозы
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedWin && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedWin(null)}
        >
          <div className="bg-gradient-to-br from-rich-black to-gray-900 rounded-3xl border-2 border-rich-gold/50 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {getProofIcon(selectedWin.proofType)}
                  <h3 className="text-2xl font-bold text-rich-gold">{selectedWin.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedWin(null)}
                  className="text-gray-400 hover:text-white text-3xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedWin.imageUrl}
                    alt={selectedWin.title}
                    className="w-full rounded-2xl"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-rich-gold/20 to-transparent p-6 rounded-2xl border border-rich-gold/30">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-rich-gold font-black text-3xl">{selectedWin.winAmount}</div>
                        <div className="text-gray-300">Выигрыш на {selectedWin.platform}</div>
                      </div>
                      <div className={`${getROIColor(selectedWin.roi)} font-black text-2xl`}>
                        {selectedWin.roi}
                      </div>
                    </div>
                    <p className="text-white font-medium">{selectedWin.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-electric-blue font-bold text-xl">{selectedWin.platform}</div>
                      <div className="text-gray-400 text-sm">Платформа</div>
                    </div>
                    <div className="text-center">
                      <div className="text-neon-pink font-bold text-xl">{selectedWin.proofType.toUpperCase()}</div>
                      <div className="text-gray-400 text-sm">Тип доказательства</div>
                    </div>
                  </div>

                  <div className="bg-rich-gold/10 p-4 rounded-xl border border-rich-gold/20">
                    <p className="text-rich-gold text-sm font-semibold mb-2">
                      🔥 Из Telegram канала Rich Besh
                    </p>
                    <p className="text-gray-300 text-sm">
                      Это реальное доказательство выигрыша. Скриншоты и видео публикуются в прямом эфире в официальном канале.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}