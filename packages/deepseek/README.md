# @corsair-dev/deepseek

Corsair plugin for DeepSeek API.

## Auth setup

API-key only. Get a key at [platform.deepseek.com](https://platform.deepseek.com/) (API Keys).

Set `DEEPSEEK_API_KEY` in your environment (or pass the key via Corsair credentials). Credentials are sent as `Authorization: Bearer <key>`.

Missing credentials throw `AuthMissingError` (never an empty string).

## Endpoint overview

| Operation | DeepSeek path | Description |
|-----------|---------------|-------------|
| `chat.createCompletion` | `POST /chat/completions` | OpenAI-compatible chat completions |
| `anthropic.createMessage` | `POST /anthropic/v1/messages` | Anthropic-compatible messages |
| `user.getBalance` | `GET /user/balance` | Account balance |
| `models.list` | `GET /models` | List available models |

## Quirks & caveats

- **Streaming is off by default in this plugin.** All completion/message calls send `stream: false` so responses are a single JSON body (not SSE). Do not enable streaming unless the Corsair client and consumer are updated to handle streams.
- **`deepseek-reasoner` ignores sampling params.** When using the reasoner model, `temperature`, `top_p`, `presence_penalty`, and `frequency_penalty` are ignored by the API (the plugin still accepts them for schema compatibility with chat models).
- **OpenAI-compatible + Anthropic-compatible surfaces.** Chat completions use the OpenAI-style `/chat/completions` path; Anthropic-style messages use `/anthropic/v1/messages` with `max_tokens` (snake_case on the wire).

## Tests

```bash
pnpm --filter @corsair-dev/deepseek test
```

Offline schema tests always run. Live API type tests run only when `DEEPSEEK_API_KEY` is set.

## Live demo (R4 Loom recording)

Requires a real API key (same as live tests):

```bash
# PowerShell
$env:DEEPSEEK_API_KEY = "sk-..."
pnpm --filter @corsair-dev/deepseek demo

# bash
export DEEPSEEK_API_KEY=sk-...
pnpm --filter @corsair-dev/deepseek demo
```

Or: `node packages/deepseek/scripts/demo.mjs`

Record the successful run with [Loom](https://www.loom.com/), then paste the `https://www.loom.com/share/...` URL into the PR under **Screenshots / Demos**.
