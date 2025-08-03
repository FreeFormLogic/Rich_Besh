import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";

interface PredictionCardProps {
  prediction: {
    id: string;
    title: string;
    match: string;
    odds: string;
    confidence: number;
    price: number;
    likes: number;
    shares: number;
    matchTime: string;
  };
}

export default function PredictionCard({ prediction }: PredictionCardProps) {
  const { user, openInvoice, showAlert } = useTelegram();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLiked, setIsLiked] = useState(false);

  const purchaseMutation = useMutation({
    mutationFn: async () => {
      // Create invoice first
      const invoiceResponse = await apiRequest("POST", "/api/create-invoice", {
        itemType: "prediction",
        itemId: prediction.id,
        amount: prediction.price,
        description: `Прогноз: ${prediction.match}`
      });
      
      const invoiceData = await invoiceResponse.json();
      
      // Open Telegram payment interface
      return new Promise((resolve, reject) => {
        openInvoice(invoiceData.invoiceLink, (status: boolean) => {
          if (status) {
            resolve(true);
          } else {
            reject(new Error("Payment cancelled"));
          }
        });
      });
    },
    onSuccess: () => {
      toast({
        title: "Успех!",
        description: "Прогноз успешно приобретен!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/predictions"] });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: "Не удалось приобрести прогноз",
        variant: "destructive",
      });
    }
  });

  const handlePurchase = () => {
    if (!user) {
      showAlert("Необходимо авторизоваться в Telegram");
      return;
    }
    purchaseMutation.mutate();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Implement like functionality
  };

  const handleShare = () => {
    // TODO: Implement share functionality
  };

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString() + "₽";
  };

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="bg-white/5 rounded-xl p-4 border-l-4 border-rich-gold hover:bg-white/10 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-white">{prediction.match}</h4>
          <p className="text-gray-400 text-sm">{formatTime(prediction.matchTime)}</p>
        </div>
        <div className="text-right">
          <span className="bg-rich-gold text-black px-2 py-1 rounded font-bold">
            {prediction.odds}
          </span>
          <p className="text-xs text-gray-400 mt-1">
            {prediction.confidence}% уверен
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-300 mb-3">{prediction.title}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button 
            className={`px-2 py-1 rounded transition-colors ${
              isLiked 
                ? "text-neon-green bg-neon-green/10" 
                : "text-neon-green hover:bg-neon-green/10"
            }`}
            onClick={handleLike}
          >
            <i className="fas fa-thumbs-up"></i> {prediction.likes + (isLiked ? 1 : 0)}
          </button>
          <button 
            className="text-neon-pink hover:bg-neon-pink/10 px-2 py-1 rounded transition-colors"
            onClick={handleShare}
          >
            <i className="fas fa-share"></i> {prediction.shares}
          </button>
        </div>
        <button 
          className="bg-rich-gold text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors animate-pulse-glow disabled:opacity-50"
          onClick={handlePurchase}
          disabled={purchaseMutation.isPending}
        >
          {purchaseMutation.isPending ? "Покупка..." : `Купить ${formatPrice(prediction.price)}`}
        </button>
      </div>
    </div>
  );
}
