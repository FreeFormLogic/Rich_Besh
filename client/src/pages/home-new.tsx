import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTelegram } from "@/hooks/use-telegram";
import StoriesSection from "@/components/stories-section";
import PredictionCard from "@/components/prediction-card";
import PartnersSection from "@/components/partners-section";
import BottomNavigation from "@/components/bottom-navigation";
import SupportButton from "@/components/support-button";

export default function Home() {
  const { user: telegramUser } = useTelegram();
  
  const { data: predictions = [], isLoading: predictionsLoading } = useQuery({
    queryKey: ["/api/predictions"],
  });

  const { data: partners = [], isLoading: partnersLoading } = useQuery({
    queryKey: ["/api/partners"],
  });

  const currentUser = {
    firstName: telegramUser?.first_name || "Rich",
    lastName: telegramUser?.last_name || "Besh",
    username: telegramUser?.username,
    level: "Миллионер",
    balance: 12450
  };

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="story-ring">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                  alt="Rich Besh" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-rich-gold">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>
                <p className="text-sm text-gray-300">
                  Уровень: <span className="text-rich-gold font-semibold">{currentUser.level}</span>
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-400 hover:text-rich-gold transition-colors">
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-2 bg-rich-gold/10 rounded-full px-3 py-1">
                <i className="fas fa-coins text-rich-gold"></i>
                <span className="font-bold text-rich-gold">
                  {currentUser.balance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-8">
        
        {/* Stories Section */}
        <StoriesSection />

        {/* Motivation Wall - Main Content */}
        <section className="space-y-6">
          
          {/* Live Predictions Card - Premium Design */}
          <div className="bg-gradient-to-br from-rich-black via-gray-900 to-rich-black p-8 rounded-3xl border border-rich-gold/30 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold text-rich-gold flex items-center">
                <i className="fas fa-fire mr-3 text-neon-orange animate-pulse"></i>
                Прогнозы Live
              </h3>
              <span className="bg-gradient-to-r from-neon-orange to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse shadow-lg">
                🔥 ГОРЯЧИЕ
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <div className="flex space-x-6 pb-6">
                {predictionsLoading ? (
                  <div className="flex justify-center py-12 w-full">
                    <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
                  </div>
                ) : predictions.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 w-full">
                    <i className="fas fa-chart-line text-4xl mb-4 opacity-50"></i>
                    <p className="text-lg">Готовим новые прогнозы...</p>
                  </div>
                ) : (
                  predictions.map((prediction: any) => (
                    <div key={prediction.id} className="flex-shrink-0 w-96">
                      <PredictionCard prediction={prediction} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Motivation Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Success Story */}
            <div className="bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl border border-rich-gold/20">
              <h4 className="text-xl font-bold text-rich-gold mb-4 flex items-center">
                <i className="fas fa-trophy mr-2"></i>
                Путь к миллиону
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=face" 
                    alt="Success" 
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">+247,000₽ за неделю</p>
                    <p className="text-gray-400 text-sm">Экспресс на НБА</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  "Следовал стратегии Rich Besh - анализ статистики, дисциплина в банкролл-менеджменте. Результат превзошел ожидания!"
                </p>
              </div>
            </div>

            {/* Partner Highlight */}
            <div className="bg-gradient-to-br from-electric-purple/20 to-rich-black p-6 rounded-2xl border border-electric-purple/20">
              <h4 className="text-xl font-bold text-electric-purple mb-4 flex items-center">
                <i className="fas fa-star mr-2"></i>
                Рекомендация дня
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold">1x</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold">1xBet</p>
                    <p className="text-gray-400 text-sm">Бонус 25,000₽</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">
                  Лучшие коэффициенты на топ-матчи. Быстрые выплаты. Моя основная площадка для экспрессов.
                </p>
                <button className="w-full bg-gradient-to-r from-electric-purple to-neon-pink text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all">
                  Забрать бонус
                </button>
              </div>
            </div>

            {/* Premium Tools */}
            <div className="bg-gradient-to-br from-neon-pink/20 to-rich-black p-6 rounded-2xl border border-neon-pink/20">
              <h4 className="text-xl font-bold text-neon-pink mb-4 flex items-center">
                <i className="fas fa-tools mr-2"></i>
                Инструменты успеха
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white">Калькулятор банкролла</span>
                  <span className="text-rich-gold font-bold">₽1,990</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">Статистика матчей</span>
                  <span className="text-rich-gold font-bold">₽2,990</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white">VIP-аналитика</span>
                  <span className="text-rich-gold font-bold">₽4,990</span>
                </div>
                <button className="w-full bg-gradient-to-r from-neon-pink to-electric-purple text-white font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all">
                  Выбрать пакет
                </button>
              </div>
            </div>

            {/* Lifestyle Goal */}
            <div className="bg-gradient-to-br from-neon-orange/20 to-rich-black p-6 rounded-2xl border border-neon-orange/20">
              <h4 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
                <i className="fas fa-crown mr-2"></i>
                Цель месяца
              </h4>
              <div className="space-y-3">
                <img 
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=150&fit=crop" 
                  alt="Luxury car" 
                  className="w-full h-24 object-cover rounded-lg"
                />
                <p className="text-white font-semibold">Lamborghini Huracán</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm">До цели:</span>
                  <span className="text-neon-orange font-bold">18,500,000₽</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-neon-orange to-rich-gold h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
              </div>
            </div>

          </div>

          {/* Partners Section */}
          <div className="col-span-1">
            {partnersLoading ? (
              <div className="bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-rich-gold" />
              </div>
            ) : (
              <PartnersSection partners={partners} />
            )}
          </div>

        </section>

      </main>

      <SupportButton />
      <BottomNavigation />
    </div>
  );
}