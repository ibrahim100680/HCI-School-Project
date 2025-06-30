import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CourseCard from "@/components/CourseCard";
import CourseRegistrationModal from "@/components/CourseRegistrationModal";
import { Course } from "@/types";
import { useAuth } from "@/hooks/useAuth";

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const { user } = useAuth();

  const categories = [
    { id: "all", label: "All Courses" },
    { id: "technology", label: "Technology" },
    { id: "business", label: "Business" },
    { id: "design", label: "Design" },
    { id: "language", label: "Languages" },
  ];

  const { data: courses = [], isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses", selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/courses?category=${selectedCategory}`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      return response.json();
    },
  });

  const handleEnrollCourse = (courseId: number) => {
    if (!user) {
      // Redirect to login if not authenticated
      window.location.href = "/login";
      return;
    }

    const course = courses.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsRegistrationModalOpen(true);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Header */}
      <div className="hero-gradient text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="font-inter text-5xl font-bold mb-6">Our Courses</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Discover a wide range of courses designed to help you build in-demand skills and advance your career.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">

          {/* Course Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryFilter(category.id)}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`px-6 py-3 font-medium btn-transition ${
                  selectedCategory === category.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Course Grid */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onEnroll={handleEnrollCourse}
                />
              ))}
            </div>
          )}

          {/* Call to Action */}
          <Card className="hero-gradient rounded-3xl p-12 text-white text-center border-0">
            <CardContent className="pt-6">
              <h2 className="font-inter text-3xl font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of students who have transformed their careers with our courses.
              </p>
              <Link href="/login">
                <Button size="lg" className="bg-accent text-white hover:bg-orange-600 btn-transition font-semibold text-lg">
                  Create Your Account
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Registration Modal */}
      <CourseRegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        course={selectedCourse}
      />
    </div>
  );
}
