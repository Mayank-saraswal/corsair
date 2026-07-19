import { execFileSync } from 'node:child_process';

function gh(args) {
	try {
		return execFileSync('gh', args, { encoding: 'utf8' });
	} catch (e) {
		return e.stdout?.toString?.() || e.message || String(e);
	}
}

console.log(gh(['pr', 'checks', '477', '--repo', 'corsairdev/corsair']));
console.log(
	'LABELS',
	gh([
		'pr',
		'view',
		'477',
		'--repo',
		'corsairdev/corsair',
		'--json',
		'labels',
		'-q',
		'.labels[].name',
	]),
);

const comments = JSON.parse(
	gh(['api', 'repos/corsairdev/corsair/issues/477/comments']),
);
for (const x of comments.slice(-5)) {
	console.log('====', x.user.login, x.created_at);
	const score = x.body.match(/Confidence Score:\s*(\d\/5)/);
	if (score) console.log('SCORE', score[1]);
	const round = x.body.match(/corsair-review-bot round=(\d)/);
	if (round) console.log('ROUND', round[1]);
	const maintainer = /needs-maintainer|Maintainer review needed/i.test(x.body);
	if (maintainer) console.log('MAINTAINER_SIGNAL');
	console.log(x.body.slice(0, 2000));
	console.log();
}
