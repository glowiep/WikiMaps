-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE "maps" (
  "id" SERIAL PRIMARY KEY NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "modified_date" TIMESTAMP,
  "creation_date" TIMESTAMP NOT NULL DEFAULT NOW(),
  "private" BOOLEAN NOT NULL DEFAULT 0,
  "creator_id" INTEGER REFERENCES users(id) ON DELETE CASCADE
);
