import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Award, TrendingUp, Calendar, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { CourseRegistration } from "@/types";

export default function Dashboard() {
  const { user } = useAuth();

  const { data: registrations = [], isLoading } = useQuery<CourseRegistration[]>({
    queryKey: ["/api/users", user?.id, "registrations"],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await fetch(`/api/users/${user.id}/registrations`);
      if (!response.ok) {
        throw new Error("Failed to fetch registrations");
      }
      return response.json();
    },
    enabled: !!user?.id,
  });

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">Please log in to access your dashboard.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-inter text-4xl font-bold text-gray-800">
              Welcome back, {user.firstName}!
            </h1>
            <p className="text-gray-600 mt-2">
              Continue your learning journey and track your progress.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Enrolled Courses</p>
                    <p className="text-2xl font-bold text-gray-800">{registrations.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Hours Studied</p>
                    <p className="text-2xl font-bold text-gray-800">42</p>
                  </div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Clock className="text-secondary" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Certificates</p>
                    <p className="text-2xl font-bold text-gray-800">3</p>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Award className="text-accent" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Streak</p>
                    <p className="text-2xl font-bold text-gray-800">12 days</p>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-success" size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* My Courses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen size={24} />
                    <span>My Courses</span>
                  </CardTitle>
                  <CardDescription>Continue your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-8 bg-gray-200 rounded mb-4"></div>
                          <div className="h-2 bg-gray-200 rounded"></div>
                        </div>
                      ))}
                    </div>
                  ) : registrations.length > 0 ? (
                    <div className="space-y-6">
                      {registrations.map((registration) => (
                        <div key={registration.id} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-800">Course #{registration.courseId}</h3>
                              <p className="text-sm text-gray-600">
                                Enrolled on {new Date(registration.registrationDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant={registration.paymentStatus === "completed" ? "default" : "secondary"}>
                              {registration.paymentStatus}
                            </Badge>
                          </div>
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>75%</span>
                            </div>
                            <Progress value={75} className="h-2" />
                          </div>
                          <Button size="sm" className="w-full">
                            Continue Learning
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <h3 className="font-semibold text-gray-800 mb-2">No courses enrolled</h3>
                      <p className="text-gray-600 mb-4">Start your learning journey by enrolling in a course.</p>
                      <Button>Browse Courses</Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp size={24} />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <BookOpen className="text-primary" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed lesson: "React Fundamentals"</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Award className="text-secondary" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Earned certificate: "Web Development Basics"</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                        <Users className="text-accent" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Joined discussion: "Best Practices in UX Design"</p>
                        <p className="text-xs text-gray-500">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar size={20} />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm font-medium text-red-800">Project Submission</p>
                      <p className="text-xs text-red-600">Due in 2 days</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">Quiz: JavaScript Basics</p>
                      <p className="text-xs text-yellow-600">Due in 1 week</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">Peer Review</p>
                      <p className="text-xs text-blue-600">Due in 2 weeks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Streak */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp size={20} />
                    <span>Learning Streak</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">12</div>
                    <p className="text-sm text-gray-600 mb-4">Days in a row</p>
                    <div className="grid grid-cols-7 gap-1">
                      {[...Array(14)].map((_, index) => (
                        <div
                          key={index}
                          className={`w-4 h-4 rounded-sm ${
                            index < 12 ? "bg-accent" : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Keep it up!</p>
                  </div>
                </CardContent>
              </Card>

              {/* Profile Completion */}
              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Profile completion</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                    <p className="text-xs text-gray-600">
                      Add a profile picture and bio to complete your profile.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Complete Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
