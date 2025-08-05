import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

// Реальные Stories из Telegram канала Rich Besh
const telegramStories = [
  {
    id: "mega_win_1",
    title: "2847%",
    text: "🔥 ЭКСПРЕСС ЗАШЁЛ! +2847% 🔥\n\n⚽️ 5 матчей из 5\n💰 Ставка: 1000₽ → 29,470₽\n📊 Коэф: 29.47",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "win",
    views: 5240,
    forwards: 89
  },
  {
    id: "live_win",
    title: "485%", 
    text: "💎 LIVE СТАВКА ЗАШЛА! 💎\n\n🎾 Теннис Live\n💰 10,000₽ → 48,500₽ (+385%)\n📊 Коэф: 4.85",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "live",
    views: 7830,
    forwards: 156
  },
  {
    id: "nhl_jackpot",
    title: "1460%",
    text: "🏒 НХЛ ПЛЕЙ-ОФФ = ДЕНЬГИ! 🏒\n\n💸 Ставка: 10,700₽ → 156,000₽\n📈 ROI: +1460%",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "sport",
    views: 9420,
    forwards: 203
  },
  {
    id: "nba_champion",
    title: "773%",
    text: "🏀 НБА ФИНАЛ СЕРИЯ! 🏀\n\n🎯 Долгосрочная ставка зашла!\n💰 11,300₽ → 87,300₽ (+773%)",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "long",
    views: 6180,
    forwards: 127
  },
  {
    id: "esports_win",
    title: "242%",
    text: "🎮 CS2 MAJOR ПРИНЁС БАБКИ! 🎮\n\nКиберспорт тоже работает!\n💰 14,100₽ → 34,200₽ (+242%)",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "esports",
    views: 4920,
    forwards: 85
  },
  {
    id: "ufc_knockout",
    title: "578%",
    text: "🥊 UFC ГЛАВНЫЙ БОЙ! 🥊\n\n🔥 Анализ физики бойцов окупился!\n💰 11,700₽ → 67,800₽ (+578%)",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "mma",
    views: 8340,
    forwards: 174
  }
];

const defaultStories = telegramStories;

export default function StoriesSection() {
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["/api/stories"],
  });

  const displayStories = stories.length > 0 ? stories.slice(0, 8) : defaultStories.slice(0, 8);

  const showStoryDetails = (story: any) => {
    const successStories = [
      {
        title: "Как получить такой же результат?",
        text: "Этот экспресс - результат моей стратегии, которую я преподаю в VIP курсе. Первые 24 часа скидка 40% для новых участников!",
        button: "ПОЛУЧИТЬ ДОСТУП К КУРСУ",
        action: "course"
      },
      {
        title: "Секрет моих Live ставок",
        text: "Live анализ требует особых навыков и платформы. Я работаю только с проверенными букмекерами с мгновенной линией.",
        button: "УЗНАТЬ ПАРТНЕРОВ",
        action: "partners"
      },
      {
        title: "Индивидуальная консультация",
        text: "Хочешь персональную стратегию под твой банк? Записывайся на индивидуальную консультацию - разберем твои ошибки и построим план.",
        button: "ЗАПИСАТЬСЯ НА КОНСУЛЬТАЦИЮ", 
        action: "consultation"
      }
    ];
    
    const randomStory = successStories[Math.floor(Math.random() * successStories.length)];
    
    const storyModal = document.createElement('div');
    storyModal.innerHTML = `
      <div class="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
        <div class="bg-gradient-to-br from-rich-black to-gray-900 rounded-2xl p-6 max-w-md w-full border-2 border-rich-gold relative">
          <!-- Story Content -->
          <div class="text-center mb-6">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-rich-gold to-yellow-400 flex items-center justify-center">
              <span class="text-2xl font-bold text-black">${story.title}</span>
            </div>
            <p class="text-gray-300 whitespace-pre-line text-sm leading-relaxed">${story.text}</p>
            <div class="mt-4 flex justify-center space-x-4 text-xs text-gray-400">
              <span>👀 ${story.views?.toLocaleString() || '5K+'} просмотров</span>
              <span>📤 ${story.forwards?.toLocaleString() || '100+'} репостов</span>
            </div>
          </div>
          
          <!-- Call to Action -->
          <div class="border-t border-gray-700 pt-6">
            <h3 class="text-lg font-bold text-rich-gold mb-3">${randomStory.title}</h3>
            <p class="text-gray-300 mb-4 text-sm leading-relaxed">${randomStory.text}</p>
            <div class="space-y-3">
              <button onclick="window.location.href='/${randomStory.action === 'course' ? 'courses' : randomStory.action === 'partners' ? 'partners' : 'consultations'}'" class="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all">
                ${randomStory.button}
              </button>
              <button onclick="this.closest('.fixed').remove()" class="w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(storyModal);
  };

  const handleStoryClick = (story: any) => {
    // Show story in full screen
    const storyModal = document.createElement('div');
    storyModal.className = 'fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in';
    storyModal.innerHTML = `
      <div class="relative w-full h-full max-w-md mx-auto">
        <img src="${story.imageUrl}" alt="${story.title}" class="w-full h-full object-cover" />
        <div class="absolute top-4 left-4 right-4 flex justify-between items-center">
          <div class="flex items-center space-x-3">
            <div class="story-ring-small">
              <img src="${story.imageUrl}" alt="Rich Besh" class="w-8 h-8 rounded-full object-cover" />
            </div>
            <span class="text-white font-semibold">Rich Besh</span>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="text-white text-2xl">&times;</button>
        </div>
        <div class="absolute bottom-4 left-4 right-4">
          <h3 class="text-white text-xl font-bold mb-2">${story.title}</h3>
          <p class="text-gray-300">${story.content || story.title}</p>
        </div>
      </div>
    `;
    document.body.appendChild(storyModal);
    
    // Auto remove after 5 seconds and show ad  
    setTimeout(() => {
      storyModal.remove();
      showStoryDetails(story);
    }, 5000);
  };

  if (isLoading) {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-rich-gold flex items-center">
          <i className="fas fa-fire mr-2 animate-pulse"></i>
          Stories от Rich
        </h2>
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-rich-gold" />
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold text-rich-gold flex items-center">
        <i className="fas fa-fire mr-2 animate-pulse"></i>
        Stories от Rich
      </h2>
      
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {displayStories.map((story) => (
          <div 
            key={story.id}
            className="flex-shrink-0 w-20 text-center cursor-pointer group" 
            onClick={() => handleStoryClick(story)}
          >
            <div className="story-ring mb-2 group-hover:animate-pulse">
              <img 
                src={story.imageUrl} 
                alt={story.title} 
                className="rounded-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <p className="text-xs text-gray-300 group-hover:text-rich-gold transition-colors leading-tight break-words">
              {story.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
