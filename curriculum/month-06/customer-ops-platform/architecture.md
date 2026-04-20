# Architecture Notes

## Core Principle

Keep transactional data in PostgreSQL and flexible event or audit data in MongoDB.

## Responsibility Split

- Next.js handles the user experience and server-rendered pages.
- NestJS owns auth, business rules, validation, and API contracts.
- PostgreSQL stores users, orders, tickets, and permissions.
- MongoDB stores audit events, notification history, and document-style logs.
- Redis handles jobs, caching, rate limiting, and temporary state.

## Integration Pattern

- External APIs are called through a dedicated service layer.
- Notification sends go through a queue, not inline in the request path.
- Webhooks are idempotent and stored with a processed flag or event hash.

