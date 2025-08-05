import { useState } from "react";
import { Play, TrendingUp, Award, Car, Home, Plane } from "lucide-react";

interface SuccessProof {
  id: string;
  title: string;
  description: string;
  amount: string;
  type: "win" | "luxury" | "business" | "lifestyle";
  videoUrl?: string;
  imageUrl?: string;
  stats: {
    likes: string;
    comments: string;
  };
}

const successProofs: SuccessProof[] = [
  {
    id: "luxury-yacht",
    title: "Lamborghini Yacht ⚓️",
    description: "Новое приобретение - яхта Lamborghini. Когда твой капитал позволяет покупать игрушки мечты.",
    amount: "$2.5M",
    type: "luxury",
    videoUrl: "https://richbesh.b-cdn.net/IG/2025-06-29_3665695044867554408.mp4",
    imageUrl: "https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=600&h=400&fit=crop",
    stats: { likes: "15716", comments: "29" }
  },
  {
    id: "dubai-penthouse",
    title: "Dubai Penthouse Investment",
    description: "Новая недвижимость в Дубае. Пентхаус с видом на Бурдж Халифа - очередная инвестиция в портфель.",
    amount: "$3.2M",
    type: "business",
    videoUrl: "https://richbesh.b-cdn.net/IG/2024-10-04_3471464298635755319.mp4",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop",
    stats: { likes: "634", comments: "48" }
  },
  {
    id: "supercar-collection",
    title: "Коллекция суперкаров",
    description: "Новое пополнение в гараже. Каждая машина - это не просто транспорт, это инвестиция в статус.",
    amount: "$850K",
    type: "luxury",
    videoUrl: "https://richbesh.b-cdn.net/IG/2025-04-26_3619375607072811190.mp4",
    imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    stats: { likes: "31553", comments: "36" }
  },
  {
    id: "vip-events",
    title: "VIP встречи и события",
    description: "Встреча с Конором МакГрегором и участие в эксклюзивных мероприятиях. Связи = возможности.",
    amount: "Бесценно",
    type: "lifestyle",
    videoUrl: "https://richbesh.b-cdn.net/IG/2025-04-07_3605486443139044627.mp4",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    stats: { likes: "24029", comments: "39" }
  },
  {
    id: "royal-invitation",
    title: "Королевские приёмы",
    description: "Приглашение от Его Высочества. Уровень networking на высшем уровне - там где принимаются миллионные решения.",
    amount: "VIP Status",
    type: "lifestyle",
    videoUrl: "https://richbesh.b-cdn.net/IG/2025-07-23_3683192790368544979.mp4",
    imageUrl: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop",
    stats: { likes: "61615", comments: "109" }
  },
  {
    id: "motivation-empire",
    title: "Бизнес-империя",
    description: "Всё в этой жизни возможно когда ты настоящий предприниматель. Мой путь от нуля до миллионов.",
    amount: "$10M+",
    type: "business",
    videoUrl: "https://richbesh.b-cdn.net/IG/2024-09-19_3460751662307950778.mp4",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=400&fit=crop",
    stats: { likes: "7727", comments: "101" }
  }
];

export default function SuccessProofs() {
  const [selectedProof, setSelectedProof] = useState<SuccessProof | null>(null);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "win": return <TrendingUp className="w-6 h-6 text-neon-orange" />;
      case "luxury": return <Car className="w-6 h-6 text-rich-gold" />;
      case "business": return <Award className="w-6 h-6 text-electric-purple" />;
      case "lifestyle": return <Plane className="w-6 h-6 text-neon-pink" />;
      default: return <Home className="w-6 h-6 text-gray-400" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "win": return "from-neon-orange/20 to-red-500/20 border-neon-orange/30";
      case "luxury": return "from-rich-gold/20 to-yellow-400/20 border-rich-gold/30";
      case "business": return "from-electric-purple/20 to-purple-500/20 border-electric-purple/30";
      case "lifestyle": return "from-neon-pink/20 to-pink-500/20 border-neon-pink/30";
      default: return "from-gray-800/20 to-gray-600/20 border-gray-600/30";
    }
  };

  const formatNumber = (num: string) => {
    const n = parseInt(num);
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return num;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-black text-rich-gold mb-4">
          💰 Доказательства Rich Life
        </h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Реальные примеры роскошной жизни Rich Besh. Это не показуха - это результат правильных инвестиций и построения бизнеса.
        </p>
      </div>

      {/* Success Proofs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {successProofs.map((proof) => (
          <div
            key={proof.id}
            className={`group relative bg-gradient-to-br ${getTypeColor(proof.type)} rounded-3xl overflow-hidden border-2 hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl`}
            onClick={() => setSelectedProof(proof)}
          >
            {/* Image/Video Preview */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={proof.imageUrl}
                alt={proof.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-rich-gold/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="text-black w-8 h-8" />
                </div>
              </div>

              {/* Amount Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-rich-gold to-yellow-400 text-black px-3 py-2 rounded-full font-black text-sm shadow-lg">
                {proof.amount}
              </div>

              {/* Type Icon */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
                {getTypeIcon(proof.type)}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rich-gold transition-colors duration-300">
                {proof.title}
              </h3>
              
              <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                {proof.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <span className="text-neon-pink font-semibold">
                    ❤️ {formatNumber(proof.stats.likes)}
                  </span>
                  <span className="text-electric-blue font-semibold">
                    💬 {formatNumber(proof.stats.comments)}
                  </span>
                </div>
                
                <div className="bg-rich-gold/20 px-2 py-1 rounded-full">
                  <span className="text-rich-gold font-bold text-xs">PROOF</span>
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
          🎯 Хочешь такую же жизнь?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Это всё реально. Rich Besh покажет тебе, как построить такой же lifestyle через инвестиции, бизнес и правильное мышление.
        </p>
        <button className="bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-black py-4 px-8 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-rich-gold/30">
          💎 Начать путь к богатству
        </button>
      </div>

      {/* Modal */}
      {selectedProof && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProof(null)}
        >
          <div className="bg-gradient-to-br from-rich-black to-gray-900 rounded-3xl border-2 border-rich-gold/50 max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {getTypeIcon(selectedProof.type)}
                  <h3 className="text-2xl font-bold text-rich-gold">{selectedProof.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedProof(null)}
                  className="text-gray-400 hover:text-white text-3xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <img
                    src={selectedProof.imageUrl}
                    alt={selectedProof.title}
                    className="w-full rounded-2xl"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-rich-gold/20 to-transparent p-4 rounded-xl border border-rich-gold/30">
                    <div className="text-rich-gold font-black text-2xl mb-2">{selectedProof.amount}</div>
                    <p className="text-white font-medium">{selectedProof.description}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-neon-pink font-bold text-xl">{formatNumber(selectedProof.stats.likes)}</div>
                      <div className="text-gray-400 text-sm">Лайков</div>
                    </div>
                    <div className="text-center">
                      <div className="text-electric-blue font-bold text-xl">{formatNumber(selectedProof.stats.comments)}</div>
                      <div className="text-gray-400 text-sm">Комментариев</div>
                    </div>
                  </div>

                  <div className="bg-rich-gold/10 p-4 rounded-xl border border-rich-gold/20">
                    <p className="text-rich-gold text-sm font-semibold mb-2">
                      💎 Аутентичный контент Rich Besh
                    </p>
                    <p className="text-gray-300 text-sm">
                      Реальные доказательства успеха из официального Instagram. Это не реклама - это жизнь миллионера.
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