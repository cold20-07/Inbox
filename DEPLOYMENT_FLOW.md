# 🔄 Deployment Flow

Visual guide showing how your code becomes a live application.

## Development to Production Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT                               │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ git push
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                      GITHUB                                  │
│  • Code repository                                           │
│  • Version control                                           │
│  • Triggers deployment                                       │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ Webhook
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                   VERCEL BUILD                               │
│                                                              │
│  Step 1: Install Dependencies                                │
│  ├─ npm install (root)                                       │
│  └─ npm install (frontend)                                   │
│                                                              │
│  Step 2: Build Frontend                                      │
│  ├─ cd frontend                                              │
│  ├─ npm run build                                            │
│  └─ Output: frontend/dist/                                   │
│                                                              │
│  Step 3: Prepare Serverless Functions                        │
│  ├─ Compile api/*.ts files                                   │
│  └─ Bundle with dependencies                                 │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                          │
                          │ Deploy
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  VERCEL PRODUCTION                           │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │         Edge Network (CDN)                          │    │
│  │  • Caches static files globally                     │    │
│  │  • Routes requests                                  │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ├─── Static Files                   │
│                          │    (HTML, CSS, JS, Images)        │
│                          │                                   │
│                          └─── API Requests                   │
│                               (/api/*)                       │
│                               │                              │
│                               ▼                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │      Serverless Functions                           │    │
│  │  • Auto-scaling                                     │    │
│  │  • Isolated execution                               │    │
│  │  • Environment variables                            │    │
│  └────────────────────────────────────────────────────┘    │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                 EXTERNAL SERVICES                            │
│  • Google Gemini AI                                          │
│  • Supabase (optional)                                       │
└─────────────────────────────────────────────────────────────┘
```

## Request Lifecycle

### Static File Request (e.g., `/dashboard`)

```
User Browser
    │
    │ HTTPS GET /dashboard
    ▼
Vercel Edge (Nearest Location)
    │
    │ Cache Hit?
    ├─ Yes → Return cached file (< 50ms)
    │
    └─ No → Fetch from origin
         └─ Cache for next request
         └─ Return to user
```

### API Request (e.g., `/api/emails/analyze`)

```
User Browser
    │
    │ HTTPS POST /api/emails/analyze
    │ Body: { subject, body }
    ▼
Vercel Edge Network
    │
    │ Route to function
    ▼
Serverless Function (Cold/Warm)
    │
    ├─ Cold Start (~1s)
    │  ├─ Initialize Node.js
    │  ├─ Load dependencies
    │  └─ Execute function
    │
    └─ Warm Start (~100ms)
       └─ Execute function immediately
    │
    │ Call Gemini AI
    ▼
Google Gemini API
    │
    │ Analyze email (~2-3s)
    ▼
Return to Function
    │
    │ Format response
    ▼
Return to User
```

## Deployment Timeline

```
┌─────────────────────────────────────────────────────────────┐
│ T+0s    │ Push to GitHub                                     │
├─────────────────────────────────────────────────────────────┤
│ T+5s    │ Vercel detects push                                │
│         │ Starts build process                               │
├─────────────────────────────────────────────────────────────┤
│ T+10s   │ Installing dependencies                            │
│         │ npm install...                                     │
├─────────────────────────────────────────────────────────────┤
│ T+30s   │ Building frontend                                  │
│         │ Vite bundling...                                   │
├─────────────────────────────────────────────────────────────┤
│ T+60s   │ Compiling serverless functions                     │
│         │ TypeScript → JavaScript                            │
├─────────────────────────────────────────────────────────────┤
│ T+90s   │ Deploying to edge network                          │
│         │ Uploading assets...                                │
├─────────────────────────────────────────────────────────────┤
│ T+120s  │ ✅ Deployment complete!                            │
│         │ Live at: https://your-app.vercel.app              │
└─────────────────────────────────────────────────────────────┘
```

## Environment Variables Flow

```
Vercel Dashboard
    │
    │ Set: GEMINI_API_KEY=abc123
    ▼
Encrypted Storage
    │
    │ Redeploy triggered
    ▼
Build Process
    │
    │ Variables available during build
    ▼
Serverless Functions
    │
    │ process.env.GEMINI_API_KEY
    │ Available at runtime
    ▼
Your Code
```

## Continuous Deployment Flow

```
Developer
    │
    │ git commit -m "Add feature"
    │ git push origin main
    ▼
GitHub (main branch)
    │
    │ Webhook to Vercel
    ▼
Vercel
    │
    ├─ Build & Deploy
    │  └─ Production URL updated
    │
    └─ Notify developer
       └─ Email/Slack/Dashboard
```

## Pull Request Preview Flow

```
Developer
    │
    │ git push origin feature-branch
    │ Create PR on GitHub
    ▼
GitHub Pull Request
    │
    │ Webhook to Vercel
    ▼
Vercel
    │
    ├─ Build preview deployment
    │  └─ Unique URL: feature-branch-abc123.vercel.app
    │
    └─ Comment on PR with preview link
       └─ Test before merging!
```

## Rollback Flow

```
Production Issue Detected
    │
    │ Go to Vercel Dashboard
    ▼
Deployments List
    │
    │ Select previous working deployment
    │ Click "Promote to Production"
    ▼
Instant Rollback
    │
    │ < 30 seconds
    ▼
Production Restored
```

## Scaling Flow

```
Low Traffic (1 req/min)
    │
    │ 1 function instance
    │ Minimal cost
    ▼
Medium Traffic (100 req/min)
    │
    │ Auto-scale to 10 instances
    │ No configuration needed
    ▼
High Traffic (1000 req/min)
    │
    │ Auto-scale to 100+ instances
    │ Distributed globally
    ▼
Traffic Drops
    │
    │ Auto-scale down
    │ Pay only for usage
```

## Monitoring Flow

```
Production App
    │
    ├─ Function Logs
    │  └─ Vercel Dashboard → Logs
    │
    ├─ Performance Metrics
    │  └─ Vercel Dashboard → Analytics
    │
    ├─ Error Tracking
    │  └─ Vercel Dashboard → Errors
    │
    └─ Usage Stats
       └─ Vercel Dashboard → Usage
```

## Development vs Production

```
┌──────────────────────┬──────────────────────────────────┐
│   DEVELOPMENT        │         PRODUCTION               │
├──────────────────────┼──────────────────────────────────┤
│ localhost:5173       │ your-app.vercel.app              │
│ localhost:5000       │ your-app.vercel.app/api          │
│ Vite dev server      │ Static files on CDN              │
│ Express server       │ Serverless functions             │
│ Hot reload           │ Optimized bundles                │
│ Source maps          │ Minified code                    │
│ .env files           │ Vercel env variables             │
│ No caching           │ Aggressive caching               │
│ Single machine       │ Global distribution              │
└──────────────────────┴──────────────────────────────────┘
```

## Cost Flow (Hobby Plan)

```
Free Tier Limits:
├─ 100 GB bandwidth/month
├─ 100 hours function execution/month
├─ Unlimited deployments
└─ Unlimited requests

Typical Usage:
├─ 1000 users/month
├─ 10,000 API calls
├─ ~5 GB bandwidth
├─ ~2 hours execution
└─ Cost: $0 (within free tier)

If Exceeded:
└─ Upgrade to Pro ($20/month)
   ├─ 1 TB bandwidth
   ├─ 1000 hours execution
   └─ Priority support
```

---

**Ready to deploy?** → [Quick Start Guide](./QUICKSTART_DEPLOY.md)
