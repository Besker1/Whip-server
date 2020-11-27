ALTER TABLE recipes_table
  DROP COLUMN IF EXISTS author_id;

DROP TABLE IF EXISTS recipes_users;
