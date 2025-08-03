import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Star, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import BottomNavigation from "@/components/bottom-navigation";

interface Prediction {
  id: string;
  title: string;
  description: string;
  sport: string;
  match: string;
  matchTime: string;
  coefficient: number;
  price: number;
  confidence: "high" | "medium" | "low";
  status: "active" | "won" | "lost" | "pending";
}

export default function PredictionsPage() {
  const { user, openInvoice } = useTelegram();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: predictions = [], isLoading } = useQuery({
    queryKey: ["/api/predictions"],
  });

  const purchaseMutation = useMutation({
    mutationFn: async (predictionId: string) => {
      const prediction = predictions.find((p: Prediction) => p.id === predictionId);
      const invoiceResponse = await apiRequest("POST", "/api/create-invoice", {
        itemType: "prediction",
        itemId: predictionId,
        amount: prediction.price * 100,
        description: `Прогноз: ${prediction.title}`
      });
      
      const invoiceData = await invoiceResponse.json();
      
      return new Promise((resolve, reject) => {
        openInvoice(invoiceData.invoiceLink, (status: boolean) => {
          if (status) {
            resolve(true);
          } else {
            reject(new Error("Payment cancelled"));
          }
        });
      });
    },
    onSuccess: () => {
      toast({
        title: "Успех!",
        description: "Прогноз отправлен в ваш Telegram!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/predictions"] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось купить прогноз",
        variant: "destructive",
      });
    }
  });

  const categories = [
    { id: "all", name: "Все", icon: "⚽" },
    { id: "football", name: "Футбол", icon: "⚽" },
    { id: "basketball", name: "Баскетбол", icon: "🏀" },
    { id: "tennis", name: "Теннис", icon: "🎾" },
    { id: "hockey", name: "Хоккей", icon: "🏒" },
  ];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high": return "text-neon-green bg-neon-green/20";
      case "medium": return "text-rich-gold bg-rich-gold/20";
      case "low": return "text-gray-400 bg-gray-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won": return "text-neon-green";
      case "lost": return "text-red-500";
      case "pending": return "text-rich-gold";
      default: return "text-gray-400";
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
            <TrendingUp className="mr-2" size={24} />
            Прогнозы от Rich Besh
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Ординары, экспрессы и лайв-ставки. Только те события, которые ставлю сам.
          </p>
        </div>
      </header>

      {/* Categories */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? "bg-rich-gold text-black"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Predictions Grid */}
      <main className="container mx-auto px-4 space-y-4">
        {predictions.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
            <p>Активных прогнозов пока нет</p>
          </div>
        ) : (
          predictions.map((prediction: Prediction) => (
            <PredictionCard
              key={prediction.id}
              prediction={prediction}
              onPurchase={() => purchaseMutation.mutate(prediction.id)}
              isPurchasing={purchaseMutation.isPending}
            />
          ))
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}

function PredictionCard({ 
  prediction, 
  onPurchase, 
  isPurchasing 
}: { 
  prediction: Prediction; 
  onPurchase: () => void;
  isPurchasing: boolean;
}) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high": return "text-neon-green bg-neon-green/20";
      case "medium": return "text-rich-gold bg-rich-gold/20";
      case "low": return "text-gray-400 bg-gray-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won": return "text-neon-green";
      case "lost": return "text-red-500";
      case "pending": return "text-rich-gold";
      default: return "text-gray-400";
    }
  };

  return (
    <div className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl animate-slide-up">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{prediction.sport === "football" ? "⚽" : prediction.sport === "basketball" ? "🏀" : "🎾"}</span>
            <div>
              <h3 className="text-xl font-bold text-white animate-glow">
                {prediction.title}
              </h3>
              <p className="text-gray-400 text-sm">{prediction.match}</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-3">{prediction.description}</p>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2">
              <Clock size={16} className="text-rich-gold" />
              <span className="text-sm text-gray-300">{prediction.matchTime}</span>
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-bold ${getConfidenceColor(prediction.confidence)}`}>
              <Star size={12} className="inline mr-1" />
              {prediction.confidence === "high" ? "Уверен" : prediction.confidence === "medium" ? "Средний" : "Низкий"}
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="bg-neon-green text-black px-3 py-1 rounded-full font-bold text-lg mb-2">
            x{prediction.coefficient}
          </div>
          <div className={`text-sm font-semibold ${getStatusColor(prediction.status)}`}>
            {prediction.status === "won" ? "✅ Прошел" : 
             prediction.status === "lost" ? "❌ Не прошел" :
             prediction.status === "pending" ? "⏳ В игре" : "🔥 Активен"}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-rich-gold font-bold text-xl">
          💰 {prediction.price.toLocaleString()} ₽
        </div>
        
        <button
          onClick={onPurchase}
          disabled={isPurchasing || prediction.status !== "active"}
          className="bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed animate-pulse-glow"
        >
          {isPurchasing ? "Покупка..." : prediction.status === "active" ? "Купить прогноз" : "Недоступен"}
        </button>
      </div>
    </div>
  );
}