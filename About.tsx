import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Heart, Star, Lightbulb, HandHeart } from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Ebrima M Sillah",
      title: "CEO & Founder",
      bio: "PhD in Educational Technology with 15+ years experience in digital learning platforms.",
      emoji: "👨‍💼"
    },
    {
      name: "Haddy Sillah",
      title: "Chief Technology Officer",
      bio: "Former lead engineer at EdTech startups, specializing in scalable learning management systems.",
      emoji: "👩‍💻"
    },
    {
      name: "Sulayman Sowe",
      title: "Head of Academics",
      bio: "Masters in Curriculum Design with expertise in creating engaging educational content.",
      emoji: "👨‍🏫"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Accessibility",
      description: "Education should be available to everyone, regardless of background or circumstances."
    },
    {
      icon: Star,
      title: "Excellence",
      description: "We maintain the highest standards in content quality and learning outcomes."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Continuously evolving our platform with cutting-edge educational technology."
    },
    {
      icon: HandHeart,
      title: "Community",
      description: "Building supportive learning communities that foster collaboration and growth."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Header */}
      <div className="hero-gradient text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="font-inter text-5xl font-bold mb-6">About NextGen Academy</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Pioneering the future of education through innovative technology and personalized learning experiences.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-20">
        <div className="max-w-6xl mx-auto px-4">

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <Target className="text-white" size={32} />
                </div>
                <h2 className="font-inter text-2xl font-bold mb-4 text-gray-800">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed">
                  To democratize quality education by providing accessible, affordable, and engaging learning experiences that empower individuals to achieve their personal and professional goals.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-0 shadow-lg card-hover">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-secondary to-green-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                  <Eye className="text-white" size={32} />
                </div>
                <h2 className="font-inter text-2xl font-bold mb-4 text-gray-800">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading global platform where learners from all backgrounds can access world-class education and build skills for the digital economy.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Team Section */}
          <div className="mb-20">
            <h2 className="font-inter text-3xl font-bold text-center mb-12 text-gray-800">Meet Our Leadership Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => {
                const cardColors = [
                  "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200",
                  "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200", 
                  "bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200"
                ];
                const emojiColors = [
                  "bg-gradient-to-r from-purple-400 to-purple-600",
                  "bg-gradient-to-r from-orange-400 to-orange-600",
                  "bg-gradient-to-r from-teal-400 to-teal-600"
                ];
                return (
                  <Card key={index} className={`text-center p-6 shadow-lg card-hover border-2 ${cardColors[index]}`}>
                    <CardContent className="pt-6">
                      <div className={`w-24 h-24 rounded-full mx-auto mb-4 ${emojiColors[index]} flex items-center justify-center text-4xl shadow-lg`}>
                        {member.emoji}
                      </div>
                      <h3 className="font-inter font-semibold text-lg mb-2 text-gray-800">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.title}</p>
                      <p className="text-gray-700 text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="font-inter text-3xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                const valueColors = [
                  "bg-pink-400 bg-opacity-30",
                  "bg-yellow-400 bg-opacity-30", 
                  "bg-green-400 bg-opacity-30",
                  "bg-indigo-400 bg-opacity-30"
                ];
                return (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 ${valueColors[index]} rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm shadow-lg`}>
                      <IconComponent className="text-white" size={32} />
                    </div>
                    <h3 className="font-semibold mb-2 text-yellow-100">{value.title}</h3>
                    <p className="text-blue-100 text-sm">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
