# @corsair-dev/gemini

Corsair plugin for **Google Gemini** and **Veo** (Generative Language API `v1beta`).

## Auth setup

API-key only.

1. Create a key at [Google AI Studio](https://aistudio.google.com/apikey)
2. Set `GEMINI_API_KEY` in your environment, or pass the key via Corsair credentials

Requests use the `x-goog-api-key` header against  
`https://generativelanguage.googleapis.com/v1beta`.

Missing credentials throw `AuthMissingError` (never an empty string).

## Endpoint overview

| Operation | Operation ID | Path / method |
|-----------|--------------|---------------|
| `countTokens` | `GEMINI_COUNT_TOKENS` | `POST /models/{model}:countTokens` |
| `embedContent` | `GEMINI_EMBED_CONTENT` | `POST /models/{model}:embedContent` |
| `generateContent` | `GEMINI_GENERATE_CONTENT` | `POST /models/{model}:generateContent` |
| `generateImage` | `GEMINI_GENERATE_IMAGE` | `POST /models/{model}:generateContent` (IMAGE modality) |
| `generateVideos` | `GEMINI_GENERATE_VIDEOS` | `POST /models/{model}:predictLongRunning` |
| `getVideosOperation` | `GEMINI_GET_VIDEOS_OPERATION` | `GET /{operationName}` |
| `listModels` | `GEMINI_LIST_MODELS` | `GET /models` |
| `waitForVideo` | `GEMINI_WAIT_FOR_VIDEO` | Poll operation until done / error / timeout |

## Quirks & caveats

- **Model-scoped paths require `/models/`.** e.g. `/models/gemini-2.5-flash:generateContent` (not bare `/{model}:…`).
- **Image generation forces `responseModalities: ['IMAGE']`** after merging caller `generationConfig`, so callers cannot accidentally drop the IMAGE modality.
- **`generateContent` convenience field `text`** is the first candidate text with markdown fences stripped.
- **Veo is long-running.** `generateVideos` returns an operation name; use `getVideosOperation` or `waitForVideo` to poll. Video models may require special access / billing.
- **Image model IDs change** over time; use a model your project can access for image generation.

## Tests

```bash
pnpm --filter @corsair-dev/gemini test
```

Offline unit tests always run. Live API tests run only when `GEMINI_API_KEY` is set.

## Live demo (R4 Loom recording)

```bash
# PowerShell
$env:GEMINI_API_KEY = "..."
pnpm --filter @corsair-dev/gemini demo

# bash
export GEMINI_API_KEY=...
pnpm --filter @corsair-dev/gemini demo
```

Or: `node packages/gemini/scripts/demo.mjs`

Record the successful run with [Loom](https://www.loom.com/), paste the `https://www.loom.com/share/...` URL into the PR under **Screenshots / Demos**, then revoke the key used for the recording.
