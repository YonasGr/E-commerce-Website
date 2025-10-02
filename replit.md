# Yona - Modern Premium E-commerce Store

## Overview

Yona is a modern, fully responsive e-commerce platform for premium accessories including watches, sunglasses, and fashion items. Built with React, TypeScript, and Express, it features a clean, professional design with sage green accents, dark/light theme support, and a comprehensive shopping experience with real-time cart management.

The application follows a full-stack architecture with a React frontend powered by Vite for fast performance, and an Express backend with in-memory storage (designed to be replaced with PostgreSQL via Drizzle ORM).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **React 18.3** with TypeScript for type-safe component development
- **Vite 6.0** as the build tool for fast development and optimized production builds
- **Wouter** for lightweight client-side routing
- **TanStack Query (React Query)** for server state management and data fetching
- **Tailwind CSS 3.4** for utility-first styling with custom design system

**Component Strategy:**
- Modular component design using shadcn/ui components (Radix UI primitives)
- Centralized UI components in `/client/src/components/ui/` following the "New York" style
- Feature components for business logic (Header, Hero, ProductCard, CartDrawer, etc.)
- Theme support via React Context (ThemeProvider) for dark/light mode switching

**State Management:**
- React Query for server state (products, cart, categories)
- Local component state with React hooks for UI interactions
- Session-based cart persistence (no user authentication)

**Styling System:**
- CSS custom properties for theme variables (light/dark mode)
- Tailwind with custom color palette based on sage green accent colors
- Hover and active elevation utilities for interactive elements
- Responsive design with mobile-first approach

### Backend Architecture

**Server Framework:**
- **Express 4.21** with TypeScript for API routes
- RESTful API design pattern with `/api/*` endpoints
- Session-based cart management (no authentication required)

**Data Layer:**
- Currently using in-memory storage (`MemStorage` class) for development
- Designed to use **Drizzle ORM** with PostgreSQL for production
- Schema defined in `shared/schema.ts` using Drizzle's PostgreSQL table definitions
- Connection to **Neon Database** (serverless PostgreSQL) via `@neondatabase/serverless`

**API Endpoints:**
- `GET /api/products` - Fetch all products (supports category and search filters)
- `GET /api/products/:id` - Fetch single product
- `GET /api/categories` - Fetch all categories
- `GET /api/cart` - Fetch cart items for current session
- `POST /api/cart` - Add item to cart
- `PATCH /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart

**Session Management:**
- Session-based cart tracking using session IDs
- No user authentication system implemented
- Cart persists across page refreshes via session storage

### Database Schema

**Products Table:**
- `id` (UUID primary key)
- `name`, `description`, `price`, `category`, `image`
- `rating`, `isNew` flag, `stock` count
- `createdAt` timestamp

**Cart Items Table:**
- `id` (UUID primary key)
- `sessionId` for cart persistence
- `productId` (foreign key to products)
- `quantity`
- `createdAt` timestamp

**Categories Table:**
- `id` (UUID primary key)
- `name` (unique), `image`, `productCount`

**Data Validation:**
- Zod schemas generated from Drizzle tables via `drizzle-zod`
- Type-safe insert/update operations

### Design System

**Color Palette:**
- Primary: Sage green accent (#155 45% 45%) for CTAs and highlights
- Background: Pure white (light) / Rich dark charcoal (dark)
- Text: Deep charcoal with secondary muted variants
- Custom CSS properties for theme switching

**Typography:**
- Google Fonts: Inter (headings/body) and DM Sans (accents)
- Responsive scale from 12px (micro) to 72px (hero headlines)

**Layout:**
- Max-width container (7xl) for content centering
- Consistent spacing scale using Tailwind units
- Grid-based product and category displays

### Build & Deployment

**Development:**
- Vite dev server with HMR for frontend
- Express server with hot reload via `tsx`
- Development-only plugins: runtime error overlay, cartographer, dev banner

**Production Build:**
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server to `dist/index.js`
- Static file serving from built frontend

**Configuration:**
- TypeScript with strict mode and path aliases (`@/`, `@shared/`, `@assets/`)
- ESM modules throughout
- PostCSS with Tailwind and Autoprefixer

## External Dependencies

### Third-Party UI Libraries
- **Radix UI** - Comprehensive set of accessible component primitives (dialog, dropdown, popover, etc.)
- **shadcn/ui** - Pre-built components using Radix UI with Tailwind styling
- **Lucide React** - Icon library for UI elements
- **class-variance-authority** - Utility for managing component variants
- **cmdk** - Command palette component
- **embla-carousel-react** - Carousel/slider functionality

### Database & ORM
- **Drizzle ORM** - Type-safe ORM for PostgreSQL with migration support
- **@neondatabase/serverless** - Neon serverless Postgres driver
- **drizzle-zod** - Zod schema generation from Drizzle tables
- **drizzle-kit** - CLI for schema management and migrations

### State Management & Data Fetching
- **@tanstack/react-query** - Async state management for server data
- **wouter** - Lightweight routing library (alternative to React Router)

### Forms & Validation
- **react-hook-form** - Form state management
- **@hookform/resolvers** - Validation resolvers for react-hook-form
- **zod** - TypeScript-first schema validation

### Utilities
- **date-fns** - Date manipulation library
- **clsx** & **tailwind-merge** - Utility for conditional className composition
- **nanoid** - Unique ID generation

### Development Tools
- **Replit plugins** - Runtime error modal, cartographer, dev banner for Replit environment
- **esbuild** - Fast JavaScript bundler for server build
- **tsx** - TypeScript execution for development server

### Session Management
- **express-session** (implied but not in package.json) - Session middleware for Express
- **connect-pg-simple** - PostgreSQL session store for express-session