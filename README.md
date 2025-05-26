# MAIS Registration System

A full-stack registration system built with Next.js 14 and Express.

## Project Structure

`
MAIS_burtgel/
├── frontend/          # Next.js 14 frontend
├── backend/           # Express backend
├── README.md
└── .gitignore
`

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- pnpm
- MongoDB

### Frontend Setup

1. Navigate to frontend directory:
   `ash
   cd frontend
   `

2. Install dependencies:
   `ash
   pnpm install
   `

3. Create .env.local:
   `ash
   cp .env.example .env.local
   `

4. Start development server:
   `ash
   pnpm dev
   `

### Backend Setup

1. Navigate to backend directory:
   `ash
   cd backend
   `

2. Install dependencies:
   `ash
   pnpm install
   `

3. Create .env:
   `ash
   cp .env.example .env
   `

4. Start development server:
   `ash
   pnpm dev
   `

## Features

### Registration Form
- Multi-step form with animations
- File upload for payment confirmation
- Form validation
- Progress saving

### Admin Panel
- Secure authentication
- View all registrations
- Approve/reject applications
- Email notifications

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TanStack Query
- Zustand
- TailwindCSS
- Framer Motion
- TypeScript

### Backend
- Node.js/Express
- MongoDB/Mongoose
- TypeScript
- JWT Authentication
- Nodemailer

## Development

### Frontend Scripts
- pnpm dev: Start development server
- pnpm build: Build for production
- pnpm start: Start production server
- pnpm lint: Run linter

### Backend Scripts
- pnpm dev: Start development server
- pnpm build: Build for production
- pnpm start: Start production server
- pnpm lint: Run linter

## Environment Variables

### Frontend (.env.local)
- NEXT_PUBLIC_API_URL: Backend API URL
- NEXT_PUBLIC_SITE_URL: Frontend URL

### Backend (.env)
- PORT: Server port
- MONGODB_URI: MongoDB connection string
- JWT_SECRET: JWT secret key
- SMTP_*: Email configuration
- FRONTEND_URL: Frontend URL for CORS
