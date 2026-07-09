/**
 * Live demo for Corsair OSS R4 (Loom / screen recording).
 *
 * Usage (from monorepo root):
 *   export DEEPSEEK_API_KEY=sk-...
 *   node packages/deepseek/scripts/demo.mjs
 *
 * Or from this package:
 *   DEEPSEEK_API_KEY=sk-... node scripts/demo.mjs
 *
 * What it proves on camera:
 *   1. List models
 *   2. Get account balance
 *   3. Chat completion (deepseek-chat)
 *   4. Anthropic-compatible message
 *
 * Never paste your real API key into the Loom video description or GitHub.
 * Blur the .env / terminal history if the key is visible.
 */

const API_KEY = process.env.DEEPSEEK_API_KEY;
const BASE = 'https://api.deepseek.com';

if (!API_KEY) {
	console.error('❌  Set DEEPSEEK_API_KEY first, then re-run.');
	process.exit(1);
}

async function request(path, { method = 'GET', body } = {}) {
	const res = await fetch(`${BASE}/${path}`, {
		method,
		headers: {
			Authorization: `Bearer ${API_KEY}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		body: body ? JSON.stringify(body) : undefined,
	});
	const text = await res.text();
	let json;
	try {
		json = JSON.parse(text);
	} catch {
		json = { raw: text };
	}
	if (!res.ok) {
		throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 400)}`);
	}
	return json;
}

function section(title) {
	console.log('\n' + '═'.repeat(60));
	console.log(`  ${title}`);
	console.log('═'.repeat(60));
}

async function main() {
	console.log('Corsair × DeepSeek plugin — live API demo');
	console.log('PR: https://github.com/corsairdev/corsair/pull/341');
	console.log('Package: @corsair-dev/deepseek');
	console.log(
		'Ops: models.list · user.getBalance · chat.createCompletion · anthropic.createMessage',
	);

	// 1) models.list  →  DEEPSEEK_LIST_MODELS
	section('1/4  models.list  (DEEPSEEK_LIST_MODELS)');
	const models = await request('models');
	const ids = (models.data ?? []).map((m) => m.id);
	console.log('models:', ids.join(', ') || '(none)');
	console.log('count:', ids.length);

	// 2) user.getBalance  →  DEEPSEEK_GET_USER_BALANCE
	section('2/4  user.getBalance  (DEEPSEEK_GET_USER_BALANCE)');
	const balance = await request('user/balance');
	console.log(JSON.stringify(balance, null, 2));

	// 3) chat.createCompletion  →  DEEPSEEK_CREATE_CHAT_COMPLETION
	section('3/4  chat.createCompletion  (DEEPSEEK_CREATE_CHAT_COMPLETION)');
	const chat = await request('chat/completions', {
		method: 'POST',
		body: {
			model: 'deepseek-chat',
			messages: [
				{
					role: 'user',
					content: 'In one short sentence: what is Corsair for developers?',
				},
			],
			stream: false,
			max_tokens: 80,
		},
	});
	console.log('model:', chat.model);
	console.log('assistant:', chat.choices?.[0]?.message?.content);
	console.log('usage:', chat.usage);

	// 4) anthropic.createMessage  →  DEEPSEEK_CREATE_ANTHROPIC_MESSAGE
	section('4/4  anthropic.createMessage  (DEEPSEEK_CREATE_ANTHROPIC_MESSAGE)');
	const msg = await request('anthropic/v1/messages', {
		method: 'POST',
		body: {
			model: 'deepseek-chat',
			max_tokens: 64,
			messages: [{ role: 'user', content: 'Reply with exactly: deepseek-ok' }],
			stream: false,
		},
	});
	console.log('id:', msg.id);
	console.log('content:', JSON.stringify(msg.content, null, 2));
	console.log('stop_reason:', msg.stop_reason);
	console.log('usage:', msg.usage);

	section('✅  All 4 DeepSeek operations succeeded');
	console.log('Paste this Loom link into PR #341 → Screenshots / Demos (R4).');
}

main().catch((err) => {
	console.error('\n❌  Demo failed:', err.message || err);
	process.exit(1);
});
