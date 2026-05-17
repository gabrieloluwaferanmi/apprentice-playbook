# Schema Explanation – Order Ingestion Service

## Overview

This schema supports an Order Ingestion Service built with MySQL, Express, and Node.js.

The system simulates how backend services ingest order data from an external API, persist the data in a relational database, and track synchronization operations for observability and debugging.

The database is designed to support:

* order storage
* synchronization tracking
* duplicate prevention
* relational integrity
* efficient querying

---

# 1. Orders Table

## Purpose

The `orders` table stores all synchronized order data received from the simulated external API.

Each record represents a single customer order.

---

## Key Fields

| Field           | Purpose                                                      |
| --------------- | ------------------------------------------------------------ |
| `id`            | Internal primary key for each order                          |
| `external_id`   | Unique identifier from the external system                   |
| `customer_name` | Name of the customer                                         |
| `amount`        | Monetary value of the order                                  |
| `status`        | Current order state                                          |
| `sync_run_id`   | References the synchronization run responsible for ingestion |
| `created_at`    | Timestamp when order was created                             |
| `updated_at`    | Timestamp when order was last updated                        |

---

## Key Design Decisions

### Unique External ID

```sql
external_id UNIQUE
```

The external ID is unique to support idempotency and prevent duplicate order insertion during repeated synchronization runs.

---

### ENUM Status Values

```sql
ENUM('pending', 'completed', 'failed')
```

This restricts status values to valid business states and improves data consistency.

---

### Financial Precision

```sql
DECIMAL(10,2)
```

Used for accurate monetary storage while avoiding floating-point precision issues.

---

### Foreign Key Relationship

```sql
FOREIGN KEY (sync_run_id)
REFERENCES sync_runs(id)
```

This establishes a relationship between orders and synchronization runs.

It allows the system to track which sync operation inserted specific orders.

---

# 2. Sync Runs Table

## Purpose

The `sync_runs` table tracks each synchronization attempt performed by the ingestion service.

This improves observability and enables debugging of ingestion workflows.

---

## Key Fields

| Field           | Purpose                                 |
| --------------- | --------------------------------------- |
| `id`            | Primary key for synchronization runs    |
| `started_at`    | Timestamp when sync operation began     |
| `finished_at`   | Timestamp when sync operation completed |
| `status`        | Current sync state                      |
| `error_message` | Stores failure/debugging information    |

---

## Key Design Decisions

### Sync Tracking

Each synchronization operation is stored independently.

This allows:

* traceability
* debugging
* monitoring
* retry support

---

### ENUM Status Values

```sql
ENUM('success', 'failed', 'running')
```

Ensures synchronization states remain valid and predictable.

---

# 3. Indexing Strategy

## Orders External ID Index

```sql
CREATE INDEX idx_orders_external_id
ON orders(external_id);
```

Improves lookup speed for order synchronization and duplicate detection.

---

## Sync Run Status Index

```sql
CREATE INDEX idx_sync_runs_status
ON sync_runs(status);
```

Optimizes filtering and querying synchronization operations by status.

---

# 4. Backend Integration

The schema integrates with an Express backend service that exposes REST API endpoints.

## API Endpoints

### GET /orders

Retrieves all synchronized orders from MySQL.

### POST /sync-orders

Simulates ingestion of external orders by:

1. creating a synchronization run
2. inserting new orders
3. preventing duplicates
4. updating synchronization status

---

# 5. Outcome

This schema provides a lightweight but production-inspired relational foundation for:

* ingestion workflows
* synchronization tracking
* backend API integration
* idempotent order processing
* relational data management
