import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useTelegram } from "@/hooks/use-telegram";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: string;
  imageUrl?: string;
  studentsCount: number;
}

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { user, openInvoice, showAlert } = useTelegram();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const invoiceResponse = await apiRequest("POST", "/api/create-invoice", {
        itemType: "course",
        itemId: course.id,
        amount: course.price,
        description: `Курс: ${course.title}`
      });
      
      const invoiceData = await invoiceResponse.json();
      
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
        description: "Курс успешно приобретен!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/user/courses"] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось приобрести курс",
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

  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString() + "₽";
  };

  const defaultImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200";

  return (
    <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer group">
      <img 
        src={course.imageUrl || defaultImage}
        alt={course.title}
        className="w-full h-32 object-cover rounded-lg mb-3 group-hover:scale-105 transition-transform"
      />
      
      <h4 className="font-bold text-white mb-2">{course.title}</h4>
      <p className="text-gray-400 text-sm mb-3">{course.description}</p>
      
      <div className="flex justify-between items-center mb-3">
        <span className="bg-rich-gold text-black px-2 py-1 rounded font-bold">
          {formatPrice(course.price)}
        </span>
        <div className="flex items-center text-rich-gold">
          <i className="fas fa-star"></i>
          <span className="ml-1">{parseFloat(course.rating).toFixed(1)}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {course.studentsCount} студентов
        </span>
        <button 
          className="bg-neon-green text-black px-3 py-1 rounded font-bold hover:bg-green-400 transition-colors disabled:opacity-50"
          onClick={handlePurchase}
          disabled={purchaseMutation.isPending}
        >
          {purchaseMutation.isPending ? "Покупка..." : "Купить"}
        </button>
      </div>
    </div>
  );
}
