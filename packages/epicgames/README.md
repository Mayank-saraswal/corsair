# @corsair-dev/epicgames

Corsair plugin for **Epic Games** surfaces claimed on [corsair.dev/oss/epic_games](https://corsair.dev/oss/epic_games):

1. **Fortnite Creative islands & metrics** (ecosystem API)
2. **Unreal Engine Web Remote Control** (local or networked UE instance)

Package folder is `epicgames` (alphanumeric) while the OSS slug is `epic_games`.

## Auth setup

**OAuth 2.0** (claim auth type). Island/metrics calls send:

```http
Authorization: Bearer <access_token>
```

```ts
import { epicgames } from '@corsair-dev/epicgames';

// Access token from Corsair key context
const plugin = epicgames();

// Scripts / demos
const pluginWithToken = epicgames({
  key: process.env.EPIC_GAMES_ACCESS_TOKEN,
  // Optional: Unreal Remote Control host
  remoteControlBaseUrl: 'http://127.0.0.1:30010',
});
```

Missing tokens throw `AuthMissingError('epicgames', 'oauth_2')`.

| Surface | Default base | Auth |
| --- | --- | --- |
| Islands / metrics | `https://api.fortnite.com/ecosystem/v1` | Bearer required |
| Remote Control | `http://127.0.0.1:30010` | Optional Bearer (`remoteControlBearer`) |

## Endpoint overview (28 ops)

| Domain | Count | Examples |
| --- | --- | --- |
| **Islands** | 11 | list, get, metrics by interval, plays, unique players, minutes, avg minutes, peak CCU, favorites, recommendations, retention |
| **Remote Control** | 17 | session, batch, CORS OPTIONS, presets (CRUD metadata/properties/functions), UObject describe/call/property/thumbnail/events |

## Error handling

- `RATE_LIMIT_ERROR` — HTTP 429; retries with `Retry-After` when present
- `AUTH_ERROR` — HTTP 401; no retry
- `DEFAULT` — always last after caller overrides

## Provider quirks

- Fortnite Data API OpenAPI: https://api.fortnite.com/ecosystem/v1/docs  
  Paths: `/islands`, `/islands/{code}`, `/islands/{code}/metrics[/{interval}[/{metric}]]`
- List pagination: cursor `after` / `before` + `size` (not offset)
- Metric range: query `from` / `to` (ISO date-time); interval path: `day` | `hour` | `minute`
- Historical data limited to ~7 days; islands need ≥5 unique players or metric values are null
- OpenAPI security is OAuth2 client-credentials; many GETs currently work unauthenticated
- Remote Control experimental event wait needs `WebControl.EnableExperimentalRoutes=1` in UE
- Safe logging: island codes / preset names only — never tokens

## Tests

```bash
# Offline schema fixtures — NO key required
pnpm --filter @corsair-dev/epicgames test

# Optional live public API tests (still no key — Fortnite Data API is public)
$env:EPIC_GAMES_LIVE = "1"
pnpm --filter @corsair-dev/epicgames test
```

OAuth token env vars are optional for island GETs. Set `EPIC_GAMES_ACCESS_TOKEN` only if you have client-credentials later.

## Live demo (R4 Loom) — no key required

The Fortnite Data API public endpoints power the demo:

```bash
# From monorepo root — no EPIC_GAMES_ACCESS_TOKEN needed
pnpm --filter @corsair-dev/epicgames demo
```

Record the terminal showing `islands.list` + `islands.get` + `metrics/.../plays`.  
Remote Control step soft-skips if Unreal Editor is not running locally (that is fine for R4).

## Links

- OSS claim: https://corsair.dev/oss/epic_games
- Issue: https://github.com/corsairdev/corsair/issues/472
- Fortnite docs: https://dev.epicgames.com/documentation/fortnite/fortnite-documentation
- Package: `@corsair-dev/epicgames`
