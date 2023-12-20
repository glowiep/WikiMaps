-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE "maps" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "modified_date" TIMESTAMP,
  "creation_date" TIMESTAMP,
  "private" BOOLEAN,
  "creator_id" INTEGER REFERENCES users(id)
);
