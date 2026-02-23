CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS "Entry_body_trgm_idx"
ON "Entry"
USING GIN ("body" gin_trgm_ops);
