import React, { useState } from 'react';
import { ArrowLeft, Play, Heart, MessageCircle, Share, Sparkles, Crown, Car, Plane, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/bottom-navigation';

const Lifestyle = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Все', icon: Sparkles },
    { id: 'luxury', label: 'Роскошь', icon: Crown },
    { id: 'cars', label: 'Авто', icon: Car },
    { id: 'travel', label: 'Путешествия', icon: Plane },
    { id: 'lifestyle', label: 'Жизнь', icon: MapPin }
  ];

  const instagramPosts = [
    {
      id: 1,
      image: 'https://richbesh.b-cdn.net/IG/2024-05-25_3372073464799556629.jpg',
      video: 'https://richbesh.b-cdn.net/IG/2025-07-21_3681517492775539740.mp4',
      caption: 'Новый день в Дубае начинается с прекрасного вида на город. Когда ты делаешь то, что любишь - каждый день становится праздником! 🌅✨',
      likes: 15420,
      comments: 892,
      category: 'lifestyle',
      location: 'Dubai, UAE',
      isVideo: true
    },
    {
      id: 2,
      image: 'https://richbesh.b-cdn.net/IG/2024-05-25_3372073464799556635.jpg',
      caption: 'Lamborghini Aventador - не просто машина, а воплощение мечты. Помню, как когда-то мог только мечтать о таком. Сегодня это реальность! 🏎️💫',
      likes: 28790,
      comments: 1247,
      category: 'cars',
      location: 'Monaco',
      isVideo: false
    },
    {
      id: 3,
      image: 'https://richbesh.b-cdn.net/IG/2024-05-25_3372073464799556642.jpg',
      video: 'https://richbesh.b-cdn.net/IG/2025-07-23_3683192790368544979.mp4',
      caption: 'Частный самолет - это не роскошь, а инвестиция в время. Время - единственный ресурс, который нельзя купить, но можно сэкономить! ✈️⏰',
      likes: 42150,
      comments: 2013,
      category: 'travel',
      location: 'Private Jet',
      isVideo: true
    },
    {
      id: 4,
      image: 'https://richbesh.b-cdn.net/IG/2024-05-25_3372073464799556648.jpg',
      caption: 'Пентхаус с видом на Персидский залив. Когда я начинал торговать, мечтал о таком доме. Мечты сбываются, если не сдаваться! 🏙️💎',
      likes: 31680,
      comments: 1456,
      category: 'luxury',
      location: 'Dubai Marina',
      isVideo: false
    },
    {
      id: 5,
      image: 'https://richbesh.b-cdn.net/IG/2024-05-25_3372073464799556654.jpg',
      video: 'https://richbesh.b-cdn.net/IG/2025-04-26_3619375607072811190.mp4',
      caption: 'Ужин в лучшем ресторане города. Качество жизни измеряется не только деньгами, но и моментами, которые мы создаем для себя! 🍽️✨',
      likes: 19340,
      comments: 678,
      category: 'lifestyle',
      location: 'Burj Al Arab',
      isVideo: true
    },
    {
      id: 6,
      image: 'https://richbesh.b-cdn.net/IG/2024-05-25_3372073464799556661.jpg',
      caption: 'Роллс-Ройс Ghost - символ элегантности и статуса. Каждая деталь этой машины говорит о качестве и совершенстве! 🚗👑',
      likes: 24560,
      comments: 945,
      category: 'cars',
      location: 'London',
      isVideo: false
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? instagramPosts 
    : instagramPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="pb-20 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 p-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 p-2 bg-black/20 backdrop-blur-sm rounded-full hover:bg-black/30 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-black text-black mb-1">Лайфстайл</h1>
            <p className="text-black/80 font-medium">Роскошная жизнь Rich Besh</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg scale-105'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="px-6 space-y-8">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Crown className="w-6 h-6 text-yellow-400" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-lg">Rich Besh</h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {post.location}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Share className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Media */}
            <div className="relative aspect-square">
              {post.isVideo ? (
                <video
                  src={post.video}
                  poster={post.image}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                />
              ) : (
                <img
                  src={post.image}
                  alt="Instagram post"
                  className="w-full h-full object-cover"
                />
              )}
              
              {post.isVideo && (
                <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <Play className="w-3 h-3 inline mr-1" />
                  Видео
                </div>
              )}
            </div>

            {/* Post Actions */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-6">
                  <button className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors">
                    <Heart className="w-6 h-6" />
                    <span className="font-semibold">{post.likes.toLocaleString()}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                    <span className="font-semibold">{post.comments}</span>
                  </button>
                </div>
              </div>

              {/* Caption */}
              <p className="text-gray-300 leading-relaxed">
                <span className="text-white font-semibold mr-2">richbesh</span>
                {post.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="px-6 py-12">
        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-center">
          <h2 className="text-black text-2xl font-black mb-4">
            Хочешь такую же жизнь?
          </h2>
          <p className="text-black/80 text-lg mb-6 font-medium">
            Начни зарабатывать и строй свою империю уже сегодня
          </p>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/consultations')}
              className="w-full bg-black text-white px-6 py-4 rounded-2xl font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105"
            >
              Получить консультацию
            </button>
            <button 
              onClick={() => navigate('/courses')}
              className="w-full bg-black/20 backdrop-blur-sm text-black px-6 py-4 rounded-2xl font-bold text-lg border border-black/30 hover:bg-black/30 transition-all duration-300"
            >
              Изучить курсы
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Lifestyle;