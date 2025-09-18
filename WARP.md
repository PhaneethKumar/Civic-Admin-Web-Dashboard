# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (both frontend and backend)
npm run dev

# Type checking
npm run check

# Build for production
npm run build

# Start production server
npm run start

# Database operations
npm run db:push    # Push schema changes to database
```

### Environment Setup
- Requires `DATABASE_URL` environment variable for PostgreSQL connection
- Development runs on port 5000 (configurable via `PORT` environment variable)
- Uses Neon serverless PostgreSQL as the database provider

## Architecture Overview

### Project Structure
This is a **monorepo fullstack application** with clear separation of concerns:

```
C:\CivicAdminDashboard/
├── client/src/          # React frontend (Vite + TypeScript)
├── server/              # Express.js backend API
├── shared/              # Shared types and database schema
└── attached_assets/     # Static assets
```

### Technology Stack

**Frontend:**
- **React 18** with TypeScript
- **Wouter** for client-side routing (lightweight React Router alternative)
- **Radix UI** components with custom styling
- **Tailwind CSS** for styling with custom design system
- **TanStack Query** for server state management
- **Framer Motion** for animations
- **Recharts** for data visualization

**Backend:**
- **Express.js** with TypeScript
- **Drizzle ORM** for database operations
- **Neon** serverless PostgreSQL
- **Zod** for runtime validation
- **WebSocket support** via ws library

**Shared:**
- **Drizzle** schema definitions
- **Zod** validation schemas
- **TypeScript** types for API contracts

### Database Schema
The application manages a **Civic Issue Resolution System** with these core entities:
- **Issues** - Citizen-reported problems with status, priority, location
- **Users** - Municipal staff with role-based permissions
- **Departments** - Municipal departments (Public Works, Transportation, etc.)
- **Comments** - Internal/external communication on issues

Key relationships:
- Issues are assigned to Users and Departments
- Users belong to Departments
- Issues have Comments from Users

### API Structure
RESTful API with consistent patterns:
- `GET /api/issues` - List issues with filtering
- `POST /api/issues/:id/assign` - Assign issues to users/departments
- `GET /api/analytics/*` - Dashboard statistics and trends
- `POST /api/seed` - Initialize sample data

All endpoints include proper error handling and Zod validation.

### Frontend Architecture

**Component Organization:**
- `components/ui/` - Reusable Radix UI components with Tailwind styling
- `components/` - Application-specific components (Dashboard, IssueManagement, etc.)
- `hooks/` - Custom React hooks
- `lib/` - Utilities and configuration

**State Management:**
- TanStack Query for server state
- React Context for theme management
- Local component state for UI interactions

**Routing:**
Uses Wouter with these main routes:
- `/` - Dashboard Overview
- `/issues` - Issue Management
- `/departments` - Department Assignment
- `/reports` - Reports & Analytics
- `/users` - User Management
- `/settings` - Configuration
- `/help` - Documentation

### Design System

**Colors & Theming:**
- Implements municipal authority design with professional blue palette
- Custom CSS variables for dark/light mode
- Status-based colors (green=resolved, orange=pending, red=critical)
- Inter font family throughout

**Component Patterns:**
- Sidebar navigation with collapsible states
- Data tables with sorting/filtering/pagination
- Cards for dashboard metrics
- Forms with Zod validation
- Toast notifications for user feedback

### Development Patterns

**Path Aliases:**
- `@/*` points to `client/src/*`
- `@shared/*` points to `shared/*`
- `@assets/*` points to `attached_assets/*`

**Code Organization:**
- Shared schema definitions in `/shared/schema.ts`
- API routes organized by resource in `/server/routes.ts`
- Database operations abstracted in `/server/storage.ts`
- Frontend components follow atomic design principles

**Data Flow:**
1. Frontend makes API calls via TanStack Query
2. Express routes validate with Zod schemas
3. Storage layer uses Drizzle ORM for database operations
4. Shared TypeScript types ensure type safety across stack

### Key Features
- **Issue Management** - Full CRUD for civic issues with assignment workflow
- **Department Management** - Organize municipal departments and staff
- **Analytics Dashboard** - Real-time metrics and trends
- **Role-based Access** - Administrator, department-head, staff-member, viewer roles
- **Real-time Updates** - WebSocket integration for live data
- **Responsive Design** - Works on desktop and mobile devices

### Municipal Context
This system is designed specifically for **municipal governments** to manage citizen-reported issues like:
- Infrastructure problems (potholes, streetlights)
- Parks and recreation issues
- Sanitation concerns
- Transportation problems

The workflow emphasizes efficiency for municipal staff with features like bulk assignment, department-specific views, and resolution tracking.