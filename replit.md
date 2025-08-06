# Rich Besh - Premium Betting & Lifestyle Telegram WebApp

## Overview

Rich Besh is a premium Telegram WebApp focused on sports betting predictions, educational courses, and luxury lifestyle content. The application serves as an exclusive platform for users to access high-quality betting tips, purchase prediction packages, enroll in courses, and engage with a community of like-minded individuals. The app integrates deeply with Telegram's WebApp API to provide a seamless native experience within the Telegram ecosystem.

## User Preferences

Preferred communication style: Simple, everyday language.

### Recent Updates (August 2025)
- Реализованы горизонтальные Stories в виде простых кружков без подписей с реальным контентом Rich Besh
- Интегрированы видео из richbesh.b-cdn.net/IG/ с торговыми результатами и роскошной жизнью
- Добавлены партнерские предложения после просмотра Stories (IQ Option, ForexClub)
- Создана страница эксклюзивного контента с категоризацией (стратегии, крипто, обучение, мышление)
- Убран раздел "Партнеры и спонсоры" - партнерские предложения теперь появляются контекстно
- Реализован горизонтальный скролл Stories с CSS скрытием скроллбара
- Обновлена логика эксклюзивного контента: используются только видео-файлы с превью из кадров роликов
- Исправлены VideoThumbnail компоненты для стабильной генерации превью из видео
- Сделана адаптивная сетка для страницы lifestyle (1-4 колонки в зависимости от ширины экрана)
- Заменены нерабочие видео URL на проверенные рабочие ссылки из richbesh.b-cdn.net/IG/
- Исправлено отображение вертикальных видео в exclusive-detail с ограничением ширины и центрированием
- Обновлено количество подписчиков с 25K на 3.3M для отражения реального масштаба аудитории

### Rich Besh Integration Requirements
- **Primary Goal**: Create app that showcases Rich Besh's wealth and luxury lifestyle
- **Content Sources**: 
  - Instagram content from richbesh.b-cdn.net/IG/ (with posts_info.csv metadata)
  - Telegram channel t.me/+Mwbx2HUKDvRkNGI8 for betting wins and proofs
- **Content Focus**: Rich Besh loves appearing in content showing off his wealth
- **Design Approach**: Premium luxury aesthetic, no green colors (replaced with orange, blue, purple)
- **Authentic Data**: Use real Instagram posts, engagement metrics, and betting proofs as success demonstrations

## System Architecture

### Frontend Architecture
The client-side is built using **React 18** with **TypeScript** and follows a modern component-based architecture. The UI leverages **shadcn/ui** components built on top of **Radix UI** primitives for accessible and customizable interface elements. **Tailwind CSS** handles styling with custom brand colors and responsive design. Client-side routing is managed by **wouter** for lightweight navigation, while **React Query (TanStack Query)** manages server state and API interactions with intelligent caching and background updates.

### Backend Architecture  
The server uses **Express.js** with TypeScript in a RESTful API pattern. The application follows a layered architecture with clear separation between routes, business logic, and data access. Real-time communication is handled through **WebSocket** connections for live chat functionality. The server includes middleware for request logging, error handling, and Telegram WebApp user verification to ensure secure access.

### Database & ORM
**Drizzle ORM** is used with **PostgreSQL** (specifically Neon serverless) for type-safe database operations. The schema is centralized in a shared module, allowing both client and server to use the same type definitions. Database migrations are managed through Drizzle Kit, and the connection pool is optimized for serverless environments.

### Authentication & Authorization
Authentication is handled through Telegram's WebApp integration, where user identity is verified using Telegram's init data and hash validation. No traditional JWT or session-based auth is needed since Telegram handles user verification. User roles are managed through database flags (isAdmin) for administrative access control.

### Real-time Features
WebSocket integration enables real-time chat functionality where users can communicate in community channels. The WebSocket server broadcasts messages to all connected clients and persists chat history to the database. Connection management includes automatic reconnection with exponential backoff for reliability.

### Content Integration & Authenticity
The application showcases authentic Rich Besh content with updated monetization focus:
- **Instagram Content**: Real posts from richbesh.b-cdn.net/IG/ with переработанной тональностью на продажи
- **Telegram Integration**: Live betting wins positioned as "результаты учеников"
- **Success Demonstrations**: Luxury lifestyle as "инвестиции в себя" и "путь к финансовой свободе" 
- **CDN Integration**: Direct content delivery with categorized Stories (success, lifestyle, motivation, luxury, business)
- **Monetization Focus**: All content leads to conversions - прогнозы, курсы, консультации, партнерские программы

### Payment Integration
The application integrates with Telegram's payment system for handling course purchases and prediction sales. Invoice creation and payment status handling are managed through Telegram's native payment APIs, providing a seamless in-app purchase experience.

### Component Design
The UI follows a "neubrutalism" design aesthetic with custom components for predictions, courses, achievements, and community features. Components are designed to be reusable and follow React best practices with proper prop typing and error boundaries.

## External Dependencies

### Telegram Platform
- **Telegram WebApp API**: Core platform integration for user authentication, payments, and native mobile experience
- **Telegram Bot API**: For invoice creation and payment processing

### Database & Hosting
- **Neon PostgreSQL**: Serverless PostgreSQL database for data persistence
- **WebSocket**: Real-time communication infrastructure

### UI & Styling
- **Radix UI**: Accessible component primitives for complex UI elements
- **shadcn/ui**: Pre-built component library with consistent design system
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

### Development Tools
- **Vite**: Build tool and development server with HMR
- **TypeScript**: Type safety across the entire application
- **React Hook Form**: Form management with validation
- **Zod**: Schema validation for type-safe data handling

### Communication
- **WebSocket (ws)**: Real-time bidirectional communication for chat features

### State Management
- **TanStack Query**: Server state management with caching, background updates, and optimistic updates
- **React Context**: Local state management for Telegram WebApp integration