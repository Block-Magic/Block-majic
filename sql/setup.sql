-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4()
)