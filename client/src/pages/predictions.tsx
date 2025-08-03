import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import PredictionCard from "@/components/prediction-card";
import BottomNavigation from "@/components/bottom-navigation";

export default function Predictions() {
  const { data: predictions = [], isLoading } = useQuery({
    queryKey: ["/api/predictions"],
  });

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-rich-gold flex items-center">
            <i className="fas fa-chart-line mr-2"></i>
            Спортивные прогнозы
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
          </div>
        ) : predictions.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-chart-line text-6xl text-gray-600 mb-4"></i>
            <h2 className="text-xl font-bold text-gray-400 mb-2">Нет активных прогнозов</h2>
            <p className="text-gray-500">Прогнозы появятся в ближайшее время</p>
          </div>
        ) : (
          <div className="space-y-4">
            {predictions.map((prediction: any) => (
              <div key={prediction.id} className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-4 rounded-2xl">
                <PredictionCard prediction={prediction} />
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
