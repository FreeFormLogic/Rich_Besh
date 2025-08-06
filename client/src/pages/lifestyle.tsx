import React, { useState } from 'react';
import { ArrowLeft, Play, Heart, MessageCircle, Share, Sparkles, Crown, Car, Plane, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@/components/bottom-navigation';
import { getInstagramPostsByCategory } from '@shared/instagram-data';

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

  // ИСПРАВЛЕНО: Используем ВСЕ реальные данные Instagram, а не только 12
  const baseInstagramPosts = getInstagramPostsByCategory('all').map(post => ({
    id: post.id,
    image: post.thumbnail,
    video: post.type === 'video' ? post.videoUrl : '',
    caption: post.description,
    likes: post.likes,
    comments: post.comments,
    category: post.category,
    location: 'Dubai, UAE',
    isVideo: post.type === 'video'
  }));

  // ПОКАЗЫВАЕМ ВСЕ ПОСТЫ
  const filteredPosts = selectedCategory === 'all' 
    ? baseInstagramPosts 
    : baseInstagramPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="pb-32 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-medium">Главная</span>
          </button>
          
          <h1 className="text-xl font-bold text-white">Лайфстайл</h1>
          
          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Share className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://richbesh.b-cdn.net/IG/2025-06-04_3647526713313247480.jpg"
            alt="Rich Besh Lifestyle"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        
        <div className="absolute bottom-8 left-6 right-6">
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">
            Эксклюзивные моменты из жизни
            <br />
            <span className="text-yellow-400">Rich Besh</span>
          </h2>
          <p className="text-white/80 text-lg">
            Все {baseInstagramPosts.length} постов Instagram с роскошной жизни миллионера
          </p>
        </div>
      </div>

      {/* Stats - ИСПРАВЛЕНО: показываем реальное количество постов */}
      <div className="px-4 -mt-8 relative z-10">
        <div className="bg-gray-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 mt-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-yellow-400">{baseInstagramPosts.length}</div>
              <div className="text-gray-400 text-sm">постов</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{Math.floor(baseInstagramPosts.reduce((sum, post) => sum + post.likes, 0) / 1000)}K</div>
              <div className="text-gray-400 text-sm">лайков</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{baseInstagramPosts.reduce((sum, post) => sum + post.comments, 0)}</div>
              <div className="text-gray-400 text-sm">комментариев</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Posts Grid - АДАПТИВНАЯ СЕТКА */}
      <div className="px-4 pb-6">
        <div className="text-white mb-4 text-center">
          <p className="text-gray-400">Показано {filteredPosts.length} из {baseInstagramPosts.length} постов Instagram</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => navigate(`/exclusive-content/${post.id}`)}
              className="bg-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-yellow-400/50"
            >
              {/* Media */}
              <div className="relative aspect-square">
                {post.isVideo ? (
                  <>
                    <video
                      src={post.video}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-black ml-1" />
                      </div>
                    </div>
                  </>
                ) : (
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = '/attached_assets/image_1754412229756.png';
                    }}
                  />
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-black/70 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                
                {/* Location */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-1 bg-black/70 px-3 py-1 rounded-full backdrop-blur-sm">
                    <MapPin className="w-3 h-3 text-gray-300" />
                    <span className="text-gray-300 text-xs">{post.location}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-white text-base leading-relaxed mb-4">
                  {post.caption}
                </p>
                
                {/* Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors">
                      <Heart className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.likes.toLocaleString()}</span>
                    </button>
                    
                    <button className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>
                  </div>
                  
                  <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                    <Share className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Lifestyle;