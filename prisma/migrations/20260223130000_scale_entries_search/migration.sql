-- Enable fast tag and full-text search for large entry volumes.

-- Add a tsvector column that stores searchable body text.
ALTER TABLE "Entry"
ADD COLUMN IF NOT EXISTS "searchVector" tsvector;

-- Keep searchVector in sync on insert/update.
CREATE OR REPLACE FUNCTION "Entry_search_vector_update"()
RETURNS trigger AS $$
BEGIN
  NEW."searchVector" := to_tsvector('simple', coalesce(NEW."body", ''));
  RETURN NEW;
END
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS "Entry_search_vector_trigger" ON "Entry";

CREATE TRIGGER "Entry_search_vector_trigger"
BEFORE INSERT OR UPDATE OF "body"
ON "Entry"
FOR EACH ROW
EXECUTE FUNCTION "Entry_search_vector_update"();

-- Backfill existing rows once.
UPDATE "Entry"
SET "searchVector" = to_tsvector('simple', coalesce("body", ''))
WHERE "searchVector" IS NULL;

-- Indexes for scale.
CREATE INDEX IF NOT EXISTS "Entry_searchVector_gin_idx" ON "Entry" USING GIN ("searchVector");
CREATE INDEX IF NOT EXISTS "Entry_tags_gin_idx" ON "Entry" USING GIN ("tags");
CREATE INDEX IF NOT EXISTS "Entry_createdAt_id_desc_idx" ON "Entry" ("createdAt" DESC, "id" DESC);
