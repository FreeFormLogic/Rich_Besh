import { useLocation } from "wouter";

export default function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const navItems = [
    { path: "/predictions", icon: "fas fa-chart-line", label: "Прогнозы" },
    { path: "/courses", icon: "fas fa-graduation-cap", label: "Курсы" },
    { path: "/trust-management", icon: "fas fa-shield-alt", label: "Раскрутка" },
    { path: "/consultations", icon: "fas fa-comments", label: "Консультации" },
    { path: "/partners", icon: "fas fa-handshake", label: "Партнёры" },
    { path: "/purchases", icon: "fas fa-shopping-bag", label: "Покупки" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-rich-black border-t border-rich-gold/20 z-50">
      <div className="flex justify-around py-2 px-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`flex flex-col items-center transition-colors flex-1 min-w-0 px-1 ${
              location === item.path 
                ? "text-rich-gold" 
                : "text-gray-400 hover:text-rich-gold"
            }`}
            onClick={() => setLocation(item.path)}
          >
            <i className={`${item.icon} text-lg mb-1`}></i>
            <span className="text-xs text-center leading-none max-w-full break-words">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
