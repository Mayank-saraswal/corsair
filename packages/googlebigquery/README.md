# @corsair-dev/googlebigquery

Corsair plugin for Google BigQuery.

## Auth setup

OAuth 2.0 Bearer token. Access tokens are refreshed proactively with a 5-minute buffer.

Missing credentials throw `AuthMissingError` (never an empty string).

## Endpoint overview

63 operations across queries, datasets, tables, routines, IAM, connections, reservations, Analytics Hub, and ML.

## Tests

```bash
pnpm --filter @corsair-dev/googlebigquery test
```
