# Paula's Place - E-Commerce Website

A professional e-commerce platform for selling babies' shoes and ladies' shoes, built with Next.js 14, TypeScript, Tailwind CSS, and Prisma.

## Features

✅ **Product Catalog**
- Organized categories (Babies' Shoes, Ladies' Shoes)
- Product listings with images, descriptions, prices, and sizes
- Featured products showcase
- Responsive product detail pages

✅ **Shopping Cart**
- Add/remove/update items
- Size selection
- Persistent cart (localStorage)
- Real-time cart updates

✅ **Secure Checkout**
- Guest checkout (no registration required)
- Multiple payment methods:
  - Cash on Delivery (COD)
  - Credit/Debit Cards via Stripe
  - PayPal (coming soon)
- Shipping address collection

✅ **Order Management**
- Order confirmation pages
- Email notifications to customer and admin
- Order tracking with status updates

✅ **Admin Dashboard**
- Password-protected admin panel
- View all orders
- Update order status (Processing, Shipped, Delivered, Cancelled)
- Order statistics

✅ **Modern UI/UX**
- Responsive design (mobile, tablet, desktop)
- Fast loading with Next.js optimizations
- Clean, professional design inspired by Temu/Jumia/Amazon
- Smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Payments**: Stripe, PayPal
- **Email**: Nodemailer (SMTP)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

   Required environment variables:
   - `DATABASE_URL` - Database connection string
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe public key
   - `STRIPE_SECRET_KEY` - Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
   - `EMAIL_SERVER_HOST` - SMTP host (e.g., smtp.gmail.com)
   - `EMAIL_SERVER_PORT` - SMTP port (e.g., 587)
   - `EMAIL_SERVER_USER` - Your email address
   - `EMAIL_SERVER_PASSWORD` - Email password or app password
   - `EMAIL_FROM` - From email address
   - `ADMIN_PASSWORD` - Admin dashboard password
   - `NEXT_PUBLIC_APP_URL` - Your app URL (http://localhost:3000 for dev)

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed sample products**
   ```bash
   npx tsx prisma/seed.ts
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## Payment Setup

### Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the [Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Add keys to `.env`:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
4. For webhooks (production):
   - Install Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
   - Add webhook secret to `.env`: `STRIPE_WEBHOOK_SECRET`

### Email (Gmail Example)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password: [Google Account Settings](https://myaccount.google.com/apppasswords)
3. Add to `.env`:
   ```
   EMAIL_SERVER_HOST=smtp.gmail.com
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your-email@gmail.com
   EMAIL_SERVER_PASSWORD=your-app-password
   EMAIL_FROM=Paula's Place <noreply@paulasplace.com>
   ```

## Admin Dashboard

Access the admin dashboard at `/admin`

**Default password**: `admin123` (change in `.env`)

Features:
- View all orders
- Update order status
- View order details
- Order statistics

## Project Structure

```
paula_palace/
├── app/
│   ├── api/              # API routes
│   │   ├── admin/        # Admin endpoints
│   │   ├── checkout/     # Payment processing
│   │   ├── orders/       # Order creation
│   │   └── webhooks/     # Payment webhooks
│   ├── admin/            # Admin dashboard
│   ├── cart/             # Shopping cart page
│   ├── category/         # Category pages
│   ├── checkout/         # Checkout page
│   ├── order-confirmation/ # Order confirmation
│   ├── product/          # Product detail pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── CartProvider.tsx  # Cart context
│   ├── Footer.tsx        # Footer component
│   └── Header.tsx        # Header component
├── lib/                  # Utilities
│   ├── email.ts          # Email functions
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Helper functions
├── prisma/
│   ├── schema.prisma     # Database schema
│   └── seed.ts           # Seed data
├── .env                  # Environment variables
├── .env.example          # Example env file
├── next.config.js        # Next.js config
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind config
└── tsconfig.json         # TypeScript config
```

## Database Schema

- **Category**: Product categories (Babies' Shoes, Ladies' Shoes)
- **Product**: Individual products with images, sizes, prices
- **Order**: Customer orders with shipping info
- **OrderItem**: Individual items in an order

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update `DATABASE_URL` to use PostgreSQL (Neon, Supabase, etc.)
5. Deploy!

### Database Migration for Production

```bash
# Update DATABASE_URL in .env to PostgreSQL
npx prisma db push
npx tsx prisma/seed.ts
```

## Customization

### Branding

- Update colors in `tailwind.config.ts`
- Replace "Paula's Place" in components
- Add your logo to `components/Header.tsx`

### Products

- Add/edit products via seed script or admin panel (future feature)
- Update product images (use your own or image hosting service)

### Payment Methods

- Enable/disable payment methods in `app/checkout/page.tsx`
- Add PayPal integration (placeholder ready)

## Support

For issues or questions:
- Check the code comments
- Review Next.js documentation: [nextjs.org/docs](https://nextjs.org/docs)
- Stripe docs: [stripe.com/docs](https://stripe.com/docs)
- Prisma docs: [prisma.io/docs](https://prisma.io/docs)

## License

This project is created for Paula's Place. All rights reserved.

---

**Built with ❤️ for Paula's Place**
