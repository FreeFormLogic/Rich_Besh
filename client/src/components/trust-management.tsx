import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const trustRequestSchema = z.object({
  amount: z.number().min(10000, "Минимальная сумма 10,000₽"),
  contact: z.string().min(1, "Укажите контакт"),
  period: z.number().min(1, "Минимальный срок 1 месяц").max(60, "Максимальный срок 60 месяцев"),
  goal: z.string().optional(),
});

type TrustRequestForm = z.infer<typeof trustRequestSchema>;

export default function TrustManagement() {
  const { user, showAlert } = useTelegram();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<TrustRequestForm>({
    resolver: zodResolver(trustRequestSchema),
    defaultValues: {
      amount: 50000,
      contact: "",
      period: 6,
      goal: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: TrustRequestForm) => {
      await apiRequest("POST", "/api/trust-requests", data);
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
      setIsOpen(false);
      form.reset();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: TrustRequestForm) => {
    if (!user) {
      showAlert("Необходимо авторизоваться в Telegram");
      return;
    }
    submitMutation.mutate(data);
  };

  return (
    <div className="neubrutalism-card bg-gradient-to-br from-electric-purple/20 to-rich-black p-6 rounded-2xl">
      <h3 className="text-xl font-bold text-electric-purple mb-4 flex items-center">
        <i className="fas fa-handshake mr-2"></i>
        Доверительное управление
      </h3>
      
      <div className="space-y-4">
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-gray-300 text-sm mb-2">Средняя доходность</p>
          <p className="text-2xl font-bold text-neon-green">+47%</p>
          <p className="text-xs text-gray-400">за 6 месяцев</p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-gray-300 text-sm mb-2">Успешных клиентов</p>
          <p className="text-xl font-bold text-rich-gold">284</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="w-full bg-electric-purple hover:bg-purple-600 text-white py-3 rounded-lg font-bold transition-colors animate-pulse-glow">
              Подать заявку
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-rich-black border-rich-gold/20 text-white">
            <DialogHeader>
              <DialogTitle className="text-rich-gold">Заявка на доверительное управление</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Сумма инвестиций (₽)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="50000" 
                          className="bg-white/5 border-gray-600 text-white"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Контакт (телефон/email)</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="+7 900 123-45-67" 
                          className="bg-white/5 border-gray-600 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Срок управления (месяцев)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="6" 
                          className="bg-white/5 border-gray-600 text-white"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Цель инвестиций (необязательно)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Расскажите о ваших инвестиционных целях..."
                          className="bg-white/5 border-gray-600 text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-rich-gold text-black hover:bg-yellow-400"
                  disabled={submitMutation.isPending}
                >
                  {submitMutation.isPending ? "Отправка..." : "Отправить заявку"}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
