# Architecture Overview

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    VERCEL DEPLOYMENT                         │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Frontend (Static)                      │    │
│  │  • React + Vite                                     │    │
│  │  • Served from /frontend/dist                       │    │
│  │  • Routes: /, /dashboard, /settings                 │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          │ API Calls                         │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Serverless Functions (/api)                 │    │
│  │  • Node.js 20                                       │    │
│  │  • Auto-scaling                                     │    │
│  │  • Routes:                                          │    │
│  │    - GET  /api/health                               │    │
│  │    - POST /api/emails/analyze                       │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          │ API Call                          │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────┐    │
│  │           External Services                         │    │
│  │  • Google Gemini AI (required)                      │    │
│  │  • Supabase (optional)                              │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Local Development Architecture

```
┌──────────────────────┐         ┌──────────────────────┐
│   Frontend           │         │   Backend            │
│   localhost:5173     │────────▶│   localhost:5000     │
│   (Vite Dev Server)  │  HTTP   │   (Express Server)   │
└──────────────────────┘         └──────────────────────┘
                                           │
                                           │ API Call
                                           ▼
                                  ┌──────────────────────┐
                                  │  External Services   │
                                  │  • Gemini AI         │
                                  │  • Supabase          │
                                  └──────────────────────┘
```

## Request Flow (Production)

```
User Browser
    │
    │ HTTPS
    ▼
Vercel Edge Network (CDN)
    │
    ├─── Static Files (/, /dashboard, etc.)
    │    └─▶ Serve from frontend/dist
    │
    └─── API Requests (/api/*)
         └─▶ Route to Serverless Function
              │
              ├─▶ /api/health
              │   └─▶ Return status
              │
              └─▶ /api/emails/analyze
                  └─▶ Call Gemini AI
                      └─▶ Return analysis
```

## File Structure

```
inbox-unclutter/
│
├── api/                          # Serverless functions (DEPLOYED)
│   ├── health.ts                 # GET /api/health
│   └── emails/
│       └── analyze.ts            # POST /api/emails/analyze
│
├── frontend/                     # React app (DEPLOYED)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── dist/                     # Build output (deployed)
│   └── package.json
│
├── backend/                      # Express server (NOT DEPLOYED)
│   └── src/                      # Used only for local dev
│
├── shared/                       # Shared types
│   └── types/
│
├── vercel.json                   # Deployment config
├── .vercelignore                 # Exclude from deployment
└── package.json                  # Root package
```

## Why This Architecture?

### Advantages
✅ **Single deployment** - Frontend and backend together  
✅ **No CORS issues** - Same domain for frontend and API  
✅ **Auto-scaling** - Functions scale automatically  
✅ **Zero config** - Vercel handles everything  
✅ **Fast** - Global CDN for static files  
✅ **Cost-effective** - Free tier is generous  

### Trade-offs
⚠️ **Cold starts** - First request may be slower (~1s)  
⚠️ **Stateless** - No persistent connections  
⚠️ **Timeout limits** - 10s on hobby plan, 60s on pro  

## Environment Variables

### Production (Vercel)
Set in Vercel dashboard:
- `GEMINI_API_KEY` (required)
- `SUPABASE_URL` (optional)
- `SUPABASE_SERVICE_KEY` (optional)

### Development (Local)
Set in `backend/.env`:
- `GEMINI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_KEY`
- `PORT=5000`
- `NODE_ENV=development`

## Scaling

### Automatic
- Vercel automatically scales functions based on traffic
- No configuration needed
- Handles traffic spikes gracefully

### Limits (Hobby Plan)
- 100 GB bandwidth/month
- 100 hours function execution/month
- 10s function timeout
- Unlimited requests

### Upgrade Path
If you need more:
- Pro plan: $20/month
- 1 TB bandwidth
- 1000 hours execution
- 60s timeout
- Priority support

## Security

### Built-in
✅ HTTPS by default  
✅ DDoS protection  
✅ Rate limiting (via Vercel)  
✅ Environment variable encryption  

### Application Level
✅ CORS headers configured  
✅ Helmet security headers (in Express, not in serverless)  
✅ Input validation with Zod  
✅ API key stored securely  

## Monitoring

### Vercel Dashboard
- Real-time function logs
- Deployment history
- Performance metrics
- Error tracking

### External
- Gemini AI usage in Google Cloud Console
- Supabase dashboard (if using)

---

**Questions?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for more details.
