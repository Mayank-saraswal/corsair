# Corsair Gemini & Veo Integration Plugin (`packages/gemini/`)

You are developing the official **Google Gemini (including Nano Banana & Veo) API Plugin** for the Corsair OSS platform under our claimed GitHub Issue.

## 🎯 Scope of Work
Gemini requires exactly **8 operations** across text, embeddings, images (Nano Banana), and video generation (Veo):
1. **`GEMINI_COUNT_TOKENS`**: Count tokens in text using Gemini tokenization (cost estimation & input limit check).
2. **`GEMINI_EMBED_CONTENT`**: Generate numerical vector embeddings for semantic search and similarity comparison.
3. **`GEMINI_GENERATE_CONTENT`**: Generate text or speech audio from prompts using Gemini Flash/Pro. Note: Strip markdown fences (e.g., ` ```html...``` `) or explanatory prose before rendering/returning text from `results[i].response.data.text`.
4. **`GEMINI_GENERATE_IMAGE`**: Generate raster images (JPG/PNG/WebP) using Nano Banana models (`gemini-2.5-flash-image`, `gemini-3-pro-image-preview`, `gemini-2.0-flash-exp-image-generation`). Define output schema containing `s3url: z.string().optional()` or `content: z.unknown().optional()`.
5. **`GEMINI_GENERATE_VIDEOS`**: Generate text-to-video using Google Veo models (e.g., `veo-2.0-generate-001`). Returns an `operation_name` for status tracking.
6. **`GEMINI_GET_VIDEOS_OPERATION`** *(Deprecated)*: Check status of a Veo video generation operation using `operation_name`. Returns video URI at `generatedSamples[].video.uri` when `done=true`.
7. **`GEMINI_LIST_MODELS`**: Discover available Gemini and Veo models and their capabilities/limits.
8. **`GEMINI_WAIT_FOR_VIDEO`**: Polls Veo operation until completion and returns output containing `data.video_file.s3url`.

---

## 🏗️ Architecture & Engineering Strict Rules
1. **Zero Hallucination & Strict Typing:**
   - Define clean Zod input/output schemas in `schema/<domain>.ts`.
   - **NEVER** use `as any`, `as unknown as`, `@ts-ignore`, or `@ts-expect-error`.
   - If a fallback schema (e.g., `z.unknown()` or `.catchall(z.unknown())`) is required for undocumented fields or raw payloads, you **MUST** add a brief descriptive comment above it to satisfy team code review standards.
2. **Authentication & Client Configuration (`client.ts` & `index.ts`):**
   - Base URL: Google Gemini API standard endpoint (`https://generativelanguage.googleapis.com/v1beta`).
   - In `index.ts`, ensure `keyBuilder` throws an `AuthMissingError` (or standard Corsair auth error) if an API key/credential resolves to null/undefined. **NEVER** return an empty string `''` or swallow auth errors silently.
   - In `client.ts`, forward query parameters and headers unconditionally across all HTTP methods. If catching errors, preserve `ApiError` instances (do not re-wrap and drop status codes or retry headers).
3. **Registration:**
   - Register `gemini` cleanly in `packages/corsair/core/constants.ts` under `BaseProviders`, `ProviderDisplayNames`, and `AllProviders`.

---

## 🧪 Verification & QA Commands
Run these commands from the workspace root and ensure 100% clean output (0 errors) before opening a Pull Request:
```bash
pnpm --filter @corsair-dev/gemini typecheck
pnpm run validate:plugins
pnpm --filter @corsair-dev/gemini build
pnpm lint
```
