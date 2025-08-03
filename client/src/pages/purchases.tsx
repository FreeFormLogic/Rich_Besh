import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingBag, Calendar, Download, Star } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import SectionIntro from "@/components/section-intro";

interface Purchase {
  id: string;
  type: "prediction" | "course" | "consultation";
  title: string;
  description: string;
  price: number;
  purchaseDate: string;
  status: "completed" | "active" | "expired";
  downloadUrl?: string;
  rating?: number;
}

export default function PurchasesPage() {
  const { data: purchases = [], isLoading } = useQuery({
    queryKey: ["/api/user/purchases"],
  });

  const handleDownload = (purchaseId: string) => {
    // Download logic
    console.log("Downloading purchase:", purchaseId);
  };

  const handleRate = (purchaseId: string, rating: number) => {
    // Rating logic
    console.log("Rating purchase:", purchaseId, rating);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prediction": return "⚽";
      case "course": return "🎓";
      case "consultation": return "💬";
      default: return "📦";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "prediction": return "border-neon-orange/30 bg-neon-orange/5";
      case "course": return "border-electric-purple/30 bg-electric-purple/5";
      case "consultation": return "border-neon-pink/30 bg-neon-pink/5";
      default: return "border-gray-600/30 bg-gray-800/5";
    }
  };

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
      <Header />
      
      {/* Section Introduction */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6">
          <SectionIntro
            title="Мои покупки"
            description="История всех покупок: прогнозы, курсы и консультации. Твои инвестиции в успешное будущее."
            coverImage="https://images.unsplash.com/photo-1607400201515-c2c41d0e7dba?w=800&h=400&fit=crop"
            gradient=""
            icon="fas fa-shopping-bag"
          />
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {(purchases as Purchase[]).length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto mb-4 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-400 mb-2">Пока нет покупок</h2>
            <p className="text-gray-500 mb-6">Когда купишь первый прогноз или курс, он появится здесь</p>
            <button className="bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300">
              Перейти к прогнозам
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {(purchases as Purchase[]).map((purchase: Purchase) => (
              <PurchaseCard key={purchase.id} purchase={purchase} />
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}

function PurchaseCard({ purchase }: { purchase: Purchase }) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "prediction": return "⚽";
      case "course": return "🎓";
      case "consultation": return "💬";
      default: return "📦";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "prediction": return "border-neon-orange/30 bg-neon-orange/5";
      case "course": return "border-electric-purple/30 bg-electric-purple/5";
      case "consultation": return "border-neon-pink/30 bg-neon-pink/5";
      default: return "border-gray-600/30 bg-gray-800/5";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-rich-gold";
      case "active": return "text-electric-blue";
      case "expired": return "text-gray-500";
      default: return "text-gray-400";
    }
  };

  return (
    <div className={`neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl border-2 ${getTypeColor(purchase.type)} hover:border-rich-gold/40 transition-all duration-300`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{getTypeIcon(purchase.type)}</div>
          <div>
            <h3 className="text-lg font-bold text-white">{purchase.title}</h3>
            <p className="text-sm text-gray-400">{purchase.description}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-bold text-rich-gold">{purchase.price}₽</div>
          <div className={`text-sm font-semibold ${getStatusColor(purchase.status)}`}>
            {purchase.status === "completed" ? "Завершено" : 
             purchase.status === "active" ? "Активно" : "Истекло"}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center space-x-1">
          <Calendar size={16} />
          <span>{new Date(purchase.purchaseDate).toLocaleDateString('ru-RU')}</span>
        </div>
        
        {purchase.rating && (
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-rich-gold" />
            <span className="text-rich-gold">{purchase.rating}/5</span>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        {purchase.downloadUrl && (
          <button 
            onClick={() => console.log("Download", purchase.id)}
            className="flex-1 bg-electric-purple/20 border border-electric-purple/40 text-electric-purple font-semibold py-2 px-4 rounded-xl hover:bg-electric-purple/30 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Download size={16} />
            <span>Скачать</span>
          </button>
        )}
        
        {!purchase.rating && purchase.status === "completed" && (
          <button 
            onClick={() => console.log("Rate", purchase.id)}
            className="flex-1 bg-rich-gold/20 border border-rich-gold/40 text-rich-gold font-semibold py-2 px-4 rounded-xl hover:bg-rich-gold/30 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Star size={16} />
            <span>Оценить</span>
          </button>
        )}
      </div>
    </div>
  );
}