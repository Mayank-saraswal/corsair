# @corsair-dev/heygen

Corsair plugin for [HeyGen](https://www.heygen.com) AI video generation, interactive avatars, TTS, templates, assets, and webhooks.

## Auth setup

API-key only. Send credentials as the `X-Api-Key` header.

```ts
import { heygen } from '@corsair-dev/heygen';

const plugin = heygen({ /* key from Corsair key context, or options.key */ });
```

Missing keys throw `AuthMissingError` (never an empty string).

- Standard API host: `https://api.heygen.com`
- Binary uploads: `https://upload.heygen.com`

## Endpoint overview

Covers video generation, avatars/talking photos, Starfish TTS, interactive streaming, knowledge bases, templates/assets/folders, webhooks/quota, plus verified HeyGen v3 surfaces (video agents, brand kits, lipsync, hyperframes, AI clipping, etc.).

## Tests

```bash
pnpm --filter @corsair-dev/heygen test
```

Schema fixtures cover every operation. Live smoke tests require `HEYGEN_API_KEY`.
