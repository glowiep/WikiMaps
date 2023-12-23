DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE "points" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "modified_date" TIMESTAMP,
  "creation_date" TIMESTAMP,
  "latitude" VARCHAR(255),
  "longitude" VARCHAR(255),
  "map_id" INTEGER REFERENCES maps(id),
  "point_icon_id" INTEGER REFERENCES points_icons(id)
);
