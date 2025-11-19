# Vercel Deployment Fix - Deploy Separately

## The Issue

The monorepo deployment is causing path issues. The simplest and most reliable solution is to **deploy frontend and backend separately**.

## Solution: Deploy as Two Separate Projects

### Step 1: Deploy Backend

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. **Configure:**
   - **Framework Preset:** Other
   - **Root Directory:** `backend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

5. **Add Environment Variables:**
   ```
   NODE_ENV=production
   JWT_SECRET=<your-64-char-secret>
   GEMINI_API_KEY=<your-gemini-key>
   ```

6. Click "Deploy"
7. **Copy your backend URL** (e.g., `https://inbox-backend.vercel.app`)

### Step 2: Deploy Frontend

1. Click "Add New" → "Project" again
2. Import the **same** GitHub repository
3. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

4. **Add Environment Variable:**
   ```
   VITE_API_URL=https://inbox-backend.vercel.app
   ```
   (Use your backend URL from Step 1)

5. Click "Deploy"

### Step 3: Update Backend CORS

After both are deployed, update the backend environment variable:

1. Go to your **backend** project in Vercel
2. Settings → Environment Variables
3. Add:
   ```
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
4. Redeploy the backend

## Why This Works

- ✅ No path confusion
- ✅ Each project has its own build process
- ✅ Clear separation of concerns
- ✅ Easier to debug
- ✅ Independent scaling
- ✅ Simpler configuration

## Testing

1. **Test Backend:**
   ```bash
   curl https://your-backend.vercel.app/api/health
   ```

2. **Test Frontend:**
   - Visit `https://your-frontend.vercel.app`
   - Try signing up
   - Test email analysis

## Environment Variables Summary

### Backend
```
NODE_ENV=production
JWT_SECRET=<generate-with-crypto>
GEMINI_API_KEY=<your-api-key>
FRONTEND_URL=<your-frontend-url>
```

Optional:
```
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_KEY=<your-service-key>
```

### Frontend
```
VITE_API_URL=<your-backend-url>
```

Optional:
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

## Generate JWT_SECRET

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Troubleshooting

### CORS Errors
- Make sure `FRONTEND_URL` is set in backend
- Redeploy backend after adding the variable

### "Cannot POST /api/auth/signup"
- Check that `VITE_API_URL` is set in frontend
- Verify backend URL is correct
- Check backend logs in Vercel dashboard

### Users Not Persisting
- This is expected with in-memory storage
- Enable Supabase for persistence
- Or accept that users reset (for demo purposes)

## Quick Deploy Commands

If you prefer CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy backend
cd backend
vercel --prod

# Deploy frontend
cd ../frontend
vercel --prod
```

## Success Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Sign up works
- [ ] Email analysis works
- [ ] Mobile responsive

---

**This is the recommended approach for production deployment.**
