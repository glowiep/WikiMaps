DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE "contributions" (
  id SERIAL PRIMARY KEY,
  "users_id" INTEGER REFERENCES users(id),
  "map_id" INTEGER REFERENCES maps(id),
  points_id INTEGER REFERENCES points(id)
);
