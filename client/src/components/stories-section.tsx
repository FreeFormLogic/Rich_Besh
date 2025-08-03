import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const defaultStories = [
  {
    id: "cars",
    title: "Машины",
    imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "cars"
  },
  {
    id: "style",
    title: "Стиль", 
    imageUrl: "https://images.unsplash.com/photo-1520975954732-35dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "style"
  },
  {
    id: "dubai",
    title: "Дубай",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "dubai"
  },
  {
    id: "betting",
    title: "Ставки",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "betting"
  },
  {
    id: "watches",
    title: "Часы",
    imageUrl: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80",
    category: "watches"
  }
];

export default function StoriesSection() {
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["/api/stories"],
  });

  const displayStories = stories.length > 0 ? stories.slice(0, 8) : defaultStories.slice(0, 8);

  const showAdWindow = (story: any) => {
    const ads = [
      {
        title: "Где я поставил эту ставку?",
        text: "Кстати, весь этот экспресс я делал в 1xBet - там самые высокие коэффициенты на топ матчи. Плюс дали бонус 25,000₽ на первый депозит 🔥",
        button: "ПЕРЕЙТИ НА 1XBET",
        url: "https://1xbet.com/rich-besh"
      },
      {
        title: "На чем играю в лайве",
        text: "Для лайв-ставок использую Parimatch - линия обновляется мгновенно, а кэшбэк 10% каждую неделю спасает в минусовых сериях 💰",
        button: "ЗАРЕГИСТРИРОВАТЬСЯ", 
        url: "https://parimatch.com/rich-besh"
      }
    ];
    
    const randomAd = ads[Math.floor(Math.random() * ads.length)];
    
    const adModal = document.createElement('div');
    adModal.innerHTML = `
      <div class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div class="bg-gradient-to-br from-rich-black to-gray-900 rounded-2xl p-6 max-w-sm w-full border-2 border-rich-gold">
          <h3 class="text-xl font-bold text-rich-gold mb-3">${randomAd.title}</h3>
          <p class="text-gray-300 mb-6 leading-relaxed">${randomAd.text}</p>
          <div class="space-y-3">
            <button onclick="window.open('${randomAd.url}', '_blank')" class="w-full bg-gradient-to-r from-rich-gold to-yellow-400 text-black font-bold py-3 px-6 rounded-xl hover:scale-105 transition-all">
              ${randomAd.button}
            </button>
            <button onclick="this.closest('.fixed').remove()" class="w-full bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(adModal);
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
      showAdWindow(story);
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
