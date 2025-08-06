export type Language = 'ru' | 'en';

export const translations = {
  ru: {
    // Navigation
    home: 'Главная',
    predictions: 'Прогнозы',
    success: 'Успех',
    lifestyle: 'Лайфстайл',
    
    // Header
    exclusiveContent: 'Эксклюзивный контент',
    back: 'Назад',
    
    // Home page
    welcomeTitle: 'Rich Besh',
    welcomeSubtitle: 'Премиум контент о ставках и роскошной жизни',
    stories: 'Истории',
    exclusiveAccess: 'Эксклюзивный доступ',
    premiumContent: 'Премиум контент',
    luxuryLifestyle: 'Роскошная жизнь',
    tradingResults: 'Торговые результаты',
    viewAll: 'Смотреть все',
    
    // Exclusive content
    categories: {
      all: 'Все',
      strategies: 'Стратегии',
      crypto: 'Крипто',
      education: 'Обучение',
      mindset: 'Мышление',
      cars: 'Автомобили',
      travel: 'Путешествия',
      luxury: 'Роскошь',
      lifestyle: 'Лайфстайл'
    },
    
    // Stats
    views: 'просмотров',
    likes: 'лайков',
    comments: 'комментариев',
    
    // Actions
    watch: 'Смотреть',
    share: 'Поделиться',
    like: 'Нравится',
    comment: 'Комментировать',
    
    // Stories section
    storiesTitle: 'Истории успеха',
    watchStory: 'Смотреть историю',
    
    // Partner offers
    partnerOffers: 'Партнерские предложения',
    iqOptionTitle: 'IQ Option - Торговля с профессионалами',
    iqOptionDesc: 'Начните торговать с ведущей платформой бинарных опционов',
    forexClubTitle: 'ForexClub - Инвестиции в будущее',
    forexClubDesc: 'Присоединяйтесь к миллионам успешных трейдеров',
    startTrading: 'Начать торговлю',
    
    // Error states
    contentNotFound: 'Контент не найден',
    returnToContent: 'Вернуться к контенту',
    
    // Video content titles
    videoTitles: {
      vip: 'VIP встреча с инвесторами',
      aqua: 'Lifestyle и роскошь',
      royal: 'Lamborghini Yacht Experience',
      starting: 'Оцените это видео'
    }
  },
  
  en: {
    // Navigation
    home: 'Home',
    predictions: 'Predictions',
    success: 'Success',
    lifestyle: 'Lifestyle',
    
    // Header
    exclusiveContent: 'Exclusive Content',
    back: 'Back',
    
    // Home page
    welcomeTitle: 'Rich Besh',
    welcomeSubtitle: 'Premium betting & luxury lifestyle content',
    stories: 'Stories',
    exclusiveAccess: 'Exclusive Access',
    premiumContent: 'Premium Content',
    luxuryLifestyle: 'Luxury Lifestyle',
    tradingResults: 'Trading Results',
    viewAll: 'View All',
    
    // Exclusive content
    categories: {
      all: 'All',
      strategies: 'Strategies',
      crypto: 'Crypto',
      education: 'Education',
      mindset: 'Mindset',
      cars: 'Cars',
      travel: 'Travel',
      luxury: 'Luxury',
      lifestyle: 'Lifestyle'
    },
    
    // Stats
    views: 'views',
    likes: 'likes',
    comments: 'comments',
    
    // Actions
    watch: 'Watch',
    share: 'Share',
    like: 'Like',
    comment: 'Comment',
    
    // Stories section
    storiesTitle: 'Success Stories',
    watchStory: 'Watch Story',
    
    // Partner offers
    partnerOffers: 'Partner Offers',
    iqOptionTitle: 'IQ Option - Trade with Professionals',
    iqOptionDesc: 'Start trading with the leading binary options platform',
    forexClubTitle: 'ForexClub - Invest in the Future',
    forexClubDesc: 'Join millions of successful traders',
    startTrading: 'Start Trading',
    
    // Error states
    contentNotFound: 'Content not found',
    returnToContent: 'Return to Content',
    
    // Video content titles
    videoTitles: {
      vip: 'VIP Investor Meeting',
      aqua: 'Lifestyle & Luxury',
      royal: 'Lamborghini Yacht Experience',
      starting: 'Rate this Video'
    }
  }
};

export const getTranslation = (key: string, language: Language): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};