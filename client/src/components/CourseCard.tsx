import { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Clock, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onEnroll: (courseId: number) => void;
}

export default function CourseCard({ course, onEnroll }: CourseCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technology":
        return "bg-primary";
      case "business":
        return "bg-secondary";
      case "design":
        return "bg-accent";
      case "language":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryLabel = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
      <img 
        src={course.imageUrl || "/api/placeholder/400/250"} 
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <span className={`${getCategoryColor(course.category)} text-white text-xs px-3 py-1 rounded-full`}>
          {getCategoryLabel(course.category)}
        </span>
        
        <h3 className="font-inter text-xl font-bold mt-4 mb-2">
          {course.title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-primary">
              D{course.price.toLocaleString()}
            </span>
            {course.originalPrice && (
              <span className="text-gray-500 line-through ml-2">
                D{course.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <Button 
            onClick={() => onEnroll(course.id)}
            className="bg-primary text-white hover:bg-blue-700 btn-transition"
          >
            Enroll Now
          </Button>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-2" />
          <span>{course.duration}</span>
          <Users size={16} className="ml-4 mr-2" />
          <span>{course.enrolled.toLocaleString()} enrolled</span>
        </div>
      </div>
    </div>
  );
}
