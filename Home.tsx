import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Laptop, Tag, Users, Eye, Target, Heart, Star, Lightbulb, HandHeart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen hero-gradient text-white">
        {/* Modern abstract geometric pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-lg rotate-45"></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-lg rotate-12"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left animate-fade-in-up">
              <h1 className="font-inter text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slide-in-left">
                Transform Your Future with 
                <span className="text-accent animate-pulse-slow"> Quality Education</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100 leading-relaxed animate-fade-in-delayed">
                Join thousands of students advancing their careers through our comprehensive online learning platform designed for modern learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-bounce-in">
                <Link href="/login">
                  <Button size="lg" className="bg-accent text-white hover:bg-orange-600 btn-transition font-semibold text-lg transform hover:scale-105 transition-all duration-300">
                    Start Learning Today
                  </Button>
                </Link>
                <Link href="/courses">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white hover:text-primary btn-transition font-semibold text-lg transform hover:scale-105 transition-all duration-300">
                    Explore Courses
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-fade-in-right">
              <img 
                src="https://images.unsplash.com/photo-1594736797933-d0d7b47e6d35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="African students collaborating in modern classroom" 
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg p-4 shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center animate-pulse">
                    <Users className="text-white" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">15,000+</p>
                    <p className="text-sm text-gray-600">Happy Students</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-inter text-4xl font-bold text-gray-800 mb-4 animate-fade-in-up">Why Choose NextGen Academy?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience education that adapts to your lifestyle with cutting-edge technology and expert instruction.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 bg-gray-50 card-hover border-0">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Laptop className="text-white" size={32} />
                </div>
                <h3 className="font-inter text-xl font-semibold mb-4 text-gray-800">Flexible Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  Study at your own pace with 24/7 access to course materials and interactive assignments.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gray-50 card-hover border-0">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Tag className="text-white" size={32} />
                </div>
                <h3 className="font-inter text-xl font-semibold mb-4 text-gray-800">Certified Programs</h3>
                <p className="text-gray-600 leading-relaxed">
                  Earn industry-recognized certificates that boost your career prospects and validate your skills.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-8 bg-gray-50 card-hover border-0">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-6">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="font-inter text-xl font-semibold mb-4 text-gray-800">Expert Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get guidance from experienced instructors and connect with a community of fellow learners.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Community Learning Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="font-inter text-4xl font-bold text-gray-800 mb-6">
                Learn Together, Grow Together
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join a vibrant community of learners where collaboration and knowledge sharing drive success. Our students work together to achieve their academic and professional goals.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Users className="text-white" size={16} />
                  </div>
                  <span className="text-gray-700">Collaborative study groups</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Lightbulb className="text-white" size={16} />
                  </div>
                  <span className="text-gray-700">Peer-to-peer learning support</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Heart className="text-white" size={16} />
                  </div>
                  <span className="text-gray-700">Inclusive learning environment</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in-right">
              <img 
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Three Black American students collaborating with laptops and books in a modern study environment" 
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                    <HandHeart className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Community</p>
                    <p className="text-sm text-gray-600">Learning Together</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 stats-bg text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15,000+</div>
              <div className="text-gray-300">Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">200+</div>
              <div className="text-gray-300">Courses Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-gray-300">Expert Instructors</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">95%</div>
              <div className="text-gray-300">Completion Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
