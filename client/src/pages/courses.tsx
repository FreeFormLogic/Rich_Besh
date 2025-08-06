import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import CourseCard from "@/components/course-card";
import BottomNavigation from "@/components/bottom-navigation";
import Header from "@/components/header";
import SectionIntro from "@/components/section-intro";

export default function Courses() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["/api/courses"],
  });

  return (
    <div className="min-h-screen bg-rich-black text-white pb-24">
      {/* Header */}
      <Header showBackButton={true} />
      
      {/* Section Introduction */}
      <div className="pt-20">
        <div className="container mx-auto px-4 py-6">
          <SectionIntro
            title="Курсы миллионера"
            description="Эксклюзивные обучающие курсы от Rich Besh. Психология успеха, финансовая грамотность и секреты миллионеров."
            coverImage="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop"
            gradient=""
            icon="fas fa-graduation-cap"
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-rich-gold" />
          </div>
        ) : (courses as any[]).length === 0 ? (
          <div className="text-center py-12">
            <i className="fas fa-graduation-cap text-6xl text-gray-600 mb-4"></i>
            <h2 className="text-xl font-bold text-gray-400 mb-2">Курсы в разработке</h2>
            <p className="text-gray-500">Скоро здесь появятся эксклюзивные курсы от Rich Besh</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(courses as any[]).map((course: any) => (
              <div key={course.id} className="neubrutalism-card bg-gradient-to-br from-electric-purple/20 to-rich-black p-4 rounded-2xl">
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
