# Deployment Guide: Render

## Prerequisites
1. **Render Account** - Sign up at [render.com](https://render.com)
2. **GitHub Repository** - Push your code to GitHub
3. **Environment Variables** - Have your `.env` variables ready

## Step 1: Push Code to GitHub

```bash
cd c:\Users\hp\Desktop\FitnessBuddy-Backend
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

**Make sure `.env` and `node_modules/` are in `.gitignore`**

Verify your `.gitignore` contains:
```
.env
.env.local
node_modules/
*.log
```

## Step 2: Create Environment Variables File

Create a `.env.production` file (don't push to GitHub):
```
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GOOGLE_API_KEY=your_google_places_api_key
NODE_ENV=production
```

## Step 3: Deploy on Render

### Option A: Using GitHub Integration (Recommended)

1. **Login to Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Select "Connect a GitHub repository"
   - Authorize Render to access your GitHub account
   - Select your `FitnessBuddy-Backend` repository

3. **Configure Service**
   - **Name:** `fitnesbuddy-backend` (or your preferred name)
   - **Environment:** `Node`
   - **Region:** Choose closest to your users (US East recommended)
   - **Branch:** `main`
   - **Root Directory:** `BackEnd`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Add Environment Variables**
   - Scroll to "Environment" section
   - Click "Add Environment Variable"
   - Add each variable:
     ```
     PORT=5000
     SUPABASE_URL=<your_supabase_url>
     SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
     GOOGLE_API_KEY=<your_google_places_api_key>
     NODE_ENV=production
     ```

5. **Set Instance Type**
   - Choose "Free" or "Starter Plus" plan
   - Free tier is good for testing

6. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Wait for deployment to complete (~3-5 minutes)

### Option B: Manual Deployment

If you prefer manual deployment:

1. **Create Service from Blank**
   - Dashboard → "New +" → "Web Service"
   - Enter GitHub repo URL: `https://github.com/your-username/FitnessBuddy-Backend.git`
   - Follow same configuration steps as Option A

## Step 4: Verify Deployment

Once deployed, Render will provide a public URL like:
```
https://fitnesbuddy-backend.onrender.com
```

**Test your endpoints:**
```
GET https://fitnesbuddy-backend.onrender.com/health
GET https://fitnesbuddy-backend.onrender.com/api/profiles
```

## Step 5: Configure Auto-Deploy

Render automatically deploys when you push to GitHub if connected:

1. Every push to `main` branch triggers new deployment
2. Monitor in "Deployments" tab
3. Roll back if needed by clicking "Redeploy"

## Important Notes

### Environment Variables
- **Never commit `.env` to GitHub**
- Add all sensitive keys in Render dashboard only
- Use `process.env.VARIABLE_NAME` in your app

### Port Configuration
- Always use `process.env.PORT` (Render assigns dynamic port)
- Your `server.js` already does this: `const PORT = process.env.PORT || 5000` ✅

### Database Connection
- Supabase connection strings must be added in Render dashboard
- Test connection after first deploy

### Logs & Monitoring
- View real-time logs in Render dashboard
- Check "Logs" tab if deployment fails
- Use "Manual Deploy" to rebuild

## Troubleshooting

### Build Fails
- Check `npm install` works locally
- Ensure all dependencies in `package.json`
- Verify correct Node version (v16+ recommended)

### Application Crashes
- Check logs in Render dashboard
- Verify environment variables are set
- Test locally with same environment variables

### Connection Errors
- Verify Supabase URL and API keys
- Check if Supabase project is active
- Test Supabase connection string

### Slow Performance
- Upgrade from Free to Starter Plus tier
- Check query performance in database
- Use database indexes for frequently queried fields

## Useful Render Dashboard Features

| Feature | Purpose |
|---------|---------|
| **Logs** | View real-time application logs |
| **Deployments** | See deployment history |
| **Environment** | Manage environment variables |
| **Custom Domain** | Add custom domain name |
| **Health Checks** | Configure health check endpoint |
| **Redeploy** | Manually trigger deployment |

## Custom Domain Setup

1. Go to Service settings
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `api.fitnesbuddy.com`)
4. Follow DNS configuration steps
5. Typical DNS record: `CNAME` pointing to Render URL

## Next Steps

1. **Add SSL Certificate** (auto-enabled by Render)
2. **Set Up Monitoring** via Render or third-party tools
3. **Configure CORS** if frontend is on different domain
4. **Add Rate Limiting** for production API security
5. **Set Up Backup Strategy** for database

## Cost Breakdown

- **Free Tier:** $0/month (1 free web service)
- **Starter Plus:** $7/month (manual deploys, longer deploy time)
- **Professional:** $12+/month (production-ready)

## Resources

- [Render Docs](https://render.com/docs)
- [Environment Variables Guide](https://render.com/docs/environment-variables)
- [GitHub Integration](https://render.com/docs/github)
- [Node.js Deployment](https://render.com/docs/deploy-node-express)

---

**Your backend URL after deployment:**
```
https://fitnesbuddy-backend.onrender.com/health
```

Update your frontend API calls to use this URL!
