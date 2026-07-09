<!-- Copy-paste this entire file into GitHub PR #341 description (edit PR). -->
<!-- Replace YOUR_LOOM_URL after you record the demo. -->

## Description

Closes #339

Adds `@corsair-dev/deepseek`, implementing the **4 operations** requested in #339:

1. `chat.createCompletion` (`DEEPSEEK_CREATE_CHAT_COMPLETION`)
2. `anthropic.createMessage` (`DEEPSEEK_CREATE_ANTHROPIC_MESSAGE`)
3. `user.getBalance` (`DEEPSEEK_GET_USER_BALANCE`)
4. `models.list` (`DEEPSEEK_LIST_MODELS`)

### Implementation notes

- API-key-only auth (Bearer token); `keyBuilder` throws `AuthMissingError` when no key is available
- Query parameters forwarded for all HTTP methods
- No webhook support (not required for this integration)
- Registered in `BaseProviders`, `ProviderDisplayNames`, and `AllProviders`
- Package `README.md` documents auth, endpoints, and provider quirks (R7)
- Offline schema tests + live API tests (live tests skip without `DEEPSEEK_API_KEY`)
- `ApiError` is re-thrown unwrapped so 401/402/429/5xx handlers see real status + `retryAfter`

### Scope (R1)

Only:

- `packages/deepseek/**`
- `packages/corsair/core/constants.ts`
- `pnpm-lock.yaml`

## Checklist

- [x] I have run `pnpm lint` and all checks pass
- [x] I have run `pnpm typecheck` and there are no TypeScript errors
- [x] I have run `pnpm build` and all packages build successfully
- [x] I have run `pnpm test` and all tests pass
- [x] I have added or updated tests where applicable
- [x] I have added or updated necessary documentation

## Screenshots / Demos (R4 — working proof)

**Loom demo (live DeepSeek API through the plugin surface):**

👉 **[YOUR_LOOM_URL]**

Video walks through all 4 operations with a real `DEEPSEEK_API_KEY`:

1. `models.list` — list available DeepSeek models  
2. `user.getBalance` — balance / currency breakdown  
3. `chat.createCompletion` — `deepseek-chat` non-streaming completion  
4. `anthropic.createMessage` — Anthropic-compatible `/anthropic/v1/messages`  

Offline tests (always run in CI):

```bash
pnpm --filter @corsair-dev/deepseek test
```

Live proof used in the recording:

```bash
export DEEPSEEK_API_KEY=sk-...
node packages/deepseek/scripts/demo.mjs
```

## Additional Notes

- Streaming is intentionally locked to `stream: false` (documented in README)
- Vercel preview may need Corsair team authorization for first-time contributor deploys
- OSS claim page: https://corsair.dev/oss/deepseek
