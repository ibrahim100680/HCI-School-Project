# NextGen Academy - Student Learning Platform

## Overview

NextGen Academy is a modern full-stack web application designed as an online learning platform for students. It provides a comprehensive educational experience with course management, user authentication, and interactive learning features. The application follows a monorepo structure with shared code between client and server.

## System Architecture

### Frontend Architecture
- **Framework**: React 18+ with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Custom implementation with bcrypt password hashing
- **Session Management**: In-memory storage with planned PostgreSQL session store
- **API Design**: RESTful API endpoints with JSON responses

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migration Strategy**: Drizzle Kit for schema migrations
- **Connection**: Neon serverless driver for PostgreSQL connections

## Key Components

### Core Entities
1. **Users**: Student registration and authentication system
2. **Courses**: Course catalog with categories, pricing, and enrollment tracking
3. **Course Registrations**: Junction table linking users to enrolled courses
4. **Contact Messages**: Contact form submissions storage

### Authentication System
- User registration with email validation
- Secure password hashing using bcrypt
- Session-based authentication with localStorage persistence
- Protected routes and user context management

### Course Management
- Course categorization (Technology, Business, Design, Languages)
- Course enrollment with payment status tracking
- User dashboard for enrolled courses
- Course filtering and search functionality

### UI/UX Features
- Responsive design with mobile-first approach
- Dark/light theme support via CSS variables
- Modern component library with consistent styling
- Form validation with user-friendly error messages
- Toast notifications for user feedback

## Data Flow

1. **Client-Server Communication**: REST API calls using fetch with JSON payloads
2. **State Management**: TanStack Query handles server state caching and synchronization
3. **Form Processing**: React Hook Form with Zod validation before API submission
4. **Database Operations**: Drizzle ORM provides type-safe database queries
5. **Authentication Flow**: Context-based auth state with localStorage persistence

## External Dependencies

### Database & Infrastructure
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database toolkit
- **Drizzle Kit**: Schema migration and development tools

### Frontend Libraries
- **Radix UI**: Unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework
- **TanStack Query**: Powerful data synchronization for React
- **React Hook Form**: Performant forms with easy validation
- **Zod**: TypeScript-first schema validation

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- Vite development server with hot module replacement
- Concurrent client and server development
- Database migrations via Drizzle Kit commands

### Production Build
- Vite builds client-side React application
- ESBuild bundles server-side Express application
- Static file serving through Express in production
- Environment variable configuration for database connections

### Replit Integration
- Replit-specific plugins for development experience
- Runtime error overlay for debugging
- Cartographer plugin for code exploration

## Changelog
- June 30, 2025. Initial setup
- June 30, 2025. Updated team members with local names, changed currency to Gambian dalasis, updated contact info, replaced photos with emojis, improved button visibility
- June 30, 2025. Added colorful gradient headers to About, Courses, and Contact pages for enhanced visual appeal
- June 30, 2025. Changed platform name from EduConnect to NextGen Academy throughout entire website
- June 30, 2025. Added smooth animations to home page hero section and feature cards
- June 30, 2025. Improved navigation visibility on tablets and mobile devices
- June 30, 2025. Updated all images to feature people with dark skin for cultural authenticity

## User Preferences

Preferred communication style: Simple, everyday language.