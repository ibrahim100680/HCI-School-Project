import { 
  users, 
  courses, 
  courseRegistrations, 
  contactMessages,
  type User, 
  type InsertUser,
  type Course,
  type InsertCourse,
  type CourseRegistration,
  type InsertCourseRegistration,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Course operations
  getAllCourses(): Promise<Course[]>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Course registration operations
  getUserRegistrations(userId: number): Promise<CourseRegistration[]>;
  createCourseRegistration(registration: InsertCourseRegistration): Promise<CourseRegistration>;
  
  // Contact message operations
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private courseRegistrations: Map<number, CourseRegistration>;
  private contactMessages: Map<number, ContactMessage>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentRegistrationId: number;
  private currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.courseRegistrations = new Map();
    this.contactMessages = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentRegistrationId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample courses
    this.initializeCourses();
  }

  private initializeCourses() {
    const sampleCourses: InsertCourse[] = [
      {
        title: "Full Stack Web Development",
        description: "Master modern web development with React, Node.js, and database technologies.",
        category: "technology",
        price: 14950,
        originalPrice: 24950,
        duration: "12 weeks",
        enrolled: 2340,
        imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
      },
      {
        title: "Digital Marketing Strategy",
        description: "Learn to create and execute effective digital marketing campaigns across all channels.",
        category: "business",
        price: 9950,
        originalPrice: 17450,
        duration: "8 weeks",
        enrolled: 1876,
        imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
      },
      {
        title: "UX/UI Design Fundamentals",
        description: "Create intuitive and beautiful user experiences with industry-standard design tools.",
        category: "design",
        price: 12450,
        originalPrice: 19950,
        duration: "10 weeks",
        enrolled: 1523,
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
      },
      {
        title: "Data Science & Analytics",
        description: "Transform data into insights using Python, R, and machine learning techniques.",
        category: "technology",
        price: 17450,
        originalPrice: 27450,
        duration: "16 weeks",
        enrolled: 987,
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
      },
      {
        title: "Business English Mastery",
        description: "Advance your professional communication skills in English for global business.",
        category: "language",
        price: 7450,
        originalPrice: 12450,
        duration: "6 weeks",
        enrolled: 3210,
        imageUrl: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
      },
      {
        title: "Financial Management",
        description: "Master personal and business financial planning, budgeting, and investment strategies.",
        category: "business",
        price: 8950,
        originalPrice: 14950,
        duration: "8 weeks",
        enrolled: 1456,
        imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
      }
    ];

    sampleCourses.forEach(course => {
      this.createCourse(course);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => 
      category === "all" || course.category === category
    );
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const course: Course = { 
      ...insertCourse, 
      id,
      createdAt: new Date()
    };
    this.courses.set(id, course);
    return course;
  }

  async getUserRegistrations(userId: number): Promise<CourseRegistration[]> {
    return Array.from(this.courseRegistrations.values()).filter(
      reg => reg.userId === userId
    );
  }

  async createCourseRegistration(insertRegistration: InsertCourseRegistration): Promise<CourseRegistration> {
    const id = this.currentRegistrationId++;
    const registration: CourseRegistration = { 
      ...insertRegistration, 
      id,
      registrationDate: new Date()
    };
    this.courseRegistrations.set(id, registration);
    return registration;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = { 
      ...insertMessage, 
      id,
      createdAt: new Date()
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
