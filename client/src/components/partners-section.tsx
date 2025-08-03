import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";

interface Partner {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  affiliateUrl: string;
  bonus?: string;
  category: string;
}

interface PartnersSectionProps {
  partners: Partner[];
}

export default function PartnersSection({ partners }: PartnersSectionProps) {
  const { openLink } = useTelegram();

  const clickMutation = useMutation({
    mutationFn: async (partnerId: string) => {
      await apiRequest("POST", `/api/partners/${partnerId}/click`);
    },
  });

  const handlePartnerClick = (partner: Partner) => {
    // Track the click
    clickMutation.mutate(partner.id);
    
    // Open partner link
    openLink(partner.affiliateUrl);
  };

  const defaultImage = "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=150";

  if (partners.length === 0) {
    return (
      <div className="neubrutalism-card bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl">
        <h3 className="text-2xl font-bold text-rich-gold mb-4 flex items-center">
          <i className="fas fa-handshake mr-2"></i>
          Проверенные партнеры
        </h3>
        <p className="text-gray-400 text-center py-8">Партнеры скоро появятся</p>
      </div>
    );
  }

  return (
    <div className="neubrutalism-card bg-gradient-to-br from-rich-gold/20 to-rich-black p-6 rounded-2xl">
      <h3 className="text-2xl font-bold text-rich-gold mb-4 flex items-center">
        <i className="fas fa-handshake mr-2"></i>
        Проверенные партнеры
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {partners.slice(0, 3).map((partner) => (
          <div 
            key={partner.id}
            className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group"
            onClick={() => handlePartnerClick(partner)}
          >
            <img 
              src={partner.imageUrl || defaultImage}
              alt={partner.name}
              className="w-full h-24 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
            />
            
            <h4 className="font-bold text-white mb-2">{partner.name}</h4>
            <p className="text-gray-400 text-sm mb-3">{partner.description}</p>
            
            <div className="flex justify-between items-center">
              {partner.bonus && (
                <span className="bg-neon-green text-black px-2 py-1 rounded text-xs font-bold">
                  {partner.bonus}
                </span>
              )}
              <i className="fas fa-external-link-alt text-rich-gold group-hover:text-white transition-colors ml-auto"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
