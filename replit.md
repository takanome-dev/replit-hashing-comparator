# Overview

This is a full-stack web application that provides a cryptographic comparison tool between Java and JavaScript implementations. The application allows users to input JSON data and compare the results of cryptographic operations (JSON flattening, HMAC signature generation, and AES encryption) executed by both Java and JavaScript code to ensure implementation consistency.

The app serves as a validation tool for ensuring that cryptographic implementations across different programming languages produce identical results, which is crucial for systems that need to maintain compatibility between Java backend services and JavaScript frontend/Node.js applications.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/UI components built on Radix UI primitives
- **Styling**: Tailwind CSS with a dark theme configuration and custom CSS variables
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js REST API
- **Language**: TypeScript with ES modules
- **Request Processing**: Express middleware for JSON parsing and request logging
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Development**: Vite integration for hot module replacement in development

## Data Storage Solutions
- **Primary Storage**: In-memory storage using Map data structure for comparison results
- **Database Ready**: Drizzle ORM configured for PostgreSQL with schema definition ready
- **Storage Interface**: Abstracted storage interface allowing easy migration from memory to database
- **Session Management**: PostgreSQL session store configuration available

## Authentication and Authorization
- **Current State**: No authentication system implemented
- **Prepared Infrastructure**: Session management middleware configured but not active
- **Future Ready**: Cookie-based session handling prepared for implementation

## Core Cryptographic Operations
- **JSON Processing**: Recursive flattening with sorted keys to match Java TreeMap behavior
- **HMAC Generation**: SHA-256 based signature generation with base64 encoding
- **AES Encryption**: AES-128-ECB encryption matching Java implementation patterns
- **Validation Engine**: Side-by-side comparison of Java vs JavaScript results with detailed status reporting

## API Structure
- **Comparison Endpoint**: POST `/api/crypto/compare` accepts JSON data and returns comparison results
- **Retrieval Endpoint**: GET `/api/crypto/compare/:id` fetches stored comparison results
- **Response Format**: Structured JSON with Java results, JavaScript results, and validation status
- **Error Handling**: Comprehensive error responses with descriptive messages

## Development Tools
- **Type Safety**: Shared TypeScript schemas using Zod for runtime validation
- **Code Quality**: ESLint and TypeScript strict mode configuration
- **Build Process**: Vite for frontend, esbuild for backend production builds
- **Hot Reload**: Development server with automatic reloading for both frontend and backend

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database service (@neondatabase/serverless)
- **Drizzle ORM**: Type-safe database ORM with PostgreSQL dialect configuration
- **Connection**: Environment variable based database URL configuration

## UI Component Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **Lucide Icons**: Modern icon library for consistent iconography
- **Class Variance Authority**: Utility for creating variant-based component APIs

## Development and Build Tools
- **Vite**: Fast build tool with React plugin and development server
- **TypeScript**: Static type checking with strict configuration
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins

## Runtime Libraries
- **TanStack Query**: Powerful data synchronization for React applications
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: Schema validation library for runtime type checking
- **Wouter**: Minimalist routing library for React applications

## Cryptographic Libraries
- **Node.js Crypto**: Built-in cryptographic functionality for HMAC and AES operations
- **Buffer Handling**: Native Node.js buffer operations for binary data processing

## Session and State Management
- **Connect PG Simple**: PostgreSQL session store for Express sessions
- **Express Session**: Session middleware for user state management (configured but not active)

## Replit Integration
- **Cartographer**: Replit-specific development tooling integration
- **Runtime Error Modal**: Enhanced error reporting in Replit environment
- **Development Banner**: Replit branding integration for external access