export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  educationLevel?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration: string;
  enrolled: number;
  imageUrl?: string;
}

export interface CourseRegistration {
  id: number;
  userId: number;
  courseId: number;
  paymentStatus: string;
  registrationDate: Date;
}

export interface ContactMessage {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  educationLevel?: string;
}
