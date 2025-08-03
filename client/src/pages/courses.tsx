import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import CourseCard from "@/components/course-card";
import BottomNavigation from "@/components/bottom-navigation";

export default function Courses() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  return (
    <div className="min-h-screen bg-rich-black text-white pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-rich-gold/20">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-neon-green flex items-center">
            <i className="fas fa-graduation-cap mr-2"></i>
            Обучающие курсы
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-neon-green" />
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-graduation-cap text-6xl text-gray-600 mb-4"></i>
            <h2 className="text-xl font-bold text-gray-400 mb-2">Курсы в разработке</h2>
            <p className="text-gray-500">Скоро здесь появятся эксклюзивные курсы от Rich Besh</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <div key={course.id} className="neubrutalism-card bg-gradient-to-br from-neon-green/20 to-rich-black p-4 rounded-2xl">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
