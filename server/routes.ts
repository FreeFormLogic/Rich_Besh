import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { insertTrustRequestSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket setup for real-time chat
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });
  
  wss.on('connection', (ws: WebSocket) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', async (message: string) => {
      try {
        const data = JSON.parse(message);
        
        if (data.type === 'chat_message') {
          const newMessage = await storage.createChatMessage({
            userId: data.userId,
            content: data.content,
            replyToId: data.replyToId || null
          });
          
          // Broadcast to all connected clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({
                type: 'new_message',
                message: newMessage
              }));
            }
          });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
    
    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // Telegram WebApp user verification
  const verifyTelegramUser = (req: any, res: any, next: any) => {
    const initData = req.headers['x-telegram-init-data'];
    if (!initData) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // In production, verify the hash using bot token
    // For now, parse the user data
    try {
      const urlParams = new URLSearchParams(initData);
      const userString = urlParams.get('user');
      if (userString) {
        req.telegramUser = JSON.parse(userString);
        next();
      } else {
        res.status(401).json({ error: 'Invalid user data' });
      }
    } catch (error) {
      res.status(401).json({ error: 'Invalid init data' });
    }
  };

  // API Routes

  // User routes
  app.get('/api/user', verifyTelegramUser, async (req: any, res) => {
    try {
      const telegramUser = req.telegramUser;
      let user = await storage.getUser(telegramUser.id.toString());
      
      if (!user) {
        user = await storage.createUser({
          id: telegramUser.id.toString(),
          username: telegramUser.username,
          firstName: telegramUser.first_name,
          lastName: telegramUser.last_name,
          languageCode: telegramUser.language_code || 'ru'
        });
      }
      
      res.json(user);
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  });

  app.patch('/api/user', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const user = await storage.updateUser(userId, req.body);
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Failed to update user' });
    }
  });

  // Predictions routes
  app.get('/api/predictions', async (req, res) => {
    try {
      const predictions = await storage.getActivePredictions();
      res.json(predictions);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      res.status(500).json({ error: 'Failed to fetch predictions' });
    }
  });

  app.get('/api/predictions/:id', async (req, res) => {
    try {
      const prediction = await storage.getPrediction(req.params.id);
      if (!prediction) {
        return res.status(404).json({ error: 'Prediction not found' });
      }
      res.json(prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
      res.status(500).json({ error: 'Failed to fetch prediction' });
    }
  });

  app.post('/api/predictions/:id/purchase', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const predictionId = req.params.id;
      
      await storage.purchasePrediction(userId, predictionId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error purchasing prediction:', error);
      res.status(500).json({ error: 'Failed to purchase prediction' });
    }
  });

  app.get('/api/user/predictions', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const predictions = await storage.getUserPredictions(userId);
      res.json(predictions);
    } catch (error) {
      console.error('Error fetching user predictions:', error);
      res.status(500).json({ error: 'Failed to fetch user predictions' });
    }
  });

  // Courses routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Failed to fetch courses' });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      console.error('Error fetching course:', error);
      res.status(500).json({ error: 'Failed to fetch course' });
    }
  });

  app.post('/api/courses/:id/purchase', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const courseId = req.params.id;
      
      await storage.purchaseCourse(userId, courseId);
      res.json({ success: true });
    } catch (error) {
      console.error('Error purchasing course:', error);
      res.status(500).json({ error: 'Failed to purchase course' });
    }
  });

  app.get('/api/user/courses', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const courses = await storage.getUserCourses(userId);
      res.json(courses);
    } catch (error) {
      console.error('Error fetching user courses:', error);
      res.status(500).json({ error: 'Failed to fetch user courses' });
    }
  });

  // Polls routes
  app.get('/api/polls', async (req, res) => {
    try {
      const polls = await storage.getActivePolls();
      res.json(polls);
    } catch (error) {
      console.error('Error fetching polls:', error);
      res.status(500).json({ error: 'Failed to fetch polls' });
    }
  });

  // Invoice creation endpoint for Telegram payments
  app.post('/api/create-invoice', async (req, res) => {
    try {
      const { itemType, itemId, amount, description } = req.body;
      
      // Mock invoice creation - in real app this would create Telegram invoice
      const invoiceLink = `https://t.me/invoice/${Math.random().toString(36).substr(2, 9)}`;
      
      res.json({ 
        success: true, 
        invoiceLink,
        amount,
        description 
      });
    } catch (error) {
      console.error('Invoice creation error:', error);
      res.status(500).json({ error: "Ошибка создания счета" });
    }
  });

  app.post('/api/polls/:id/vote', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const pollId = req.params.id;
      const { optionIndex } = req.body;
      
      await storage.votePoll(userId, pollId, optionIndex);
      res.json({ success: true });
    } catch (error) {
      console.error('Error voting on poll:', error);
      res.status(500).json({ error: 'Failed to vote on poll' });
    }
  });

  // Partners routes
  app.get('/api/partners', async (req, res) => {
    try {
      const partners = await storage.getActivePartners();
      res.json(partners);
    } catch (error) {
      console.error('Error fetching partners:', error);
      res.status(500).json({ error: 'Failed to fetch partners' });
    }
  });

  app.post('/api/partners/:id/click', async (req, res) => {
    try {
      await storage.incrementPartnerClicks(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error incrementing partner clicks:', error);
      res.status(500).json({ error: 'Failed to track click' });
    }
  });

  // Trust management routes
  app.post('/api/trust-requests', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const requestData = insertTrustRequestSchema.parse({ ...req.body, userId });
      
      const trustRequest = await storage.createTrustRequest(requestData);
      res.json(trustRequest);
    } catch (error) {
      console.error('Error creating trust request:', error);
      res.status(500).json({ error: 'Failed to create trust request' });
    }
  });

  // Chat routes
  app.get('/api/chat/messages', async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
      const messages = await storage.getChatMessages(limit);
      res.json(messages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      res.status(500).json({ error: 'Failed to fetch chat messages' });
    }
  });

  app.post('/api/chat/messages/:id/like', async (req, res) => {
    try {
      await storage.likeChatMessage(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error liking message:', error);
      res.status(500).json({ error: 'Failed to like message' });
    }
  });

  // Stories routes
  app.get('/api/stories', async (req, res) => {
    try {
      const stories = await storage.getActiveStories();
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      res.status(500).json({ error: 'Failed to fetch stories' });
    }
  });

  app.post('/api/stories/:id/view', async (req, res) => {
    try {
      await storage.incrementStoryViews(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error('Error incrementing story views:', error);
      res.status(500).json({ error: 'Failed to track view' });
    }
  });

  // Achievements routes
  app.get('/api/user/achievements', verifyTelegramUser, async (req: any, res) => {
    try {
      const userId = req.telegramUser.id.toString();
      const achievements = await storage.getUserAchievements(userId);
      res.json(achievements);
    } catch (error) {
      console.error('Error fetching achievements:', error);
      res.status(500).json({ error: 'Failed to fetch achievements' });
    }
  });

  // Payment routes (Telegram Payments integration)
  app.post('/api/create-invoice', verifyTelegramUser, async (req: any, res) => {
    try {
      const { itemType, itemId, amount, description } = req.body;
      
      // In production, integrate with Telegram Bot API to create invoice
      // For now, return mock invoice data
      const invoiceData = {
        invoiceLink: `tg://invoice?start=MOCK_INVOICE_${itemId}`,
        payload: `${itemType}:${itemId}`,
        amount: amount
      };
      
      res.json(invoiceData);
    } catch (error) {
      console.error('Error creating invoice:', error);
      res.status(500).json({ error: 'Failed to create invoice' });
    }
  });

  // Seed data endpoint for development
  app.post('/api/seed', async (req, res) => {
    try {
      // Add Rich Besh predictions
      const samplePredictions = [
        {
          title: "💎 ТОП матч недели: Реал vs Барселона",
          description: "Эксклюзивный прогноз на Эль Класико от Rich Besh. Детальный анализ составов, статистики и инсайдерской информации.",
          match: "Реал Мадрид - Барселона",
          odds: "2.15",
          confidence: 85,
          price: 199900, // 1999 rubles
          sport: "⚽ Футбол",
          league: "Ла Лига",
          matchTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          status: "active",
          likes: 142,
          shares: 89
        },
        {
          title: "🏀 НБА: Лейкерс vs Голден Стэйт",
          description: "Горячий прогноз на матч топ-команд Западной конференции. Леброн в отличной форме!",
          match: "Лос-Анджелес Лейкерс - Голден Стэйт",
          odds: "1.85",
          confidence: 78,
          price: 149900,
          sport: "🏀 Баскетбол",
          league: "НБА",
          matchTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          status: "active",
          likes: 98,
          shares: 45
        },
        {
          title: "🥊 UFC: Хабиб возвращается?",
          description: "Эксклюзивная информация о возможном возвращении Нурмагомедова. Ставим на его протеже!",
          match: "Ислам Махачев - Чарльз Оливейра",
          odds: "1.95",
          confidence: 92,
          price: 299900,
          sport: "🥊 ММА",
          league: "UFC",
          matchTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
          status: "active",
          likes: 256,
          shares: 134
        }
      ];

      for (const pred of samplePredictions) {
        await storage.createPrediction(pred);
      }

      // Add courses
      const sampleCourses = [
        {
          title: "💰 Азы спортивных ставок",
          description: "Полный курс для новичков от Rich Besh. Учимся зарабатывать на спорте с нуля до профи.",
          price: 499900,
          duration: 4,
          category: "Базовый",
          content: "16 уроков за 4 недели. 1247 студентов, рейтинг 4.9"
        },
        {
          title: "🚗 Инвестиции в премиум-авто",
          description: "Секреты Rich Besh: как превратить страсть к автомобилям в прибыльные инвестиции.",
          price: 799900,
          duration: 6,
          category: "Инвестиции",
          content: "24 урока за 6 недель. 523 студента, рейтинг 5.0"
        },
        {
          title: "💎 Элитный стиль жизни",
          description: "Философия успеха от Rich Besh. Мышление миллионера, правильные связи и image building.",
          price: 999900,
          duration: 8,
          category: "Lifestyle",
          content: "32 урока за 8 недель. 289 студентов, рейтинг 4.8"
        }
      ];

      for (const course of sampleCourses) {
        await storage.createCourse(course);
      }

      // Add stories
      const sampleStories = [
        {
          title: "🏎️ Новая Lamborghini",
          content: "Только что забрал новую Huracán в Дубае! Эмоции зашкаливают 🔥",
          category: "cars",
          imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400",
          views: 15420,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
        },
        {
          title: "💰 +150% за день",
          content: "Сегодняшние ставки принесли невероятную прибыль! Детали в VIP канале",
          category: "betting",
          imageUrl: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400",
          views: 28934,
          expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000)
        },
        {
          title: "🌴 Закат в Дубае",
          content: "Лучшие моменты жизни - простые удовольствия на высшем уровне",
          category: "dubai",
          imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400",
          views: 12567,
          expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000)
        },
        {
          title: "⌚ Новый Rolex",
          content: "Пополнение коллекции - Daytona Rose Gold. Время - деньги!",
          category: "watches",
          imageUrl: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400",
          views: 9876,
          expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000)
        },
        {
          title: "👔 Milan Fashion Week",
          content: "На показе Versace. Стиль - это инвестиция в себя",
          category: "style",
          imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
          views: 7234,
          expiresAt: new Date(Date.now() + 16 * 60 * 60 * 1000)
        }
      ];

      for (const story of sampleStories) {
        await storage.createStory(story);
      }

      // Add polls
      const samplePolls = [
        {
          question: "Какой матч смотрим в эти выходные?",
          options: ["Реал - Барселона", "ПСЖ - Бавария", "Ливerpool - Сити", "Ювентус - Милан"],
          totalVotes: 1247,
          expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
        },
        {
          question: "На какую тему снять следующий курс?",
          options: ["Криптовалюты", "Недвижимость", "Стартапы", "Форекс"],
          totalVotes: 567,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        {
          question: "Какую машину покупать следующей?",
          options: ["Lamborghini Urus", "Ferrari 296 GTB", "Porsche 911 Turbo", "McLaren Artura"],
          totalVotes: 892,
          expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
        }
      ];

      for (const poll of samplePolls) {
        await storage.createPoll(poll);
      }

      // Add partners
      const samplePartners = [
        {
          name: "🔥 1xBet",
          description: "Лучшие коэффициенты и быстрые выплаты. Бонус до 25,000₽ для новых игроков!",
          affiliateUrl: "https://1xbet.com",
          imageUrl: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=100",
          isActive: true,
          category: "Букмекер",
          bonus: "Бонус +100% до 25,000₽"
        },
        {
          name: "⚡ Parimatch",
          description: "Топовая букмекерская контора с лучшей live-линией. Эксклюзивные бонусы от Rich Besh!",
          affiliateUrl: "https://parimatch.com",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100",
          isActive: true,
          category: "Букмекер",
          bonus: "Кэшбэк 10% каждую неделю"
        },
        {
          name: "💎 Binance",
          description: "Ведущая криптобиржа мира. Начни инвестировать в будущее уже сегодня!",
          affiliateUrl: "https://binance.com",
          imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100",
          isActive: true,
          category: "Криптобиржа",
          bonus: "0% комиссии 30 дней"
        }
      ];

      for (const partner of samplePartners) {
        await storage.createPartner(partner);
      }

      res.json({ success: true, message: 'Тестовые данные добавлены!' });
    } catch (error) {
      console.error('Seed error:', error);
      res.status(500).json({ error: 'Ошибка добавления данных' });
    }
  });

  return httpServer;
}
