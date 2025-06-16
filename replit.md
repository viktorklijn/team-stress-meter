# Team Stress Monitor - Replit.md

## Overview

This is a full-stack web application built to monitor and track team stress levels. The application allows team members to input and update their stress levels while providing managers with a comprehensive dashboard to view team wellness metrics. It's designed as a modern React single-page application with an Express.js backend and PostgreSQL database.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon serverless)
- **API Design**: RESTful endpoints with JSON responses

### Development Setup
- **Development Server**: Vite dev server with Express backend
- **Hot Reload**: Full-stack hot reload capability
- **TypeScript**: Shared types between frontend and backend via shared schema

## Key Components

### Database Schema
- **Primary Entity**: `team_members` table
  - `id`: Serial primary key
  - `name`: Team member name (unique constraint enforced at application level)
  - `role`: Job role/title
  - `stress_level`: Integer from 1-10
  - `last_update`: Timestamp of last stress level update

### API Endpoints
- `GET /api/team-members`: Retrieve all team members
- `GET /api/team-members/:id`: Get specific team member
- `POST /api/team-members`: Create new team member
- `PATCH /api/team-members/:id/stress`: Update stress level

### Frontend Components
- **Dashboard**: Main application view showing team overview
- **StressInput**: Interactive stress level input component
- **TeamMemberCard**: Individual member display with status indicators
- **TeamSummary**: Aggregated team stress statistics

### Storage Abstraction
- **Interface-based Design**: `IStorage` interface allows for multiple storage implementations
- **Current Implementation**: In-memory storage with default team members
- **Future-ready**: Designed to easily swap to database storage

## Data Flow

1. **Application Bootstrap**: Default team members are initialized in memory storage
2. **Data Fetching**: React Query manages server state with automatic caching and background updates
3. **User Interactions**: Form submissions trigger API calls with optimistic updates
4. **Real-time Updates**: Query invalidation ensures UI stays synchronized with server state
5. **Error Handling**: Comprehensive error boundaries and user feedback via toast notifications

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Query for state management
- **Database**: Drizzle ORM with Neon serverless PostgreSQL driver
- **UI Components**: Complete shadcn/ui component library built on Radix UI primitives
- **Development**: Vite, TypeScript, Tailwind CSS, PostCSS

### Validation and Forms
- **Schema Validation**: Zod for runtime type checking and form validation
- **Form Management**: React Hook Form with Zod resolvers for seamless integration

### Development Tools
- **Code Quality**: ESBuild for production bundling
- **Replit Integration**: Custom Vite plugins for Replit development environment

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Static Assets**: Frontend build output served by Express in production

### Environment Configuration
- **Development**: `npm run dev` - runs Express server with Vite middleware
- **Production**: `npm run build` followed by `npm run start`
- **Database**: Environment variable `DATABASE_URL` for PostgreSQL connection

### Replit Configuration
- **Autoscale Deployment**: Configured for automatic scaling based on traffic
- **Port Configuration**: Backend runs on port 5000, exposed on port 80
- **Module Dependencies**: Node.js 20, PostgreSQL 16, and web modules

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- June 16, 2025. Initial setup