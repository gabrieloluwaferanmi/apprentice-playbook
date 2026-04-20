# Customer Ops Platform - Product Specification

## Product Goal

Deliver a complete customer operations system that unifies support intake, order history, notifications, and staff workflows.

## Target User

- customer
- support agent
- operations manager
- internal admin

## Final Experience

Customers can:

- sign in
- view orders and service history
- open and track support requests
- receive updates through notifications

Staff can:

- triage requests
- review audit history
- manage records
- monitor system health

## Product Surface

- `GET /login` or an equivalent auth entry point
- `GET /dashboard` for the customer or staff landing experience
- `GET /orders/:id` for order history
- `GET /tickets/:id` for support details
- `POST /notifications` for outbound messages
- `GET /audit` for audit history

## Workflow

1. Sign in.
2. View a customer or staff dashboard.
3. Review an order, ticket, or support item.
4. Trigger or observe a notification.
5. Inspect the audit trail and release health.

## Core Features

- Next.js frontend
- NestJS API and workers
- PostgreSQL for transactional data
- MongoDB for audit and event records
- Redis for queues, caching, and rate limiting
- email, SMS, and push delivery
- Vercel deployment for the frontend
- Railway deployment for API and workers

## AI Integration

- AI-assisted support summaries
- AI-assisted message drafts
- AI-assisted ops summaries

All AI-generated content must be reviewed by a human before it affects customers.

## Success Criteria

- the product works end to end
- each data store has a clear purpose
- notifications are reliable and observable
- the team can explain the architecture and tradeoffs
- the product clearly connects the earlier mini projects into one coherent system
- the MVP can be built from the earlier month-by-month patterns without inventing a new platform
