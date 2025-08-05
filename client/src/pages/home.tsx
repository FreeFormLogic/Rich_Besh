import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Crown, Zap, TrendingUp, Sparkles, ChevronRight, Star } from 'lucide-react';
import BottomNavigation from '@/components/bottom-navigation';

const Home = () => {
  const navigate = useNavigate();

  const featuredVideos = [
    {
      id: 'luxury-lifestyle',
      title: 'Роскошь как стиль жизни',
      videoUrl: 'https://richbesh.b-cdn.net/IG/2025-07-21_3681517492775539740.mp4',
      description: 'Как я живу в Дубае и зарабатываю миллионы',
      views: '1.2M',
      duration: '02:15'
    },
    {
      id: 'success-story',
      title: 'Мой путь к успеху',
      videoUrl: 'https://richbesh.b-cdn.net/IG/2025-07-23_3683192790368544979.mp4',
      description: 'От простого парня до миллионера',
      views: '850K',
      duration: '03:42'
    },
    {
      id: 'luxury-cars',
      title: 'Коллекция суперкаров',
      videoUrl: 'https://richbesh.b-cdn.net/IG/2025-04-26_3619375607072811190.mp4',
      description: 'Lamborghini, Ferrari и другие игрушки',
      views: '2.1M',
      duration: '01:58'
    }
  ];

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Стратегии миллионера',
      description: 'Проверенные методы заработка от 7-значных доходов',
      color: 'from-emerald-600 to-green-500'
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: 'VIP сопровождение',
      description: 'Персональное наставничество для избранных',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Эксклюзивная информация',
      description: 'Инсайды и возможности для элиты',
      color: 'from-purple-600 to-pink-500'
    }
  ];

  return (
    <div className="pb-20 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://richbesh.b-cdn.net/IG/2025-07-21_3681517492775539740.mp4"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 p-1 animate-pulse">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Crown className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Rich Besh</h2>
                <p className="text-yellow-400 text-sm font-medium">Миллионер • Ментор • Lifestyle</p>
                <div className="flex items-center text-xs text-gray-300 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  <span>4.9 • 25K подписчиков</span>
                </div>
              </div>
            </div>
            
            <div className="bg-red-500 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse">
              <span className="text-white font-bold text-sm flex items-center">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-ping"></div>
                LIVE
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
          <div className="max-w-2xl">
            <h1 className="text-6xl font-black text-white mb-6 leading-none tracking-tight">
              ПУТЬ К
              <br/>
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                БОГАТСТВУ
              </span>
            </h1>
            
            <p className="text-white/90 text-xl mb-8 font-medium leading-relaxed">
              Узнай секреты luxury lifestyle и научись зарабатывать 
              <span className="text-yellow-400 font-bold"> миллионы</span> как я
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/predictions')}
                className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-yellow-400/25"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                Начать зарабатывать
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => navigate('/courses')}
                className="group bg-black/60 backdrop-blur-md text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 border border-yellow-400/50 hover:border-yellow-400 transition-all duration-300"
              >
                <Crown className="w-6 h-6 text-yellow-400" />
                VIP курсы
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Stats */}
      <div className="relative -mt-24 mx-6 z-30">
        <div className="bg-black/90 backdrop-blur-xl rounded-3xl border border-yellow-400/30 p-8 shadow-2xl">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
                25K+
              </div>
              <div className="text-gray-300 text-sm font-medium">Учеников в элите</div>
            </div>
            <div className="text-center border-x border-gray-700/50">
              <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                94%
              </div>
              <div className="text-gray-300 text-sm font-medium">Успешных результатов</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                $5M+
              </div>
              <div className="text-gray-300 text-sm font-medium">Заработано учениками</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-16">
        <h2 className="text-4xl font-black text-white mb-4 text-center">
          Почему выбирают
          <span className="text-yellow-400"> Rich Besh</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 text-lg">
          Эксклюзивные возможности для избранных
        </p>
        
        <div className="space-y-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative flex items-center gap-6">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                <ChevronRight className="w-8 h-8 text-gray-500 group-hover:text-yellow-400 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Videos */}
      <div className="px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-black text-white">
            Эксклюзивный контент
          </h2>
          <button className="text-yellow-400 hover:text-white transition-colors font-semibold">
            Смотреть все
          </button>
        </div>
        
        <div className="space-y-6">
          {featuredVideos.map((video, index) => (
            <div 
              key={video.id}
              className="group relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300 cursor-pointer"
              onClick={() => navigate(`/video/${index + 1}`)}
            >
              <div className="flex">
                <div className="relative w-40 h-28 flex-shrink-0">
                  <video 
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    muted
                    poster={video.videoUrl.replace('.mp4', '_thumbnail.jpg')}
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                      <Play className="w-8 h-8 text-black ml-1" />
                    </div>
                  </div>
                  
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-yellow-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-gray-300 text-base mb-3 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-400 text-sm font-medium">
                      <Crown className="w-4 h-4 mr-2" />
                      <span>Премиум контент</span>
                    </div>
                    
                    <div className="text-gray-400 text-sm">
                      {video.views} просмотров
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="px-6 pb-16">
        <div className="relative bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="relative z-10">
            <h2 className="text-black text-3xl font-black mb-4">
              Готов стать миллионером?
            </h2>
            <p className="text-black/80 text-lg mb-8 font-medium">
              Присоединяйся к элитному сообществу успешных людей и измени свою жизнь навсегда
            </p>
            
            <div className="space-y-4 max-w-md mx-auto">
              <button 
                onClick={() => navigate('/predictions')}
                className="w-full bg-black text-yellow-400 py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-900 transition-colors shadow-2xl"
              >
                <Zap className="w-6 h-6" />
                Получить VIP прогнозы
                <ChevronRight className="w-6 h-6" />
              </button>
              
              <button 
                onClick={() => navigate('/courses')}
                className="w-full bg-black/20 backdrop-blur-sm text-black py-5 rounded-2xl font-bold text-lg hover:bg-black/30 transition-colors"
              >
                Смотреть курсы обучения
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Home;