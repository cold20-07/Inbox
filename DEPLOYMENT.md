# Deployment Guide - Vercel

This project is configured to deploy both frontend and backend together on Vercel.

## Architecture

- **Frontend**: Static React app served from `frontend/dist`
- **Backend**: Serverless functions in `/api` directory
- **API Routes**: All `/api/*` requests are handled by serverless functions

## Quick Deploy

### 1. Install Vercel CLI (optional)
```bash
npm install -g vercel
```

### 2. Deploy to Vercel

#### Option A: Using Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel will auto-detect the configuration from `vercel.json`
4. Add environment variables (see below)
5. Click "Deploy"

#### Option B: Using Vercel CLI
```bash
vercel
```

Follow the prompts to link your project.

## Environment Variables

Add these in your Vercel project settings:

### Required
- `GEMINI_API_KEY` - Your Google Gemini API key from [ai.google.dev](https://ai.google.dev)

### Optional
- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_KEY` - Your Supabase service role key

## How It Works

1. **Build Process**: 
   - Frontend is built using Vite (`npm run build` in frontend directory)
   - Output goes to `frontend/dist`
   - Serverless functions in `/api` are automatically deployed

2. **Routing**:
   - `/` → Frontend (React app)
   - `/api/*` → Serverless functions

3. **API Endpoints**:
   - `GET /api/health` - Health check
   - `POST /api/emails/analyze` - Email analysis with Gemini AI

## Local Development

```bash
# Install dependencies
npm install

# Run frontend and backend separately
npm run dev

# Or run them individually:
npm run dev:frontend  # Frontend on http://localhost:5173
npm run dev:backend   # Backend on http://localhost:5000
```

## Testing Production Build Locally

```bash
# Build frontend
cd frontend
npm run build

# Test with Vercel CLI
vercel dev
```

## Troubleshooting

### Quick Fixes

**API calls fail in production**
- Check that environment variables are set in Vercel dashboard
- Verify GEMINI_API_KEY is valid
- Check Vercel function logs in dashboard

**Build fails**
- Ensure all dependencies are in package.json
- Check that frontend builds successfully locally
- Review build logs in Vercel dashboard

**CORS errors**
- API functions already include CORS headers
- If issues persist, check browser console for specific errors

### Need More Help?

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for detailed solutions to common issues.

## Project Structure

```
inbox-unclutter/
├── api/                    # Vercel serverless functions
│   ├── health.ts          # Health check endpoint
│   └── emails/
│       └── analyze.ts     # Email analysis endpoint
├── frontend/              # React frontend
│   ├── src/
│   └── dist/             # Build output (deployed)
├── backend/              # Express backend (not deployed, replaced by /api)
├── vercel.json           # Vercel configuration
└── .vercelignore         # Files to exclude from deployment
```

## Notes

- The Express backend in `/backend` is NOT deployed to Vercel
- Instead, serverless functions in `/api` handle all backend logic
- This provides better scalability and zero-config deployment
- Functions auto-scale and have built-in CDN
