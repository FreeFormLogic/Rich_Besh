import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTelegram } from "@/hooks/use-telegram";
import StoriesSection from "@/components/stories-section";
import BottomNavigation from "@/components/bottom-navigation";
import SupportButton from "@/components/support-button";
import Header from "@/components/header";
import RichContentGallery from "@/components/rich-content-gallery";
import SuccessProofs from "@/components/success-proofs";
import TelegramWins from "@/components/telegram-wins";
import DemoVideos from "@/components/demo-videos";

export default function Home() {
  const { user: telegramUser } = useTelegram();
  
  const { data: predictions = [], isLoading: predictionsLoading } = useQuery({
    queryKey: ["/api/predictions"],
  });

  const { data: partners = [], isLoading: partnersLoading } = useQuery({
    queryKey: ["/api/partners"],
  });

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <div className="pt-20">
        <main className="container mx-auto px-4 py-6 space-y-8">
          
          {/* Stories Section */}
          <StoriesSection />

          {/* Rich Besh Success Proofs - Main Content */}
          <SuccessProofs />

          {/* Demo Videos - Working Video Examples */}
          <DemoVideos />

          {/* Telegram Channel Wins - Real Betting Proofs */}
          <TelegramWins />

          {/* Rich Besh Instagram Content Gallery */}
          <RichContentGallery />

          {/* Live Predictions Section */}
          <section className="space-y-6">
            
            {/* Live Predictions Card - Premium Design */}
            <div className="bg-gradient-to-br from-rich-black via-gray-900 to-rich-black p-6 rounded-3xl border border-rich-gold/30 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-rich-gold flex items-center">
                  <i className="fas fa-fire mr-3 text-neon-orange animate-pulse"></i>
                  Прогнозы Live
                </h3>
                <span className="bg-gradient-to-r from-neon-orange to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse shadow-lg">
                  🔥 ГОРЯЧИЕ
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <div className="flex space-x-4 pb-4">
                  {predictionsLoading ? (
                    <div className="flex justify-center py-8 w-full">
                      <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
                    </div>
                  ) : predictions.length === 0 ? (
                    <div className="text-center py-8 text-gray-400 w-full">
                      <i className="fas fa-chart-line text-4xl mb-4 opacity-50"></i>
                      <p className="text-lg">Готовим новые прогнозы...</p>
                    </div>
                  ) : (
                    predictions.map((prediction: any) => (
                      <div key={prediction.id} className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 border border-rich-gold/20 hover:border-rich-gold/40 hover:scale-105 hover:shadow-lg hover:shadow-rich-gold/20 transition-all duration-300">
                        {/* Match Cover Image */}
                        <div className="relative mb-4">
                          <img 
                            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=200&fit=crop" 
                            alt="Match cover" 
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 bg-neon-orange text-white px-2 py-1 rounded text-xs font-bold">
                            LIVE
                          </div>
                        </div>
                        
                        {/* Match Info */}
                        <div className="space-y-3">
                          <h4 className="text-white font-bold text-lg leading-tight">
                            {prediction.match}
                          </h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <i className="fas fa-clock"></i>
                            <span>{prediction.time}</span>
                          </div>
                          
                          {/* Prediction Details */}
                          <div className="bg-rich-black/50 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-gray-300 text-sm">Прогноз:</span>
                              <span className="text-rich-gold font-bold">{prediction.prediction}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-300 text-sm">Коэф:</span>
                              <span className="text-white font-bold">{prediction.odds}</span>
                            </div>
                          </div>
                          
                          {/* Action Button */}
                          <button className="w-full bg-gradient-to-r from-rich-gold to-neon-orange text-black font-bold py-2 px-4 rounded-lg hover:scale-105 transition-all">
                            Купить за {prediction.price}₽
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Video Proof Section */}
            <div className="bg-gradient-to-br from-electric-purple/20 to-rich-black p-6 rounded-2xl border border-electric-purple/20">
              <h4 className="text-xl font-bold text-electric-purple mb-4 flex items-center">
                <i className="fas fa-video mr-2"></i>
                Последний пруф
              </h4>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=300&fit=crop" 
                  alt="Proof video" 
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                  <button className="bg-rich-gold text-black rounded-full w-16 h-16 flex items-center justify-center hover:scale-110 transition-all">
                    <i className="fas fa-play ml-1 text-xl"></i>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-3 py-2 rounded-lg">
                  <p className="text-lg font-bold text-rich-gold">+347,000₽</p>
                  <p className="text-sm">Экспресс на НБА</p>
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                  LIVE
                </div>
              </div>
              <button className="w-full mt-4 bg-gradient-to-r from-electric-purple to-neon-pink text-white font-bold py-3 px-4 rounded-lg hover:scale-105 transition-all">
                Смотреть все пруфы
              </button>
            </div>

            {/* Motivation Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Success Story */}
              <div className="bg-gradient-to-br from-neon-green/20 to-rich-black p-6 rounded-2xl border border-neon-green/20">
                <h4 className="text-xl font-bold text-neon-green mb-4 flex items-center">
                  <i className="fas fa-trophy mr-2"></i>
                  История успеха
                </h4>
                <div className="flex items-start space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face" 
                    alt="User success" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold mb-2">Дмитрий, 29 лет</p>
                    <p className="text-gray-300 text-sm">
                      "Благодаря Rich прошёл путь от 50К до 2М за год. Купил квартиру в центре и BMW!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievement Showcase */}
              <div className="bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl border border-rich-gold/20">
                <h4 className="text-xl font-bold text-rich-gold mb-4 flex items-center">
                  <i className="fas fa-star mr-2"></i>
                  Достижение недели
                </h4>
                <div className="text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-white font-bold text-lg mb-1">500% ROI</p>
                  <p className="text-gray-300 text-sm">На стратегии "Догон 2.0"</p>
                </div>
              </div>

            </div>

            {/* Success Stories Extended */}
            <div className="bg-gradient-to-br from-neon-pink/20 to-rich-black p-6 rounded-2xl border border-neon-pink/20">
              <h4 className="text-xl font-bold text-neon-pink mb-4 flex items-center">
                <i className="fas fa-users mr-2"></i>
                Истории подписчиков
              </h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 bg-rich-black/50 p-4 rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face" 
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">Александр, 28 лет</p>
                    <p className="text-gray-300 text-sm mb-2">
                      "Благодаря стратегиям Rich Besh за 3 месяца вышел в плюс на 850,000₽. Купил BMW X5 в кредит!"
                    </p>
                    <div className="flex space-x-2">
                      <span className="bg-rich-gold/20 text-rich-gold px-2 py-1 rounded text-xs">+850К</span>
                      <span className="bg-electric-purple/20 text-electric-purple px-2 py-1 rounded text-xs">BMW X5</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-rich-black/50 p-4 rounded-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616b72a6b69?w=50&h=50&fit=crop&crop=face" 
                    alt="User" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-white font-semibold mb-1">Мария, 24 года</p>
                    <p className="text-gray-300 text-sm mb-2">
                      "Прошла курс 'Психология миллионера' - изменила мышление. Теперь зарабатываю 300К в месяц!"
                    </p>
                    <div className="flex space-x-2">
                      <span className="bg-rich-gold/20 text-rich-gold px-2 py-1 rounded text-xs">300К/месяц</span>
                      <span className="bg-neon-orange/20 text-neon-orange px-2 py-1 rounded text-xs">Инвестиции</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lifestyle Inspiration */}
            <div className="bg-gradient-to-br from-neon-orange/20 to-rich-black p-6 rounded-2xl border border-neon-orange/20">
              <h4 className="text-xl font-bold text-neon-orange mb-4 flex items-center">
                <i className="fas fa-diamond mr-2"></i>
                Мотивация дня
              </h4>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=300&fit=crop" 
                  alt="Luxury car" 
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute bottom-4 left-4 bg-black/80 text-white px-4 py-3 rounded-lg">
                  <p className="text-lg font-bold text-neon-orange">Lamborghini Huracán</p>
                  <p className="text-sm">Следующая цель</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mt-4 italic">
                "Каждый день - это возможность приблизиться к мечте. Я показываю путь, ты идешь по нему."
              </p>
              <p className="text-rich-gold font-bold text-right mt-2">- Rich Besh</p>
            </div>

            {/* Daily Tips */}
            <div className="bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl border border-rich-gold/20">
              <h4 className="text-xl font-bold text-rich-gold mb-4 flex items-center">
                <i className="fas fa-lightbulb mr-2"></i>
                Совет дня
              </h4>
              <div className="bg-rich-black/50 p-4 rounded-lg">
                <p className="text-white font-semibold mb-2">Правило 1% в день</p>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Увеличивай банк на 1% каждый день. За год это даст рост в 37 раз! 
                  100,000₽ превратятся в 3,700,000₽. Дисциплина решает всё.
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-400 text-sm">Читали: 2,847 человек</span>
                <button className="bg-rich-gold text-black px-4 py-2 rounded-lg font-bold hover:scale-105 transition-all">
                  Изучить стратегию
                </button>
              </div>
            </div>

          </section>
        </main>
      </div>

      <BottomNavigation />
      <SupportButton />
    </div>
  );
}