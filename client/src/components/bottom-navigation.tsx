import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Target, Award, User } from 'react-feather';

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: 'home',
      label: 'Главная',
      icon: Home,
      path: '/',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'predictions',
      label: 'Прогнозы',
      icon: Target,
      path: '/predictions',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      id: 'success',
      label: 'Успех',
      icon: Award,
      path: '/success',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'lifestyle',
      label: 'Лайфстайл',
      icon: User,
      path: '/lifestyle',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-black/90 backdrop-blur-xl border-t border-gray-800/50">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-around">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                    active 
                      ? 'scale-110' 
                      : 'scale-100 hover:scale-105'
                  }`}
                >
                  <div className={`p-3 rounded-2xl transition-all duration-300 ${
                    active 
                      ? `bg-gradient-to-r ${item.gradient} shadow-lg` 
                      : 'bg-gray-800/50 hover:bg-gray-700/50'
                  }`}>
                    <Icon 
                      className={`w-6 h-6 transition-colors ${
                        active ? 'text-white' : 'text-gray-400'
                      }`}
                      strokeWidth={active ? 2.5 : 2}
                    />
                  </div>
                  
                  <span className={`text-xs font-medium mt-1 transition-colors ${
                    active 
                      ? 'text-white' 
                      : 'text-gray-500'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;