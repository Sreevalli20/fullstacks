# College Discovery Platform

A modern full-stack college discovery and comparison platform built with Next.js, Node.js, PostgreSQL, and Prisma.

## 🎯 Project Overview

This platform helps students discover, compare, and save colleges based on various criteria including fees, ratings, placements, and location. It features a clean, modern UI with robust backend APIs and secure authentication.

## ✨ Features

- **College Discovery**: Search, filter, sort, and paginate through 50+ colleges
- **College Details**: View comprehensive information about each college
- **College Comparison**: Compare up to 3 colleges side-by-side
- **Authentication**: Secure signup/login with JWT tokens
- **Saved Colleges**: Save and manage favorite colleges (authenticated users only)

## 🏗️ Architecture

```
Browser
↓
Vercel / Next.js frontend
↓ HTTPS REST API
Render / Node.js backend
↓
Prisma
↓
Neon PostgreSQL
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime
- **TypeScript** - Type safety
- **Express.js** - Web framework
- **Prisma** - ORM
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication
- **Zod** - Validation

### Database
- **PostgreSQL** - Relational database (hosted on Neon)

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend hosting
- **Neon** - PostgreSQL hosting

## 📁 Folder Structure

```
fullstacks/
├── frontend/                 # Next.js frontend
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/         # Base UI components
│   │   │   ├── college/    # College-specific components
│   │   │   ├── search/     # Search/filter components
│   │   │   ├── comparison/ # Comparison components
│   │   │   └── auth/       # Authentication components
│   │   ├── lib/            # Utilities and API client
│   │   └── types/          # TypeScript types
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utilities
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── seed.ts        # Seed script
│   └── package.json
├── .gitignore
└── README.md
```

## 🗄️ Database Schema

### Tables

- **User**: User accounts for authentication
- **College**: College information
- **Course**: Courses offered by colleges
- **Placement**: Placement statistics
- **Review**: User reviews for colleges
- **SavedCollege**: User's saved colleges

### Relationships

```
User
├── SavedCollege (one-to-many)
└── College (through SavedCollege)

College
├── Course (one-to-many)
├── Placement (one-to-one)
└── Review (one-to-many)
```

## 🔌 API Endpoints

### Health
- `GET /api/health` - Health check

### Colleges
- `GET /api/colleges` - List colleges with filters, search, pagination
- `GET /api/colleges/:id` - Get college details

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Saved Colleges
- `GET /api/saved` - Get user's saved colleges
- `POST /api/saved/:collegeId` - Save a college
- `DELETE /api/saved/:collegeId` - Unsave a college

### Comparison
- `GET /api/compare` - Get comparison list
- `POST /api/compare` - Add college to comparison
- `DELETE /api/compare/:collegeId` - Remove from comparison

## 🔐 Environment Variables

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-jwt-secret-key
CLIENT_URL=http://localhost:3000
PORT=3001
NODE_ENV=development
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon account)

### Backend Setup

1. Navigate to backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Run migrations:
```bash
npx prisma migrate dev --name init
```

6. Seed database:
```bash
npx prisma db seed
```

7. Start backend:
```bash
npm run dev
```

Backend runs on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your API URL
```

4. Start frontend:
```bash
npm run dev
```

Frontend runs on `http://localhost:3000`

## 🌐 Deployment

### Neon PostgreSQL Setup

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect to your GitHub repository
4. Set build command: `npm install && npm run build`
5. Set start command: `npm start`
6. Add environment variables from `.env.example`
7. Deploy

### Frontend Deployment (Vercel)

1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL` (your Render backend URL)
5. Deploy

## 🔒 Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- CORS configured to allow only specified origins
- Input validation using Zod
- Environment variables for secrets
- No sensitive data in API responses
- Rate limiting on auth endpoints

## ⚠️ Known Tradeoffs

- Synthetic dataset for demonstration purposes
- No email verification for signup
- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- Basic rate limiting (consider Redis-based for production)
- No image upload functionality (using placeholder images)

## 📊 Synthetic Dataset Disclaimer

**This application uses synthetic/demo college data for demonstration purposes only.** The colleges, courses, placement statistics, and reviews are fictional and should not be used for actual college research or decision-making.

## 🧪 Verification

Before deployment, run:

```bash
# Backend
cd backend
npm install
npm run lint
npm run build
npx prisma generate
npx prisma migrate dev
npx prisma db seed

# Frontend
cd frontend
npm install
npm run lint
npm run build
```

## 📝 License

This project is for educational purposes.
