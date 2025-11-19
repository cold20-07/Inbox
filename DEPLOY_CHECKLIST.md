# Deployment Checklist ✅

Follow these steps to deploy your Inbox Unclutter app to Vercel.

## Pre-Deployment

- [ ] Get your Gemini API key from [ai.google.dev](https://ai.google.dev)
- [ ] (Optional) Set up Supabase project at [supabase.com](https://supabase.com)
- [ ] Test locally with `npm run dev`
- [ ] Commit all changes to Git
- [ ] Push to GitHub

## Vercel Deployment

### Option 1: GitHub Integration (Recommended)

1. [ ] Go to [vercel.com](https://vercel.com) and sign in
2. [ ] Click "Add New Project"
3. [ ] Import your GitHub repository
4. [ ] Vercel will auto-detect settings from `vercel.json`
5. [ ] Add environment variables:
   - [ ] `GEMINI_API_KEY` (required)
   - [ ] `SUPABASE_URL` (optional)
   - [ ] `SUPABASE_SERVICE_KEY` (optional)
6. [ ] Click "Deploy"
7. [ ] Wait for build to complete (~2-3 minutes)
8. [ ] Visit your deployed URL!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts to:
# - Link to existing project or create new
# - Confirm settings
# - Add environment variables when prompted

# Deploy to production
vercel --prod
```

## Post-Deployment

- [ ] Test the deployed app
- [ ] Try analyzing an email
- [ ] Check `/api/health` endpoint
- [ ] Verify Gemini AI is working
- [ ] (Optional) Test database integration if using Supabase

## Troubleshooting

### Build fails
- Check build logs in Vercel dashboard
- Ensure `frontend/package.json` has all dependencies
- Try building locally: `cd frontend && npm run build`

### API not working
- Verify `GEMINI_API_KEY` is set in Vercel environment variables
- Check function logs in Vercel dashboard
- Test endpoint: `https://your-app.vercel.app/api/health`

### CORS errors
- Functions already include CORS headers
- Check browser console for specific error
- Verify API URL in frontend is correct

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch auto-deploys to production
- Pull requests get preview deployments
- Rollback to previous deployment anytime in Vercel dashboard

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

## Monitoring

- View deployment logs in Vercel dashboard
- Check function execution logs
- Monitor API usage in Gemini AI console
- (Optional) Set up Vercel Analytics

---

**Need help?** Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
