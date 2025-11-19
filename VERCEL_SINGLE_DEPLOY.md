# Vercel Single Deployment Guide (Fixed)

## ✅ Deploy Everything at Once

This configuration deploys both frontend and backend API in a single Vercel project.

## Vercel Settings

### Framework Preset
```
Other
```

### Root Directory
```
.
```
(Leave empty or use a dot)

### Build Command
```
npm run vercel-build
```

### Output Directory
```
frontend/dist
```

### Install Command
```
npm install
```

## Environment Variables

Add these in Vercel dashboard:

### Required
```
NODE_ENV=production
JWT_SECRET=<generate-64-char-random-string>
GEMINI_API_KEY=<your-gemini-api-key>
```

### Optional (for database)
```
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_KEY=<your-service-key>
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## Generate JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## How It Works

### Frontend
- Built from `frontend/` directory
- Served as static files from `frontend/dist`
- Accessible at root: `https://your-app.vercel.app/`

### Backend API
- Serverless functions in `api/` directory
- Automatically deployed as Vercel Functions
- Accessible at: `https://your-app.vercel.app/api/*`

### API Endpoints
- `GET /api/health` - Health check
- `POST /api/auth/signup` - Sign up
- `POST /api/auth/signin` - Sign in
- `GET /api/auth/me` - Get current user
- `POST /api/emails/analyze` - Analyze email

## Important Notes

### ⚠️ In-Memory Storage Limitation

The API functions use in-memory storage which **resets between function calls**. This means:
- Users won't persist between requests
- Each API call may hit a different serverless instance
- Sign up will work, but sign in may fail

### ✅ Solution: Enable Supabase

For production, you MUST use Supabase or another database:

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Run SQL from `backend/supabase-schema.sql`
3. Add Supabase environment variables
4. The app will automatically use the database

## Testing After Deployment

### 1. Test Health Endpoint
```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{"status":"ok","message":"Inbox Unclutter API is running"}
```

### 2. Test Sign Up
Visit `https://your-app.vercel.app/auth` and create an account.

### 3. Test Email Analysis
Paste an email and verify AI analysis works.

## Troubleshooting

### Build Fails
**Error:** "Cannot find module"
- Check that all dependencies are in root `package.json`
- Run `npm install` locally to verify

### API Returns 404
**Error:** "404 Not Found"
- Verify API files are in `api/` directory
- Check Vercel function logs
- Ensure environment variables are set

### CORS Errors
- API functions include CORS headers
- Should work automatically
- Check browser console for details

### Users Don't Persist
- **Expected behavior** with in-memory storage
- Enable Supabase for persistence
- Or accept demo-only functionality

### Gemini API Errors
- Verify `GEMINI_API_KEY` is set
- Check API quota at [ai.google.dev](https://ai.google.dev)
- Review function logs in Vercel dashboard

## File Structure

```
your-repo/
├── api/                    # Serverless API functions
│   ├── health.ts
│   ├── auth/
│   │   ├── signup.ts
│   │   ├── signin.ts
│   │   └── me.ts
│   └── emails/
│       └── analyze.ts
├── frontend/               # React frontend
│   ├── dist/              # Build output
│   └── src/
├── backend/               # Original backend (not used in deployment)
├── package.json           # Root dependencies
└── vercel.json           # Vercel configuration
```

## Deployment Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your repository

3. **Configure Settings**
   - Framework: Other
   - Root Directory: `.`
   - Build Command: `npm run vercel-build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

4. **Add Environment Variables**
   - Add all required variables
   - Click "Deploy"

5. **Test**
   - Visit your deployed URL
   - Test all features
   - Check function logs if issues

## Success Checklist

- [ ] Repository pushed to GitHub
- [ ] Vercel project created
- [ ] Build settings configured
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Health endpoint responds
- [ ] Frontend loads
- [ ] Sign up works (with Supabase)
- [ ] Email analysis works

## Next Steps

1. **Enable Supabase** for persistent storage
2. **Add custom domain** in Vercel settings
3. **Monitor usage** in Vercel dashboard
4. **Set up alerts** for errors

---

**Your app is now deployed! 🚀**

Visit your URL and start using Inbox Unclutter!
