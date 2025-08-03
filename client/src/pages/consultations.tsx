import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MessageCircle, Clock, CheckCircle, Calendar } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import SectionIntro from "@/components/section-intro";

export default function ConsultationsPage() {
  const { user } = useTelegram();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    topic: "general",
    duration: "60",
    date: "",
    time: "",
    details: ""
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/consultations", data);
    },
    onSuccess: () => {
      toast({
        title: "Консультация забронирована!",
        description: "Ожидай подтверждение в Telegram",
      });
      setFormData({ topic: "general", duration: "60", date: "", time: "", details: "" });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось забронировать консультацию",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      toast({
        title: "Заполните форму",
        description: "Дата и время обязательны",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const topics = [
    { id: "general", name: "Путь миллионера", price: "5,000₽", description: "Как я заработал первый миллион и как можешь ты" },
    { id: "bankroll", name: "Управление капиталом", price: "7,500₽", description: "Инвестиции, активы и пассивный доход" },
    { id: "analytics", name: "Психология богатства", price: "10,000₽", description: "Мышление миллионера и преодоление барьеров" },
    { id: "custom", name: "VIP наставничество", price: "15,000₽", description: "Персональный план достижения финансовой свободы" }
  ];

  const durations = [
    { id: "30", name: "30 минут", multiplier: 0.7 },
    { id: "60", name: "60 минут", multiplier: 1.0 },
    { id: "90", name: "90 минут", multiplier: 1.4 }
  ];

  const features = [
    "Персональный план развития к миллиону",
    "Разбор источников дохода и инвестиций", 
    "Психология успеха и преодоление барьеров",
    "Поддержка в чате и контроль прогресса"
  ];

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <Header />
      
      {/* Section Introduction */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6">
          <SectionIntro
            title="Личные консультации"
            description="Персональные встречи с Rich Besh. Узнай секреты достижения миллиона и получи индивидуальный план развития."
            coverImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=400&fit=crop"
            gradient=""
            icon="fas fa-user-tie"
          />
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Features */}
        <section className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-rich-gold mb-4">Что входит в консультацию:</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-300">
                <CheckCircle className="text-rich-gold mr-3" size={16} />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-rich-gold mb-6">Забронировать консультацию</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Topic Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Тема консультации
              </label>
              <div className="grid md:grid-cols-2 gap-3">
                {topics.map((topic) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setFormData({...formData, topic: topic.id})}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.topic === topic.id
                        ? "border-rich-gold bg-rich-gold/10 text-rich-gold"
                        : "border-gray-600 bg-white/5 text-gray-300 hover:border-rich-gold/50"
                    }`}
                  >
                    <h3 className="font-semibold mb-1">{topic.name}</h3>
                    <p className="text-xs text-gray-400 mb-2">{topic.description}</p>
                    <span className="text-sm font-bold text-neon-green">{topic.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Длительность
              </label>
              <div className="flex space-x-3">
                {durations.map((duration) => (
                  <button
                    key={duration.id}
                    type="button"
                    onClick={() => setFormData({...formData, duration: duration.id})}
                    className={`flex-1 p-3 rounded-xl border transition-all ${
                      formData.duration === duration.id
                        ? "border-rich-gold bg-rich-gold/10 text-rich-gold"
                        : "border-gray-600 bg-white/5 text-gray-300 hover:border-rich-gold/50"
                    }`}
                  >
                    <Clock size={16} className="mx-auto mb-1" />
                    <div className="text-sm font-semibold">{duration.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Дата *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Время *
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
                  required
                >
                  <option value="">Выберите время</option>
                  <option value="10:00">10:00</option>
                  <option value="12:00">12:00</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                  <option value="18:00">18:00</option>
                  <option value="20:00">20:00</option>
                </select>
              </div>
            </div>

            {/* Additional Details */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Дополнительная информация
              </label>
              <textarea
                value={formData.details}
                onChange={(e) => setFormData({...formData, details: e.target.value})}
                placeholder="Расскажи подробнее о своей ситуации..."
                rows={3}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 animate-pulse-glow"
            >
              {submitMutation.isPending ? "Бронируем..." : "Забронировать консультацию"}
            </button>
          </form>
        </section>

        {/* Pricing Info */}
        <div className="text-center text-xs text-gray-500">
          <p>💡 Оплата после подтверждения времени. Возможна отмена за 24 часа до встречи.</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}