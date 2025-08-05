import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, MessageCircle, Video, Phone, Star, Calendar, Clock, User, CheckCircle2, Zap, Target } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';

const Consultations = () => {
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const consultationPackages = [
    {
      id: 'personal',
      title: 'Личная консультация',
      icon: <User className="w-8 h-8" />,
      duration: '60 минут',
      price: 15000,
      originalPrice: 25000,
      gradient: 'from-yellow-400 to-orange-500',
      features: [
        'Персональный разбор торгового счета',
        'Анализ ваших ошибок и слабых мест',
        'Индивидуальная стратегия на 3 месяца',
        'Рекомендации по брокерам и инструментам',
        'Запись консультации для повторного просмотра'
      ],
      description: 'Один на один с Rich Besh. Получите персональные рекомендации и стратегию успеха.',
      popular: true
    },
    {
      id: 'vip',
      title: 'VIP наставничество',
      icon: <Crown className="w-8 h-8" />,
      duration: '30 дней',
      price: 49000,
      originalPrice: 99000,
      gradient: 'from-purple-500 to-pink-600',
      features: [
        'Ежедневная поддержка в Telegram',
        '4 личные консультации по 60 минут',
        'Разбор каждой вашей сделки',
        'Доступ к приватному VIP каналу',
        'Сигналы и рекомендации в реальном времени',
        'Гарантия результата или возврат денег'
      ],
      description: 'Полное погружение в мир профессионального трейдинга с личным наставником.',
      popular: false
    },
    {
      id: 'express',
      title: 'Экспресс-анализ',
      icon: <Zap className="w-8 h-8" />,
      duration: '30 минут',
      price: 7500,
      originalPrice: 12000,
      gradient: 'from-red-500 to-orange-600',
      features: [
        'Быстрый анализ вашего портфеля',
        'Конкретные рекомендации по улучшению',
        'Ответы на 3 главных вопроса',
        'Письменный отчет с выводами'
      ],
      description: 'Быстрое решение конкретных проблем в трейдинге.',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Александр К.',
      profit: '+240,000₽',
      period: 'за 2 месяца',
      text: 'После консультации с Rich Besh мой трейдинг кардинально изменился. Теперь торгую осознанно и прибыльно.',
      avatar: '👨‍💼'
    },
    {
      name: 'Мария С.',
      profit: '+180,000₽',
      period: 'за месяц',
      text: 'VIP наставничество - лучшие инвестиции в мою жизнь. Rich научил меня зарабатывать стабильно.',
      avatar: '👩‍💼'
    },
    {
      name: 'Дмитрий В.',
      profit: '+95,000₽',
      period: 'за 3 недели',
      text: 'Экспресс-анализ помог мне найти ошибки в стратегии. Результат не заставил себя ждать.',
      avatar: '👨‍💻'
    }
  ];

  const stats = [
    { label: 'Консультаций', value: '1,200+', icon: '👥' },
    { label: 'Довольных клиентов', value: '98%', icon: '⭐' },
    { label: 'Средняя прибыль', value: '+180%', icon: '📈' },
    { label: 'Лет опыта', value: '8+', icon: '🏆' }
  ];

  const timeSlots = [
    { time: '10:00', available: true },
    { time: '12:00', available: false },
    { time: '14:00', available: true },
    { time: '16:00', available: true },
    { time: '18:00', available: false },
    { time: '20:00', available: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-yellow-400/20">
        <div className="flex items-center gap-4 p-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-400" />
          </button>
          
          <div>
            <h1 className="text-2xl font-black text-white">Консультации</h1>
            <p className="text-gray-400">Персональные рекомендации от Rich Besh</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 mb-8 text-center">
          <div className="w-20 h-20 bg-black/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-black text-black">RB</span>
          </div>
          
          <h2 className="text-black text-2xl font-black mb-4">
            Личная работа с Rich Besh
          </h2>
          
          <p className="text-black/80 text-lg mb-6">
            Получите персональные рекомендации от успешного трейдера
            с 8-летним опытом и прибылью более 50 миллионов рублей
          </p>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-black/20 rounded-2xl p-4">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-black text-xl font-black">{stat.value}</div>
                <div className="text-black/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Packages */}
        <div className="mb-8">
          <h3 className="text-2xl font-black text-white mb-6 text-center">
            Выберите формат консультации
          </h3>
          
          <div className="space-y-6">
            {consultationPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className={`relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedPackage === pkg.id
                    ? 'border-yellow-400 scale-105'
                    : 'border-gray-700/50 hover:border-yellow-400/50'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    ПОПУЛЯРНО
                  </div>
                )}

                <div className="p-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${pkg.gradient} rounded-2xl flex items-center justify-center mb-4`}>
                    {pkg.icon}
                  </div>

                  <h4 className="text-2xl font-bold text-white mb-2">{pkg.title}</h4>
                  <p className="text-gray-300 mb-4">{pkg.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-5 h-5" />
                      <span>{pkg.duration}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl font-black text-white">
                          {pkg.price.toLocaleString()}₽
                        </span>
                        <span className="text-gray-500 line-through text-lg">
                          {pkg.originalPrice.toLocaleString()}₽
                        </span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Скидка {Math.round((1 - pkg.price / pkg.originalPrice) * 100)}%
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? 'bg-yellow-400 text-black scale-105'
                          : `bg-gradient-to-r ${pkg.gradient} text-white hover:scale-105`
                      }`}
                    >
                      {selectedPackage === pkg.id ? 'Выбрано' : 'Выбрать'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        {selectedPackage && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-yellow-400" />
                Выберите удобное время
              </h3>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {timeSlots.map((slot, index) => (
                  <button
                    key={index}
                    disabled={!slot.available}
                    className={`p-4 rounded-xl font-bold transition-all ${
                      slot.available
                        ? 'bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 border border-yellow-400/50'
                        : 'bg-gray-800/50 text-gray-500 border border-gray-700/50 cursor-not-allowed'
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6" />
                Забронировать консультацию
              </button>
            </div>
          </div>
        )}

        {/* Testimonials */}
        <div className="mb-8">
          <h3 className="text-2xl font-black text-white mb-6 text-center">
            Результаты учеников
          </h3>
          
          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <span className="text-green-400 font-bold">{testimonial.profit}</span>
                      <span className="text-gray-400 text-sm">{testimonial.period}</span>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">
            Часто задаваемые вопросы
          </h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">
                Как проходят консультации?
              </h4>
              <p className="text-gray-300">
                Консультации проходят в Zoom. Вы получите персональные рекомендации и разбор вашего портфеля.
              </p>
            </div>
            
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">
                Есть ли гарантии результата?
              </h4>
              <p className="text-gray-300">
                На VIP наставничество предоставляется гарантия результата или возврат денег.
              </p>
            </div>
            
            <div>
              <h4 className="text-yellow-400 font-bold mb-2">
                Можно ли перенести консультацию?
              </h4>
              <p className="text-gray-300">
                Да, консультацию можно перенести за 24 часа до назначенного времени.
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Consultations;