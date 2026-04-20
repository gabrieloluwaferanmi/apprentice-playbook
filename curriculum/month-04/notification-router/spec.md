# Notification Delivery Router - Product Specification

## Product Goal

Send the right message through the right channel while respecting user preferences, security controls, and delivery retries.

## Target User

- backend engineer
- operations engineer
- apprentice learning auth and notifications

## Final Experience

The service:

- accepts a notification event
- chooses email, SMS, or push
- respects opt-in settings
- queues outbound work
- records delivery results

The first release should support one event source and one preference model, not a generalized notification platform.

## Product Surface

- `POST /notifications` accepts a notification event
- `GET /notifications/:id` returns the delivery status
- `GET /users/:id/preferences` returns routing preferences
- `POST /webhooks/:provider` accepts delivery callbacks

## Workflow

1. Receive a notification event from the app.
2. Resolve the user preference and channel choice.
3. Queue the message for delivery.
4. Send through the provider adapter.
5. Persist the delivery outcome and any retry state.

## Core Features

- notification preference model in PostgreSQL
- Redis-backed queue or job workflow
- provider adapters for email, SMS, and push
- secure secret management
- delivery logs and retry support
- one testable delivery path for each channel, even if some providers are mocked

## AI Integration

- AI can draft notification copy from a structured event payload
- AI can suggest a delivery channel
- all AI output must be checked against business rules

## Out Of Scope

- campaign scheduling
- marketing automation
- user-facing notification preferences UI
- rich template editors

## Success Criteria

- messages go out through the correct provider
- failures are visible and retryable
- secrets are never committed to source control
- the learner can explain channel selection and retry strategy
- the product stays focused on one event source and one delivery loop
