interface SectionIntroProps {
  title: string;
  description: string;
  coverImage: string;
  gradient: string;
  icon: string;
}

export default function SectionIntro({ title, description, coverImage, gradient, icon }: SectionIntroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rich-black via-gray-900 to-rich-black border-2 border-rich-gold/30 mb-6 shadow-2xl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rich-gold/20 via-neon-pink/10 to-electric-purple/20"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-rich-gold/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-neon-pink/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Cover Image with Enhanced Overlay */}
      <div className="absolute inset-0">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-rich-black/90 via-rich-black/70 to-rich-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black/80 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Icon and Title */}
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-r from-rich-gold to-yellow-400 p-4 rounded-2xl mr-4 shadow-lg">
                <i className={`${icon} text-2xl text-black`}></i>
              </div>
              <div>
                <h2 className="text-4xl font-black text-white mb-2 tracking-tight">{title}</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-rich-gold to-neon-pink rounded-full"></div>
              </div>
            </div>
            
            {/* Description */}
            <p className="text-gray-200 text-lg leading-relaxed max-w-2xl font-medium">{description}</p>
            
            {/* Stats Badge */}
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-rich-gold/20 border border-rich-gold/40 rounded-full">
              <div className="w-2 h-2 bg-rich-gold rounded-full mr-2 animate-pulse"></div>
              <span className="text-rich-gold font-bold text-sm">PREMIUM КОНТЕНТ</span>
            </div>
          </div>
          
          {/* Large Decorative Icon */}
          <div className="hidden md:block opacity-20">
            <i className={`${icon} text-8xl text-rich-gold`}></i>
          </div>
        </div>
        
        {/* Bottom Decorative Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rich-gold to-transparent"></div>
      </div>
    </div>
  );
}