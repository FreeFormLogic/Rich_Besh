import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Trophy, TrendingUp, Star, Crown, Sparkles } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';

const SuccessStories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const successStories = [
    {
      id: 1,
      name: 'Александр К.',
      age: 28,
      from: 'Москва',
      before: '45,000₽/месяц',
      after: '2,500,000₽/месяц',
      timeframe: '8 месяцев',
      category: 'trading',
      story: 'Работал обычным менеджером, теперь торгую на международных рынках',
      videoUrl: 'https://richbesh.b-cdn.net/IG/2025-07-21_3681517492775539740.mp4',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      achievement: '55x рост дохода'
    },
    {
      id: 2,
      name: 'Мария С.',
      age: 32,
      from: 'СПб',
      before: '60,000₽/месяц',
      after: '1,800,000₽/месяц',
      timeframe: '6 месяцев',
      category: 'business',
      story: 'Открыла сеть beauty-салонов премиум класса',
      videoUrl: 'https://richbesh.b-cdn.net/IG/2025-07-23_3683192790368544979.mp4',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b29e?w=300&h=300&fit=crop',
      achievement: '30x рост дохода'
    },
    {
      id: 3,
      name: 'Дмитрий М.',
      age: 26,
      from: 'Казань',
      before: '35,000₽/месяц',
      after: '3,200,000₽/месяц',
      timeframe: '12 месяцев',
      category: 'crypto',
      story: 'Создал успешный крипто-фонд с управлением $50M',
      videoUrl: 'https://richbesh.b-cdn.net/IG/2025-04-26_3619375607072811190.mp4',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
      achievement: '91x рост дохода'
    }
  ];

  const categories = [
    { id: 'all', name: 'Все истории', icon: <Crown className="w-5 h-5" /> },
    { id: 'trading', name: 'Трейдинг', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'business', name: 'Бизнес', icon: <Trophy className="w-5 h-5" /> },
    { id: 'crypto', name: 'Крипто', icon: <Sparkles className="w-5 h-5" /> }
  ];

  const filteredStories = selectedCategory === 'all' 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-yellow-400/20">
        <div className="flex items-center gap-4 p-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-yellow-400/20 hover:bg-yellow-400/30 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-yellow-400" />
          </button>
          
          <div>
            <h1 className="text-2xl font-black text-white">Истории успеха</h1>
            <p className="text-gray-400">Реальные результаты учеников</p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative p-6 mb-8">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 text-center">
          <h2 className="text-black text-3xl font-black mb-4">
            Они смогли. Сможешь и ты!
          </h2>
          <p className="text-black/80 text-lg font-medium mb-6">
            Настоящие истории людей, которые изменили свою жизнь с Rich Besh
          </p>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-black/20 rounded-2xl p-4">
              <div className="text-2xl font-black text-black mb-1">500+</div>
              <div className="text-black/80 text-sm">Миллионеров</div>
            </div>
            <div className="bg-black/20 rounded-2xl p-4">
              <div className="text-2xl font-black text-black mb-1">$50M+</div>
              <div className="text-black/80 text-sm">Заработано</div>
            </div>
            <div className="bg-black/20 rounded-2xl p-4">
              <div className="text-2xl font-black text-black mb-1">94%</div>
              <div className="text-black/80 text-sm">Успех</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 mb-8">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-yellow-400 text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="px-6 space-y-6">
        {filteredStories.map((story) => (
          <div 
            key={story.id}
            className="group bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300"
          >
            {/* Video Header */}
            <div className="relative h-48 overflow-hidden">
              <video 
                src={story.videoUrl}
                className="w-full h-full object-cover"
                muted
                poster={story.videoUrl.replace('.mp4', '_thumbnail.jpg')}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                  <Play className="w-10 h-10 text-black ml-1" />
                </div>
              </div>

              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {story.achievement}
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <img 
                  src={story.image}
                  alt={story.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-yellow-400"
                />
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{story.name}</h3>
                  <p className="text-gray-400 text-sm mb-2">{story.age} лет, {story.from}</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400" />
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-400 ml-2">5.0</span>
                  </div>
                </div>
              </div>

              {/* Before/After */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-red-500/20 rounded-2xl p-4 text-center">
                  <div className="text-red-400 text-sm font-medium mb-1">БЫЛО</div>
                  <div className="text-white font-bold text-lg">{story.before}</div>
                </div>
                <div className="bg-green-500/20 rounded-2xl p-4 text-center">
                  <div className="text-green-400 text-sm font-medium mb-1">СТАЛО</div>
                  <div className="text-white font-bold text-lg">{story.after}</div>
                </div>
              </div>

              {/* Story */}
              <p className="text-gray-300 text-base leading-relaxed mb-4">
                "{story.story}"
              </p>

              {/* Timeline */}
              <div className="flex items-center justify-between bg-gray-800/50 rounded-2xl p-4">
                <div className="text-center">
                  <div className="text-yellow-400 text-sm font-medium">ВРЕМЯ</div>
                  <div className="text-white font-bold">{story.timeframe}</div>
                </div>
                
                <div className="w-px h-8 bg-gray-600"></div>
                
                <div className="text-center">
                  <div className="text-yellow-400 text-sm font-medium">СТАТУС</div>
                  <div className="text-green-400 font-bold">МИЛЛИОНЕР</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="px-6 pt-12">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center">
          <h2 className="text-white text-2xl font-black mb-4">
            Готов стать следующим?
          </h2>
          <p className="text-white/90 mb-6">
            Присоединяйся к элитному сообществу миллионеров
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/predictions')}
              className="w-full bg-white text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Начать зарабатывать сейчас
            </button>
            
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-white/20 backdrop-blur-sm text-white py-4 rounded-2xl font-bold text-lg hover:bg-white/30 transition-colors"
            >
              Посмотреть обучение
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default SuccessStories;