# 🚀 Quick Start - Deploy in 5 Minutes

## Step 1: Get Your API Key (2 minutes)
1. Go to [ai.google.dev](https://ai.google.dev)
2. Click "Get API Key"
3. Create a new API key
4. Copy it (you'll need it in Step 3)

## Step 2: Push to GitHub (1 minute)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

## Step 3: Deploy to Vercel (2 minutes)
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Select your repository
5. Click "Deploy" (Vercel auto-detects settings)
6. While deploying, add environment variable:
   - Name: `GEMINI_API_KEY`
   - Value: (paste your API key from Step 1)
7. Wait for deployment to finish

## Step 4: Test Your App
1. Click the deployment URL
2. Paste an email
3. Click "ANALYZE EMAIL"
4. See the AI magic! ✨

## That's It! 🎉

Your app is now live with:
- ✅ Frontend deployed
- ✅ Backend API deployed
- ✅ AI analysis working
- ✅ HTTPS enabled
- ✅ Global CDN
- ✅ Auto-scaling

## Optional: Add Custom Domain
1. In Vercel dashboard, go to Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Done!

## Need Help?
- 📖 [Full deployment guide](./DEPLOYMENT.md)
- ✅ [Detailed checklist](./DEPLOY_CHECKLIST.md)
- 🔧 [Troubleshooting](./DEPLOYMENT.md#troubleshooting)

---

**Pro Tip**: Every time you push to GitHub, Vercel automatically redeploys your app. No manual deployment needed!
