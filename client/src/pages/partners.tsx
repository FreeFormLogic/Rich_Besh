import { useQuery, useMutation } from "@tanstack/react-query";
import { Loader2, ExternalLink, Gift, Star, TrendingUp } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/bottom-navigation";

interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
  bonus: string;
  rating: number;
  clicks: number;
  referralUrl: string;
  features: string[];
  category: string;
}

export default function PartnersPage() {
  const { toast } = useToast();

  const { data: partners = [], isLoading } = useQuery({
    queryKey: ["/api/partners"],
  });

  const clickMutation = useMutation({
    mutationFn: async (partnerId: string) => {
      await apiRequest("POST", `/api/partners/${partnerId}/click`);
    },
  });

  const handlePartnerClick = (partner: Partner) => {
    clickMutation.mutate(partner.id);
    window.open(partner.referralUrl, '_blank');
    toast({
      title: "Переход к партнеру",
      description: `Открываем ${partner.name}. Удачи!`,
    });
  };

  const categories = [
    { id: "all", name: "Все", icon: "🎯" },
    { id: "sports", name: "Спорт", icon: "⚽" },
    { id: "casino", name: "Казино", icon: "🎰" },
    { id: "poker", name: "Покер", icon: "🃏" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-rich-black flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-rich-gold flex items-center animate-neon-pulse">
            <Gift className="mr-2" size={24} />
            Партнёры и бонусы
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Лучшие предложения от проверенных букмекеров. Залетай и забирай бонус.
          </p>
        </div>
      </header>

      {/* Categories */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className="flex-shrink-0 px-4 py-2 rounded-full font-semibold bg-white/10 text-gray-300 hover:bg-white/20 transition-all"
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Partners Grid */}
      <main className="container mx-auto px-4 space-y-6">
        {partners.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Gift size={48} className="mx-auto mb-4 opacity-50" />
            <p>Партнеры загружаются...</p>
          </div>
        ) : (
          partners.map((partner: Partner) => (
            <PartnerCard
              key={partner.id}
              partner={partner}
              onClaim={() => handlePartnerClick(partner)}
              isClicking={clickMutation.isPending}
            />
          ))
        )}

        {/* Disclaimer */}
        <div className="text-center text-xs text-gray-500 py-6">
          <p>⚠️ Играйте ответственно. Помните о рисках и играйте в удовольствие.</p>
          <p>🔞 Азартные игры разрешены лицам старше 18 лет.</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}

function PartnerCard({ 
  partner, 
  onClaim, 
  isClicking 
}: { 
  partner: Partner; 
  onClaim: () => void;
  isClicking: boolean;
}) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "sports": return "border-neon-green/30 bg-neon-green/5";
      case "casino": return "border-neon-pink/30 bg-neon-pink/5";
      case "poker": return "border-electric-purple/30 bg-electric-purple/5";
      default: return "border-rich-gold/30 bg-rich-gold/5";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "sports": return "⚽";
      case "casino": return "🎰";
      case "poker": return "🃏";
      default: return "🎯";
    }
  };

  return (
    <div className={`neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl border-2 ${getCategoryColor(partner.category)} animate-slide-up`}>
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
          <img 
            src={partner.logo} 
            alt={partner.name}
            className="w-12 h-12 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='%23FFD700'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z'/%3E%3C/svg%3E";
            }}
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-bold text-white">{partner.name}</h3>
            <span className="text-lg">{getCategoryIcon(partner.category)}</span>
          </div>
          
          <p className="text-gray-300 text-sm mb-3">{partner.description}</p>
          
          <div className="flex items-center space-x-4 mb-3">
            <div className="flex items-center space-x-1">
              <Star className="text-rich-gold" size={16} />
              <span className="text-sm font-semibold text-rich-gold">{partner.rating}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <TrendingUp className="text-neon-green" size={16} />
              <span className="text-sm text-gray-400">{partner.clicks} переходов</span>
            </div>
          </div>
          
          <div className="bg-rich-gold/10 border border-rich-gold/30 rounded-lg p-3 mb-4">
            <h4 className="text-rich-gold font-bold text-lg mb-2">🎁 {partner.bonus}</h4>
            {partner.features && partner.features.length > 0 && (
              <ul className="text-sm text-gray-300 space-y-1">
                {partner.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-rich-gold mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      <button
        onClick={onClaim}
        disabled={isClicking}
        className="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 animate-pulse-glow flex items-center justify-center space-x-2"
      >
        <ExternalLink size={16} />
        <span>{isClicking ? "Открываем..." : "Забрать бонус"}</span>
      </button>
    </div>
  );
}