# Order Ingestion Service

## What The Product Does

A NestJS service that pulls order data from one third-party API, stores it in PostgreSQL, and tracks sync state in Redis.

## Stack

- NestJS
- PostgreSQL
- Redis
- REST API integration
- background sync jobs
- one-way data sync, not a full integration platform

## Why It Exists

This is the Month 2 project because it teaches:

- schema design
- API integration
- retry-safe async processing
- relational thinking

## Final Product Spec

See [spec.md](./spec.md).
