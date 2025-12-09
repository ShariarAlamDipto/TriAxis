-- Update purchases table to support booklets and delivery info
ALTER TABLE purchases ADD COLUMN booklet_id UUID REFERENCES booklets(id) ON DELETE SET NULL;
ALTER TABLE purchases ADD COLUMN address TEXT;
ALTER TABLE purchases ADD COLUMN delivery_charge DECIMAL(10, 2) DEFAULT 0;
ALTER TABLE purchases ALTER COLUMN paper_id DROP NOT NULL;

-- Update user profiles
ALTER TABLE user_profiles ADD COLUMN address TEXT;
ALTER TABLE user_profiles ADD COLUMN phone TEXT;
