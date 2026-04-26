# Deploy Paula's Place to Vercel

## 📋 Pre-Deployment Checklist

- [x] Code is on GitHub (tonymech111/paula-s_palace_store)
- [ ] Vercel account created
- [ ] Production database set up
- [ ] Environment variables ready

---

## 🚀 Deployment Steps

### Step 1: Push Latest Changes

```powershell
# Add the new seed API route
git add .
git commit -m "Add seed API route for production"
git push origin main
```

### Step 2: Sign Up for Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Login as **tonymech111**
5. Authorize Vercel

### Step 3: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find **"paula-s_palace_store"**
3. Click **"Import"**

### Step 4: Configure Build Settings

Vercel auto-detects Next.js:
- Framework: **Next.js** ✅
- Root Directory: `./`
- Build Command: `next build`
- Output Directory: `.next`

**Leave these as default!**

### Step 5: Set Up Database

#### Option A: Neon (Recommended - Free Forever)

1. Go to: **https://neon.tech**
2. Sign up with GitHub
3. Create new project: **"paulas-place"**
4. Copy **Connection String**
   ```
   postgresql://username:password@host/database?sslmode=require
   ```
5. Save this for next step

#### Option B: Vercel Postgres (Free tier available)

1. In Vercel, go to **Storage** tab
2. Click **"Create Database"**
3. Choose **"Postgres"**
4. Name: **"paulas-place"**
5. Vercel auto-adds `DATABASE_URL`

### Step 6: Add Environment Variables

In Vercel project settings, add these:

#### Required Variables:

```
DATABASE_URL=postgresql://your-connection-string-here
ADMIN_PASSWORD=your-secure-admin-password
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
SEED_SECRET=create-a-random-secret-here
```

#### Optional (add later):

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=
EMAIL_SERVER_PASSWORD=
EMAIL_FROM=Paula's Place <noreply@paulasplace.com>
```

**How to add:**
1. In Vercel dashboard → Your Project
2. Click **"Settings"** → **"Environment Variables"**
3. Add each variable
4. Choose: **Production**, **Preview**, **Development** (all three)
5. Click **"Save"**

### Step 7: Deploy

1. Click **"Deploy"** button
2. Wait 2-3 minutes
3. Watch the build logs
4. Success! 🎉

Your site will be at: `https://paula-s-palace-store.vercel.app`

### Step 8: Initialize Database

After first deployment, you need to create tables and add products:

#### Method 1: Using the Seed API (Easiest)

1. Get your `SEED_SECRET` from Vercel environment variables
2. Visit this URL in your browser:
   ```
   https://your-project.vercel.app/api/seed?secret=YOUR_SEED_SECRET
   ```
3. You should see: `{"success":true,"message":"Database seeded successfully"}`
4. **Delete the seed route after use** (or keep it for re-seeding)

#### Method 2: Using Vercel CLI

```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link to project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migrations
npx prisma db push

# Seed database
npx tsx prisma/seed.ts
```

---

## ✅ Post-Deployment Checklist

- [ ] Site loads at your Vercel URL
- [ ] Homepage displays correctly
- [ ] Categories page works
- [ ] Products display
- [ ] Can add items to cart
- [ ] Checkout page loads
- [ ] Admin dashboard accessible
- [ ] Database has products (visit /api/seed)

---

## 🔧 Troubleshooting

### Build Fails

**Error: Prisma Client not generated**
- Solution: Vercel should auto-run `prisma generate`
- Check build logs for errors

**Error: Module not found**
- Solution: Make sure all files are committed and pushed
- Check `package.json` has all dependencies

### Database Connection Fails

**Error: Can't reach database**
- Check `DATABASE_URL` is correct
- Ensure it's a PostgreSQL connection string
- Verify database is running (Neon/Vercel Postgres)

### Site Loads but No Products

**Empty homepage**
- Run the seed API: `/api/seed?secret=YOUR_SECRET`
- Or use Vercel CLI to seed manually

### Admin Can't Login

**Wrong password**
- Check `ADMIN_PASSWORD` in Vercel environment variables
- Redeploy after changing env variables

---

## 🎨 Custom Domain (Optional)

### Add Your Own Domain

1. In Vercel dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Add your domain: `paulasplace.com`
4. Follow DNS instructions
5. Vercel auto-provisions SSL certificate

---

## 🔐 Security Checklist

- [x] `.env` file not in Git (protected by `.gitignore`)
- [ ] Strong admin password set
- [ ] Stripe keys are test keys (until ready for production)
- [ ] Seed API protected with secret
- [ ] Consider deleting `/api/seed` after first use

---

## 📊 Monitor Your Site

### Vercel Dashboard Shows:

- **Deployments** - Every push creates a new deployment
- **Analytics** - Visitor stats (free tier)
- **Logs** - Runtime logs and errors
- **Speed Insights** - Performance metrics

---

## 🚀 Next Steps After Deployment

1. **Test Everything**
   - Browse products
   - Add to cart
   - Complete test order (COD)
   - Check admin dashboard

2. **Add Real Payment Methods**
   - Get Stripe production keys
   - Add to Vercel environment variables
   - Test with real card

3. **Set Up Email**
   - Configure SMTP credentials
   - Test order confirmation emails

4. **Customize**
   - Add your real products
   - Update branding
   - Add your logo

5. **Go Live!**
   - Share your URL
   - Start selling! 🎉

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Neon Docs:** https://neon.tech/docs
- **Next.js Docs:** https://nextjs.org/docs

---

**Your e-commerce site is now live! 🎉**

Visit: `https://your-project.vercel.app`
