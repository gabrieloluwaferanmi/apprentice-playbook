## Schema Explanation

### Orders Table
Stores order data fetched from the external API.

- external_id is unique to prevent duplicate orders during repeated syncs.

### Sync Runs Table
Tracks each sync attempt.

- status shows if the sync succeeded or failed.
- error_message helps debug failures.

### Design Choice
I separated orders and sync runs so that syncing logic does not affect stored data.

This allows safe retries without duplicating records.