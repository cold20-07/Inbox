# Troubleshooting Guide

Common issues and solutions when deploying Inbox Unclutter.

## Build Issues

### ❌ Build fails with "Module not found"

**Problem**: Missing dependencies in package.json

**Solution**:
```bash
# In frontend directory
cd frontend
npm install
npm run build

# If successful locally, commit package-lock.json
git add frontend/package-lock.json
git commit -m "Add package-lock.json"
git push
```

### ❌ Build fails with TypeScript errors

**Problem**: Type errors in code

**Solution**:
```bash
# Check for errors locally
cd frontend
npm run build

# Fix any TypeScript errors shown
# Then commit and push
```

### ❌ "Command failed: cd frontend && npm install"

**Problem**: Vercel can't find frontend directory

**Solution**:
- Ensure `frontend/` directory exists in your repo
- Check `vercel.json` has correct `buildCommand`
- Verify you pushed all files to GitHub

## API Issues

### ❌ API returns 500 error

**Problem**: Missing or invalid GEMINI_API_KEY

**Solution**:
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add `GEMINI_API_KEY` with your API key
5. Redeploy (Deployments → ... → Redeploy)

### ❌ "GEMINI_API_KEY is not set"

**Problem**: Environment variable not configured

**Solution**:
```bash
# Test locally first
cd backend
echo "GEMINI_API_KEY=your-key-here" > .env
npm run dev

# If works locally, add to Vercel:
# Dashboard → Settings → Environment Variables
```

### ❌ API calls return CORS errors

**Problem**: CORS headers not set correctly

**Solution**:
- Check browser console for exact error
- Verify API functions include CORS headers (they should)
- Try clearing browser cache
- Check if using correct API URL

### ❌ "Response blocked by safety filters"

**Problem**: Gemini AI blocked the content

**Solution**:
- This is a Gemini AI safety feature
- Try with different email content
- The app returns a fallback response automatically

## Deployment Issues

### ❌ Deployment stuck on "Building"

**Problem**: Build taking too long or hanging

**Solution**:
1. Cancel deployment in Vercel dashboard
2. Check build logs for errors
3. Try deploying again
4. If persists, check if `npm run build` works locally

### ❌ "No Output Directory"

**Problem**: Build didn't create `frontend/dist`

**Solution**:
- Verify `vercel.json` has `"outputDirectory": "frontend/dist"`
- Check `frontend/package.json` has build script
- Test build locally: `cd frontend && npm run build`

### ❌ 404 on all routes except homepage

**Problem**: SPA routing not configured

**Solution**:
- This should be handled automatically by Vercel
- If issue persists, add to `vercel.json`:
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## Runtime Issues

### ❌ Functions timeout after 10 seconds

**Problem**: Gemini API taking too long

**Solution**:
- This is normal for complex emails
- Hobby plan has 10s timeout
- Upgrade to Pro for 60s timeout
- Or optimize prompt to be shorter

### ❌ "Too many requests"

**Problem**: Rate limit exceeded

**Solution**:
- Wait a few minutes
- Check Gemini API quota in Google Cloud Console
- Consider upgrading Gemini API plan

### ❌ Cold start delays

**Problem**: First request is slow (~1-2s)

**Solution**:
- This is normal for serverless functions
- Subsequent requests are fast
- Consider Vercel Pro for faster cold starts
- Or implement a keep-alive ping

## Local Development Issues

### ❌ Backend won't start

**Problem**: Port 5000 already in use

**Solution**:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

### ❌ Frontend can't connect to backend

**Problem**: CORS or wrong URL

**Solution**:
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check frontend .env
# Should be empty for local dev
VITE_API_URL=
```

### ❌ "Cannot find module '@google/generative-ai'"

**Problem**: Dependencies not installed

**Solution**:
```bash
# Install all dependencies
npm install
cd frontend && npm install
cd ../backend && npm install
```

## Database Issues (Optional)

### ❌ Supabase connection fails

**Problem**: Invalid credentials or URL

**Solution**:
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` in Vercel
- Check Supabase project is active
- Note: App works without Supabase (it's optional)

### ❌ "relation 'email_summaries' does not exist"

**Problem**: Database schema not created

**Solution**:
1. Go to Supabase SQL Editor
2. Run the SQL in `backend/supabase-schema.sql`
3. Verify tables are created

## Vercel-Specific Issues

### ❌ Environment variables not working

**Problem**: Variables not set or not redeployed

**Solution**:
1. Add variables in Vercel dashboard
2. **Important**: Redeploy after adding variables
3. Variables are only available after redeploy

### ❌ "This Serverless Function has crashed"

**Problem**: Function error or timeout

**Solution**:
1. Check function logs in Vercel dashboard
2. Look for error message
3. Test function locally with `vercel dev`
4. Fix error and redeploy

### ❌ Custom domain not working

**Problem**: DNS not configured correctly

**Solution**:
1. Wait 24-48 hours for DNS propagation
2. Verify DNS records match Vercel's instructions
3. Check domain registrar settings
4. Try using Vercel's nameservers

## Getting Help

### Check Logs
1. Vercel Dashboard → Your Project → Deployments
2. Click on deployment → View Function Logs
3. Look for error messages

### Test Locally
```bash
# Install Vercel CLI
npm install -g vercel

# Run locally (mimics production)
vercel dev

# Test endpoints
curl http://localhost:3000/api/health
```

### Still Stuck?

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Check [Gemini AI Documentation](https://ai.google.dev/docs)
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md)
4. Check [ARCHITECTURE.md](./ARCHITECTURE.md)
5. Open an issue on GitHub

## Quick Diagnostic Commands

```bash
# Test Gemini API key
curl -H "Content-Type: application/json" \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_API_KEY"

# Test Vercel deployment
curl https://your-app.vercel.app/api/health

# Test email analysis
curl -X POST https://your-app.vercel.app/api/emails/analyze \
  -H "Content-Type: application/json" \
  -d '{"subject":"Test","body":"This is a test email"}'

# Check local build
cd frontend && npm run build && ls -la dist/
```

---

**Pro Tip**: Most issues are solved by:
1. Checking environment variables are set
2. Redeploying after changes
3. Clearing browser cache
4. Testing locally first
