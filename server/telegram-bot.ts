// Заглушка для Telegram бота
class TelegramBotService {
  constructor() {
    console.log('TelegramBotService инициализирован (заглушка)');
  }

  async createInvoice(chatId: number, title: string, description: string, payload: string, amount: number) {
    console.log('Создание инвойса (заглушка):', { chatId, title, amount });
    return Promise.resolve();
  }

  async sendNotification(chatId: number, message: string) {
    console.log('Отправка уведомления (заглушка):', { chatId, message });
    return Promise.resolve();
  }

  start() {
    console.log('🤖 Rich Besh Telegram Bot (заглушка) готов к работе!');
  }

  getBot() {
    return null;
  }
}

export default TelegramBotService;