# Inbox Unclutter

AI-powered email summarizer using email/password authentication and Google Gemini 2.5 Flash.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express + TypeScript + Gemini AI
- **Database**: Supabase (PostgreSQL) - Optional
- **Auth**: JWT-based Email/Password
- **AI**: Google Gemini 2.5 Flash

## 🚀 Deployment

This project deploys **frontend and backend together** on Vercel as a unified application.

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cold20-07/Inbox)

**What gets deployed:**
- ✅ React frontend (static files)
- ✅ API serverless functions (`/api/*`)
- ✅ Automatic HTTPS and CDN
- ✅ Zero configuration needed

**Required Environment Variable:**
- `GEMINI_API_KEY` - Get it free from [ai.google.dev](https://ai.google.dev)

### 📚 Deployment Resources

**[📖 Complete Documentation Index](./DOCS_INDEX.md)** - Find the right guide for you

Quick Links:
- 🚀 [**Quick Start** (5 minutes)](./QUICKSTART_DEPLOY.md) - Fastest way to deploy
- ✅ [**Deployment Checklist**](./DEPLOY_CHECKLIST.md) - Step-by-step guide
- 📖 [**Full Deployment Guide**](./DEPLOYMENT.md) - Detailed instructions
- 🏗️ [**Architecture Overview**](./ARCHITECTURE.md) - How it all works
- 🔄 [**Deployment Flow**](./DEPLOYMENT_FLOW.md) - Visual deployment process
- 🔧 [**Troubleshooting**](./TROUBLESHOOTING.md) - Fix common issues

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/cold20-07/Inbox.git
cd Inbox
```

### 2. Get API Keys

- **Gemini AI** (Required): Get free API key from [ai.google.dev](https://ai.google.dev)
- **Supabase** (Optional): Get URL and keys from [supabase.com](https://supabase.com) for database features

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

**Backend** (`backend/.env`):
```bash
# Server
PORT=5000
NODE_ENV=development

# JWT Secret (REQUIRED - generate a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Gemini AI (REQUIRED)
GEMINI_API_KEY=your-gemini-api-key

# Supabase (Optional - for database features)
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-service-key
```

**Frontend** (`frontend/.env`):
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

> **Note**: You can copy from `.env.example` files in both directories.

### 5. Set up Database (Optional)

If you want to save email summaries to a database:

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL in `backend/supabase-schema.sql` in your Supabase SQL Editor
3. Add your Supabase credentials to the `.env` files

### 6. Run Development Servers

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

Or run them separately:
```bash
# Backend only
cd backend
npm run dev

# Frontend only (in another terminal)
cd frontend
npm run dev
```

## Features

- 🔐 **JWT-based Authentication** - Secure email/password authentication with JWT tokens
- 🤖 **AI Summaries** - Powered by Google Gemini 2.5 Flash
- 📊 **Smart Categorization** - Automatic email classification (promotion, receipt, update, meeting, etc.)
- 🎯 **Key Points Extraction** - Important details at a glance
- ✅ **Action Items** - Automatically extracted action items
- 📈 **Priority Scoring** - AI-powered priority score (0-100)
- 💾 **Optional Database** - Save summaries to Supabase (works without database too)
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- ⚡ **Fast & Efficient** - Uses Gemini 2.5 Flash for quick responses

## How It Works

1. Sign up with email and password
2. Paste any email content
3. Get instant AI-powered summary with:
   - Category (promotion, receipt, update, etc.)
   - Priority score
   - Key points
   - Action items

## Project Structure

```
inbox-unclutter/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── hooks/              # Custom hooks (auth, toast)
│   │   └── contexts/           # React contexts
│   └── .env.example
├── backend/                     # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/             # API routes (auth, analyze)
│   │   ├── services/           # Gemini AI service
│   │   ├── middleware/         # Auth middleware
│   │   └── models/             # User model (in-memory)
│   ├── supabase-schema.sql     # Database schema
│   └── .env.example
├── shared/                      # Shared TypeScript types
└── package.json                 # Root package with scripts
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/signin` - Sign in
- `GET /api/auth/me` - Get current user (requires JWT token)

### Email Analysis
- `POST /api/emails/analyze` - Analyze email content
  - Body: `{ subject, body, sender? }`
  - Returns: AI-generated summary with category, priority, key points, and action items

### Health Check
- `GET /api/health` - Check API status

## Architecture Highlights

### Backend
- **In-memory user storage** - Users stored in memory (resets on server restart)
- **JWT authentication** - Secure token-based auth with 7-day expiration
- **Graceful fallbacks** - API works even if Supabase is not configured
- **Error handling** - Comprehensive error handling with fallback responses
- **Gemini 2.5 Flash** - Fast AI model for email analysis

### Frontend
- **Custom auth hook** - `useCustomAuth` for authentication state
- **Toast notifications** - User-friendly feedback system
- **Protected routes** - Route guards for authenticated pages
- **Responsive design** - Mobile-first approach with Tailwind CSS

## Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify `GEMINI_API_KEY` is set in `backend/.env`
- Run `npm install` in the backend directory

### Gemini API errors
- Verify your API key is valid at [ai.google.dev](https://ai.google.dev)
- Check your API quota hasn't been exceeded
- The app will return fallback responses if Gemini fails

### Database errors
- Database is optional - the app works without Supabase
- If using Supabase, verify credentials in `.env` files
- Run the SQL schema in `backend/supabase-schema.sql`

### JWT warnings
- Generate a secure JWT_SECRET using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- Add it to `backend/.env`

## No Gmail Integration?

This version uses **manual email pasting** instead of Gmail API integration. This means:
- ✅ No complex OAuth setup
- ✅ Works with any email provider
- ✅ Complete privacy (emails analyzed on-demand)
- ✅ No inbox access required
- ❌ No automatic syncing
- ❌ No daily digests

Perfect for quick email analysis without granting inbox access!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.
