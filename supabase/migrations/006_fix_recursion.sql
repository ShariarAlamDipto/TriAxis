-- Create a function to check if the current user is an admin
-- This function is SECURITY DEFINER, meaning it runs with the privileges of the creator
-- This allows it to bypass RLS on the user_profiles table to avoid infinite recursion
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

-- Drop the problematic policy causing recursion
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

-- Re-create the policy using the helper function
CREATE POLICY "Admins can view all profiles"
  ON user_profiles FOR SELECT
  USING (is_admin());

-- Update other admin policies to use the helper function for consistency
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

-- Booklets
DROP POLICY IF EXISTS "Admins can insert booklets" ON booklets;
CREATE POLICY "Admins can insert booklets" ON booklets FOR INSERT WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can update booklets" ON booklets;
CREATE POLICY "Admins can update booklets" ON booklets FOR UPDATE USING (is_admin());

DROP POLICY IF EXISTS "Admins can delete booklets" ON booklets;
CREATE POLICY "Admins can delete booklets" ON booklets FOR DELETE USING (is_admin());

