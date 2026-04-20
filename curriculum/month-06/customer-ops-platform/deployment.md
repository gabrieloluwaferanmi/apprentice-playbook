# Deployment Notes

## Vercel

Deploy the Next.js frontend to Vercel so learners get preview deployments on every pull request.

## Railway

Deploy the NestJS API and worker processes to Railway so the backend and jobs run in a production-like environment.

## Release Flow

1. Merge into the protected main branch.
2. Vercel builds the frontend.
3. Railway deploys the API and workers.
4. Smoke test the core user flow.

