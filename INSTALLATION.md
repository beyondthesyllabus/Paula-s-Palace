# Paula's Place - Installation Instructions

## ✅ Project Successfully Created!

Your e-commerce website has been scaffolded and is ready to run. Follow these simple steps to get started.

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

Open PowerShell or Command Prompt in this directory and run:

```powershell
npm install
```

**If you get a PowerShell execution policy error**, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then try `npm install` again.

---

### Step 2: Set Up Database & Sample Products

Run these commands one by one:

```powershell
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
```

**Or use the all-in-one command:**
```powershell
npm run db:setup
```

This will:
- ✅ Generate Prisma client
- ✅ Create SQLite database
- ✅ Add 2 categories (Babies' Shoes, Ladies' Shoes)
- ✅ Add 13 sample products with images

---

### Step 3: Start the Development Server

```powershell
npm run dev
```

**Your site is now running!**
- 🌐 Website: http://localhost:3000
- 🔐 Admin Panel: http://localhost:3000/admin (password: `admin123`)

---

## 🎯 What's Included

### ✅ Customer Features
- **Homepage** with hero section, categories, and featured products
- **Category pages** for Babies' Shoes and Ladies' Shoes
- **Product detail pages** with image gallery, size selection, and add to cart
- **Shopping cart** with quantity management
- **Checkout** with customer info and shipping address forms
- **Multiple payment options**:
  - Cash on Delivery (works immediately)
  - Stripe (credit/debit cards)
  - PayPal (placeholder for future)
- **Order confirmation** page with order details
- **Email notifications** (when configured)

### ✅ Admin Features
- **Password-protected dashboard** at `/admin`
- **View all orders** with filtering
- **Update order status** (Processing → Shipped → Delivered)
- **Order statistics** dashboard
- **Order details** modal with customer info

### ✅ Technical Features
- **Responsive design** (mobile, tablet, desktop)
- **Fast performance** with Next.js optimizations
- **SEO-friendly** with proper meta tags
- **Type-safe** with TypeScript
- **Modern UI** with Tailwind CSS
- **Persistent cart** using localStorage
- **Secure payments** with Stripe integration
- **Email system** with Nodemailer

---

## 🔧 Configuration (Optional)

### Payment Setup

#### Stripe (for card payments)
1. Create account: https://dashboard.stripe.com/register
2. Get test API keys: https://dashboard.stripe.com/test/apikeys
3. Add to `.env`:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

**Test card:** `4242 4242 4242 4242`, any future date, any CVC

#### PayPal (coming soon)
Placeholder is ready in the checkout page.

---

### Email Setup (for order notifications)

#### Using Gmail:
1. Enable 2-Step Verification on your Gmail account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Add to `.env`:
   ```
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-16-char-app-password
   EMAIL_FROM=Paula's Place <noreply@paulasplace.com>
   ```

#### Using Outlook:
```
EMAIL_SERVER_HOST=smtp-mail.outlook.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@outlook.com
EMAIL_SERVER_PASSWORD=your-password
```

**Note:** The site works perfectly without email configured. Orders are still created successfully.

---

### Admin Password

Change the admin password in `.env`:
```
ADMIN_PASSWORD=your-secure-password
```

---

## 📁 Project Structure

```
paula_palace/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── category/[slug]/     # Category pages
│   ├── product/[slug]/      # Product detail pages
│   ├── cart/                # Shopping cart
│   ├── checkout/            # Checkout page
│   ├── admin/               # Admin dashboard
│   ├── order-confirmation/  # Order success page
│   └── api/                 # API routes
│       ├── orders/          # Order creation
│       ├── checkout/        # Payment processing
│       ├── admin/           # Admin endpoints
│       └── webhooks/        # Stripe webhooks
├── components/              # React components
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Site footer
│   └── CartProvider.tsx    # Cart state management
├── lib/                     # Utilities
│   ├── prisma.ts           # Database client
│   ├── email.ts            # Email functions
│   └── utils.ts            # Helper functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Sample data
└── .env                     # Environment variables
```

---

## 🧪 Testing the Site

### Test a Complete Order:

1. **Browse Products**
   - Go to http://localhost:3000
   - Click "Shop Babies' Shoes" or "Shop Ladies' Shoes"

2. **Add to Cart**
   - Click any product
   - Select a size
   - Click "Add to Cart"
   - Click cart icon (top right)

3. **Checkout**
   - Click "Proceed to Checkout"
   - Fill in customer details:
     - Name: Test Customer
     - Email: test@example.com
     - Phone: 1234567890
     - Address: 123 Test St
     - City: Test City
   - Select "Cash on Delivery"
   - Click "Place Order"

4. **View Confirmation**
   - You'll see order confirmation with order number
   - Note the order number

5. **Check Admin**
   - Go to http://localhost:3000/admin
   - Login with password: `admin123`
   - See your test order
   - Click "View Details"
   - Update order status

---

## 🎨 Customization

### Change Branding

**Site Name:**
- Find and replace "Paula's Place" in:
  - `components/Header.tsx`
  - `components/Footer.tsx`
  - `app/layout.tsx`

**Colors:**
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#your-color',
    600: '#your-darker-color',
    // ... etc
  },
}
```

**Logo:**
Add your logo image to `public/` folder and update `components/Header.tsx`

### Add Your Products

Edit `prisma/seed.ts` with your actual products:
- Product names
- Descriptions
- Prices
- Image URLs (upload to image hosting service)
- Available sizes
- Stock quantities

Then run:
```powershell
npx tsx prisma/seed.ts
```

### Change Currency

Edit `lib/utils.ts`:
```typescript
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD", // Change to NGN, GBP, EUR, etc.
  }).format(price);
}
```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. **Deploy:**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repo
   - Add environment variables from `.env`
   - Click "Deploy"

3. **Database for Production:**
   - Use PostgreSQL (Neon, Supabase, or Vercel Postgres)
   - Update `DATABASE_URL` in Vercel environment variables
   - Run migrations in Vercel dashboard terminal:
     ```bash
     npx prisma db push
     npx tsx prisma/seed.ts
     ```

---

## 🆘 Troubleshooting

### "Scripts disabled" error
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port 3000 already in use
Next.js will automatically use port 3001, 3002, etc.

### Database errors
Reset database:
```powershell
Remove-Item prisma\dev.db
npx prisma db push
npx tsx prisma/seed.ts
```

### Stripe not working
- Cash on Delivery works without Stripe
- Add Stripe keys to enable card payments
- Use test mode keys for development

### Images not loading
- Sample products use Unsplash images (require internet)
- Replace with your own image URLs in `prisma/seed.ts`

---

## 📚 Documentation

- **Next.js:** https://nextjs.org/docs
- **Prisma:** https://prisma.io/docs
- **Stripe:** https://stripe.com/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

---

## ✅ Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Database created (`npx prisma db push`)
- [ ] Sample products added (`npx tsx prisma/seed.ts`)
- [ ] Development server running (`npm run dev`)
- [ ] Site accessible at http://localhost:3000
- [ ] Admin panel accessible at http://localhost:3000/admin
- [ ] Test order completed successfully
- [ ] Admin dashboard tested

---

## 🎉 You're All Set!

Your Paula's Place e-commerce website is ready to use. Start customizing it with your products, branding, and payment details.

**Need help?** Check `README.md` for detailed documentation.

**Happy selling! 🛍️**
