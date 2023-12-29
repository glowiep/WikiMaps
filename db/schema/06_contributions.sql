DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE "contributions" (
  id SERIAL PRIMARY KEY,
  "users_id" INTEGER REFERENCES users(id),
  "map_id" INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  points_id INTEGER REFERENCES points(id) ON DELETE CASCADE
);
