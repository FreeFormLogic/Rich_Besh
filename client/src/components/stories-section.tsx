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

  const displayStories = stories.length > 0 ? stories : defaultStories;

  const handleStoryClick = (story: any) => {
    // TODO: Implement story viewing functionality
    console.log('Opening story:', story);
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
      
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {displayStories.map((story) => (
          <div 
            key={story.id}
            className="flex-shrink-0 text-center cursor-pointer group" 
            onClick={() => handleStoryClick(story)}
          >
            <div className="story-ring mb-2">
              <img 
                src={story.imageUrl} 
                alt={story.title} 
                className="w-16 h-16 rounded-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>
            <p className="text-xs text-gray-300">{story.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
