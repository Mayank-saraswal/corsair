import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

import { corsair } from '@/server/corsair';

async function setInstagramCredentials() {
	const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, IG_ACCESS_TOKEN } = process.env;

	if (FACEBOOK_APP_ID) {
		await corsair.keys.instagram.set_client_id(FACEBOOK_APP_ID);
	}
	if (FACEBOOK_APP_SECRET) {
		await corsair.keys.instagram.set_client_secret(FACEBOOK_APP_SECRET);
	}
	if (IG_ACCESS_TOKEN) {
		await corsair.instagram.keys.set_access_token(IG_ACCESS_TOKEN);
	}
}

async function testOpenai() {
	if (!process.env.OPENAI_API_KEY) {
		console.warn('OPENAI_API_KEY not set — skipping openai plugin smoke test');
		return;
	}

	const models = await corsair.openai.api.models.list({});
	console.log('openai.models.list ->', models.data.length, 'models');

	const completion = await corsair.openai.api.chat.createCompletion({
		model: 'gpt-4o-mini',
		messages: [{ role: 'user', content: 'Say "hi" and nothing else.' }],
		maxCompletionTokens: 16,
	});
	console.log(
		'openai.chat.createCompletion ->',
		completion.choices[0]?.message.content,
	);

	const embedding = await corsair.openai.api.embeddings.create({
		model: 'text-embedding-3-small',
		input: 'corsair openai plugin test',
	});
	console.log('openai.embeddings.create ->', embedding.data.length, 'vectors');

	const vectorStore = await corsair.openai.api.vectorStores.create({
		name: 'corsair-openai-plugin-smoke-test',
	});
	console.log('openai.vectorStores.create ->', vectorStore.id);

	const vectorStores = await corsair.openai.api.vectorStores.list({});
	console.log(
		'openai.vectorStores.list ->',
		vectorStores.data.length,
		'stores',
	);

	await corsair.openai.api.vectorStores.delete({
		vectorStoreId: vectorStore.id,
	});
	console.log('openai.vectorStores.delete -> ok');
}

const main = async () => {
	const res = await corsair.slack.api.messages.post({
		channel: 'general',
		text: 'hello',
	});

	await testOpenai();
};

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
