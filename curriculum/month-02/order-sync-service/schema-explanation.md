# Schema Explanation – Order Ingestion Service

## Overview
This schema is designed for an order ingestion system that pulls data from an external API and stores it in a local PostgreSQL database. It also tracks each sync operation to ensure reliability and debuggability.

---

## 1. Orders Table

### Purpose
The `orders` table stores all business data coming from the external system.

### Key Fields

- `id`: Primary key used to uniquely identify each record.
- `external_id`: Unique identifier from the external API.
- `customer_name`: Name of the customer who placed the order.
- `amount`: Monetary value of the order.
- `status`: Current state of the order (e.g. pending, completed, failed).
- `created_at`: Timestamp when the order was created.
- `updated_at`: Timestamp for last update.

### Key Design Decisions

- **external_id is UNIQUE**  
  This prevents duplicate orders when syncing multiple times (idempotency).

- **amount uses DECIMAL(10,2)**  
  This ensures accurate financial representation without floating point errors.

- **Status constraint (optional improvement)**  
  Limits values to valid states for data consistency.

---

## 2. Sync Runs Table

### Purpose
The `sync_runs` table tracks each attempt to sync data from the external API.

### Key Fields

- `id`: Primary key for each sync attempt.
- `started_at`: When the sync process began.
- `finished_at`: When the sync process ended.
- `status`: Outcome of the sync (success, failed, running).
- `error_message`: Stores failure details if something goes wrong.

### Key Design Decisions

- This table allows **debugging and observability** of the sync process.
- Each sync run is independent, making retries safe and traceable.

---

## 3. Indexing Strategy

### Index on external_id
```sql
CREATE INDEX idx_orders_external_id ON orders(external_id);