DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE "points" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "description" TEXT,
  "modified_date" TIMESTAMP,
  "creation_date" TIMESTAMP DEFAULT NOW(),
  "latitude" VARCHAR(255),
  "longitude" VARCHAR(255),
  "image_url" VARCHAR(255),
  "map_id" INTEGER REFERENCES maps(id) ON DELETE CASCADE
  -- "point_icon_id" INTEGER REFERENCES points_icons(id) ON DELETE CASCADE
);
