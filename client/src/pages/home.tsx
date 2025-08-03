import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import StoriesSection from "@/components/stories-section";
import PredictionCard from "@/components/prediction-card";
import AchievementCard from "@/components/achievement-card";
import CommunityPoll from "@/components/community-poll";
import CourseCard from "@/components/course-card";
import TrustManagement from "@/components/trust-management";
import PartnersSection from "@/components/partners-section";
import CommunityChat from "@/components/community-chat";
import VideoProofFeed from "@/components/video-proof-feed";
import BottomNavigation from "@/components/bottom-navigation";
import { useTelegram } from "@/hooks/use-telegram";

export default function Home() {
  const { user } = useTelegram();

  const { data: currentUser, isLoading: userLoading } = useQuery({
    queryKey: ["/api/user"],
    enabled: !!user,
  });

  const { data: predictions = [], isLoading: predictionsLoading } = useQuery({
    queryKey: ["/api/predictions"],
  });

  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  const { data: polls = [], isLoading: pollsLoading } = useQuery({
    queryKey: ["/api/polls"],
  });

  const { data: partners = [], isLoading: partnersLoading } = useQuery({
    queryKey: ["/api/partners"],
  });

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rich-black">
        <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="story-ring">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                  alt="Rich Besh Profile" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-rich-gold animate-neon-pulse">
                  {currentUser?.firstName || "Rich Besh"}
                </h1>
                <p className="text-sm text-gray-300">
                  Уровень: {currentUser?.level || "Миллионер"} 💎
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="relative text-rich-gold hover:text-white transition-colors">
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute -top-2 -right-2 bg-neon-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  3
                </span>
              </button>
              
              <div className="flex items-center space-x-2 bg-rich-gold/10 rounded-full px-3 py-1">
                <i className="fas fa-coins text-rich-gold"></i>
                <span className="font-bold text-rich-gold">
                  {currentUser?.balance?.toLocaleString() || "12,450"}
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

        {/* Video Proof Feed - Main Content */}
        <VideoProofFeed />

        {/* Bento Grid Layout */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Live Predictions Card */}
          <div className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl col-span-1 md:col-span-2 lg:col-span-2 animate-float">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-rich-gold flex items-center">
                <i className="fas fa-chart-line mr-2 animate-pulse"></i>
                Прогнозы Live
              </h3>
              <span className="bg-neon-green/20 text-neon-green px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                🔥 ГОРЯЧИЕ
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <div className="flex space-x-4 pb-4">
                {predictionsLoading ? (
                  <div className="flex justify-center py-8 w-full">
                    <Loader2 className="h-6 w-6 animate-spin text-rich-gold" />
                  </div>
                ) : predictions.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 w-full">
                    Нет активных прогнозов
                  </div>
                ) : (
                  predictions.map((prediction: any) => (
                    <div key={prediction.id} className="flex-shrink-0 w-80">
                      <PredictionCard prediction={prediction} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Achievement Progress */}
          <AchievementCard user={currentUser} />

          {/* Community Poll */}
          <div className="col-span-1">
            {pollsLoading ? (
              <div className="neubrutalism-card bg-gradient-to-br from-neon-pink/20 to-rich-black p-6 rounded-2xl flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-neon-pink" />
              </div>
            ) : polls.length > 0 ? (
              <CommunityPoll poll={polls[0]} />
            ) : (
              <div className="neubrutalism-card bg-gradient-to-br from-neon-pink/20 to-rich-black p-6 rounded-2xl">
                <h3 className="text-xl font-bold text-neon-pink mb-4 flex items-center">
                  <i className="fas fa-poll mr-2"></i>
                  Опросы
                </h3>
                <p className="text-gray-400">Нет активных опросов</p>
              </div>
            )}
          </div>

          {/* Courses Preview */}
          <div className="neubrutalism-card bg-gradient-to-br from-neon-green/20 to-rich-black p-6 rounded-2xl col-span-1 md:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold text-neon-green flex items-center">
                <i className="fas fa-graduation-cap mr-2"></i>
                Обучение
              </h3>
              <button className="text-rich-gold hover:text-white transition-colors">
                Все курсы <i className="fas fa-arrow-right ml-1"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coursesLoading ? (
                <div className="col-span-2 flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-neon-green" />
                </div>
              ) : courses.length === 0 ? (
                <div className="col-span-2 text-center py-8 text-gray-400">
                  Нет доступных курсов
                </div>
              ) : (
                courses.slice(0, 2).map((course: any) => (
                  <CourseCard key={course.id} course={course} />
                ))
              )}
            </div>
          </div>

          {/* Trust Management */}
          <TrustManagement />

          {/* Partners Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            {partnersLoading ? (
              <div className="neubrutalism-card bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl flex items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-rich-gold" />
              </div>
            ) : (
              <PartnersSection partners={partners} />
            )}
          </div>

        </section>

        {/* Community Chat Preview */}
        <CommunityChat />

      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-20 right-4 bg-gradient-to-r from-rich-gold to-yellow-400 text-black w-14 h-14 rounded-full shadow-lg flex items-center justify-center animate-pulse-glow z-40">
        <i className="fas fa-crown text-xl"></i>
      </button>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
