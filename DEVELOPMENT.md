# Development Notes

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Environment Setup

Copy `.env.example` to `.env.local` and fill in your credentials.

## Database Migrations

Run migrations in Supabase SQL Editor in this order:
1. `001_initial_schema.sql`
2. `002_rls_policies.sql`
3. `003_triggers.sql`

## Testing Locally

### Test User Flow
1. Register new user at `/register`
2. Login at `/login`
3. Browse papers at `/browse`
4. View paper details at `/papers/[id]`

### Test Admin Flow
1. Make user admin in Supabase
2. Access admin panel at `/admin`
3. Add subjects
4. Upload papers

### Test Payment Flow (Sandbox)
1. Use bKash sandbox credentials
2. Set `BKASH_BASE_URL` to sandbox endpoint
3. Try purchasing a premium paper
4. Complete payment in sandbox
5. Verify purchase in dashboard

## Code Structure

### App Router Structure
- `app/`: Next.js 14 app router pages
- `app/api/`: API routes
- `lib/`: Utility functions and services
- `types/`: TypeScript type definitions
- `components/`: Reusable components (if needed)

### Key Files
- `middleware.ts`: Auth middleware
- `lib/supabase/`: Supabase client setup
- `lib/bkash/`: bKash payment service
- `app/api/payment/`: Payment endpoints

## Common Tasks

### Adding a New Page
1. Create file in `app/[route]/page.tsx`
2. Export default async function
3. Use Supabase for data fetching

### Adding Admin Feature
1. Add route under `app/admin/`
2. Layout handles auth check
3. Use server components for data

### Modifying Database
1. Add migration SQL file
2. Run in Supabase SQL Editor
3. Update TypeScript types in `types/database.ts`

## Debugging

### Auth Issues
- Check Supabase URL and keys
- Verify middleware configuration
- Check browser cookies

### Database Issues
- Verify RLS policies
- Check user permissions
- Use service role for admin ops

### Payment Issues
- Check bKash credentials
- Verify endpoint URL (sandbox/production)
- Check callback URL configuration

## Performance Tips

- Use Next.js Image component
- Leverage static generation where possible
- Implement pagination for large lists
- Optimize images before uploading

## Security Checklist

- [ ] Never expose service role key to client
- [ ] Validate all user inputs
- [ ] Use RLS for database security
- [ ] Sanitize file uploads
- [ ] Verify payment status server-side
- [ ] Use HTTPS in production
- [ ] Implement rate limiting for API routes

## Deployment Checklist

- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Create storage buckets
- [ ] Test authentication flow
- [ ] Test payment flow (sandbox first)
- [ ] Verify admin access
- [ ] Check responsive design
- [ ] Test on multiple browsers

## Future Enhancements

Potential features to add:
- Search functionality
- Advanced filtering
- Exam paper previews
- User reviews/ratings
- Bookmark/favorites
- Email notifications
- Bulk discounts
- Referral system
- Mobile app
- API for third-party integrations
