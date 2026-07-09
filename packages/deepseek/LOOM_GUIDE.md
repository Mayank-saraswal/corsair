# How to record the Corsair DeepSeek Loom (PR #341 · R4)

Corsair **PLUGIN_PR_RULES R4** requires a demo video in the PR **Screenshots / Demos** section. CI cannot call DeepSeek for you — the Loom *is* the proof.

Plugin page: https://corsair.dev/oss/deepseek  
PR: https://github.com/corsairdev/corsair/pull/341  
Issue: https://github.com/corsairdev/corsair/issues/339  

---

## What reviewers need to see (90–150 seconds)

| # | Show on screen | Operation id |
|---|----------------|--------------|
| 1 | Terminal listing models | `DEEPSEEK_LIST_MODELS` |
| 2 | Balance JSON (USD/CNY) | `DEEPSEEK_GET_USER_BALANCE` |
| 3 | Chat reply from `deepseek-chat` | `DEEPSEEK_CREATE_CHAT_COMPLETION` |
| 4 | Anthropic-style message response | `DEEPSEEK_CREATE_ANTHROPIC_MESSAGE` |

Optional 10s opener: PR #341 open in browser + `packages/deepseek` folder in the editor.

---

## Before you hit Record

1. **API key** from https://platform.deepseek.com → API Keys  
2. Repo on branch `feat/add-deepseek-plugin`  
3. In terminal (from monorepo root):

```bash
# one-time if needed
pnpm install
pnpm --filter @corsair-dev/deepseek build

# do NOT put the key in the video title/description
export DEEPSEEK_API_KEY=sk-your-key-here   # Windows PowerShell: $env:DEEPSEEK_API_KEY="sk-..."
```

4. Open two windows side-by-side:
   - Browser: PR #341 + corsair.dev/oss/deepseek  
   - Terminal: ready to run the demo  
5. **Hide secrets:** don’t open `.env` on camera; if the key appears, crop/blur later in Loom

---

## Record with Loom (step-by-step)

1. Go to [https://www.loom.com](https://www.loom.com) → sign in  
2. Install **Loom Chrome extension** or desktop app  
3. Click **New video** → **Screen + Cam** (or Screen only)  
4. Select **Full screen** or the monitor with terminal + browser  
5. Mic on (narrate briefly — optional but looks pro)  
6. Hit **Start recording**

### Script (say this while you click)

> “This is the Corsair DeepSeek plugin for PR 341. Four ops: list models, balance, chat completion, and Anthropic messages.”

```bash
node packages/deepseek/scripts/demo.mjs
```

> “Models list returns deepseek-chat and deepseek-reasoner… Balance shows available credit… Chat completion returns a normal assistant message… Anthropic path hits `/anthropic/v1/messages` and returns content blocks.”

> “All four operations succeeded against the live DeepSeek API. Offline schema tests run in CI without a key.”

7. Stop recording → **Copy link**  
8. Settings (recommended):
   - Visibility: **Anyone with the link** (reviewers must open it without login)
   - Title: `Corsair @corsair-dev/deepseek — live API demo (PR #341)`
   - Do **not** paste API keys in the Loom description

---

## Paste into the GitHub PR

1. Open https://github.com/corsairdev/corsair/pull/341  
2. Edit description  
3. Paste contents of `PR_DESCRIPTION.md`  
4. Replace `YOUR_LOOM_URL` with your Loom link, e.g.:

```md
## Screenshots / Demos (R4 — working proof)

👉 https://www.loom.com/share/xxxxxxxx
```

5. Save  
6. Comment: `Ready for re-review — R4 demo video added`

Greptile / gate should stop flagging **R4** after the description includes a real demo URL under **Screenshots / Demos**.

---

## PowerShell one-liner (Windows)

```powershell
cd D:\opensource\corsair
$env:DEEPSEEK_API_KEY = "sk-..."   # paste key, don't commit
node packages/deepseek/scripts/demo.mjs
```

---

## Also run offline tests once on camera (optional 15s)

```bash
pnpm --filter @corsair-dev/deepseek test
```

Shows schema tests pass without needing network (CI path).

---

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Loom private / team-only | Set “Anyone with the link” |
| Only show code, no live API | Must hit real DeepSeek |
| Key visible full-screen | Blur or re-record; rotate key if leaked |
| Demo in PR comment only | Must be in **Screenshots / Demos** section of description |
| 10-minute unedited tour | Keep under ~3 minutes, all 4 ops |

---

## After Loom is linked

Re-check [PLUGIN_PR_RULES](https://github.com/corsairdev/corsair/blob/main/.github/PLUGIN_PR_RULES.md):

- [x] R1 scope  
- [x] R2 tests  
- [x] R3 description + checklist  
- [ ] **R4 Loom link** ← you  
- [x] R5 no boilerplate  
- [x] R6 no secrets in code  
- [x] R7 README  
- [x] R8 schemas + error handlers  
