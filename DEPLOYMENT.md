# Past Papers Archive - Deployment Guide

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **bKash Merchant Account**: Register at [bKash Merchant Portal](https://merchant.bka.sh)
4. **GitHub Account**: For code hosting and deployment

## Step 1: Set Up Supabase

### 1.1 Create a New Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Enter project name: `past-papers-archive`
4. Set a strong database password
5. Select a region close to your users (Singapore for Bangladesh)
6. Click "Create new project"

### 1.2 Run Database Migrations

1. Go to SQL Editor in your Supabase dashboard
2. Run each migration file in order:
   - Copy and paste contents of `supabase/migrations/001_initial_schema.sql`
   - Click "Run"
   - Repeat for `002_rls_policies.sql`
   - Repeat for `003_triggers.sql`

### 1.3 Create Storage Buckets

In SQL Editor, run:

```sql
-- Create papers bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('papers', 'papers', true);

-- Create covers bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('covers', 'covers', true);

-- Storage policies for papers bucket
CREATE POLICY "Papers are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'papers');

CREATE POLICY "Admins can upload papers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'papers' AND
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);

-- Storage policies for covers bucket
CREATE POLICY "Covers are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'covers');

CREATE POLICY "Admins can upload covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'covers' AND
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.is_admin = true
  )
);
```

### 1.4 Get API Keys

1. Go to Settings → API
2. Copy:
   - Project URL
   - `anon` public key
   - `service_role` key (keep this secret!)

## Step 2: Set Up bKash

### 2.1 Register as Merchant

1. Visit [bKash Merchant Portal](https://merchant.bka.sh)
2. Complete merchant registration
3. Submit required documents
4. Wait for approval

### 2.2 Get API Credentials

After approval:
1. Log into merchant portal
2. Go to Developer Settings
3. Copy:
   - App Key
   - App Secret
   - Username
   - Password
4. Note the API endpoint:
   - Sandbox: `https://tokenized.sandbox.bka.sh/v1.2.0-beta`
   - Production: `https://tokenized.pay.bka.sh/v1.2.0-beta`

## Step 3: Deploy to Vercel

### 3.1 Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/past-papers-archive.git
git push -u origin main
```

### 3.2 Import to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Framework: Next.js (auto-detected)
5. Click "Deploy"

### 3.3 Configure Environment Variables

In Vercel project settings → Environment Variables, add:

| Name | Value | Source |
|------|-------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Supabase Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Supabase Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Supabase Settings → API |
| `BKASH_APP_KEY` | Your bKash app key | bKash Merchant Portal |
| `BKASH_APP_SECRET` | Your bKash app secret | bKash Merchant Portal |
| `BKASH_USERNAME` | Your bKash username | bKash Merchant Portal |
| `BKASH_PASSWORD` | Your bKash password | bKash Merchant Portal |
| `BKASH_BASE_URL` | `https://tokenized.pay.bka.sh/v1.2.0-beta` | (Use sandbox URL for testing) |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel deployment URL | Vercel (e.g., `https://your-app.vercel.app`) |

### 3.4 Redeploy

After adding environment variables:
1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"

## Step 4: Install Supabase Integration (Optional)

1. Go to Vercel project settings
2. Click "Integrations"
3. Search for "Supabase"
4. Click "Add Integration"
5. Follow the setup wizard (this auto-syncs environment variables)

## Step 5: Create First Admin User

### 5.1 Sign Up

1. Visit your deployed site
2. Click "Sign Up"
3. Create an account with your email

### 5.2 Make Yourself Admin

1. Go to Supabase dashboard
2. Open SQL Editor
3. Run:

```sql
UPDATE user_profiles
SET is_admin = true
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com');
```

### 5.3 Verify

1. Log out and log back in
2. You should now see "Admin Panel" in the navigation

## Step 6: Add Sample Data

### 6.1 Add Subjects

In Supabase SQL Editor:

```sql
INSERT INTO subjects (name, description) VALUES
  ('Mathematics', 'Pure Mathematics and Applied Mathematics'),
  ('Physics', 'Physics examinations'),
  ('Chemistry', 'Chemistry examinations'),
  ('Biology', 'Biology examinations'),
  ('English Language', 'English Language papers'),
  ('Accounting', 'Accounting and Finance');
```

### 6.2 Add Papers via Admin Panel

1. Log into your site as admin
2. Go to Admin Panel
3. Click "Add Paper"
4. Fill in the form
5. Upload PDF and cover image
6. Submit

## Step 7: Testing

### 7.1 Test User Registration
- Register a new non-admin user
- Verify email confirmation (if enabled)
- Check user profile created correctly

### 7.2 Test Paper Browsing
- Browse papers as guest
- Filter by subject and exam type
- View paper details

### 7.3 Test bKash Payment (Sandbox)
- Make sure you're using sandbox URL
- Try purchasing a premium paper
- Complete payment in bKash sandbox
- Verify purchase recorded
- Test download access

### 7.4 Test Admin Functions
- Add/edit subjects
- Upload papers
- View all users and purchases

## Troubleshooting

### Common Issues

**1. Authentication not working**
- Check Supabase URL and anon key are correct
- Verify middleware is running
- Check browser console for errors

**2. Images not loading**
- Verify storage buckets are public
- Check storage policies are correct
- Ensure `next.config.js` has Supabase domain whitelisted

**3. bKash payment failing**
- Verify API credentials are correct
- Check you're using correct endpoint (sandbox vs production)
- Review bKash response in server logs

**4. RLS blocking queries**
- Check user is authenticated
- Verify RLS policies are correct
- Use service role key for admin operations

## Production Checklist

Before going live:

- [ ] Switch bKash to production endpoint
- [ ] Enable email confirmations in Supabase
- [ ] Set up custom domain in Vercel
- [ ] Configure SSL certificate
- [ ] Test all payment flows with real money (small amounts)
- [ ] Add terms of service and privacy policy
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure backup strategy for Supabase
- [ ] Test on mobile devices
- [ ] Run security audit
- [ ] Set up analytics (e.g., Google Analytics)

## Maintenance

### Regular Tasks

1. **Monitor bKash payments** - Check for failed transactions
2. **Review user feedback** - Fix reported issues
3. **Update papers** - Add new exam papers regularly
4. **Database backups** - Supabase handles this, but verify
5. **Security updates** - Keep dependencies updated

### Updating the Site

1. Make changes locally
2. Test thoroughly
3. Commit and push to GitHub
4. Vercel automatically deploys

## Support

For issues:
- Supabase: [support@supabase.com](mailto:support@supabase.com)
- Vercel: [support@vercel.com](mailto:support@vercel.com)
- bKash: Check merchant portal for support contacts

## Cost Estimates

### Free Tier Limits
- **Vercel**: Free for hobby projects
- **Supabase**: Free for up to 500MB database, 1GB file storage
- **bKash**: Transaction fees apply (typically 1-2%)

### Scaling
- Upgrade Supabase when you exceed free tier
- Vercel Pro: $20/month for production features
- Consider CDN for large files
