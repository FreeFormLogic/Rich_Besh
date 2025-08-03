import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2, Star, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import SectionIntro from "@/components/section-intro";

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
      case "high": return "text-neon-orange bg-neon-orange/20";
      case "medium": return "text-rich-gold bg-rich-gold/20";
      case "low": return "text-gray-400 bg-gray-400/20";
      default: return "text-gray-400 bg-gray-400/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "won": return "text-neon-orange";
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
      <Header />
      
      {/* Section Introduction */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6">
          <SectionIntro
            title="Прогнозы Live"
            description="Эксклюзивные прогнозы от профессионалов с проходимостью 87%. Каждый прогноз проверен экспертами и содержит детальный анализ."
            coverImage="https://images.unsplash.com/photo-1504593811423-6dd665756598?w=800&h=400&fit=crop"
            gradient=""
            icon="fas fa-fire"
          />
        </div>
      </div>
      
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
        {(predictions as Prediction[]).length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <TrendingUp size={48} className="mx-auto mb-4 opacity-50" />
            <p>Активных прогнозов пока нет</p>
          </div>
        ) : (
          (predictions as Prediction[]).map((prediction: Prediction) => (
            <PredictionCard
              key={prediction.id}
              prediction={prediction}
              onPurchase={() => purchaseMutation.mutate(prediction.id)}
              isPurchasing={purchaseMutation.isPending}
              getConfidenceColor={getConfidenceColor}
              getStatusColor={getStatusColor}
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
  isPurchasing,
  getConfidenceColor,
  getStatusColor
}: { 
  prediction: Prediction; 
  onPurchase: () => void;
  isPurchasing: boolean;
  getConfidenceColor: (confidence: string) => string;
  getStatusColor: (status: string) => string;
}) {
  return (
    <div className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl border border-rich-gold/20 hover:border-rich-gold/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-rich-gold/20 p-2 rounded-full">
            <TrendingUp className="text-rich-gold" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{prediction.title}</h3>
            <p className="text-sm text-gray-400">{prediction.sport}</p>
          </div>
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getConfidenceColor(prediction.confidence)}`}>
          {prediction.confidence === "high" ? "🔥 FIRE" : 
           prediction.confidence === "medium" ? "⭐ TOP" : "📊 OK"}
        </div>
      </div>

      {/* Match Info */}
      <div className="mb-4">
        <h4 className="font-semibold text-white mb-2">{prediction.match}</h4>
        <p className="text-sm text-gray-300 mb-3">{prediction.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{prediction.matchTime}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-rich-gold" />
            <span className="text-rich-gold font-bold">{prediction.coefficient}</span>
          </div>
          <div className={`flex items-center space-x-1 ${getStatusColor(prediction.status)}`}>
            <span className="font-semibold">{prediction.status}</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <button 
        onClick={onPurchase}
        disabled={isPurchasing}
        className="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-3 px-4 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPurchasing ? "Покупка..." : `Купить за ${prediction.price}₽`}
      </button>
    </div>
  );
}