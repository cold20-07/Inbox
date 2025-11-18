# Vercel Deployment Guide

This guide will help you deploy the Inbox Unclutter app to Vercel.

## Deployment Options

You have two options for deploying this app:

### Option 1: Deploy Frontend and Backend Separately (Recommended)

This is the recommended approach as it provides better separation and easier management.

#### Deploy Backend

1. **Create a new Vercel project for the backend:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Set the **Root Directory** to `backend`
   - Framework Preset: **Other**

2. **Configure Environment Variables:**
   Add these in Vercel project settings:
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   GEMINI_API_KEY=your-gemini-api-key
   SUPABASE_URL=your-supabase-url (optional)
   SUPABASE_SERVICE_KEY=your-supabase-service-key (optional)
   ```

3. **Build Settings:**
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy** and note your backend URL (e.g., `https://your-backend.vercel.app`)

#### Deploy Frontend

1. **Create a new Vercel project for the frontend:**
   - Click "Add New" → "Project"
   - Import the same GitHub repository
   - Set the **Root Directory** to `frontend`
   - Framework Preset: **Vite**

2. **Configure Environment Variables:**
   ```
   VITE_API_URL=https://your-backend.vercel.app
   VITE_SUPABASE_URL=your-supabase-url (optional)
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key (optional)
   ```

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy**

### Option 2: Deploy as Monorepo (Advanced)

Deploy both frontend and backend from the root directory.

1. **Create a new Vercel project:**
   - Import your GitHub repository
   - Keep Root Directory as `.` (root)

2. **Configure Environment Variables:**
   Add all environment variables from both frontend and backend.

3. **Build Settings:**
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

## Important Notes

### CORS Configuration

If deploying separately, update the backend CORS settings in `backend/src/server.ts`:

```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app', 'http://localhost:5173'],
  credentials: true
}))
```

### Frontend API URL

Update the API URL in `frontend/src/hooks/useCustomAuth.ts` and `frontend/src/components/NewEmailForm.tsx`:

```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth'
```

### Environment Variables Checklist

**Backend (Required):**
- ✅ `JWT_SECRET` - Generate using: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
- ✅ `GEMINI_API_KEY` - Get from [ai.google.dev](https://ai.google.dev)

**Backend (Optional):**
- `SUPABASE_URL` - For database features
- `SUPABASE_SERVICE_KEY` - For database features
- `PORT` - Default: 5000 (Vercel handles this automatically)
- `NODE_ENV` - Set to `production`

**Frontend (Optional):**
- `VITE_API_URL` - Your backend URL
- `VITE_SUPABASE_URL` - For database features
- `VITE_SUPABASE_ANON_KEY` - For database features

## Post-Deployment

1. **Test the API:**
   ```bash
   curl https://your-backend.vercel.app/api/health
   ```

2. **Test Authentication:**
   - Visit your frontend URL
   - Try signing up with a test account
   - Test email analysis

3. **Monitor Logs:**
   - Check Vercel deployment logs for any errors
   - Monitor function execution in Vercel dashboard

## Troubleshooting

### Backend Issues

**Error: "Cannot find module"**
- Ensure all dependencies are in `package.json`
- Check that `vercel-build` script runs `tsc`

**Error: "GEMINI_API_KEY is not set"**
- Verify environment variables in Vercel project settings
- Redeploy after adding variables

**Error: "JWT_SECRET not set"**
- Add JWT_SECRET to environment variables
- Generate a secure key using the command above

### Frontend Issues

**Error: "Failed to fetch"**
- Check CORS settings in backend
- Verify `VITE_API_URL` is set correctly
- Ensure backend is deployed and running

**Blank page after deployment**
- Check browser console for errors
- Verify build completed successfully
- Check that `frontend/vercel.json` exists for SPA routing

### Database Issues

**Error: "Cannot read property 'from' of null"**
- This is expected if Supabase is not configured
- The app works without database (in-memory storage)
- Add Supabase credentials if you want persistence

## Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update CORS and API URLs accordingly

## Continuous Deployment

Vercel automatically deploys when you push to your GitHub repository:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

## Performance Tips

1. **Enable Edge Functions** for faster response times
2. **Use Vercel Analytics** to monitor performance
3. **Enable caching** for static assets
4. **Monitor function execution time** in Vercel dashboard

## Security Checklist

- ✅ Use strong JWT_SECRET (64+ characters)
- ✅ Enable HTTPS only (Vercel does this automatically)
- ✅ Set proper CORS origins
- ✅ Don't commit `.env` files to Git
- ✅ Use Vercel environment variables
- ✅ Enable Vercel's DDoS protection
- ✅ Monitor API usage and set rate limits if needed

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Test API endpoints directly
4. Check environment variables are set correctly
5. Refer to [Vercel Documentation](https://vercel.com/docs)

## Cost

- **Vercel Free Tier:**
  - 100GB bandwidth/month
  - Unlimited deployments
  - Serverless function execution limits
  
- **Gemini API:**
  - Free tier available
  - Check [pricing](https://ai.google.dev/pricing)

- **Supabase:**
  - Free tier: 500MB database, 2GB bandwidth
  - Optional - app works without it
