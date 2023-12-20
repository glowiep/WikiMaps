DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE "images" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  images_url VARCHAR(255),
  points_id INTEGER REFERENCES points(id)
);
