# @corsair-dev/gemini

Corsair plugin for Google Gemini & Veo.

## Auth setup

API-key only for the Generative Language API (`https://generativelanguage.googleapis.com/v1beta`).

Missing credentials throw `AuthMissingError` (never an empty string).

## Endpoint overview

8 operations: count tokens, embed content, generate content, generate image (Nano Banana), generate videos (Veo), get video operation, list models, wait for video.

## Tests

```bash
pnpm --filter @corsair-dev/gemini test
```
