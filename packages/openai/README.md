# @corsair-dev/openai

Corsair plugin for the OpenAI API (chat, embeddings, assistants, files, vector stores, audio, images, fine-tuning, batches, and more).

## Auth setup

API-key only. Credentials are sent as `Authorization: Bearer <key>`.

Missing keys throw `AuthMissingError` (never an empty string).

Base URL: `https://api.openai.com/v1`

## Endpoint overview

129 operations across 33 domains including Models, Chat Completions, Embeddings, Files, Assistants/Threads, Vector Stores, Audio, Images, Videos, Realtime, Fine-tuning, Batches, Uploads, and related APIs.

## Tests

```bash
pnpm --filter @corsair-dev/openai test
```

Live tests require `OPENAI_API_KEY`.
