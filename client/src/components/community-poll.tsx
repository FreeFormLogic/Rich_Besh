import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

interface CommunityPollProps {
  poll: Poll;
}

export default function CommunityPoll({ poll }: CommunityPollProps) {
  const { user, showAlert } = useTelegram();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const voteMutation = useMutation({
    mutationFn: async (optionIndex: number) => {
      await apiRequest("POST", `/api/polls/${poll.id}/vote`, {
        optionIndex
      });
    },
    onSuccess: () => {
      setHasVoted(true);
      toast({
        title: "Спасибо!",
        description: "Ваш голос учтен",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/polls"] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось проголосовать",
        variant: "destructive",
      });
    }
  });

  const handleVote = (optionIndex: number) => {
    if (!user) {
      showAlert("Необходимо авторизоваться в Telegram");
      return;
    }
    
    if (hasVoted) {
      return;
    }

    setSelectedOption(optionIndex);
    voteMutation.mutate(optionIndex);
  };

  const getPercentage = (votes: number) => {
    if (poll.totalVotes === 0) return 0;
    return Math.round((votes / poll.totalVotes) * 100);
  };

  return (
    <div className="neubrutalism-card bg-gradient-to-br from-neon-pink/20 to-rich-black p-6 rounded-2xl">
      <h3 className="text-xl font-bold text-neon-pink mb-4 flex items-center">
        <i className="fas fa-poll mr-2"></i>
        Опрос дня
      </h3>
      
      <p className="text-gray-300 mb-4">{poll.question}</p>
      
      <div className="space-y-3">
        {poll.options.map((option, index) => {
          const percentage = getPercentage(option.votes);
          const isSelected = selectedOption === index;
          
          return (
            <button
              key={index}
              className={`w-full rounded-lg p-3 text-left transition-colors group ${
                hasVoted || voteMutation.isPending
                  ? 'cursor-not-allowed opacity-75'
                  : 'bg-white/5 hover:bg-white/10'
              } ${isSelected ? 'bg-neon-pink/20' : ''}`}
              onClick={() => handleVote(index)}
              disabled={hasVoted || voteMutation.isPending}
            >
              <div className="flex justify-between items-center">
                <span>{option.text}</span>
                <span className="text-rich-gold font-bold">{percentage}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <div 
                  className={`h-1 rounded-full transition-all duration-500 ${
                    isSelected ? 'bg-neon-pink' : 'bg-rich-gold group-hover:bg-yellow-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </button>
          );
        })}
      </div>
      
      <p className="text-xs text-gray-400 mt-3">
        Проголосовало: {poll.totalVotes.toLocaleString()} человек
      </p>
    </div>
  );
}
