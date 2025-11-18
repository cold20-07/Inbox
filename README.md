# Inbox Unclutter

AI-powered email summarizer using email/password authentication and Google Gemini.

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Express + TypeScript + Gemini AI
- **Database**: Supabase (PostgreSQL)
- **Auth**: Email/Password
- **AI**: Google Gemini Pro

## Quick Start

### 1. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase-schema.sql` in your Supabase SQL Editor
3. Enable Email auth in Authentication > Providers (it's enabled by default)

### 2. Get API Keys

- **Supabase**: Get URL and keys from Project Settings > API
- **Gemini**: Get free API key from [ai.google.dev](https://ai.google.dev)

### 3. Install Dependencies

```bash
npm run install:all
```

### 4. Configure Environment

**Backend** (`backend/.env`):
```bash
cd backend
cp .env.example .env
# Add your Supabase and Gemini credentials
```

**Frontend** (`frontend/.env`):
```bash
cd frontend
cp .env.example .env
# Add your Supabase URL and anon key
```

### 5. Run Development Servers

```bash
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Features

- 🔐 **Email/Password Auth** - Simple and secure authentication
- 🤖 **AI Summaries** - Powered by Google Gemini Pro
- 📊 **Smart Categorization** - Automatic email classification
- 🎯 **Key Points Extraction** - Important details at a glance
- ✅ **Action Items** - Extracted automatically
- 💾 **History** - All summaries saved to your account
- 🎨 **Clean UI** - Modern, minimal design

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
├── frontend/          # React app
├── backend/           # Express API
├── shared/            # Shared types
└── supabase-schema.sql # Database schema
```

## No Gmail Integration?

This version uses **manual email pasting** instead of Gmail API integration. This means:
- ✅ No complex OAuth setup
- ✅ Works with any email provider
- ✅ Complete privacy (emails not stored permanently)
- ❌ No automatic syncing
- ❌ No daily digests

Perfect for quick email analysis without granting inbox access!
