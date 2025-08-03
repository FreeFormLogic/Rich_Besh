import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { MessageSquare, Phone, Mail, Headphones, Send } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";
import BottomNavigation from "@/components/bottom-navigation";

export default function SupportPage() {
  const { user, openTelegramLink } = useTelegram();
  const { toast } = useToast();
  
  const [ticketData, setTicketData] = useState({
    category: "general",
    subject: "",
    message: "",
    priority: "medium"
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof ticketData) => {
      await apiRequest("POST", "/api/support/tickets", data);
    },
    onSuccess: () => {
      toast({
        title: "Обращение отправлено!",
        description: "Мы ответим в течение 24 часов",
      });
      setTicketData({ category: "general", subject: "", message: "", priority: "medium" });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить обращение",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketData.subject || !ticketData.message) {
      toast({
        title: "Заполните форму",
        description: "Тема и сообщение обязательны",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(ticketData);
  };

  const contactMethods = [
    {
      icon: MessageSquare,
      title: "Telegram чат",
      description: "Быстрая поддержка 24/7",
      action: "Открыть чат",
      handler: () => openTelegramLink("https://t.me/richbesh_support"),
      color: "text-rich-gold"
    },
    {
      icon: Phone,
      title: "Звонок",
      description: "Пн-Пт 10:00-20:00 МСК",
      action: "+7 (999) 123-45-67",
      handler: () => window.open("tel:+79991234567"),
      color: "text-neon-green"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Ответ в течение 24 часов",
      action: "support@richbesh.com",
      handler: () => window.open("mailto:support@richbesh.com"),
      color: "text-electric-purple"
    }
  ];

  const categories = [
    { id: "general", name: "Общие вопросы" },
    { id: "payment", name: "Проблемы с оплатой" },
    { id: "technical", name: "Технические проблемы" },
    { id: "content", name: "Вопросы по контенту" },
    { id: "refund", name: "Возврат средств" }
  ];

  const priorities = [
    { id: "low", name: "Низкий", color: "text-gray-400" },
    { id: "medium", name: "Средний", color: "text-rich-gold" },
    { id: "high", name: "Высокий", color: "text-neon-pink" }
  ];

  const faq = [
    {
      question: "Как получить прогноз после покупки?",
      answer: "Прогноз автоматически отправляется в ваш Telegram после успешной оплаты. Проверьте личные сообщения от бота @richbesh_bot"
    },
    {
      question: "Можно ли вернуть деньги за прогноз?",
      answer: "Возврат возможен только если прогноз не был доставлен по техническим причинам. После получения прогноза возврат не производится."
    },
    {
      question: "Как работает доверительное управление?",
      answer: "После одобрения заявки вы переводите средства на специальный счет. Мы управляем банком и берем комиссию только с прибыли."
    },
    {
      question: "Сколько длится консультация?",
      answer: "Стандартная консультация длится 60 минут. Доступны также форматы 30 и 90 минут с соответствующей стоимостью."
    }
  ];

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-rich-gold flex items-center animate-neon-pulse">
            <Headphones className="mr-2" size={24} />
            Поддержка
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            Есть вопросы или проблемы с оплатой? Напиши нам.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Quick Contact Methods */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Быстрая связь</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {contactMethods.map((method, index) => (
              <button
                key={index}
                onClick={method.handler}
                className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl text-left hover:scale-105 transition-all duration-300 animate-slide-up"
              >
                <method.icon className={`mb-3 ${method.color}`} size={32} />
                <h3 className="font-bold text-white mb-2">{method.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{method.description}</p>
                <span className={`font-semibold ${method.color}`}>{method.action}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Support Ticket Form */}
        <section className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-rich-gold mb-6 flex items-center">
            <Send className="mr-2" size={20} />
            Создать обращение
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Категория
                </label>
                <select
                  value={ticketData.category}
                  onChange={(e) => setTicketData({...ticketData, category: e.target.value})}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Приоритет
                </label>
                <select
                  value={ticketData.priority}
                  onChange={(e) => setTicketData({...ticketData, priority: e.target.value})}
                  className="w-full bg-white/10 rounded-lg px-4 py-3 text-white border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
                >
                  {priorities.map((priority) => (
                    <option key={priority.id} value={priority.id}>{priority.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Тема обращения *
              </label>
              <input
                type="text"
                value={ticketData.subject}
                onChange={(e) => setTicketData({...ticketData, subject: e.target.value})}
                placeholder="Кратко опишите проблему"
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Подробное описание *
              </label>
              <textarea
                value={ticketData.message}
                onChange={(e) => setTicketData({...ticketData, message: e.target.value})}
                placeholder="Подробно опишите проблему или вопрос..."
                rows={5}
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 border border-gray-600 focus:border-rich-gold focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 animate-pulse-glow flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>{submitMutation.isPending ? "Отправляем..." : "Отправить обращение"}</span>
            </button>
          </form>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-bold text-white mb-4">Частые вопросы</h2>
          <div className="space-y-4">
            {faq.map((item, index) => (
              <div key={index} className="neubrutalism-card bg-gradient-to-br from-rich-black to-gray-900 p-6 rounded-2xl animate-slide-up">
                <h3 className="font-bold text-rich-gold mb-2">{item.question}</h3>
                <p className="text-gray-300 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  );
}