-- 1. Create booklets table if it doesn't exist
CREATE TABLE IF NOT EXISTS booklets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  cover_image_url TEXT,
  exam_type_id UUID REFERENCES exam_types(id) ON DELETE SET NULL,
  subject_id UUID REFERENCES subjects(id) ON DELETE SET NULL,
  is_physical BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Update purchases table (Add columns if they don't exist)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'purchases' AND column_name = 'booklet_id') THEN
        ALTER TABLE purchases ADD COLUMN booklet_id UUID REFERENCES booklets(id) ON DELETE SET NULL;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'purchases' AND column_name = 'address') THEN
        ALTER TABLE purchases ADD COLUMN address TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'purchases' AND column_name = 'delivery_charge') THEN
        ALTER TABLE purchases ADD COLUMN delivery_charge DECIMAL(10, 2) DEFAULT 0;
    END IF;

    ALTER TABLE purchases ALTER COLUMN paper_id DROP NOT NULL;
END $$;

-- 3. Update user_profiles table
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'address') THEN
        ALTER TABLE user_profiles ADD COLUMN address TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'phone') THEN
        ALTER TABLE user_profiles ADD COLUMN phone TEXT;
    END IF;
END $$;

-- 4. Enable RLS on booklets
ALTER TABLE booklets ENABLE ROW LEVEL SECURITY;

-- 5. Create Secure Admin Function (Fixes Recursion)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM user_profiles
    WHERE id = auth.uid()
    AND is_admin = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Apply Policies using is_admin()

-- User Profiles
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;
CREATE POLICY "Admins can view all profiles" ON user_profiles FOR SELECT USING (is_admin());

-- Booklets
DROP POLICY IF EXISTS "Booklets are viewable by everyone" ON booklets;
CREATE POLICY "Booklets are viewable by everyone" ON booklets FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert booklets" ON booklets;
CREATE POLICY "Admins can insert booklets" ON booklets FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update booklets" ON booklets;
CREATE POLICY "Admins can update booklets" ON booklets FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete booklets" ON booklets;
CREATE POLICY "Admins can delete booklets" ON booklets FOR DELETE USING (is_admin());

-- Subjects
DROP POLICY IF EXISTS "Admins can insert subjects" ON subjects;
CREATE POLICY "Admins can insert subjects" ON subjects FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update subjects" ON subjects;
CREATE POLICY "Admins can update subjects" ON subjects FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete subjects" ON subjects;
CREATE POLICY "Admins can delete subjects" ON subjects FOR DELETE USING (is_admin());

-- Papers
DROP POLICY IF EXISTS "Admins can insert papers" ON papers;
CREATE POLICY "Admins can insert papers" ON papers FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update papers" ON papers;
CREATE POLICY "Admins can update papers" ON papers FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete papers" ON papers;
CREATE POLICY "Admins can delete papers" ON papers FOR DELETE USING (is_admin());

-- Purchases
DROP POLICY IF EXISTS "Admins can view all purchases" ON purchases;
CREATE POLICY "Admins can view all purchases" ON purchases FOR SELECT USING (is_admin());

-- 7. Fix Relationship between purchases and user_profiles
-- This is required for Supabase to detect the relationship between purchases and user_profiles
DO $$
BEGIN
  -- Drop the old constraint if it exists (referencing auth.users)
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'purchases_user_id_fkey' 
    AND table_name = 'purchases'
  ) THEN
    ALTER TABLE purchases DROP CONSTRAINT purchases_user_id_fkey;
  END IF;

  -- Add the new constraint referencing user_profiles
  -- This allows PostgREST to see the relationship
  ALTER TABLE purchases 
    ADD CONSTRAINT purchases_user_id_fkey 
    FOREIGN KEY (user_id) 
    REFERENCES user_profiles(id) 
    ON DELETE CASCADE;
END $$;
