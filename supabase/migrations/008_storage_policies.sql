-- Create storage buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('papers', 'papers', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

-- Note: storage.objects usually has RLS enabled by default. 
-- We skip ALTER TABLE to avoid "must be owner of table objects" errors.

-- Policies for 'papers' bucket

DROP POLICY IF EXISTS "Public Access to Papers" ON storage.objects;
CREATE POLICY "Public Access to Papers"
ON storage.objects FOR SELECT
USING ( bucket_id = 'papers' );

DROP POLICY IF EXISTS "Admins can upload papers" ON storage.objects;
CREATE POLICY "Admins can upload papers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'papers' AND
  (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = true
);

DROP POLICY IF EXISTS "Admins can update papers" ON storage.objects;
CREATE POLICY "Admins can update papers"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'papers' AND
  (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = true
);

DROP POLICY IF EXISTS "Admins can delete papers" ON storage.objects;
CREATE POLICY "Admins can delete papers"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'papers' AND
  (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = true
);

-- Policies for 'covers' bucket

DROP POLICY IF EXISTS "Public Access to Covers" ON storage.objects;
CREATE POLICY "Public Access to Covers"
ON storage.objects FOR SELECT
USING ( bucket_id = 'covers' );

DROP POLICY IF EXISTS "Admins can upload covers" ON storage.objects;
CREATE POLICY "Admins can upload covers"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'covers' AND
  (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = true
);

DROP POLICY IF EXISTS "Admins can update covers" ON storage.objects;
CREATE POLICY "Admins can update covers"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'covers' AND
  (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = true
);

DROP POLICY IF EXISTS "Admins can delete covers" ON storage.objects;
CREATE POLICY "Admins can delete covers"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'covers' AND
  (SELECT is_admin FROM public.user_profiles WHERE id = auth.uid()) = true
);
