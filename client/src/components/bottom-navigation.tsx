import { useLocation } from "wouter";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/", icon: "fas fa-home", label: "Главная" },
    { path: "/predictions", icon: "fas fa-chart-line", label: "Прогнозы" },
    { path: "/trust-management", icon: "fas fa-shield-alt", label: "Раскрутка" },
    { path: "/courses", icon: "fas fa-graduation-cap", label: "Курсы" },
    { path: "/profile", icon: "fas fa-user", label: "Профиль" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-rich-black border-t border-rich-gold/20 z-50">
      <div className="flex justify-around py-3">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`flex flex-col items-center transition-colors ${
              location === item.path 
                ? "text-rich-gold" 
                : "text-gray-400 hover:text-rich-gold"
            }`}
            onClick={() => setLocation(item.path)}
          >
            <i className={`${item.icon} text-xl mb-1`}></i>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
