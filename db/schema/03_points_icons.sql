DROP TABLE IF EXISTS points_icons CASCADE;

CREATE TABLE "points_icons" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "point_type" VARCHAR(255),
  "icon_url" VARCHAR(255)
);
-- This table might not be needed