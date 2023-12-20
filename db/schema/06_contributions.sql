DROP TABLE IF EXISTS contributions CASCADE;

CREATE TABLE "contributions" (
  id SERIAL PRIMARY KEY,
  "users_id" INTEGER REFERENCES user(id),
  "map_id" INTEGER REFERENCES maps(id),
  point_modified_date TIMESTAMP REFERENCES points(modified_date),
  point_creation_date TIMESTAMP REFERENCES points(creation_date)
);
