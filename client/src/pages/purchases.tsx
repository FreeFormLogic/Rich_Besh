import { useQuery } from "@tanstack/react-query";
import { Loader2, ShoppingBag, CheckCircle, Clock, XCircle, Download } from "lucide-react";
import BottomNavigation from "@/components/bottom-navigation";

interface Purchase {
  id: string;
  type: "prediction" | "course" | "consultation";
  title: string;
  price: number;
  status: "delivered" | "pending" | "cancelled" | "available";
  purchaseDate: string;
  deliveryDate?: string;
  downloadUrl?: string;
}

export default function PurchasesPage() {
  const { data: purchases = [], isLoading } = useQuery({
    queryKey: ["/api/user/purchases"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="text-neon-green" size={20} />;
      case "pending": return <Clock className="text-rich-gold" size={20} />;
      case "cancelled": return <XCircle className="text-red-500" size={20} />;
      case "available": return <Download className="text-electric-purple" size={20} />;
      default: return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered": return "✅ доставлен";
      case "pending": return "🕓 в ожидании";
      case "cancelled": return "❌ отменен";
      case "available": return "📥 доступен";
      default: return "⏳ обработка";
    }
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
      case "prediction": return "border-neon-green/30 bg-neon-green/5";
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
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-rich-gold flex items-center animate-neon-pulse">
            <ShoppingBag className="mr-2" size={24} />
            История покупок
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Здесь хранятся все прогнозы, курсы и консультации, которые ты оплатил.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {purchases.length === 0 ? (
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
            {purchases.map((purchase: Purchase) => (
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered": return <CheckCircle className="text-neon-green" size={20} />;
      case "pending": return <Clock className="text-rich-gold" size={20} />;
      case "cancelled": return <XCircle className="text-red-500" size={20} />;
      case "available": return <Download className="text-electric-purple" size={20} />;
      default: return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered": return "✅ доставлен";
      case "pending": return "🕓 в ожидании";
      case "cancelled": return "❌ отменен";
      case "available": return "📥 доступен";
      default: return "⏳ обработка";
    }
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
      case "prediction": return "border-neon-green/30 bg-neon-green/5";
      case "course": return "border-electric-purple/30 bg-electric-purple/5";
      case "consultation": return "border-neon-pink/30 bg-neon-pink/5";
      default: return "border-gray-600/30 bg-gray-800/5";
    }
  };

  return (
    <div className={`neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl border-2 ${getTypeColor(purchase.type)} animate-slide-up`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl">{getTypeIcon(purchase.type)}</span>
          <div>
            <h3 className="text-lg font-bold text-white">{purchase.title}</h3>
            <p className="text-sm text-gray-400">
              Куплено: {new Date(purchase.purchaseDate).toLocaleDateString("ru-RU")}
            </p>
            {purchase.deliveryDate && (
              <p className="text-sm text-gray-400">
                Доставлено: {new Date(purchase.deliveryDate).toLocaleDateString("ru-RU")}
              </p>
            )}
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-2">
            {getStatusIcon(purchase.status)}
            <span className="text-sm font-semibold">{getStatusText(purchase.status)}</span>
          </div>
          <div className="text-rich-gold font-bold">
            {purchase.price.toLocaleString()} ₽
          </div>
        </div>
      </div>

      {purchase.status === "available" && purchase.downloadUrl && (
        <button
          onClick={() => window.open(purchase.downloadUrl, '_blank')}
          className="w-full bg-gradient-to-r from-electric-purple to-purple-400 text-white font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Download size={16} />
          <span>Перейти к материалам</span>
        </button>
      )}

      {purchase.status === "pending" && (
        <div className="bg-rich-gold/10 border border-rich-gold/30 rounded-lg p-3 text-center">
          <p className="text-rich-gold text-sm">
            Ожидаем подтверждение. Материалы будут доставлены в ближайшее время.
          </p>
        </div>
      )}
    </div>
  );
}