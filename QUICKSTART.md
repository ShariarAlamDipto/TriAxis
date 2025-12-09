# Quick Start Guide

Get your Past Papers Archive up and running in minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- A text editor (VS Code recommended)

## 5-Minute Setup

### Step 1: Install Dependencies (1 min)

Open terminal in project directory:

```bash
npm install
```

### Step 2: Set Up Environment Variables (2 min)

1. Copy `.env.example` to `.env.local`
2. Sign up at [supabase.com](https://supabase.com)
3. Create a new project
4. Go to Settings → API
5. Copy URL and anon key to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 3: Set Up Database (2 min)

1. In Supabase dashboard, go to SQL Editor
2. Copy contents of `supabase/migrations/001_initial_schema.sql`
3. Paste and click "Run"
4. Repeat for `002_rls_policies.sql` and `003_triggers.sql`

### Step 4: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Create Your Account

1. Click "Sign Up"
2. Enter your email and password
3. You'll be redirected to the home page

### 2. Make Yourself Admin

In Supabase SQL Editor:

```sql
UPDATE user_profiles
SET is_admin = true
WHERE id = (SELECT id FROM auth.users WHERE email = 'your-email@example.com');
```

### 3. Add Your First Subject

1. Log in to your account
2. Go to "Admin Panel"
3. Click "Subjects"
4. Add subjects like "Mathematics", "Physics", etc.

### 4. Upload Your First Paper

1. In Admin Panel, click "Papers"
2. Click "Add Paper"
3. Fill in the details:
   - Select subject
   - Select exam type (O-Level, A-Level, IAL)
   - Enter year
   - Enter title
   - Upload PDF file
   - (Optional) Upload cover image
4. Click "Add Paper"

### 5. Browse as a User

1. Log out or open in incognito window
2. Click "Browse Papers"
3. See your uploaded paper!

## Setting Up Storage (Required for File Uploads)

In Supabase SQL Editor:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('papers', 'papers', true), ('covers', 'covers', true);

-- Allow public reads
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id IN ('papers', 'covers'));

-- Allow admin uploads
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id IN ('papers', 'covers') AND
  EXISTS (SELECT 1 FROM user_profiles WHERE id = auth.uid() AND is_admin = true)
);
```

## Testing Without bKash (For Development)

You can skip bKash setup for now and just use free papers:

1. When adding papers, leave "Premium Content" unchecked
2. Papers will be free to download
3. Add bKash later when ready for production

## Setting Up bKash (For Production)

### Option 1: Sandbox (Testing)

1. Contact bKash for sandbox credentials
2. Add to `.env.local`:

```env
BKASH_BASE_URL=https://tokenized.sandbox.bka.sh/v1.2.0-beta
BKASH_APP_KEY=your-sandbox-key
BKASH_APP_SECRET=your-sandbox-secret
BKASH_USERNAME=your-sandbox-username
BKASH_PASSWORD=your-sandbox-password
```

### Option 2: Production

1. Register as bKash merchant at [merchant.bka.sh](https://merchant.bka.sh)
2. Get approved (may take a few days)
3. Use production credentials in `.env.local`

## Common Issues

### "Cannot connect to Supabase"
- Check your URL and anon key are correct
- Make sure project is not paused (free tier auto-pauses after 1 week inactivity)

### "Permission denied" when uploading
- Make sure you're logged in as admin
- Verify storage policies are created
- Check storage buckets exist

### "Cannot find module"
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall

### Pages not updating
- Stop the dev server (Ctrl+C)
- Delete `.next` folder
- Run `npm run dev` again

## Next Steps

Once you have the basics working:

1. **Customize Design**: Edit `app/globals.css` and Tailwind classes
2. **Add More Subjects**: Build your subject library
3. **Upload Papers**: Start building your paper collection
4. **Deploy**: Follow `DEPLOYMENT.md` to deploy to Vercel
5. **Go Live**: Set up bKash and start accepting payments

## Getting Help

- Check `DEVELOPMENT.md` for development tips
- See `DEPLOYMENT.md` for production deployment
- Review `README.md` for full documentation
- Check Supabase docs: [supabase.com/docs](https://supabase.com/docs)
- Check Next.js docs: [nextjs.org/docs](https://nextjs.org/docs)

## Recommended Development Flow

1. Start with free papers only
2. Test browsing and downloading
3. Add a few subjects and papers
4. Test admin functions
5. Deploy to Vercel
6. Add bKash for payments
7. Start with a few premium papers
8. Gradually build your collection

Happy coding! 🚀
