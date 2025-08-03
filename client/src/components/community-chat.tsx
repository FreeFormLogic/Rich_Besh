import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useWebSocket } from "@/hooks/use-websocket";
import { useTelegram } from "@/hooks/use-telegram";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  content: string;
  likes: number;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    level: string;
  };
}

export default function CommunityChat() {
  const { user } = useTelegram();
  const { lastMessage, sendChatMessage, isConnected } = useWebSocket();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: initialMessages = [], isLoading } = useQuery({
    queryKey: ["/api/chat/messages"],
  });

  useEffect(() => {
    if (initialMessages.length > 0) {
      setMessages(initialMessages.reverse()); // Reverse to show latest at bottom
    }
  }, [initialMessages]);

  useEffect(() => {
    if (lastMessage && lastMessage.type === 'new_message') {
      setMessages(prev => [...prev, lastMessage.message]);
    }
  }, [lastMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;
    
    sendChatMessage(user.id.toString(), newMessage.trim());
    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return "только что";
    if (diffMinutes < 60) return `${diffMinutes} мин`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} ч`;
    return date.toLocaleDateString("ru-RU");
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "vip": return "bg-rich-gold text-black";
      case "премиум": return "bg-electric-purple text-white";
      case "миллионер": return "bg-neon-green text-black";
      default: return "bg-gray-600 text-white";
    }
  };

  return (
    <section className="neubrutalism-card bg-gradient-to-br from-gray-900 to-rich-black p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-rich-gold flex items-center">
          <i className="fas fa-comments mr-2"></i>
          Чат сообщества
          {isConnected && (
            <span className="ml-2 w-2 h-2 bg-neon-green rounded-full animate-pulse"></span>
          )}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400">
            {isConnected ? "Онлайн" : "Подключение..."}
          </span>
        </div>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-rich-gold" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            Станьте первым, кто напишет сообщение!
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-rich-gold to-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                {message.user.firstName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-white">{message.user.firstName}</span>
                  <span className={`text-xs px-1 rounded ${getLevelColor(message.user.level)}`}>
                    {message.user.level}
                  </span>
                  <span className="text-gray-400 text-xs">{formatTime(message.createdAt)}</span>
                </div>
                <p className="text-gray-300 text-sm">{message.content}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <button className="text-neon-green hover:bg-neon-green/10 px-1 rounded transition-colors text-xs">
                    <i className="fas fa-heart"></i> {message.likes}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="flex space-x-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Напишите сообщение..."
          className="bg-white/5 border-gray-600 text-white flex-1"
          disabled={!user || !isConnected}
        />
        <Button
          onClick={handleSendMessage}
          disabled={!newMessage.trim() || !user || !isConnected}
          className="bg-rich-gold text-black hover:bg-yellow-400"
        >
          <i className="fas fa-paper-plane"></i>
        </Button>
      </div>
    </section>
  );
}
