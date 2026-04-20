# Customer Ops Platform

## What The Product Does

An internal and customer-facing operations system for a service business.

Customers can:

- sign up and log in
- open support tickets
- view order and service history
- receive status updates

Staff can:

- manage tickets and orders
- triage urgent issues
- send notifications
- review audit history
- monitor system health

## Stack

- Next.js for the frontend
- NestJS for the API and workers
- PostgreSQL for core relational data
- MongoDB for flexible activity logs and audit records
- Redis for queues, caching, and rate limiting
- Email, SMS, and push notifications
- Vercel for the web app
- Railway for the API, workers, and background jobs

## Why It Exists

This is the only capstone in the playbook. Month 6 is where the learner combines everything they practiced in the mini projects.

The capstone should pull together the project patterns from earlier months:

- support intake
- order sync
- queue dashboard
- notification routing
- release readiness

## Final Product Spec

See [spec.md](./spec.md).

## Architecture And Deployment

- [Architecture notes](./architecture.md)
- [Deployment notes](./deployment.md)
