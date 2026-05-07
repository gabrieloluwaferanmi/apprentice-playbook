-- Orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  external_id TEXT UNIQUE,
  customer_name TEXT,
  amount DECIMAL,
  status TEXT,
  created_at TIMESTAMP
);

-- Sync runs table
CREATE TABLE sync_runs (
  id SERIAL PRIMARY KEY,
  started_at TIMESTAMP,
  finished_at TIMESTAMP,
  status TEXT,
  error_message TEXT
);