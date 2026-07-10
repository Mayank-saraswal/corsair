# @corsair-dev/googlebigquery

Corsair plugin for **Google BigQuery** (OAuth 2.0).

## Auth setup

**OAuth 2.0 Bearer** only (not a single static API key).

| Credential | Env var (tests / demo) | Purpose |
|------------|------------------------|---------|
| Access token | `GOOGLE_ACCESS_TOKEN` | Short-lived Bearer token for BigQuery API |
| Project ID | `GOOGLE_BIGQUERY_TEST_PROJECT_ID` | GCP project with BigQuery API enabled |
| Client ID | `GOOGLE_CLIENT_ID` | OAuth client (full integration tests) |
| Client secret | `GOOGLE_CLIENT_SECRET` | OAuth client secret |
| Refresh token | `GOOGLE_REFRESH_TOKEN` | Offline refresh (`access_type=offline`) |
| Corsair KEK | `CORSAIR_KEK` | Only for full Corsair integration tests |

Required OAuth scope: `https://www.googleapis.com/auth/bigquery`

Missing credentials throw `AuthMissingError` (never an empty string). Access tokens are refreshed proactively with a ~5 minute expiry buffer when refresh credentials are available.

### Quick access token for demos (gcloud)

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud auth print-access-token
```

Enable BigQuery API: https://console.cloud.google.com/apis/library/bigquery.googleapis.com

## Endpoint overview

**63 operations** across:

1. Queries / jobs  
2. Datasets  
3. Tables  
4. Routines  
5. IAM / row access / data policies  
6. Connections  
7. Reservations  
8. Analytics Hub  
9. ML models / locations / projects  

## Tests

```bash
# Offline schema tests (NO credentials required)
pnpm --filter @corsair-dev/googlebigquery test
```

Live API tests run only when `GOOGLE_ACCESS_TOKEN` and `GOOGLE_BIGQUERY_TEST_PROJECT_ID` are set. Full integration tests also need client id/secret, refresh token, and `CORSAIR_KEK`.

## Live demo (R4 Loom recording)

```bash
# PowerShell
$env:GOOGLE_ACCESS_TOKEN = "ya29...."   # from: gcloud auth print-access-token
$env:GOOGLE_BIGQUERY_TEST_PROJECT_ID = "YOUR_PROJECT_ID"
pnpm --filter @corsair-dev/googlebigquery demo

# bash
export GOOGLE_ACCESS_TOKEN="$(gcloud auth print-access-token)"
export GOOGLE_BIGQUERY_TEST_PROJECT_ID=YOUR_PROJECT_ID
pnpm --filter @corsair-dev/googlebigquery demo
```

Or: `node packages/googlebigquery/scripts/demo.mjs`

Record the successful run with [Loom](https://www.loom.com/), paste the `https://www.loom.com/share/...` URL into the PR under **Screenshots / Demos**, and never commit tokens.
