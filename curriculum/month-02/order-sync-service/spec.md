# Order Ingestion Service - Product Specification

## Product Goal

Sync order records from an external provider into the company's database in a way that is safe to rerun and easy to debug.

## Target User

- backend engineer
- operations engineer
- apprentice learning data modeling

## Final Experience

The system:

- fetches orders from an external API
- normalizes records into PostgreSQL
- tracks sync runs and failures
- retries failed work safely

The product should only sync one source system and one primary entity type in the first version.

## Product Surface

- `POST /sync-runs` starts a manual sync
- `GET /sync-runs/:id` shows sync status and failures
- `GET /orders` returns the stored orders for verification

## Workflow

1. Trigger a sync run.
2. Fetch paginated data from the external API.
3. Normalize and write one order type into PostgreSQL.
4. Record success or failure in Redis-backed run state or a sync log table.
5. Inspect the run status endpoint.

## Core Features

- external API client with pagination
- PostgreSQL tables for orders and sync metadata
- Redis queue or job mechanism
- idempotent writes
- observable failure handling
- one manual sync trigger
- one sync status or history view, not a full dashboard

## AI Integration

- AI suggests a first-pass field mapping from the external payload
- AI can draft a sync report
- all generated mappings must be checked against the real API response

## Out Of Scope

- customer-facing UI
- multiple source systems
- search across years of data
- payments
- CRM features

## Success Criteria

- repeated syncs do not duplicate data
- failures are visible
- the learner can explain the schema and retry strategy
- the project stays focused on one business object and one integration
- the implementation stays within one ingestion loop and one status loop
