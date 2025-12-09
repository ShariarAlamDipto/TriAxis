# Supabase Database Setup

## Overview
This directory contains SQL migrations for the Past Papers Archive database schema.

## Database Schema

### Tables

#### `subjects`
Stores academic subjects (e.g., Mathematics, Physics, Chemistry)
- `id`: UUID primary key
- `name`: Subject name (unique)
- `description`: Optional description

#### `exam_types`
Stores exam level types (O-Level, A-Level, IAL)
- `id`: UUID primary key
- `name`: Exam type name (unique)
- `description`: Optional description

#### `papers`
Stores past paper information
- `id`: UUID primary key
- `subject_id`: Foreign key to subjects
- `exam_type_id`: Foreign key to exam_types
- `year`: Exam year
- `title`: Paper title
- `paper_number`: Paper number (e.g., "Paper 1", "Paper 2")
- `file_url`: URL to PDF file in Supabase Storage
- `cover_image_url`: URL to cover image
- `is_premium`: Boolean flag for paid content
- `price`: Price in BDT (Bangladeshi Taka)

#### `user_profiles`
Extends auth.users with additional profile information
- `id`: UUID foreign key to auth.users
- `full_name`: User's full name
- `is_admin`: Admin flag

#### `purchases`
Tracks user purchases
- `id`: UUID primary key
- `user_id`: Foreign key to auth.users
- `paper_id`: Foreign key to papers
- `amount`: Purchase amount
- `payment_method`: Payment method used
- `transaction_id`: bKash transaction ID
- `payment_status`: Status (pending, completed, failed)

## Storage Buckets

Create these buckets in Supabase Storage:

1. **papers** - For storing PDF files
   - Public access for reading
   - Admin-only uploads

2. **covers** - For storing cover images
   - Public access for reading
   - Admin-only uploads

## Running Migrations

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run each migration file in order:
   - `001_initial_schema.sql`
   - `002_rls_policies.sql`
   - `003_triggers.sql`

## Creating Storage Buckets

Run these commands in Supabase SQL Editor:

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

## Creating First Admin User

After signing up your first user, make them an admin:

```sql
UPDATE user_profiles
SET is_admin = true
WHERE id = 'your-user-id-here';
```
