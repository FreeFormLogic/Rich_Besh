import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Crown, TrendingUp, Star, Clock, Zap, Target, Trophy } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';

const Predictions = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const predictions = [
    {
      id: 1,
      match: 'Реал Мадрид vs Барселона',
      league: 'Ла Лига',
      prediction: 'Тотал больше 2.5',
      coefficient: 1.85,
      confidence: 95,
      price: 2500,
      time: '20:00',
      date: 'Сегодня',
      status: 'hot',
      sport: 'football',
      winRate: '89%',
      lastResults: ['✅', '✅', '✅', '❌', '✅'],
      description: 'Классико всегда богато на голы. Оба клуба в отличной форме.'
    },
    {
      id: 2,
      match: 'Лейкерс vs Уорриорз',
      league: 'НБА',
      prediction: 'Фора Лейкерс (-3.5)',
      coefficient: 1.92,
      confidence: 87,
      price: 1800,
      time: '04:30',
      date: 'Завтра',
      status: 'premium',
      sport: 'basketball',
      winRate: '91%',
      lastResults: ['✅', '✅', '❌', '✅', '✅'],
      description: 'Лейкерс дома непобедимы. Статистика говорит сама за себя.'
    },
    {
      id: 3,
      match: 'Манчестер Сити vs Ливерпуль',
      league: 'АПЛ',
      prediction: 'Обе забьют',
      coefficient: 1.75,
      confidence: 92,
      price: 3200,
      time: '19:30',
      date: 'Воскресенье',
      status: 'vip',
      sport: 'football',
      winRate: '94%',
      lastResults: ['✅', '✅', '✅', '✅', '❌'],
      description: 'Топ-матч тура. Два лучших нападения лиги встречаются на Этихаде.'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все', icon: '🔥', count: 15 },
    { id: 'football', name: 'Футбол', icon: '⚽', count: 8 },
    { id: 'basketball', name: 'Баскетбол', icon: '🏀', count: 4 },
    { id: 'vip', name: 'VIP', icon: '👑', count: 3 }
  ];

  const stats = [
    { label: 'Точность', value: '94%', color: 'text-green-400' },
    { label: 'Прибыль', value: '+1.2M₽', color: 'text-yellow-400' },
    { label: 'Клиентов', value: '3.3M+', color: 'text-blue-400' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'hot': return 'from-red-500 to-orange-500';
      case 'premium': return 'from-purple-500 to-pink-500';
      case 'vip': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-600 to-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'hot': return <Zap className="w-5 h-5" />;
      case 'premium': return <Star className="w-5 h-5" />;
      case 'vip': return <Crown className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const filteredPredictions = selectedCategory === 'all' 
    ? predictions 
    : predictions.filter(p => p.sport === selectedCategory || p.status === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-32">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-xl border-b border-yellow-400/20">
        <div className="flex items-center gap-4 p-6">
          <button 
            onClick={() => {
              navigate('/');
              window.scrollTo(0, 0);
            }}
            className="p-2 rounded-full bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-400" />
          </button>
          
          <div>
            <h1 className="text-2xl font-black text-white">VIP Прогнозы</h1>
            <p className="text-gray-400">Эксклюзивные инсайды от профессионалов</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 mb-6">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-black text-2xl font-black mb-1">{stat.value}</div>
                <div className="text-black/80 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <h3 className="text-black text-lg font-bold mb-2">🏆 Результаты за неделю</h3>
            <div className="flex justify-center space-x-2">
              {['✅', '✅', '✅', '❌', '✅', '✅', '✅'].map((result, index) => (
                <div key={index} className="w-8 h-8 bg-black/20 rounded-full flex items-center justify-center text-lg">
                  {result}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="px-2 flex gap-3 overflow-x-auto pb-2 mb-6">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap font-bold transition-all ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-black scale-105'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id ? 'bg-black/20' : 'bg-yellow-400/20'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Predictions */}
        <div className="space-y-6">
          {filteredPredictions.map((prediction) => (
            <div 
              key={prediction.id}
              className="group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300"
            >
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getStatusColor(prediction.status)} text-white text-sm font-bold`}>
                {getStatusIcon(prediction.status)}
                {prediction.status.toUpperCase()}
              </div>

              <div className="p-6">
                {/* Match Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                    <span>{prediction.league}</span>
                    <span>•</span>
                    <span>{prediction.date} {prediction.time}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {prediction.match}
                  </h3>
                  
                  <p className="text-gray-300 text-base leading-relaxed">
                    {prediction.description}
                  </p>
                </div>

                {/* Prediction Details */}
                <div className="bg-gray-800/50 rounded-2xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-yellow-400 font-bold text-lg">
                        {prediction.prediction}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>Коэффициент {prediction.coefficient}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-black text-green-400">
                        {prediction.confidence}%
                      </div>
                      <div className="text-sm text-gray-400">Уверенность</div>
                    </div>
                  </div>

                  {/* Win Rate */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm text-gray-400">Статистика: </span>
                      <span className="text-green-400 font-bold">{prediction.winRate}</span>
                    </div>
                    
                    <div className="flex space-x-1">
                      {prediction.lastResults.map((result, index) => (
                        <div key={index} className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
                          {result}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Purchase Section */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-white">
                      {prediction.price.toLocaleString()}₽
                    </div>
                    <div className="text-sm text-gray-400">За прогноз</div>
                  </div>
                  
                  <button 
                    className="group/btn bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-xl font-bold text-sm hover:scale-105 transition-all duration-300 flex items-center gap-1 shadow-2xl"
                  >
                    <Crown className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    Купить прогноз
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8">
            <h2 className="text-white text-2xl font-black mb-4">
              Хочешь больше побед?
            </h2>
            <p className="text-white/90 mb-6">
              Подписывайся на VIP канал и получай все прогнозы
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/courses')}
                className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
              >
                VIP подписка - 9,999₽/месяц
              </button>
              
              <p className="text-white/70 text-sm">
                Безлимитные прогнозы + личная поддержка
              </p>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Predictions;