# Past Papers Archive

A complete digital repository for O-Level, A-Level, and IAL past exam papers with integrated bKash payment system.

## Features

- 📚 **Organized Paper Repository**: Browse papers by subject, year, and exam level
- 🔐 **User Authentication**: Secure login and registration with Supabase Auth
- 💳 **bKash Integration**: Accept payments for premium content using bKash
- 👨‍💼 **Admin Panel**: Easy-to-use interface for managing papers and content
- 📱 **Responsive Design**: Beautiful, mobile-first interface
- 🎨 **Book Cover Focus**: High-quality imagery with clean, minimalist design
- ⚡ **Fast & Scalable**: Built on Next.js 14 and Supabase

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Payment**: bKash Payment Gateway
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Language**: TypeScript

## Project Structure

```
past-papers-archive/
├── app/
│   ├── admin/              # Admin panel pages
│   ├── api/                # API routes
│   │   └── payment/        # Payment endpoints
│   ├── auth/               # Auth callbacks
│   ├── browse/             # Browse papers page
│   ├── dashboard/          # User dashboard
│   ├── login/              # Login page
│   ├── papers/             # Paper detail pages
│   ├── payment/            # Payment result pages
│   ├── register/           # Registration page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── lib/
│   ├── bkash/              # bKash service integration
│   └── supabase/           # Supabase client utilities
├── supabase/
│   ├── migrations/         # Database migrations
│   └── README.md           # Database setup guide
├── types/
│   └── database.ts         # TypeScript types
├── middleware.ts           # Auth middleware
├── DEPLOYMENT.md           # Deployment guide
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account
- bKash merchant account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd past-papers-archive
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
BKASH_APP_KEY=your_bkash_app_key
BKASH_APP_SECRET=your_bkash_app_secret
BKASH_USERNAME=your_bkash_username
BKASH_PASSWORD=your_bkash_password
BKASH_BASE_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. **Set up Supabase**

- Create a new Supabase project
- Run migrations from `supabase/migrations/` in order
- Create storage buckets (see `supabase/README.md`)

5. **Run development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Create Admin User

After signing up, make yourself an admin:

```sql
UPDATE user_profiles
SET is_admin = true
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com');
```

## Database Schema

### Tables

- **subjects**: Academic subjects
- **exam_types**: Exam levels (O-Level, A-Level, IAL)
- **papers**: Past paper records with metadata
- **user_profiles**: Extended user information
- **purchases**: Payment transaction records

### Storage Buckets

- **papers**: PDF files
- **covers**: Cover images

See `supabase/README.md` for detailed schema documentation.

## bKash Integration

The payment flow:

1. User clicks "Purchase" on a premium paper
2. System creates a purchase record
3. Redirects to bKash for payment
4. bKash redirects back with payment status
5. System verifies and completes purchase
6. User can download the paper

### Testing bKash

Use sandbox credentials for development:
- Base URL: `https://tokenized.sandbox.bka.sh/v1.2.0-beta`
- Use bKash sandbox app for testing payments

### Production bKash

Switch to production endpoint:
- Base URL: `https://tokenized.pay.bka.sh/v1.2.0-beta`
- Use real merchant credentials

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/past-papers-archive)

## Features Explained

### For Students

- Browse papers by exam level and subject
- View high-quality cover images
- Download free papers instantly
- Purchase premium papers via bKash
- Access all purchased papers in dashboard

### For Administrators

- Add/edit subjects
- Upload papers with PDF and cover image
- Set papers as free or premium with pricing
- View all users and purchases
- Manage content from clean admin panel

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme.

### Adding Subjects

Through admin panel or SQL:

```sql
INSERT INTO subjects (name, description) VALUES
  ('Subject Name', 'Description');
```

### Pricing

Set in admin panel when creating/editing papers. Price in BDT (Bangladeshi Taka).

## Security

- Row Level Security (RLS) enabled on all tables
- Admin operations require authentication + admin flag
- Service role key never exposed to client
- bKash credentials stored as environment variables
- HTTPS enforced in production

## Performance

- Static generation where possible
- Image optimization with Next.js Image
- CDN delivery via Vercel Edge Network
- Supabase CDN for file storage
- Lazy loading of images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues:
- Open an issue on GitHub
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for setup help
- Review Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Review Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Backend by [Supabase](https://supabase.com)
- Deployed on [Vercel](https://vercel.com)
- Payments by [bKash](https://www.bka.sh)
- Icons by [Lucide](https://lucide.dev)
