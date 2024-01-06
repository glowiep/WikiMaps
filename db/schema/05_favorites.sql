DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE "favorites" (
  id SERIAL PRIMARY KEY NOT NULL,
  "user_id" INTEGER REFERENCES users(id) ON DELETE CASCADE,
  "map_id" INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
-- Constraint to make sure users cannot have multiple records of a single map being a favorite
ALTER TABLE "favorites"
ADD CONSTRAINT unique_favorites UNIQUE ("user_id", "map_id");