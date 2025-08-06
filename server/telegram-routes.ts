import type { Express } from "express";
import TelegramBotService from "./telegram-bot";

export function registerTelegramRoutes(app: Express, botService?: TelegramBotService) {
  // API для создания инвойса из веб-приложения
  app.post("/api/telegram/create-invoice", async (req, res) => {
    try {
      const { chatId, title, description, amount, payload } = req.body;
      
      if (!botService) {
        return res.status(500).json({ error: "Telegram бот не инициализирован" });
      }

      await botService.createInvoice(chatId, title, description, payload, amount);
      res.json({ success: true, message: "Инвойс отправлен" });
    } catch (error) {
      console.error("Ошибка создания инвойса:", error);
      res.status(500).json({ error: "Ошибка создания инвойса" });
    }
  });

  // API для отправки уведомлений
  app.post("/api/telegram/send-notification", async (req, res) => {
    try {
      const { chatId, message } = req.body;
      
      if (!botService) {
        return res.status(500).json({ error: "Telegram бот не инициализирован" });
      }

      await botService.sendNotification(chatId, message);
      res.json({ success: true, message: "Уведомление отправлено" });
    } catch (error) {
      console.error("Ошибка отправки уведомления:", error);
      res.status(500).json({ error: "Ошибка отправки уведомления" });
    }
  });

  // Webhook для обновлений от Telegram (опционально)
  app.post("/api/telegram/webhook", (req, res) => {
    try {
      const update = req.body;
      console.log("Telegram webhook update:", update);
      
      if (botService) {
        // Обрабатываем update через бота
        const bot = botService.getBot();
        if (bot) {
          bot.handleUpdate(update, res);
        } else {
          res.status(200).json({ ok: true });
        }
      } else {
        res.status(200).json({ ok: true });
      }
    } catch (error) {
      console.error("Ошибка обработки webhook:", error);
      res.status(500).json({ error: "Ошибка обработки webhook" });
    }
  });
}