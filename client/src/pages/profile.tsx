import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useTelegram } from "@/hooks/use-telegram";
import AchievementCard from "@/components/achievement-card";
import BottomNavigation from "@/components/bottom-navigation";

export default function Profile() {
  const { user: telegramUser } = useTelegram();

  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/user"],
    enabled: !!telegramUser,
  });

  const { data: userPredictions = [] } = useQuery({
    queryKey: ["/api/user/predictions"],
    enabled: !!telegramUser,
  });

  const { data: userCourses = [] } = useQuery({
    queryKey: ["/api/user/courses"],
    enabled: !!telegramUser,
  });

  const { data: achievements = [] } = useQuery({
    queryKey: ["/api/user/achievements"],
    enabled: !!telegramUser,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rich-black">
        <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-rich-black text-white pb-24">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center py-12">
            <i className="fas fa-user text-6xl text-gray-600 mb-4"></i>
            <h2 className="text-xl font-bold text-gray-400 mb-2">Необходима авторизация</h2>
            <p className="text-gray-500">Войдите через Telegram, чтобы увидеть профиль</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rich-black text-white pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-rich-gold flex items-center">
            <i className="fas fa-user mr-2"></i>
            Профиль
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        
        {/* User Info */}
        <div className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl">
          <div className="flex items-center space-x-4 mb-6">
            <div className="story-ring">
              <img 
                src="attached_assets/Avatar_1754480043650.jpg" 
                alt="Rich Besh"
                className="w-16 h-16 rounded-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-rich-gold font-semibold">{user.level}</p>
              {user.username && (
                <p className="text-gray-400">@{user.username}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="bg-rich-gold/20 rounded-lg p-3">
                <i className="fas fa-coins text-rich-gold text-2xl mb-2"></i>
                <p className="text-sm text-gray-300">Баланс</p>
                <p className="font-bold text-rich-gold">{user.balance?.toLocaleString() || 0}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-neon-green/20 rounded-lg p-3">
                <i className="fas fa-star text-neon-green text-2xl mb-2"></i>
                <p className="text-sm text-gray-300">Опыт</p>
                <p className="font-bold text-neon-green">{user.experience || 0}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-electric-purple/20 rounded-lg p-3">
                <i className="fas fa-fire text-electric-purple text-2xl mb-2"></i>
                <p className="text-sm text-gray-300">Серия</p>
                <p className="font-bold text-electric-purple">{user.streak || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <AchievementCard user={user} />

        {/* Purchased Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Purchased Predictions */}
          <div className="neubrutalism-card bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-rich-gold mb-4 flex items-center">
              <i className="fas fa-chart-line mr-2"></i>
              Мои прогнозы
            </h3>
            {userPredictions.length === 0 ? (
              <p className="text-gray-400 text-center py-4">Прогнозы не приобретены</p>
            ) : (
              <div className="space-y-2">
                {userPredictions.slice(0, 3).map((prediction: any) => (
                  <div key={prediction.id} className="bg-white/5 rounded-lg p-3">
                    <p className="font-semibold text-white">{prediction.match}</p>
                    <p className="text-sm text-gray-400">{prediction.title}</p>
                  </div>
                ))}
                {userPredictions.length > 3 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{userPredictions.length - 3} еще
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Purchased Courses */}
          <div className="neubrutalism-card bg-gradient-to-br from-neon-green/20 to-rich-black p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-neon-green mb-4 flex items-center">
              <i className="fas fa-graduation-cap mr-2"></i>
              Мои курсы
            </h3>
            {userCourses.length === 0 ? (
              <p className="text-gray-400 text-center py-4">Курсы не приобретены</p>
            ) : (
              <div className="space-y-2">
                {userCourses.slice(0, 3).map((course: any) => (
                  <div key={course.id} className="bg-white/5 rounded-lg p-3">
                    <p className="font-semibold text-white">{course.title}</p>
                    <p className="text-sm text-gray-400">{course.description}</p>
                  </div>
                ))}
                {userCourses.length > 3 && (
                  <p className="text-xs text-gray-400 text-center">
                    +{userCourses.length - 3} еще
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

      </main>

      <BottomNavigation />
    </div>
  );
}
