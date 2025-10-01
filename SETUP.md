# Quick Setup Guide for Paula's Place

## Step-by-Step Setup

### 1. Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages (Next.js, React, Prisma, Stripe, etc.)

### 2. Configure Environment Variables

The `.env` file is already created. You need to add your API keys:

**Required for basic functionality:**
- Keep `DATABASE_URL="file:./dev.db"` as is for local development
- Set `ADMIN_PASSWORD` (default is "admin123")

**Optional but recommended:**

**For Stripe payments:**
1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create an account (use test mode)
3. Get your keys from [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
4. Add to `.env`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

**For email notifications (Gmail):**
1. Enable 2-Step Verification on your Gmail
2. Generate App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Add to `.env`:
   ```
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-16-char-app-password
   ```

### 3. Set Up Database

```powershell
npx prisma generate
npx prisma db push
```

### 4. Add Sample Products

```powershell
npx tsx prisma/seed.ts
```

This creates:
- 2 categories (Babies' Shoes, Ladies' Shoes)
- 5 babies' shoe products
- 8 ladies' shoe products

### 5. Start the Development Server

```powershell
npm run dev
```

### 6. Open Your Browser

Go to: [http://localhost:3000](http://localhost:3000)

## What You Can Do Now

### Customer Experience:
- ✅ Browse products by category
- ✅ View product details
- ✅ Add items to cart with size selection
- ✅ Checkout with Cash on Delivery (works without payment setup)
- ✅ View order confirmation

### Admin Panel:
- ✅ Go to [http://localhost:3000/admin](http://localhost:3000/admin)
- ✅ Login with password: `admin123` (or your custom password)
- ✅ View all orders
- ✅ Update order status

## Testing the Site

### Test Order Flow:
1. Go to homepage
2. Click "Shop Babies' Shoes" or "Shop Ladies' Shoes"
3. Click on any product
4. Select a size
5. Click "Add to Cart"
6. Click cart icon (top right)
7. Click "Proceed to Checkout"
8. Fill in customer details
9. Select "Cash on Delivery"
10. Click "Place Order"
11. You'll see order confirmation!

### Test Admin:
1. Go to `/admin`
2. Enter password: `admin123`
3. View the test order you just created
4. Click "View Details"
5. Update order status

## Common Issues

### PowerShell Script Execution Error
If you get "running scripts is disabled", run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
If port 3000 is busy, the app will automatically use 3001, 3002, etc.

### Database Errors
Delete the database and recreate:
```powershell
Remove-Item prisma\dev.db -ErrorAction SilentlyContinue
npx prisma db push
npx tsx prisma/seed.ts
```

### Stripe Not Working
- Cash on Delivery works without Stripe
- Add Stripe keys to `.env` to enable card payments
- Use test card: `4242 4242 4242 4242`, any future date, any CVC

### Email Not Sending
- The site works without email configured
- Orders are created successfully
- Add email credentials to enable notifications

## Next Steps

### Customize Your Site:
1. **Add Real Product Images**: Replace Unsplash URLs in `prisma/seed.ts`
2. **Update Branding**: Change "Paula's Place" to your brand name
3. **Modify Colors**: Edit `tailwind.config.ts` primary colors
4. **Add Logo**: Update `components/Header.tsx`
5. **Change Currency**: Modify `lib/utils.ts` formatPrice function

### Add More Products:
Edit `prisma/seed.ts` and run:
```powershell
npx tsx prisma/seed.ts
```

### Deploy to Production:
1. Push code to GitHub
2. Create Vercel account
3. Import project
4. Add environment variables
5. Deploy!

## Need Help?

Check:
- `README.md` for full documentation
- Console logs in browser (F12)
- Terminal output for errors

---

🎉 **Your e-commerce site is ready!**
