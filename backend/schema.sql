CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(160) NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'From the kitchen',
  media_type VARCHAR(10) NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(160) NOT NULL,
  media_url TEXT NOT NULL,
  media_type VARCHAR(10) NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  reservation_date DATE NOT NULL,
  reservation_time VARCHAR(20) NOT NULL,
  members SMALLINT NOT NULL CHECK (members BETWEEN 1 AND 30),
  note VARCHAR(500) NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS reservations_date_idx ON reservations (reservation_date DESC, created_at DESC);

CREATE TABLE IF NOT EXISTS site_settings (
  setting_key VARCHAR(80) PRIMARY KEY,
  setting_value TEXT NOT NULL DEFAULT ''
);
