DROP TABLE IF EXISTS points_icons CASCADE;

CREATE TABLE "points_icons" (
  "id" SERIAL PRIMARY KEY,
  "point_type" VARCHAR(255),
  "icon_url" VARCHAR(255)
);
