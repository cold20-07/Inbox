# Vercel Single Deployment Guide (Monorepo)

## Quick Setup for Single Deployment

### Step 1: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import your GitHub repository: `https://github.com/cold20-07/Inbox.git`
4. **Keep Root Directory as `.` (root)**

### Step 2: Configure Build Settings

**Framework Preset:** Other

**Root Directory:** `.` (leave empty or use dot)

**Build Command:**
```bash
cd frontend && npm install && npm run build
```

**Output Directory:**
```
frontend/dist
```

**Install Command:**
```bash
npm install --prefix frontend && npm install --prefix backend
```

### Step 3: Add Environment Variables

Click "Environment Variables" and add these:

#### Required Variables:
```
NODE_ENV=production
JWT_SECRET=<generate-using-command-below>
GEMINI_API_KEY=<your-gemini-api-key>
```

#### Optional Variables (for database):
```
SUPABASE_URL=<your-supabase-url>
SUPABASE_SERVICE_KEY=<your-supabase-service-key>
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Step 4: Deploy

Click "Deploy" and wait for the build to complete.

## How It Works

The `vercel.json` configuration:
- Builds the frontend as static files
- Runs the backend as serverless functions
- Routes `/api/*` requests to the backend
- Routes all other requests to the frontend
- Both frontend and backend run on the **same domain**

## Testing After Deployment

1. Visit your deployed URL: `https://your-project.vercel.app`
2. Try signing up with a test account
3. Test email analysis

## Troubleshooting

### Issue: "Cannot POST /api/auth/signup"

**Solution:** Check that:
- Environment variables are set correctly
- `JWT_SECRET` is added
- `GEMINI_API_KEY` is added
- Redeploy after adding variables

### Issue: CORS errors

**Solution:** The app now uses relative URLs, so CORS shouldn't be an issue. If you still see CORS errors:
- Check browser console for the exact error
- Verify the API routes are working: `https://your-project.vercel.app/api/health`

### Issue: "User not found" after signup

**Cause:** In-memory storage resets on each serverless function invocation.

**Solution:** This is expected behavior. Users are stored in memory and will be lost between requests in serverless environment. For production, you should:
1. Enable Supabase database
2. Or use a persistent database solution

### Issue: Backend not responding

**Check:**
1. Visit `https://your-project.vercel.app/api/health`
2. Check Vercel function logs in the dashboard
3. Verify environment variables are set

### Issue: Build fails

**Common causes:**
- Missing dependencies
- TypeScript errors
- Environment variables not set during build

**Solution:**
- Check build logs in Vercel dashboard
- Run `npm run build` locally to test
- Ensure all dependencies are in `package.json`

## Important Notes

### In-Memory Storage Limitation

⚠️ **The current setup uses in-memory user storage, which doesn't work well with Vercel's serverless functions.**

Each API request may hit a different serverless instance, so users won't persist between requests.

**To fix this, you have two options:**

#### Option 1: Enable Supabase (Recommended)
Add Supabase environment variables and the app will automatically use the database for user storage.

#### Option 2: Use Vercel KV or another database
Modify `backend/src/models/User.ts` to use a persistent storage solution.

### API Routes

All API routes are available at:
- `https://your-project.vercel.app/api/health`
- `https://your-project.vercel.app/api/auth/signup`
- `https://your-project.vercel.app/api/auth/signin`
- `https://your-project.vercel.app/api/auth/me`
- `https://your-project.vercel.app/api/emails/analyze`

### Frontend Routes

All frontend routes work with SPA routing:
- `https://your-project.vercel.app/` - Landing page
- `https://your-project.vercel.app/auth` - Sign in/up
- `https://your-project.vercel.app/dashboard` - Dashboard

## Recommended: Use Supabase for Production

For a production-ready deployment, enable Supabase:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL in `backend/supabase-schema.sql`
3. Add these environment variables in Vercel:
   ```
   SUPABASE_URL=your-supabase-url
   SUPABASE_SERVICE_KEY=your-supabase-service-key
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
4. Redeploy

This will enable persistent user storage and email history.

## Continuous Deployment

Vercel automatically redeploys when you push to GitHub:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Test API endpoints directly
4. Review the `BUG_REPORT.md` file
