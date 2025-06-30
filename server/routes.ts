import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, loginSchema, insertCourseRegistrationSchema, insertContactMessageSchema } from "@shared/schema";
import bcrypt from "bcrypt";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      // Find user
      const user = await storage.getUserByEmail(loginData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(loginData.password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(400).json({ message: "Invalid login data" });
    }
  });

  // Course routes
  app.get("/api/courses", async (req, res) => {
    try {
      const category = req.query.category as string;
      
      let courses;
      if (category && category !== "all") {
        courses = await storage.getCoursesByCategory(category);
      } else {
        courses = await storage.getAllCourses();
      }
      
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const courseId = parseInt(req.params.id);
      const course = await storage.getCourse(courseId);
      
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      res.json(course);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  // Course registration routes
  app.post("/api/course-registrations", async (req, res) => {
    try {
      const registrationData = insertCourseRegistrationSchema.parse(req.body);
      
      // Verify course exists
      const course = await storage.getCourse(registrationData.courseId!);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      
      // Verify user exists
      const user = await storage.getUser(registrationData.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Create registration
      const registration = await storage.createCourseRegistration(registrationData);
      
      res.status(201).json(registration);
    } catch (error) {
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.get("/api/users/:userId/registrations", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const registrations = await storage.getUserRegistrations(userId);
      
      res.json(registrations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user registrations" });
    }
  });

  // Contact message routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      
      const message = await storage.createContactMessage(messageData);
      
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
