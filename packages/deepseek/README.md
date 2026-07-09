# @corsair-dev/deepseek

Corsair plugin for DeepSeek API.

## Auth setup

API-key only. Credentials are sent as `Authorization: Bearer <key>`.

Missing credentials throw `AuthMissingError` (never an empty string).

## Endpoint overview

Operations: chat.createCompletion, anthropic.createMessage, user.getBalance, models.list.

## Tests

```bash
pnpm --filter @corsair-dev/deepseek test
```
