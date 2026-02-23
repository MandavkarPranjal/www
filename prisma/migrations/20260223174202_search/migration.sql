-- DropIndex
DROP INDEX "Entry_searchVector_gin_idx";

-- RenameIndex
ALTER INDEX "Entry_createdAt_id_desc_idx" RENAME TO "Entry_createdAt_id_idx";

-- RenameIndex
ALTER INDEX "Entry_tags_gin_idx" RENAME TO "Entry_tags_idx";
