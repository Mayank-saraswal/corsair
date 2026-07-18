/**
 * Live demo for Corsair OSS R4 (Loom / screen recording).
 *
 * OAuth access token (Fortnite ecosystem):
 *   $env:EPIC_GAMES_ACCESS_TOKEN = "..."
 *
 * Optional Unreal Remote Control base (defaults to http://127.0.0.1:30010):
 *   $env:EPIC_REMOTE_CONTROL_BASE = "http://127.0.0.1:30010"
 *
 * Usage (from monorepo root):
 *   node packages/epicgames/scripts/demo.mjs
 *   pnpm --filter @corsair-dev/epicgames demo
 *
 * Never paste tokens into Loom titles or GitHub.
 */

const TOKEN =
	process.env.EPIC_GAMES_ACCESS_TOKEN ||
	process.env.EPICGAMES_ACCESS_TOKEN ||
	process.env.EPIC_ACCESS_TOKEN;
const ISLANDS_BASE = 'https://api.fortnite.com/ecosystem/v1';
const REMOTE_BASE =
	process.env.EPIC_REMOTE_CONTROL_BASE || 'http://127.0.0.1:30010';

if (!TOKEN) {
	console.error(`
❌  EPIC_GAMES_ACCESS_TOKEN is not set.

Offline tests (no token):
  pnpm --filter @corsair-dev/epicgames test

For Loom / live island list:
  $env:EPIC_GAMES_ACCESS_TOKEN = "..."
  node packages/epicgames/scripts/demo.mjs
`);
	process.exit(1);
}

function section(title) {
	console.log(`\n${'═'.repeat(60)}`);
	console.log(`  ${title}`);
	console.log('═'.repeat(60));
}

async function tryStep(label, fn) {
	try {
		await fn();
		return true;
	} catch (err) {
		const msg = err?.message || String(err);
		console.log(`⚠️  soft-skip (${label}): ${msg.slice(0, 200)}`);
		return false;
	}
}

async function islandsGet(path, query) {
	const url = new URL(`${ISLANDS_BASE}${path}`);
	if (query) {
		for (const [k, v] of Object.entries(query)) {
			if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
		}
	}
	const res = await fetch(url, {
		headers: {
			Authorization: `Bearer ${TOKEN}`,
			Accept: 'application/json',
		},
	});
	const text = await res.text();
	if (!res.ok) {
		throw new Error(`${path} → ${res.status}: ${text.slice(0, 300)}`);
	}
	try {
		return JSON.parse(text);
	} catch {
		return { raw: text.slice(0, 200) };
	}
}

async function main() {
	console.log('Corsair × Epic Games plugin — live demo');
	console.log('Issue: https://github.com/corsairdev/corsair/issues/472');
	console.log('Package: @corsair-dev/epicgames');

	await tryStep('islands.list', async () => {
		section('1/3  islands.list  GET /islands?size=5');
		const data = await islandsGet('/islands', { size: 5 });
		const rows = Array.isArray(data)
			? data
			: (data?.islands ?? data?.data ?? data?.items ?? []);
		console.log(
			'count (page):',
			Array.isArray(rows) ? rows.length : typeof data,
		);
		console.log(
			'sample keys:',
			data && typeof data === 'object'
				? Object.keys(data).slice(0, 8).join(', ')
				: typeof data,
		);
		if (Array.isArray(rows) && rows[0]?.code) {
			const code = rows[0].code;
			section('2/3  islands.getPlays  GET /islands/{code}/metrics/day/plays');
			const plays = await islandsGet(
				`/islands/${encodeURIComponent(code)}/metrics/day/plays`,
			);
			console.log(
				'island',
				code,
				'plays intervals:',
				Array.isArray(plays?.intervals) ? plays.intervals.length : typeof plays,
			);
		}
	});

	await tryStep('remote OPTIONS (optional local UE)', async () => {
		section('3/3  remote.corsPreflight  OPTIONS /remote');
		const res = await fetch(`${REMOTE_BASE}/remote`, { method: 'OPTIONS' });
		console.log('status:', res.status, 'allow:', res.headers.get('allow'));
	});

	section('✅  Epic Games demo finished');
	console.log(
		'Record this run in Loom, then open the PR with Screenshots / Demos + Closes #472',
	);
}

main().catch((err) => {
	console.error('\n❌  Demo failed:', err.message || err);
	process.exit(1);
});
