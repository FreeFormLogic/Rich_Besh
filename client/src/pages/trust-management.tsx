import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TrendingUp, Shield, DollarSign, Users, CheckCircle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/bottom-navigation";

export default function TrustManagementPage() {
  const { user } = useTelegram();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    amount: "",
    contact: "",
    goals: "",
    experience: "beginner"
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/trust-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Заявка принята!",
        description: "С тобой свяжется менеджер в течение 24 часов",
      });
      setFormData({ amount: "", contact: "", goals: "", experience: "beginner" });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.contact) {
      toast({
        title: "Заполните форму",
        description: "Сумма и контакт обязательны",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(formData);
  };

  const stats = [
    { icon: TrendingUp, label: "Средняя доходность", value: "+34% в месяц", color: "text-neon-green" },
    { icon: Shield, label: "Гарантия возврата", value: "30 дней", color: "text-rich-gold" },
    { icon: DollarSign, label: "Минимальная сумма", value: "от 50,000₽", color: "text-electric-purple" },
    { icon: Users, label: "Активных клиентов", value: "247", color: "text-neon-pink" }
  ];

  const plans = [
    {
      name: "Стартер",
      amount: "50,000 - 200,000₽",
      fee: "30% от прибыли",
      features: ["Еженедельные отчеты", "Базовая стратегия", "Общий чат поддержки"],
      popular: false
    },
    {
      name: "Профи",
      amount: "200,000 - 500,000₽", 
      fee: "25% от прибыли",
      features: ["Ежедневные отчеты", "Продвинутые стратегии", "Персональный менеджер", "Приоритетная поддержка"],
      popular: true
    },
    {
      name: "VIP",
      amount: "от 500,000₽",
      fee: "20% от прибыли",
      features: ["Отчеты в реальном времени", "Индивидуальная стратегия", "Прямая связь с Rich Besh", "Доступ к закрытым прогнозам"],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-rich-gold flex items-center animate-neon-pulse">
            <Shield className="mr-2" size={24} />
            Раскрутка счёта под ключ
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Хочешь приумножить банк? Доверь это мне.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Stats */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-4 rounded-xl text-center animate-slide-up">
              <stat.icon className={`mx-auto mb-2 ${stat.color}`} size={32} />
              <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
              <p className={`font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </section>

        {/* Plans */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Тарифные планы</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {plans.map((plan, index) => (
              <div key={index} className={`neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl relative animate-slide-up ${plan.popular ? 'border-2 border-rich-gold' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rich-gold text-black px-3 py-1 rounded-full text-xs font-bold">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-rich-gold mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-2">{plan.amount}</p>
                <p className="text-neon-green font-bold text-lg mb-4">{plan.fee}</p>
                
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-300">
                      <CheckCircle className="text-neon-green mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-rich-gold mb-4">Оставить заявку</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Сумма на счёте (₽) *
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                placeholder="Например: 100000"
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Контакт для связи *
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                placeholder="@username или номер телефона"
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Опыт в ставках
              </label>
              <select
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
              >
                <option value="beginner">Новичок</option>
                <option value="intermediate">Есть опыт</option>
                <option value="advanced">Продвинутый</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Цель / Ожидания
              </label>
              <textarea
                value={formData.goals}
                onChange={(e) => setFormData({...formData, goals: e.target.value})}
                placeholder="На что рассчитываешь? Какие цели?"
                rows={3}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 animate-pulse-glow"
            >
              {submitMutation.isPending ? "Отправляем..." : "Отправить заявку"}
            </button>
          </form>
        </section>

        {/* Disclaimer */}
        <div className="text-center text-xs text-gray-500">
          <p>⚠️ Доверительное управление связано с рисками. Изучите все условия перед началом сотрудничества.</p>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}