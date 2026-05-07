-- Orders table: stores all orders from external API
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  external_id TEXT UNIQUE NOT NULL,
  customer_name TEXT,
  amount DECIMAL(10,2),
  status TEXT CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sync runs table: tracks each sync attempt
CREATE TABLE sync_runs (
  id SERIAL PRIMARY KEY,
  started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP,
  status TEXT CHECK (status IN ('success', 'failed', 'running')),
  error_message TEXT
);

-- Indexes for performance
CREATE INDEX idx_orders_external_id ON orders(external_id);
CREATE INDEX idx_sync_runs_status ON sync_runs(status);