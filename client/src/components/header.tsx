import { useLocation } from "wouter";

interface HeaderProps {
  showBackButton?: boolean;
}

export default function Header({ showBackButton = false }: HeaderProps) {
  const [, setLocation] = useLocation();

  const handleAvatarClick = () => {
    setLocation("/");
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-rich-black via-gray-900 to-rich-black border-b border-rich-gold/30 backdrop-blur-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleAvatarClick}
            className="relative group cursor-pointer"
          >
            <div className="story-ring-small">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" 
                alt="Rich Besh" 
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-rich-gold rounded-full border-2 border-rich-black flex items-center justify-center">
              <span className="text-[8px] font-bold text-black">3</span>
            </div>
          </button>
          
          <div>
            <h1 className="text-rich-gold font-bold text-lg">Rich Besh</h1>
            <p className="text-gray-300 text-sm">Уровень: Миллионер</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-rich-gold font-bold text-lg">12 450</p>
            <p className="text-gray-400 text-xs">баланс</p>
          </div>
        </div>
      </div>
    </div>
  );
}