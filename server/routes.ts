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

  return httpServer;
}
