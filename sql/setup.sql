-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS ledger CASCADE;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY
);

CREATE TABLE profiles (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id uuid REFERENCES users(user_id) UNIQUE,
    key_pair TEXT NOT NULL,
    public_key TEXT NOT NULL,
    private_key TEXT NOT NULL,
    balance BIGINT NOT NULL
);

CREATE TABLE transactions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount BIGINT NOT NULL,
    sender_id uuid REFERENCES users(user_id),
    receiver_id uuid REFERENCES users(user_id),
    signature TEXT NOT NULL
);

CREATE TABLE ledger (
    previous_hash TEXT NOT NULL,
    current_hash TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    transactions TEXT [],
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

INSERT INTO ledger(
    previous_hash,
    current_hash
)
VALUES(
    0000,
    0000
)
