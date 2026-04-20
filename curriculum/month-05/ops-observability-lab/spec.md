# Release Health Lab - Product Specification

## Product Goal

Create a small production-ready learning service that can be built, tested, deployed, and debugged with confidence.

## Target User

- platform engineer
- backend engineer
- apprentice learning release discipline

## Final Experience

The service:

- builds in CI
- runs in a container
- exposes a health endpoint
- emits structured logs
- can be deployed and smoke-tested

The app itself should stay intentionally small: one route, one job, or one status view is enough.

## Product Surface

- `GET /health` returns a simple health check
- `GET /` or `GET /status` shows a minimal release status view
- one background job or webhook handler is enough if a route is not needed

## Workflow

1. Build the container locally.
2. Run the test suite in CI.
3. Deploy the app to Vercel or Railway depending on the slice.
4. Inspect logs when the build or runtime fails.
5. Use AI to summarize the failure, then verify against the raw output.

## Core Features

- Dockerized app or service
- GitHub Actions workflow
- unit or integration tests
- health check endpoint
- structured logs for debugging and load testing
- one deployment target for the frontend and one for the API or worker

## AI Integration

- AI can summarize failing logs or CI output
- AI can suggest likely causes for a production issue
- human verification is required against the raw logs

## Out Of Scope

- production observability platform
- metrics warehouse
- complex infra automation

## Success Criteria

- the app ships through CI
- the learner can explain the deploy path
- the logs make the problem obvious
- the project feels like a release exercise, not a platform project
- the service stays small enough to finish in the month
