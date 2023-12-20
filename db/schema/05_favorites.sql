DROP TABLE IF EXISTS favorites CASCADE;

CREATE TABLE "favorites" (
  id SERIAL PRIMARY KEY,
  "user_id" INTEGER REFERENCES users(id),
  "map_id" INTEGER REFERENCES maps(id)
);
