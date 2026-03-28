# Laptop Lane - E-Commerce Website

A modern, full-featured e-commerce platform for selling laptops and tech accessories. Built with Next.js 14, TypeScript, Tailwind CSS, and Supabase.

![Laptop Lane](https://img.shields.io/badge/Laptop%20Lane-E--Commerce-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?logo=supabase)

## Features

### Customer Features
- 🛍️ **Product Browsing** - Browse laptops, keyboards, mice, external hard drives, and flash drives
- 🔍 **Search & Filter** - Filter by category, sort by price/name
- 🛒 **Shopping Cart** - Add/remove items, update quantities (persisted)
- ✅ **Checkout** - Guest checkout with shipping information
- 📦 **Order Tracking** - Real-time order status tracking with timeline
- 📱 **Responsive Design** - Mobile-friendly interface

### Admin Features
- 🔐 **Admin Authentication** - Secure login with Supabase Auth
- 📊 **Dashboard** - Overview of sales, orders, and products
- 📦 **Product Management** - CRUD operations for products
- 📋 **Order Management** - View and update order status
- 🚚 **Tracking Updates** - Add tracking notes and update delivery status

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand (cart persistence)
- **Icons**: Lucide React
- **Authentication**: Supabase Auth

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier works)

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the contents of `supabase-setup.sql`
   - This creates all tables, policies, and sample products

3. **Configure environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Get your credentials from Supabase project settings:
     - `NEXT_PUBLIC_SUPABASE_URL` - Project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon/Public key
     - `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for admin operations)

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Create an admin user**
   - Run the development server
   - Go to `/admin` and sign up with your email
   - In Supabase Dashboard → SQL Editor, run:
     ```sql
     UPDATE profiles SET role = 'admin' WHERE email = 'your-email@example.com';
     ```
   - Sign in again with admin privileges

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
src/
├── app/
│   ├── admin/           # Admin dashboard & management
│   │   ├── page.tsx     # Admin dashboard
│   │   ├── products/    # Product management
│   │   └── orders/      # Order management
│   ├── products/        # Product pages
│   │   ├── page.tsx     # Product listing
│   │   └── [id]/        # Product detail
│   ├── cart/            # Shopping cart
│   ├── checkout/        # Checkout page
│   ├── track-order/     # Order tracking
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Navigation header
│   └── Footer.tsx       # Site footer
├── lib/
│   ├── supabase.ts      # Supabase client
│   └── database.types.ts # Database types
├── store/
│   └── cartStore.ts     # Cart state (Zustand)
└── types/
    └── index.ts         # TypeScript types
```

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, categories, featured products |
| Products | `/products` | Product listing with filters |
| Product Detail | `/products/[id]` | Individual product page |
| Cart | `/cart` | Shopping cart |
| Checkout | `/checkout` | Order placement |
| Track Order | `/track-order` | Order tracking for customers |
| Admin Login | `/admin` | Admin authentication |
| Admin Dashboard | `/admin` | Overview and stats |
| Admin Products | `/admin/products` | Product CRUD |
| Admin Orders | `/admin/orders` | Order management |

## Database Schema

### Tables

- **products** - Product catalog
- **orders** - Customer orders
- **order_items** - Order line items
- **order_tracking** - Tracking history
- **profiles** - User profiles with roles

### Product Categories

- `laptop` - Laptops
- `keyboard` - Keyboards
- `mouse` - Mice
- `external_hard_drive` - External Hard Drives
- `flash_drive` - Flash Drives

### Order Statuses

- `pending` - Order placed, awaiting processing
- `processing` - Being prepared
- `shipped` - Dispatched from warehouse
- `in_transit` - On the way to customer
- `delivered` - Successfully delivered
- `cancelled` - Order cancelled

## Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: {
    // Deep blue theme
    900: "#1e3a5f",
    600: "#2563eb",
    500: "#3b82f6",
  },
  accent: {
    // Cyan accent
    500: "#06b6d4",
  },
}
```

### Logo

Replace the logo in `Header.tsx` and `Footer.tsx`:

```tsx
<Laptop className="h-8 w-8" /> // Replace with your image
```

## Suggested Improvements

1. **Product Reviews** - Add rating and review system
2. **Wishlist** - Save favorite products
3. **Email Notifications** - Send order updates via email
4. **Payment Integration** - Add Stripe/PayPal
5. **Advanced Search** - Full-text search with filters
6. **Product Comparison** - Compare multiple products
7. **Newsletter** - Email subscription for promotions
8. **Dark Mode** - Toggle dark/light theme
9. **Live Chat** - Customer support chat
10. **Analytics Dashboard** - Sales charts and insights

## Security

- Row Level Security (RLS) enabled on all tables
- Admin-only write access to products and orders
- Public read access for products
- Customers can only view their own orders

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, please create an issue in the repository.

---

Built with ❤️ by Laptop Lane Team
