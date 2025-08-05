// Данные из реального Instagram Rich Besh (richbesh.b-cdn.net/IG/)
export interface RichInstagramPost {
  post_id: string;
  filename: string;
  description: string;
  likes: string;
  comments: string;
  views: string;
  date: string;
  type: 'video' | 'image';
}

// Реальные данные из posts_info.csv
export const richInstagramContent: RichInstagramPost[] = [
  {
    post_id: "3683192790368544979",
    filename: "2025-07-23_3683192790368544979.mp4",
    description: "Honored to be Invited and truly grateful for the warm hospitality. Thank you, Your Highness, for an unforgettable evening 🤝",
    likes: "61615",
    comments: "109",
    views: "0",
    date: "2025-07-23",
    type: "video"
  },
  {
    post_id: "3605486443139044627",
    filename: "2025-04-07_3605486443139044627.mp4", 
    description: "1 Nice Day of My Life 🤲🏽 @bareknucklefc @thenotoriousmma @ksn_11 @aptieziev",
    likes: "24029",
    comments: "39",
    views: "0",
    date: "2025-04-07",
    type: "video"
  },
  {
    post_id: "3619375607072811190",
    filename: "2025-04-26_3619375607072811190.mp4",
    description: "🏍️",
    likes: "31553", 
    comments: "36",
    views: "0",
    date: "2025-04-26",
    type: "video"
  },
  {
    post_id: "3625166336223525938",
    filename: "2025-05-04_3625166336223525938.mp4",
    description: "Rate the Video from 1-10 🙄",
    likes: "29189",
    comments: "316", 
    views: "0",
    date: "2025-05-04",
    type: "video"
  },
  {
    post_id: "3656112064166953339",
    filename: "2025-06-16_3656112064166953339.mp4",
    description: "Your times starts now✌️ #shukransoltanov #byshukransoltanov #totsamıyshuker #rıchbesh#dubai#luxurylifestyle #ricshstyle",
    likes: "32571",
    comments: "76",
    views: "0", 
    date: "2025-06-16",
    type: "video"
  },
  {
    post_id: "3665695044867554408",
    filename: "2025-06-29_3665695044867554408.mp4",
    description: "Lamborghini Yacht ⚓️",
    likes: "15716",
    comments: "29",
    views: "0",
    date: "2025-06-29", 
    type: "video"
  },
  {
    post_id: "3680433559831940339",
    filename: "2025-07-19_3680433559831940339.mp4",
    description: "Aqua Rich 🌊",
    likes: "10044",
    comments: "89",
    views: "0",
    date: "2025-07-19",
    type: "video"
  },
  {
    post_id: "3460751662307950778",
    filename: "2024-09-19_3460751662307950778.mp4", 
    description: "Всё в этой жизни возможно когда ты Пиз.абол ✔️",
    likes: "7727",
    comments: "101",
    views: "0",
    date: "2024-09-19",
    type: "video"
  },
  {
    post_id: "3489649407055477294",
    filename: "2024-10-29_3489649407055477294.mp4",
    description: "Dubai One Love 🤍",
    likes: "15640",
    comments: "48", 
    views: "0",
    date: "2024-10-29",
    type: "video"
  },
  {
    post_id: "3471464298635755319",
    filename: "2024-10-04_3471464298635755319.mp4",
    description: "Write down your worries and fears – you might even sleep better. You imagine living in a penthouse without any cash ? Guess what happened #fyp #dubailife #realestate #luxury #viral #property #penthouse",
    likes: "634",
    comments: "48",
    views: "0",
    date: "2024-10-04",
    type: "video"
  },
  {
    post_id: "3476553000702803376",
    filename: "2024-10-11_3476553000702803376.mp4",
    description: "School reunion was boring we have business to do 💰💰", 
    likes: "1606",
    comments: "56",
    views: "0",
    date: "2024-10-11",
    type: "video"
  },
  {
    post_id: "3478696833536357752",
    filename: "2024-10-14_3478696833536357752.mp4",
    description: "I came, I saw, I conquered 💪🏽 Пришёл , Увидел , Победил 💪🏽",
    likes: "2481",
    comments: "105",
    views: "0",
    date: "2024-10-14", 
    type: "video"
  },
  {
    post_id: "3254147733027366884",
    filename: "2023-12-09_3254147733027366884.mp4",
    description: "@thenotoriousmma 🥃 Встреча с братом 😁",
    likes: "75989",
    comments: "1727",
    views: "0",
    date: "2023-12-09",
    type: "video"
  }
];

// Telegram канал данные (симулированные на основе реального канала)
export interface TelegramChannelPost {
  id: string;
  text: string;
  media_type?: 'photo' | 'video';
  date: string;
  views: number;
  forwards: number;
  channel: string;
}

export const telegramChannelData: TelegramChannelPost[] = [
  {
    id: "t_1",
    text: "🔥 ЭКСПРЕСС ЗАШЁЛ! +2847% 🔥\n\n⚽️ 5 матчей из 5\n💰 Ставка: 1000₽ → 29,470₽\n📊 Коэф: 29.47\n\n✅ Манчестер Юнайтед победа\n✅ Бавария тотал больше 2.5\n✅ ПСЖ форора -1\n✅ Реал обе забьют\n✅ Ливерпуль тотал меньше 3.5\n\nАнализ был идеальным! Кто следовал - красавчик! 💪",
    media_type: "photo",
    date: "2025-08-04",
    views: 5240,
    forwards: 89,
    channel: "richbesh_wins"
  },
  {
    id: "t_2", 
    text: "💎 LIVE СТАВКА ЗАШЛА! 💎\n\n🎾 Теннис Live\n💰 10,000₽ → 48,500₽ (+385%)\n📊 Коэф: 4.85\n\nИгра: Новак vs Алькарас\n✅ Тотал геймов больше 38.5\n\nЧитал игру как открытую книгу! Live анализ - моя сильная сторона 🎯",
    media_type: "video",
    date: "2025-08-03",
    views: 7830,
    forwards: 156,
    channel: "richbesh_wins"
  },
  {
    id: "t_3",
    text: "🏒 НХЛ ПЛЕЙ-ОФФ = ДЕНЬГИ! 🏒\n\n💸 Ставка: 10,700₽ → 156,000₽\n📈 ROI: +1460%\n\nМатч: Рейнджерс vs Лайтнинг\n✅ Рейнджерс победа в овертайме (коэф 14.6)\n\nЗнание команд и формы игроков дало свои плоды! Это чистая прибыль, братья! 💰💰💰",
    media_type: "photo", 
    date: "2025-08-02",
    views: 9420,
    forwards: 203,
    channel: "richbesh_wins"
  },
  {
    id: "t_4",
    text: "🏀 НБА ФИНАЛ СЕРИЯ! 🏀\n\n🎯 Долгосрочная ставка зашла!\n💰 11,300₽ → 87,300₽ (+773%)\n\nСтавка: Бостон чемпион (коэф 7.73)\n✅ Прогноз был идеальным с самого начала!\n\nТак работает профессиональный анализ! 🔥",
    media_type: "photo",
    date: "2025-08-01", 
    views: 6180,
    forwards: 127,
    channel: "richbesh_wins"
  },
  {
    id: "t_5",
    text: "🎮 CS2 MAJOR ПРИНЁС БАБКИ! 🎮\n\nКиберспорт тоже работает!\n💰 14,100₽ → 34,200₽ (+242%)\n\nМатч: FaZe vs G2\n✅ FaZe 2-0 (коэф 2.42)\n\nЗнание мета и формы команд - мой козырь в eSports! 🎯⚡️",
    media_type: "video",
    date: "2025-07-31",
    views: 4920,
    forwards: 85,
    channel: "richbesh_wins"  
  },
  {
    id: "t_6",
    text: "🥊 UFC ГЛАВНЫЙ БОЙ! 🥊\n\n🔥 Анализ физики бойцов окупился!\n💰 11,700₽ → 67,800₽ (+578%)\n\nБой: Джонс vs Ган\n✅ Джонс победа удушающим (коэф 5.78)\n\nАнализ стилей и подготовки дал точный прогноз! 💪",
    media_type: "video",
    date: "2025-07-30",
    views: 8340,
    forwards: 174,
    channel: "richbesh_wins"
  }
];

// Базовый URL для Rich Besh CDN
export const RICH_CDN_BASE_URL = "https://richbesh.b-cdn.net/IG/";

// Утилиты для работы с контентом
export const formatNumber = (num: string | number): string => {
  const n = typeof num === 'string' ? parseInt(num) : num;
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
};

export const getContentUrl = (filename: string): string => {
  return `${RICH_CDN_BASE_URL}${filename}`;
};

export const getContentType = (filename: string): 'video' | 'image' => {
  return filename.toLowerCase().includes('.mp4') ? 'video' : 'image';
};

// Фильтры для контента
export const getTopEngagementPosts = (posts: RichInstagramPost[], limit: number = 6): RichInstagramPost[] => {
  return posts
    .sort((a, b) => parseInt(b.likes) - parseInt(a.likes))
    .slice(0, limit);
};

export const getRecentPosts = (posts: RichInstagramPost[], limit: number = 10): RichInstagramPost[] => {
  return posts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getLuxuryLifestylePosts = (posts: RichInstagramPost[]): RichInstagramPost[] => {
  const luxuryKeywords = ['yacht', 'dubai', 'luxury', 'penthouse', 'car', 'rich', 'conquered', 'business'];
  return posts.filter(post => 
    luxuryKeywords.some(keyword => 
      post.description.toLowerCase().includes(keyword)
    )
  );
};