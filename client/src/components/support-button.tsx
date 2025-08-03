import { Headphones } from "lucide-react";
import { useLocation } from "wouter";

export default function SupportButton() {
  const [, setLocation] = useLocation();

  return (
    <button
      onClick={() => setLocation("/support")}
      className="fixed bottom-24 right-4 w-14 h-14 bg-gradient-to-br from-rich-gold to-yellow-400 rounded-full flex items-center justify-center text-black hover:scale-110 transition-all duration-300 shadow-lg z-40 animate-pulse-glow"
    >
      <Headphones size={24} />
    </button>
  );
}