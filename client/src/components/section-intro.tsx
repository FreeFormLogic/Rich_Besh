interface SectionIntroProps {
  title: string;
  description: string;
  coverImage: string;
  gradient: string;
  icon: string;
}

export default function SectionIntro({ title, description, coverImage, gradient, icon }: SectionIntroProps) {
  return (
    <div className={`relative overflow-hidden rounded-3xl ${gradient} p-8 mb-6 shadow-2xl`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={coverImage} 
          alt={title}
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="bg-rich-gold/20 p-3 rounded-full mr-4">
            <i className={`${icon} text-2xl text-rich-gold`}></i>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">{description}</p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <i className={`${icon} text-6xl text-white`}></i>
        </div>
      </div>
    </div>
  );
}