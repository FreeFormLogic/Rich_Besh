interface User {
  level?: string;
  experience?: number;
  streak?: number;
}

interface AchievementCardProps {
  user?: User;
}

export default function AchievementCard({ user }: AchievementCardProps) {
  const level = user?.level || "Миллионер";
  const experience = user?.experience || 2450;
  const streak = user?.streak || 15;
  
  // Calculate progress (example: 1000 XP per level)
  const experiencePerLevel = 1000;
  const currentLevelXP = experience % experiencePerLevel;
  const progressPercentage = (currentLevelXP / experiencePerLevel) * 100;

  const weeklyProgress = 7; // Example: 7 out of 10 tasks completed
  const weeklyTotal = 10;
  const weeklyPercentage = (weeklyProgress / weeklyTotal) * 100;

  return (
    <div className="neubrutalism-card bg-gradient-to-br from-purple-900 to-rich-black p-6 rounded-2xl">
      <h3 className="text-xl font-bold text-electric-purple mb-4 flex items-center">
        <i className="fas fa-trophy mr-2 achievement-glow"></i>
        Достижения
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Недельный челлендж</span>
            <span className="text-rich-gold font-bold">{weeklyProgress}/{weeklyTotal}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-rich-gold to-yellow-400 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${weeklyPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">Опыт ({level})</span>
            <span className="text-rich-gold font-bold">{currentLevelXP}/{experiencePerLevel}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-electric-purple to-purple-400 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="bg-rich-gold/20 p-2 rounded-lg text-center flex-1">
            <i className="fas fa-fire text-rich-gold text-xl"></i>
            <p className="text-xs text-gray-300 mt-1">{streak} дней</p>
          </div>
          <div className="bg-neon-green/20 p-2 rounded-lg text-center flex-1">
            <i className="fas fa-gem text-neon-green text-xl"></i>
            <p className="text-xs text-gray-300 mt-1">{level}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
